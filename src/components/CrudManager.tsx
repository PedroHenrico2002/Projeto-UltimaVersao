
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

export const CrudManager: React.FC = () => {
  return (
    <div className="w-full my-6">
      <h2 className="text-xl font-semibold mb-4">Implementação CRUD</h2>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="addresses">Endereços</TabsTrigger>
          <TabsTrigger value="restaurants">Restaurantes</TabsTrigger>
          <TabsTrigger value="menuItems">Itens do Cardápio</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserCrud />
        </TabsContent>
        <TabsContent value="addresses">
          <AddressCrud />
        </TabsContent>
        <TabsContent value="restaurants">
          <RestaurantCrud />
        </TabsContent>
        <TabsContent value="menuItems">
          <MenuItemCrud />
        </TabsContent>
      </Tabs>
    </div>
  );
};
