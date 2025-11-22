/**
 * Componente de Gerenciamento de Endereços do Usuário
 * 
 * Permite ao usuário visualizar, adicionar, editar e excluir seus endereços de entrega.
 * Inclui funcionalidade para definir um endereço como padrão.
 * 
 * IMPORTANTE: Endereços que já foram usados em pedidos não podem ser excluídos
 * devido a restrições de integridade referencial do banco de dados.
 */

// Importa as dependências necessárias do React e componentes UI
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Plus, Trash2, Star, Edit, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { addressService } from '@/services/supabaseService';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

// ===== TIPO DO ENDEREÇO =====

/**
 * Interface que define a estrutura de um endereço
 */
type Address = {
  id: string;                // ID único do endereço
  user_id: string;           // ID do usuário proprietário
  street: string;            // Nome da rua
  number: string;            // Número da residência
  complement?: string;       // Complemento (opcional, ex: "Apto 101")
  neighborhood: string;      // Bairro
  city: string;              // Cidade
  state: string;             // Estado (sigla)
  zip_code: string;          // CEP
  is_default: boolean;       // Indica se é o endereço padrão
  created_at: string;        // Data de criação
  updated_at: string;        // Data de última atualização
};

// ===== COMPONENTE PRINCIPAL =====

export const UserAddresses: React.FC = () => {
  // Obtém o usuário autenticado do hook de autenticação
  const { user } = useAuth();
  
  // ===== ESTADOS DO COMPONENTE =====
  
  // Lista de endereços do usuário
  const [addresses, setAddresses] = useState<Address[]>([]);
  
  // Indica se está carregando os dados
  const [loading, setLoading] = useState(true);
  
  // Controla se o diálogo de adicionar/editar está aberto
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Armazena o endereço que está sendo editado (null = novo endereço)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  
  // Indica se está processando uma operação (salvar, deletar, etc.)
  const [processing, setProcessing] = useState(false);
  
  // Dados do formulário de endereço
  const [formData, setFormData] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zip_code: '',
    is_default: false
  });

  // ===== EFEITO: CARREGAR ENDEREÇOS =====
  
  /**
   * Carrega os endereços do usuário quando o componente é montado
   * ou quando o usuário muda
   */
  useEffect(() => {
    if (user) {
      loadAddresses();
    }
  }, [user]);

  // ===== FUNÇÃO: CARREGAR ENDEREÇOS =====
  
  /**
   * Busca todos os endereços do usuário no banco de dados
   */
  const loadAddresses = async () => {
    // Verifica se há usuário autenticado
    if (!user) return;
    
    try {
      // Ativa o estado de carregamento
      setLoading(true);
      
      // Busca os endereços do usuário via service
      const data = await addressService.getByUserId(user.id);
      
      // Atualiza o estado com os endereços carregados
      setAddresses(data);
    } catch (error) {
      // Log do erro no console para debug
      console.error('Erro ao carregar endereços:', error);
      
      // Mostra notificação de erro para o usuário
      toast({
        title: "Erro",
        description: "Não foi possível carregar os endereços.",
        variant: "destructive",
      });
    } finally {
      // Desativa o estado de carregamento independente do resultado
      setLoading(false);
    }
  };

  // ===== FUNÇÃO: SALVAR ENDEREÇO =====
  
  /**
   * Cria um novo endereço ou atualiza um existente
   * @param e - Evento do formulário
   */
  const handleSaveAddress = async (e: React.FormEvent) => {
    // Previne o comportamento padrão do formulário (recarregar página)
    e.preventDefault();
    
    // Verifica se há usuário autenticado
    if (!user) return;

    try {
      // Ativa o estado de processamento
      setProcessing(true);
      
      // Prepara os dados do endereço incluindo o user_id
      const addressData = {
        ...formData,
        user_id: user.id
      };

      // Verifica se está editando ou criando um novo endereço
      if (editingAddress) {
        // ===== MODO EDIÇÃO: Atualiza endereço existente =====
        await addressService.update(editingAddress.id, formData);
        
        // Mostra notificação de sucesso
        toast({
          title: "Sucesso!",
          description: "Endereço atualizado com sucesso.",
        });
      } else {
        // ===== MODO CRIAÇÃO: Cria novo endereço =====
        await addressService.create(addressData);
        
        // Mostra notificação de sucesso
        toast({
          title: "Sucesso!",
          description: "Endereço adicionado com sucesso.",
        });
      }
      
      // Fecha o diálogo
      setDialogOpen(false);
      
      // Limpa o endereço em edição
      setEditingAddress(null);
      
      // Reseta o formulário
      resetForm();
      
      // Recarrega a lista de endereços
      loadAddresses();
    } catch (error) {
      // Log do erro no console para debug
      console.error('Erro ao salvar endereço:', error);
      
      // Mostra notificação de erro
      toast({
        title: "Erro",
        description: "Não foi possível salvar o endereço. Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    } finally {
      // Desativa o estado de processamento
      setProcessing(false);
    }
  };

  // ===== FUNÇÃO: VERIFICAR SE ENDEREÇO ESTÁ EM USO =====
  
  /**
   * Verifica se o endereço está sendo usado em algum pedido
   * Endereços em uso não podem ser deletados devido a restrições do banco
   * @param addressId - ID do endereço a verificar
   * @returns true se o endereço está em uso, false caso contrário
   */
  const checkIfAddressIsInUse = async (addressId: string): Promise<boolean> => {
    try {
      // Busca pedidos que usam este endereço
      const { data, error } = await supabase
        .from('orders')
        .select('id')
        .eq('delivery_address_id', addressId)
        .limit(1);
      
      // Se houver erro, assume que está em uso por segurança
      if (error) {
        console.error('Erro ao verificar uso do endereço:', error);
        return true;
      }
      
      // Retorna true se houver pelo menos um pedido usando este endereço
      return (data && data.length > 0);
    } catch (error) {
      // Em caso de erro, assume que está em uso por segurança
      console.error('Erro ao verificar uso do endereço:', error);
      return true;
    }
  };

  // ===== FUNÇÃO: DELETAR ENDEREÇO =====
  
  /**
   * Remove um endereço do banco de dados
   * Primeiro verifica se o endereço não está sendo usado em pedidos
   * @param id - ID do endereço a ser removido
   */
  const handleDeleteAddress = async (id: string) => {
    try {
      // Ativa o estado de processamento
      setProcessing(true);
      
      // Verifica se o endereço está sendo usado em pedidos
      const isInUse = await checkIfAddressIsInUse(id);
      
      // Se estiver em uso, não permite deletar
      if (isInUse) {
        toast({
          title: "Não é possível excluir",
          description: "Este endereço está vinculado a pedidos realizados e não pode ser removido. Você pode editá-lo se necessário.",
          variant: "destructive",
        });
        return;
      }
      
      // Se não estiver em uso, prossegue com a exclusão
      await addressService.remove(id);
      
      // Mostra notificação de sucesso
      toast({
        title: "Sucesso!",
        description: "Endereço removido com sucesso.",
      });
      
      // Recarrega a lista de endereços
      loadAddresses();
    } catch (error) {
      // Log do erro no console para debug
      console.error('Erro ao deletar endereço:', error);
      
      // Mostra notificação de erro
      toast({
        title: "Erro",
        description: "Não foi possível remover o endereço. Este endereço pode estar vinculado a pedidos.",
        variant: "destructive",
      });
    } finally {
      // Desativa o estado de processamento
      setProcessing(false);
    }
  };

  // ===== FUNÇÃO: DEFINIR ENDEREÇO PADRÃO =====
  
  /**
   * Define um endereço como padrão e remove a marcação dos demais
   * @param id - ID do endereço a ser definido como padrão
   */
  const handleSetDefault = async (id: string) => {
    try {
      // Ativa o estado de processamento
      setProcessing(true);
      
      // Cria uma promessa de atualização para cada endereço
      // Define is_default = true apenas para o endereço selecionado
      const updates = addresses.map(addr => 
        addressService.update(addr.id, { is_default: addr.id === id })
      );
      
      // Aguarda todas as atualizações serem concluídas
      await Promise.all(updates);
      
      // Mostra notificação de sucesso
      toast({
        title: "Sucesso!",
        description: "Endereço padrão atualizado.",
      });
      
      // Recarrega a lista de endereços
      loadAddresses();
    } catch (error) {
      // Log do erro no console para debug
      console.error('Erro ao definir endereço padrão:', error);
      
      // Mostra notificação de erro
      toast({
        title: "Erro",
        description: "Não foi possível definir como padrão.",
        variant: "destructive",
      });
    } finally {
      // Desativa o estado de processamento
      setProcessing(false);
    }
  };

  // ===== FUNÇÃO: ABRIR DIÁLOGO DE EDIÇÃO =====
  
  /**
   * Abre o diálogo de edição e preenche o formulário com os dados do endereço
   * @param address - Endereço a ser editado
   */
  const openEditDialog = (address: Address) => {
    // Define o endereço que está sendo editado
    setEditingAddress(address);
    
    // Preenche o formulário com os dados do endereço
    setFormData({
      street: address.street,
      number: address.number,
      complement: address.complement || '',
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      zip_code: address.zip_code,
      is_default: address.is_default
    });
    
    // Abre o diálogo
    setDialogOpen(true);
  };

  // ===== FUNÇÃO: RESETAR FORMULÁRIO =====
  
  /**
   * Limpa todos os campos do formulário
   */
  const resetForm = () => {
    setFormData({
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zip_code: '',
      is_default: false
    });
  };

  // ===== RENDERIZAÇÃO: ESTADO DE CARREGAMENTO =====
  
  // Se estiver carregando, mostra skeleton loader
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Meus Endereços
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ===== RENDERIZAÇÃO: COMPONENTE PRINCIPAL =====
  
  return (
    <Card>
      {/* Cabeçalho do Card */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Meus Endereços
        </CardTitle>
        <CardDescription>
          Gerencie seus endereços de entrega
        </CardDescription>
      </CardHeader>
      
      {/* Conteúdo do Card */}
      <CardContent>
        {/* Alerta informativo sobre exclusão de endereços */}
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Endereços vinculados a pedidos anteriores não podem ser excluídos, mas podem ser editados.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          {/* Lista de Endereços */}
          {addresses.map((address) => (
            <div key={address.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                {/* Informações do Endereço */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <p className="font-medium">
                      {address.street}, {address.number}
                    </p>
                    {/* Badge de endereço padrão */}
                    {address.is_default && (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Padrão
                      </Badge>
                    )}
                  </div>
                  {/* Complemento e bairro */}
                  <p className="text-sm text-muted-foreground">
                    {address.complement && `${address.complement}, `}
                    {address.neighborhood}
                  </p>
                  {/* Cidade, estado e CEP */}
                  <p className="text-sm text-muted-foreground">
                    {address.city}, {address.state} - {address.zip_code}
                  </p>
                </div>
                
                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Botão: Definir como Padrão (só aparece se não for o padrão) */}
                  {!address.is_default && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(address.id)}
                      disabled={processing}
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Definir como padrão
                    </Button>
                  )}
                  
                  {/* Botão: Editar */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(address)}
                    disabled={processing}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  
                  {/* Botão: Excluir */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteAddress(address.id)}
                    disabled={processing}
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Mensagem quando não há endereços */}
          {addresses.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-2 font-medium">Nenhum endereço cadastrado</p>
              <p className="text-sm">Adicione um endereço para começar a fazer pedidos</p>
            </div>
          )}

          {/* Diálogo de Adicionar/Editar Endereço */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              {/* Botão: Adicionar Endereço */}
              <Button 
                className="w-full" 
                onClick={() => {
                  setEditingAddress(null);
                  resetForm();
                }}
                disabled={processing}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Endereço
              </Button>
            </DialogTrigger>
            
            {/* Conteúdo do Diálogo */}
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingAddress ? 'Editar Endereço' : 'Novo Endereço'}
                </DialogTitle>
              </DialogHeader>
              
              {/* Formulário de Endereço */}
              <form onSubmit={handleSaveAddress} className="space-y-4">
                {/* Rua e Número */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="street">Rua *</Label>
                    <Input
                      id="street"
                      value={formData.street}
                      onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
                      required
                      disabled={processing}
                      placeholder="Nome da rua"
                    />
                  </div>
                  <div>
                    <Label htmlFor="number">Número *</Label>
                    <Input
                      id="number"
                      value={formData.number}
                      onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
                      required
                      disabled={processing}
                      placeholder="123"
                    />
                  </div>
                </div>

                {/* Complemento */}
                <div>
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    value={formData.complement}
                    onChange={(e) => setFormData(prev => ({ ...prev, complement: e.target.value }))}
                    disabled={processing}
                    placeholder="Apto, bloco, etc. (opcional)"
                  />
                </div>

                {/* Bairro */}
                <div>
                  <Label htmlFor="neighborhood">Bairro *</Label>
                  <Input
                    id="neighborhood"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData(prev => ({ ...prev, neighborhood: e.target.value }))}
                    required
                    disabled={processing}
                    placeholder="Nome do bairro"
                  />
                </div>

                {/* Cidade e Estado */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      required
                      disabled={processing}
                      placeholder="Nome da cidade"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">Estado *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value.toUpperCase() }))}
                      required
                      disabled={processing}
                      placeholder="SP"
                      maxLength={2}
                    />
                  </div>
                </div>

                {/* CEP */}
                <div>
                  <Label htmlFor="zip_code">CEP *</Label>
                  <Input
                    id="zip_code"
                    value={formData.zip_code}
                    onChange={(e) => setFormData(prev => ({ ...prev, zip_code: e.target.value }))}
                    required
                    disabled={processing}
                    placeholder="00000-000"
                  />
                </div>

                {/* Botões de Ação do Formulário */}
                <div className="flex gap-4 pt-4">
                  {/* Botão: Cancelar */}
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setDialogOpen(false);
                      resetForm();
                      setEditingAddress(null);
                    }} 
                    className="flex-1"
                    disabled={processing}
                  >
                    Cancelar
                  </Button>
                  
                  {/* Botão: Salvar/Atualizar */}
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={processing}
                  >
                    {processing ? 'Salvando...' : (editingAddress ? 'Atualizar' : 'Salvar')}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};
