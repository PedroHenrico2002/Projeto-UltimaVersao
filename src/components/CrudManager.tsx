
import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { UserCrud } from './crud/UserCrud';
import { AddressCrud } from './crud/AddressCrud';
import { RestaurantCrud } from './crud/RestaurantCrud';
import { MenuItemCrud } from './crud/MenuItemCrud';
import { OrderCrud } from './crud/OrderCrud';

/**
 * Componente CrudManager
 * 
 * Responsável por gerenciar e exibir diferentes interfaces CRUD
 * usando um sistema de abas para navegação entre elas
 */
export const CrudManager: React.FC = () => {
  return (
    <div className="w-full my-6">
      {/* Título do componente */}
      <h2 className="text-xl font-semibold mb-4">Implementação CRUD</h2>
      
      {/* Sistema de abas para navegação entre diferentes CRUDs */}
      <Tabs defaultValue="users" className="w-full">
        {/* Lista de abas/guias */}
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="addresses">Endereços</TabsTrigger>
          <TabsTrigger value="restaurants">Restaurantes</TabsTrigger>
          <TabsTrigger value="menuItems">Itens do Cardápio</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
        </TabsList>
        
        {/* Conteúdo de cada aba */}
        {/* Aba de Usuários */}
        <TabsContent value="users">
          <UserCrud />
        </TabsContent>
        
        {/* Aba de Endereços */}
        <TabsContent value="addresses">
          <AddressCrud />
        </TabsContent>
        
        {/* Aba de Restaurantes */}
        <TabsContent value="restaurants">
          <RestaurantCrud />
        </TabsContent>
        
        {/* Aba de Itens do Cardápio */}
        <TabsContent value="menuItems">
          <MenuItemCrud />
        </TabsContent>
        
        {/* Aba de Pedidos */}
        <TabsContent value="orders">
          <OrderCrud />
        </TabsContent>
      </Tabs>
    </div>
  );
};
