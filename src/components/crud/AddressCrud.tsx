
import React, { useState, useEffect } from 'react';
import { addressService, userService, Address, User } from '@/utils/databaseService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export const AddressCrud: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Partial<Address>>({});
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAddresses();
    setUsers(userService.getAll());
  }, []);

  const loadAddresses = () => {
    setAddresses(addressService.getAll());
  };

  const handleOpenDialog = (address?: Address) => {
    if (address) {
      setCurrentAddress(address);
      setIsEditing(true);
    } else {
      setCurrentAddress({
        userId: users.length > 0 ? users[0].id : '',
        street: '',
        number: '',
        city: '',
        isDefault: false
      });
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentAddress({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentAddress({ ...currentAddress, [name]: value });
  };

  const handleUserChange = (value: string) => {
    setCurrentAddress({ ...currentAddress, userId: value });
  };

  const handleDefaultChange = (checked: boolean) => {
    setCurrentAddress({ ...currentAddress, isDefault: checked });
  };

  const validateForm = () => {
    if (!currentAddress.userId || !currentAddress.street || !currentAddress.number || !currentAddress.city) {
      toast({
        title: "Erro de validação",
        description: "Todos os campos são obrigatórios, exceto complemento",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    if (isEditing && currentAddress.id) {
      addressService.update(currentAddress.id, currentAddress);
      toast({
        title: "Endereço atualizado",
        description: "O endereço foi atualizado com sucesso",
      });
    } else {
      addressService.create(currentAddress as Omit<Address, 'id'>);
      toast({
        title: "Endereço criado",
        description: "Novo endereço foi criado com sucesso",
      });
    }
    
    handleCloseDialog();
    loadAddresses();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este endereço?')) {
      addressService.remove(id);
      toast({
        title: "Endereço excluído",
        description: "O endereço foi removido com sucesso",
      });
      loadAddresses();
    }
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Usuário não encontrado';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Gerenciamento de Endereços</h3>
        <Button onClick={() => handleOpenDialog()}>
          <Plus size={16} className="mr-2" />
          Novo Endereço
        </Button>
      </div>
      
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
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <TableRow key={address.id}>
                  <TableCell>{getUserName(address.userId)}</TableCell>
                  <TableCell>{address.street}</TableCell>
                  <TableCell>{address.number}</TableCell>
                  <TableCell>{address.city}</TableCell>
                  <TableCell>{address.isDefault ? 'Sim' : 'Não'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleOpenDialog(address)}>
                        <Pencil size={16} />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(address.id)}>
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
                    <MapPin size={24} />
                    <p>Nenhum endereço cadastrado</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Endereço' : 'Novo Endereço'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="userId">Usuário</Label>
                <Select 
                  onValueChange={handleUserChange} 
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
              <div className="grid gap-2">
                <Label htmlFor="street">Rua</Label>
                <Input
                  id="street"
                  name="street"
                  value={currentAddress.street || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  name="number"
                  value={currentAddress.number || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  name="complement"
                  value={currentAddress.complement || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  name="city"
                  value={currentAddress.city || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isDefault" 
                  checked={currentAddress.isDefault} 
                  onCheckedChange={handleDefaultChange} 
                />
                <Label htmlFor="isDefault">Endereço padrão</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
