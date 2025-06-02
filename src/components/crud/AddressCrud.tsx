
import React, { useState, useEffect } from 'react';
// Importa os serviços e tipos necessários para gerenciar endereços
import { addressService, userService, restaurantService, Address, User, Restaurant } from '@/utils/databaseService';
// Importa componentes da interface do usuário
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// Importa ícones do Lucide React
import { Pencil, Trash2, Plus, MapPin, Store, User as UserIcon } from 'lucide-react';
// Importa hook para notificações
import { useToast } from '@/components/ui/use-toast';
// Importa componentes adicionais
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Componente para gerenciar endereços (CRUD - Create, Read, Update, Delete)
 * Permite criar, visualizar, editar e excluir endereços de usuários e restaurantes
 */
export const AddressCrud: React.FC = () => {
  // Estados do componente para controlar os dados e interface
  const [addresses, setAddresses] = useState<Address[]>([]); // Lista de todos os endereços
  const [users, setUsers] = useState<User[]>([]); // Lista de usuários disponíveis
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]); // Lista de restaurantes disponíveis
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controla se o diálogo está aberto
  const [currentAddress, setCurrentAddress] = useState<Partial<Address>>({}); // Endereço sendo editado/criado
  const [isEditing, setIsEditing] = useState(false); // Indica se está no modo edição
  const [addressType, setAddressType] = useState<'user' | 'restaurant'>('user'); // Tipo do endereço
  const { toast } = useToast(); // Hook para exibir notificações

  // Efeito que executa quando o componente é montado
  useEffect(() => {
    carregarEnderecos(); // Carrega lista de endereços
    setUsers(userService.getAll()); // Carrega lista de usuários
    setRestaurants(restaurantService.getAll()); // Carrega lista de restaurantes
  }, []);

  // Função para carregar todos os endereços do banco de dados
  const carregarEnderecos = () => {
    setAddresses(addressService.getAll());
  };

  // Função para abrir o diálogo de criação ou edição de endereço
  const abrirDialogo = (address?: Address) => {
    if (address) {
      // Se um endereço foi fornecido, está editando
      setCurrentAddress(address);
      setIsEditing(true);
      setAddressType(address.isRestaurantAddress ? 'restaurant' : 'user');
    } else {
      // Se não foi fornecido endereço, está criando novo
      setCurrentAddress({
        userId: users.length > 0 ? users[0].id : '',
        street: '',
        number: '',
        city: '',
        neighborhood: '',
        state: '',
        zipCode: '',
        isDefault: false,
        isRestaurantAddress: false
      });
      setIsEditing(false);
      setAddressType('user');
    }
    setIsDialogOpen(true); // Abre o diálogo
  };

  // Função para fechar o diálogo
  const fecharDialogo = () => {
    setIsDialogOpen(false);
    setCurrentAddress({});
  };

  // Função para lidar com mudanças nos campos de input
  const alterarCampo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentAddress({ ...currentAddress, [name]: value });
  };

  // Função para alterar o usuário selecionado
  const alterarUsuario = (value: string) => {
    setCurrentAddress({ ...currentAddress, userId: value });
  };

  // Função para alterar o restaurante selecionado
  const alterarRestaurante = (value: string) => {
    setCurrentAddress({ ...currentAddress, restaurantId: value });
  };

  // Função para alterar se é endereço padrão
  const alterarPadrao = (checked: boolean) => {
    setCurrentAddress({ ...currentAddress, isDefault: checked });
  };

  // Função para alterar o tipo de endereço (usuário ou restaurante)
  const alterarTipoEndereco = (type: 'user' | 'restaurant') => {
    setAddressType(type);
    setCurrentAddress({
      ...currentAddress,
      isRestaurantAddress: type === 'restaurant',
      userId: type === 'user' && users.length > 0 ? users[0].id : undefined,
      restaurantId: type === 'restaurant' && restaurants.length > 0 ? restaurants[0].id : undefined
    });
  };

  // Função para validar os dados do formulário
  const validarFormulario = () => {
    // Verifica se os campos obrigatórios foram preenchidos
    if (!currentAddress.street || !currentAddress.number || !currentAddress.city) {
      toast({
        title: "Erro de validação",
        description: "Rua, número e cidade são obrigatórios",
        variant: "destructive",
      });
      return false;
    }

    // Verifica se um usuário foi selecionado para endereços de usuário
    if (addressType === 'user' && !currentAddress.userId) {
      toast({
        title: "Erro de validação",
        description: "Usuário é obrigatório para endereços de usuário",
        variant: "destructive",
      });
      return false;
    }

    // Verifica se um restaurante foi selecionado para endereços de restaurante
    if (addressType === 'restaurant' && !currentAddress.restaurantId) {
      toast({
        title: "Erro de validação",
        description: "Restaurante é obrigatório para endereços de restaurante",
        variant: "destructive",
      });
      return false;
    }
    
    return true; // Validação passou
  };

  // Função para salvar o endereço (criar ou atualizar)
  const salvarEndereco = () => {
    if (!validarFormulario()) return; // Sai se validação falhou
    
    if (isEditing && currentAddress.id) {
      // Atualiza endereço existente
      addressService.update(currentAddress.id, currentAddress);
      
      // Atualiza restaurante com este endereço se for endereço de restaurante
      if (currentAddress.isRestaurantAddress && currentAddress.restaurantId) {
        const restaurant = restaurantService.getById(currentAddress.restaurantId);
        if (restaurant) {
          restaurantService.update(restaurant.id, { 
            ...restaurant, 
            addressId: currentAddress.id 
          });
        }
      }
      
      toast({
        title: "Endereço atualizado",
        description: "O endereço foi atualizado com sucesso",
      });
    } else {
      // Cria novo endereço
      const newAddress = addressService.create(currentAddress as Omit<Address, 'id'>);
      
      // Atualiza restaurante com este endereço se for endereço de restaurante
      if (newAddress.isRestaurantAddress && newAddress.restaurantId) {
        const restaurant = restaurantService.getById(newAddress.restaurantId);
        if (restaurant) {
          restaurantService.update(restaurant.id, { 
            ...restaurant, 
            addressId: newAddress.id 
          });
        }
      }
      
      toast({
        title: "Endereço criado",
        description: "Novo endereço foi criado com sucesso",
      });
    }
    
    fecharDialogo(); // Fecha o diálogo
    carregarEnderecos(); // Recarrega a lista
  };

  // Função para excluir um endereço
  const excluirEndereco = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este endereço?')) {
      addressService.remove(id);
      toast({
        title: "Endereço excluído",
        description: "O endereço foi removido com sucesso",
      });
      carregarEnderecos(); // Recarrega a lista
    }
  };

  // Função para obter o nome do usuário pelo ID
  const obterNomeUsuario = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Usuário não encontrado';
  };

  // Função para obter o nome do restaurante pelo ID
  const obterNomeRestaurante = (restaurantId: string) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    return restaurant ? restaurant.name : 'Restaurante não encontrado';
  };

  // Filtra endereços por tipo
  const enderecosUsuarios = addresses.filter(a => !a.isRestaurantAddress);
  const enderecosRestaurantes = addresses.filter(a => a.isRestaurantAddress);

  return (
    <div className="space-y-4">
      {/* Cabeçalho com título e botão de novo endereço */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Gerenciamento de Endereços</h3>
        <Button onClick={() => abrirDialogo()}>
          <Plus size={16} className="mr-2" />
          Novo Endereço
        </Button>
      </div>
      
      {/* Abas para separar endereços de usuários e restaurantes */}
      <Tabs defaultValue="user" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="user">Endereços de Usuários</TabsTrigger>
          <TabsTrigger value="restaurant">Endereços de Restaurantes</TabsTrigger>
        </TabsList>
        
        {/* Aba de endereços de usuários */}
        <TabsContent value="user">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Rua</TableHead>
                  <TableHead>Número</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Padrão</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enderecosUsuarios.length > 0 ? (
                  enderecosUsuarios.map((address) => (
                    <TableRow key={address.id}>
                      <TableCell>{obterNomeUsuario(address.userId!)}</TableCell>
                      <TableCell>{address.street}</TableCell>
                      <TableCell>{address.number}</TableCell>
                      <TableCell>{address.city}</TableCell>
                      <TableCell>{address.isDefault ? 'Sim' : 'Não'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => abrirDialogo(address)}>
                            <Pencil size={16} />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => excluirEndereco(address.id)}>
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <UserIcon size={24} />
                        <p>Nenhum endereço de usuário cadastrado</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        {/* Aba de endereços de restaurantes */}
        <TabsContent value="restaurant">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Restaurante</TableHead>
                  <TableHead>Rua</TableHead>
                  <TableHead>Número</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enderecosRestaurantes.length > 0 ? (
                  enderecosRestaurantes.map((address) => (
                    <TableRow key={address.id}>
                      <TableCell>{address.restaurantId ? obterNomeRestaurante(address.restaurantId) : 'Não associado'}</TableCell>
                      <TableCell>{address.street}</TableCell>
                      <TableCell>{address.number}</TableCell>
                      <TableCell>{address.city}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => abrirDialogo(address)}>
                            <Pencil size={16} />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => excluirEndereco(address.id)}>
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Store size={24} />
                        <p>Nenhum endereço de restaurante cadastrado</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Diálogo para criar/editar endereço */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Endereço' : 'Novo Endereço'}</DialogTitle>
            <DialogDescription>
              Selecione o tipo de endereço e preencha os dados
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              {/* Seletor de tipo de endereço */}
              <div className="grid gap-2">
                <Label>Tipo de Endereço</Label>
                <div className="flex space-x-2">
                  <Button 
                    type="button" 
                    variant={addressType === 'user' ? 'default' : 'outline'}
                    onClick={() => alterarTipoEndereco('user')}
                    className="flex-1"
                  >
                    <UserIcon size={16} className="mr-2" />
                    Usuário
                  </Button>
                  <Button 
                    type="button" 
                    variant={addressType === 'restaurant' ? 'default' : 'outline'}
                    onClick={() => alterarTipoEndereco('restaurant')}
                    className="flex-1"
                  >
                    <Store size={16} className="mr-2" />
                    Restaurante
                  </Button>
                </div>
              </div>
              
              {/* Seletor de usuário (apenas para endereços de usuário) */}
              {addressType === 'user' && (
                <div className="grid gap-2">
                  <Label htmlFor="userId">Usuário</Label>
                  <Select 
                    onValueChange={alterarUsuario} 
                    defaultValue={currentAddress.userId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map(user => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Seletor de restaurante (apenas para endereços de restaurante) */}
              {addressType === 'restaurant' && (
                <div className="grid gap-2">
                  <Label htmlFor="restaurantId">Restaurante</Label>
                  <Select 
                    onValueChange={alterarRestaurante} 
                    defaultValue={currentAddress.restaurantId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um restaurante" />
                    </SelectTrigger>
                    <SelectContent>
                      {restaurants.map(restaurant => (
                        <SelectItem key={restaurant.id} value={restaurant.id}>
                          {restaurant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Campos do endereço */}
              <div className="grid gap-2">
                <Label htmlFor="street">Rua</Label>
                <Input
                  id="street"
                  name="street"
                  value={currentAddress.street || ''}
                  onChange={alterarCampo}
                  placeholder="Ex: Av. Paulista"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  name="number"
                  value={currentAddress.number || ''}
                  onChange={alterarCampo}
                  placeholder="Ex: 1500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  name="complement"
                  value={currentAddress.complement || ''}
                  onChange={alterarCampo}
                  placeholder="Ex: Apto 101, Bloco A"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input
                  id="neighborhood"
                  name="neighborhood"
                  value={currentAddress.neighborhood || ''}
                  onChange={alterarCampo}
                  placeholder="Ex: Bela Vista"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  name="city"
                  value={currentAddress.city || ''}
                  onChange={alterarCampo}
                  placeholder="Ex: São Paulo"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  name="state"
                  value={currentAddress.state || ''}
                  onChange={alterarCampo}
                  placeholder="Ex: SP"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zipCode">CEP</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={currentAddress.zipCode || ''}
                  onChange={alterarCampo}
                  placeholder="Ex: 01310-100"
                />
              </div>
              
              {/* Checkbox para endereço padrão (apenas para usuários) */}
              {addressType === 'user' && (
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isDefault" 
                    checked={currentAddress.isDefault} 
                    onCheckedChange={alterarPadrao} 
                  />
                  <Label htmlFor="isDefault">Endereço padrão</Label>
                </div>
              )}
            </div>
          </div>
          {/* Botões do diálogo */}
          <DialogFooter>
            <Button variant="outline" onClick={fecharDialogo}>Cancelar</Button>
            <Button onClick={salvarEndereco}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
