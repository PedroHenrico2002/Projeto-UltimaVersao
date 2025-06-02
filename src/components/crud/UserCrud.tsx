
import React, { useState, useEffect } from 'react';
import { userService, User } from '@/utils/databaseService'; // Importa o serviço de usuários e o tipo User
import { Button } from '@/components/ui/button'; // Importa o componente de botão
import { Input } from '@/components/ui/input'; // Importa o componente de input
import { Label } from '@/components/ui/label'; // Importa o componente de label
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'; // Importa componentes de diálogo
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Importa componentes de tabela
import { Pencil, Trash2, Plus, User as UserIcon, Key } from 'lucide-react'; // Importa ícones do Lucide
import { useToast } from '@/components/ui/use-toast'; // Importa hook para notificações

/**
 * Componente UserCrud
 * 
 * Este componente é responsável por gerenciar operações CRUD (Create, Read, Update, Delete)
 * para usuários do sistema. Permite visualizar, criar, editar e excluir usuários.
 */
export const UserCrud: React.FC = () => {
  // Estados do componente para gerenciar a interface
  const [users, setUsers] = useState<User[]>([]); // Lista de usuários carregados do banco
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controla se o diálogo está aberto
  const [currentUser, setCurrentUser] = useState<Partial<User>>({}); // Usuário sendo editado/criado
  const [isEditing, setIsEditing] = useState(false); // Indica se está editando (true) ou criando (false)
  const { toast } = useToast(); // Hook para exibir notificações

  // Efeito que executa quando o componente é montado
  useEffect(() => {
    loadUsers(); // Carrega a lista de usuários
  }, []);

  // Função para carregar todos os usuários do banco de dados
  const loadUsers = () => {
    setUsers(userService.getAll()); // Busca todos os usuários e atualiza o estado
  };

  // Função para gerar um ID único para novos usuários
  const generateUserId = () => {
    return Math.floor(10000 + Math.random() * 90000); // Gera número aleatório entre 10000 e 99999
  };

  // Função para abrir o diálogo de criação ou edição
  const handleOpenDialog = (user?: User) => {
    if (user) {
      // Se um usuário foi passado, está editando
      setCurrentUser(user); // Define o usuário atual
      setIsEditing(true); // Marca como modo de edição
    } else {
      // Se não passou usuário, está criando um novo
      setCurrentUser({
        name: '', // Nome vazio
        email: '', // Email vazio
        authType: 'email', // Tipo de autenticação padrão
        createdAt: new Date().toISOString(), // Data atual
        userId: generateUserId().toString() // ID gerado automaticamente
      });
      setIsEditing(false); // Marca como modo de criação
    }
    setIsDialogOpen(true); // Abre o diálogo
  };

  // Função para fechar o diálogo
  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Fecha o diálogo
    setCurrentUser({}); // Limpa o usuário atual
  };

  // Função para lidar com mudanças nos campos de input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Extrai nome e valor do campo
    setCurrentUser({ ...currentUser, [name]: value }); // Atualiza o campo específico
  };

  // Função para validar os dados do formulário
  const validateForm = () => {
    // Verifica se nome e email foram preenchidos
    if (!currentUser.name || !currentUser.email) {
      toast({
        title: "Erro de validação",
        description: "Nome e email são obrigatórios",
        variant: "destructive",
      });
      return false; // Retorna falso se inválido
    }
    
    // Verifica se o email tem formato válido
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(currentUser.email || '')) {
      toast({
        title: "Erro de validação",
        description: "Email inválido",
        variant: "destructive",
      });
      return false; // Retorna falso se email inválido
    }
    
    return true; // Retorna verdadeiro se tudo válido
  };

  // Função para salvar (criar ou atualizar) usuário
  const handleSave = () => {
    if (!validateForm()) return; // Sai da função se validação falhou
    
    if (isEditing && currentUser.id) {
      // Se está editando e tem ID, atualiza usuário existente
      userService.update(currentUser.id, currentUser);
      toast({
        title: "Usuário atualizado",
        description: "As informações do usuário foram atualizadas com sucesso",
      });
    } else {
      // Se não está editando, cria novo usuário
      userService.create(currentUser as Omit<User, 'id'>);
      toast({
        title: "Usuário criado",
        description: "Novo usuário foi criado com sucesso",
      });
    }
    
    handleCloseDialog(); // Fecha o diálogo
    loadUsers(); // Recarrega a lista de usuários
  };

  // Função para excluir um usuário
  const handleDelete = (id: string) => {
    // Confirma se o usuário realmente quer excluir
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      userService.remove(id); // Remove do banco de dados
      toast({
        title: "Usuário excluído",
        description: "O usuário foi removido com sucesso",
      });
      loadUsers(); // Recarrega a lista
    }
  };

  return (
    <div className="space-y-4">
      {/* Cabeçalho da seção com título e botão de novo usuário */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Gerenciamento de Usuários</h3>
        <Button onClick={() => handleOpenDialog()}>
          <Plus size={16} className="mr-2" />
          Novo Usuário
        </Button>
      </div>
      
      {/* Tabela com lista de usuários */}
      <div className="border rounded-md">
        <Table>
          {/* Cabeçalho da tabela */}
          <TableHeader>
            <TableRow>
              <TableHead>ID Usuário</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tipo de Auth</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          {/* Corpo da tabela */}
          <TableBody>
            {users.length > 0 ? (
              // Se há usuários, mapeia cada um para uma linha da tabela
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.userId || generateUserId()}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.authType}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    {/* Botões de ação para cada usuário */}
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleOpenDialog(user)}>
                        <Pencil size={16} />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(user.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Se não há usuários, exibe mensagem de lista vazia
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <UserIcon size={24} />
                    <p>Nenhum usuário cadastrado</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Diálogo para criar/editar usuário */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
            <DialogDescription>
              {!isEditing && 'Preencha os dados para criar um novo usuário'}
            </DialogDescription>
          </DialogHeader>
          {/* Formulário com campos do usuário */}
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              {/* Campo ID do usuário (somente leitura) */}
              <div className="grid gap-2">
                <Label htmlFor="userId">ID do Usuário</Label>
                <Input
                  id="userId"
                  name="userId"
                  value={currentUser.userId || generateUserId()}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              {/* Campo nome */}
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  value={currentUser.name || ''}
                  onChange={handleInputChange}
                />
              </div>
              {/* Campo email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={currentUser.email || ''}
                  onChange={handleInputChange}
                />
              </div>
              {/* Campo tipo de autenticação */}
              <div className="grid gap-2">
                <Label htmlFor="authType">Tipo de Autenticação</Label>
                <Input
                  id="authType"
                  name="authType"
                  value={currentUser.authType || 'email'}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          {/* Botões do diálogo */}
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
