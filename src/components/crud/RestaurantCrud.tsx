
import React, { useState, useEffect } from 'react';
import { restaurantService, categoryService, addressService, Restaurant, Category, Address } from '@/utils/databaseService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, Store, MapPin, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const RestaurantCrud: React.FC = () => {
  // Estados para gerenciar dados e interface
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]); // Lista de restaurantes
  const [categories, setCategories] = useState<Category[]>([]); // Lista de categorias
  const [addresses, setAddresses] = useState<Address[]>([]); // Lista de endereços
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controla se o dialog está aberto
  const [currentRestaurant, setCurrentRestaurant] = useState<Partial<Restaurant>>({}); // Restaurante sendo editado
  const [isEditing, setIsEditing] = useState(false); // Indica se está editando ou criando
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false); // Dialog de endereço
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null); // ID do restaurante selecionado
  const { toast } = useToast(); // Hook para exibir notificações

  // Carrega dados quando componente é montado
  useEffect(() => {
    loadRestaurants(); // Carrega lista de restaurantes
    setCategories(categoryService.getAll()); // Carrega categorias
    loadAddresses(); // Carrega endereços
  }, []);

  // Função para carregar restaurantes do banco
  const loadRestaurants = () => {
    setRestaurants(restaurantService.getAll());
  };

  // Função para carregar endereços de restaurantes
  const loadAddresses = () => {
    setAddresses(addressService.getAll().filter(a => a.isRestaurantAddress));
  };

  // Função para abrir dialog de edição/criação
  const handleOpenDialog = (restaurant?: Restaurant) => {
    if (restaurant) {
      // Modo edição - preenche dados do restaurante
      setCurrentRestaurant(restaurant);
      setIsEditing(true);
    } else {
      // Modo criação - valores padrão
      setCurrentRestaurant({
        name: '',
        categoryId: categories.length > 0 ? categories[0].id : '',
        cuisine: '',
        deliveryTime: '',
        minOrder: 0, // Corrigido para number
        deliveryFee: 0, // Adicionado campo obrigatório
        rating: 0,
        isOpen: true // Adicionado campo obrigatório
      });
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  // Função para fechar dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentRestaurant({});
  };

  // Função para tratar mudanças nos campos de texto
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentRestaurant({ ...currentRestaurant, [name]: value });
  };

  // Função para tratar mudanças nos campos numéricos
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentRestaurant({ ...currentRestaurant, [name]: parseFloat(value) || 0 });
  };

  // Função para selecionar categoria
  const handleCategoryChange = (value: string) => {
    setCurrentRestaurant({ ...currentRestaurant, categoryId: value });
  };

  // Função para selecionar endereço
  const handleAddressChange = (value: string) => {
    setCurrentRestaurant({ ...currentRestaurant, addressId: value });
  };

  // Função para abrir dialog de endereço
  const handleOpenAddressDialog = (restaurantId: string) => {
    setSelectedRestaurantId(restaurantId);
    setIsAddressDialogOpen(true);
  };

  // Função para validar formulário
  const validateForm = () => {
    if (!currentRestaurant.name || !currentRestaurant.categoryId) {
      toast({
        title: "Erro de validação",
        description: "Nome e categoria são obrigatórios",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  // Função para salvar restaurante
  const handleSave = () => {
    if (!validateForm()) return;
    
    if (isEditing && currentRestaurant.id) {
      // Atualiza restaurante existente
      restaurantService.update(currentRestaurant.id, currentRestaurant);
      toast({
        title: "Restaurante atualizado",
        description: "As informações do restaurante foram atualizadas com sucesso",
      });
    } else {
      // Cria novo restaurante
      restaurantService.create(currentRestaurant as Omit<Restaurant, 'id'>);
      toast({
        title: "Restaurante criado",
        description: "Novo restaurante foi criado com sucesso",
      });
    }
    
    handleCloseDialog();
    loadRestaurants();
  };

  // Função para excluir restaurante
  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este restaurante?')) {
      restaurantService.remove(id);
      toast({
        title: "Restaurante excluído",
        description: "O restaurante foi removido com sucesso",
      });
      loadRestaurants();
    }
  };

  // Função para obter nome da categoria
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? `${category.icon || ''} ${category.name}` : 'Categoria não encontrada';
  };

  // Função para obter informações do endereço
  const getAddressInfo = (restaurantId: string) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (!restaurant || !restaurant.addressId) return 'Sem endereço';
    
    const address = addresses.find(a => a.id === restaurant.addressId);
    if (!address) return 'Endereço não encontrado';
    
    return `${address.street}, ${address.number}, ${address.city}`;
  };

  return (
    <div className="space-y-4">
      {/* Cabeçalho com título e botão de criar */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Gerenciamento de Restaurantes</h3>
        <Button onClick={() => handleOpenDialog()}>
          <Plus size={16} className="mr-2" />
          Novo Restaurante
        </Button>
      </div>
      
      {/* Tabela de restaurantes */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Cozinha</TableHead>
              <TableHead>Tempo de Entrega</TableHead>
              <TableHead>Pedido Mínimo</TableHead>
              <TableHead>Avaliação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <TableRow key={restaurant.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{restaurant.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {restaurant.addressId ? (
                          <Badge variant="outline" className="mt-1 flex items-center gap-1">
                            <MapPin size={12} />
                            {getAddressInfo(restaurant.id)}
                          </Badge>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-2 text-xs mt-1"
                            onClick={() => handleOpenAddressDialog(restaurant.id)}
                          >
                            <MapPin size={12} className="mr-1" />
                            Adicionar endereço
                          </Button>
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryName(restaurant.categoryId)}</TableCell>
                  <TableCell>{restaurant.cuisine || '-'}</TableCell>
                  <TableCell>{restaurant.deliveryTime || '-'}</TableCell>
                  <TableCell>R$ {restaurant.minOrder?.toFixed(2) || '-'}</TableCell>
                  <TableCell>{restaurant.rating ? `${restaurant.rating}/5` : '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleOpenDialog(restaurant)}>
                        <Pencil size={16} />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(restaurant.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Store size={24} />
                    <p>Nenhum restaurante cadastrado</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog de edição/criação */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Restaurante' : 'Novo Restaurante'}</DialogTitle>
            <DialogDescription>
              Preencha os detalhes do restaurante
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              {/* Campo nome */}
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  value={currentRestaurant.name || ''}
                  onChange={handleInputChange}
                />
              </div>
              {/* Campo categoria */}
              <div className="grid gap-2">
                <Label htmlFor="categoryId">Categoria</Label>
                <Select 
                  onValueChange={handleCategoryChange} 
                  defaultValue={currentRestaurant.categoryId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Campo endereço */}
              {addresses.length > 0 && (
                <div className="grid gap-2">
                  <Label htmlFor="addressId">Endereço</Label>
                  <Select 
                    onValueChange={handleAddressChange} 
                    defaultValue={currentRestaurant.addressId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um endereço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Sem endereço</SelectItem>
                      {addresses.map(address => (
                        <SelectItem key={address.id} value={address.id}>
                          {address.street}, {address.number}, {address.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {/* Outros campos do formulário */}
              <div className="grid gap-2">
                <Label htmlFor="cuisine">Tipo de Cozinha</Label>
                <Input
                  id="cuisine"
                  name="cuisine"
                  value={currentRestaurant.cuisine || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deliveryTime">Tempo de Entrega</Label>
                <Input
                  id="deliveryTime"
                  name="deliveryTime"
                  value={currentRestaurant.deliveryTime || ''}
                  onChange={handleInputChange}
                  placeholder="30-45 min"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="minOrder">Pedido Mínimo (R$)</Label>
                <Input
                  id="minOrder"
                  name="minOrder"
                  type="number"
                  step="0.01"
                  min="0"
                  value={currentRestaurant.minOrder || ''}
                  onChange={handleNumberChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deliveryFee">Taxa de Entrega (R$)</Label>
                <Input
                  id="deliveryFee"
                  name="deliveryFee"
                  type="number"
                  step="0.01"
                  min="0"
                  value={currentRestaurant.deliveryFee || ''}
                  onChange={handleNumberChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imageUrl">URL da Imagem</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={currentRestaurant.imageUrl || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rating">Avaliação (0-5)</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={currentRestaurant.rating || ''}
                  onChange={handleNumberChange}
                />
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
