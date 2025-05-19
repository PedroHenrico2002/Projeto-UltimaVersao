
import React, { useState, useEffect } from 'react';
import { orderService } from '@/utils/database/orderService';
import { OrderDetails } from '@/types/order';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Eye, ShoppingBag, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import OrderStatusIcon, { getStatusText } from '@/components/order/OrderStatusIcon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const OrderCrud: React.FC = () => {
  // Estado para armazenar a lista de pedidos
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  
  // Estado para controlar a visibilidade dos diálogos
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  // Estado para armazenar o pedido atual sendo editado ou visualizado
  const [currentOrder, setCurrentOrder] = useState<OrderDetails | null>(null);
  
  // Estado para controlar se estamos no modo de edição
  const [isEditing, setIsEditing] = useState(false);
  
  // Hook do sistema de toasts para notificações
  const { toast } = useToast();

  // Efeito que carrega os pedidos quando o componente é montado
  useEffect(() => {
    loadOrders();
  }, []);

  // Função para carregar os pedidos do serviço
  const loadOrders = () => {
    setOrders(orderService.getAll());
  };

  // Manipulador para abrir o diálogo de edição ou criação
  const handleOpenDialog = (order?: OrderDetails) => {
    if (order) {
      setCurrentOrder(order);
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  // Manipulador para abrir o diálogo de visualização de detalhes
  const handleViewOrder = (order: OrderDetails) => {
    setCurrentOrder(order);
    setIsViewDialogOpen(true);
  };

  // Manipulador para fechar o diálogo de edição
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentOrder(null);
  };

  // Manipulador para fechar o diálogo de visualização
  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
    setCurrentOrder(null);
  };

  // Manipulador para alterar o status do pedido
  const handleStatusChange = (value: string) => {
    if (currentOrder) {
      setCurrentOrder({
        ...currentOrder,
        status: value as OrderDetails['status']
      });
    }
  };

  // Manipulador para alterar a avaliação do pedido
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentOrder) {
      setCurrentOrder({
        ...currentOrder,
        rating: Number(e.target.value)
      });
    }
  };

  // Manipulador para salvar as alterações de um pedido
  const handleSave = () => {
    if (!currentOrder) return;
    
    if (isEditing) {
      orderService.update(currentOrder.orderNumber, currentOrder);
      toast({
        title: "Pedido atualizado",
        description: `Pedido ${currentOrder.orderNumber} foi atualizado com sucesso.`,
      });
    }
    
    handleCloseDialog();
    loadOrders();
  };

  // Manipulador para excluir um pedido
  const handleDelete = (orderNumber: string) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      orderService.remove(orderNumber);
      toast({
        title: "Pedido excluído",
        description: "O pedido foi removido com sucesso.",
      });
      loadOrders();
    }
  };

  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Função para obter a variante do Badge com base no status do pedido
  const getStatusBadgeVariant = (status: OrderDetails['status']): "default" | "destructive" | "secondary" | "outline" => {
    // Corrigido para usar apenas as variantes suportadas pelo componente Badge
    switch (status) {
      case 'preparing':
        return 'default'; // Anteriormente era 'warning', mudado para 'default'
      case 'ready':
        return 'secondary';
      case 'delivering':
        return 'default';
      case 'delivered':
        return 'outline'; // Anteriormente era 'success', mudado para 'outline'
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-4">
      {/* Cabeçalho do componente */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Gerenciamento de Pedidos</h3>
      </div>
      
      {/* Tabela de pedidos */}
      <div className="border rounded-md">
        <Table>
          {/* Cabeçalho da tabela */}
          <TableHeader>
            <TableRow>
              <TableHead>Nº Pedido</TableHead>
              <TableHead>Restaurante</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Avaliação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          {/* Corpo da tabela */}
          <TableBody>
            {orders.length > 0 ? (
              // Mapeamento dos pedidos para linhas da tabela
              orders.map((order) => (
                <TableRow key={order.orderNumber}>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{order.restaurantName}</TableCell>
                  <TableCell>{new Date(order.orderTime).toLocaleString('pt-BR')}</TableCell>
                  <TableCell>
                    {/* Badge para indicar o status do pedido */}
                    <Badge variant={getStatusBadgeVariant(order.status)} className="flex items-center gap-1 w-fit">
                      <OrderStatusIcon status={order.status} />
                      <span>{getStatusText(order.status)}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(order.totalValue)}</TableCell>
                  <TableCell>
                    {order.rating ? `${order.rating}/5 ⭐` : 'Sem avaliação'}
                  </TableCell>
                  <TableCell className="text-right">
                    {/* Botões de ação para cada pedido */}
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleViewOrder(order)} title="Ver detalhes">
                        <Eye size={16} />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleOpenDialog(order)} title="Editar">
                        <Pencil size={16} />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(order.orderNumber)} title="Excluir">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Exibido quando não há pedidos
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ShoppingBag size={24} />
                    <p>Nenhum pedido encontrado</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Diálogo para edição de pedido */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Editar Pedido {currentOrder?.orderNumber}</DialogTitle>
            <DialogDescription>
              Atualize as informações do pedido
            </DialogDescription>
          </DialogHeader>
          {/* Formulário de edição */}
          {currentOrder && (
            <div className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Campo para alterar o status do pedido */}
                  <div className="space-y-2">
                    <Label>Status do Pedido</Label>
                    <Select 
                      onValueChange={handleStatusChange} 
                      defaultValue={currentOrder.status}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="preparing">Preparando</SelectItem>
                        <SelectItem value="ready">Pronto</SelectItem>
                        <SelectItem value="delivering">Em entrega</SelectItem>
                        <SelectItem value="delivered">Entregue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Campo para alterar a avaliação do pedido */}
                  <div className="space-y-2">
                    <Label htmlFor="rating">Avaliação (0-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={currentOrder.rating || ''}
                      onChange={handleRatingChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Botões de ação do diálogo */}
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para visualização de pedido */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div>
              <DialogTitle>Detalhes do Pedido #{currentOrder?.orderNumber}</DialogTitle>
              <DialogDescription>
                {currentOrder && new Date(currentOrder.orderTime).toLocaleString('pt-BR')}
              </DialogDescription>
            </div>
            {/* Badge indicador de status */}
            <Badge variant={currentOrder ? getStatusBadgeVariant(currentOrder.status) : 'outline'} className="ml-auto flex items-center gap-1">
              {currentOrder && (
                <>
                  <OrderStatusIcon status={currentOrder.status} />
                  <span>{currentOrder && getStatusText(currentOrder.status)}</span>
                </>
              )}
            </Badge>
          </DialogHeader>
          
          {/* Detalhes do pedido */}
          {currentOrder && (
            <div className="space-y-6">
              {/* Informações do restaurante */}
              <div>
                <h3 className="text-lg font-medium">{currentOrder.restaurantName}</h3>
                <p className="text-sm text-muted-foreground">{currentOrder.address}</p>
              </div>
              
              {/* Acordeão com seções de informações */}
              <Accordion type="single" collapsible defaultValue="items">
                {/* Seção de itens do pedido */}
                <AccordionItem value="items">
                  <AccordionTrigger>Itens do Pedido</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {/* Lista de itens do pedido */}
                      {currentOrder.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center">
                              <span className="text-muted-foreground mr-2">{item.quantity}x</span>
                              <span>{item.name}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p>{formatCurrency(item.priceValue * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                      <Separator />
                      {/* Total do pedido */}
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>{formatCurrency(currentOrder.totalValue)}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Seção de informações de entrega */}
                <AccordionItem value="delivery">
                  <AccordionTrigger>Informações de Entrega</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Endereço:</span>
                        <span>{currentOrder.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Previsão:</span>
                        <span>{currentOrder.estimatedDelivery}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Seção de informações de pagamento */}
                <AccordionItem value="payment">
                  <AccordionTrigger>Informações de Pagamento</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Método:</span>
                        <span>{currentOrder.paymentMethod}</span>
                      </div>
                      {currentOrder.paymentDetails && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cartão:</span>
                          <span>**** **** **** {currentOrder.paymentDetails.number.slice(-4)}</span>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              {/* Avaliação do pedido, se existir */}
              {currentOrder.rating !== undefined && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Avaliação:</span>
                  <span className="font-medium">{currentOrder.rating}/5 ⭐</span>
                </div>
              )}
            </div>
          )}
          
          {/* Botão para fechar o diálogo */}
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseViewDialog}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

