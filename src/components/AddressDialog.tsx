
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Plus, Check, Trash2 } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Address {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  isDefault: boolean;
}

interface AddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddressChange: (address: string) => void;
}

export const AddressDialog: React.FC<AddressDialogProps> = ({
  open,
  onOpenChange,
  onAddressChange
}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  
  const form = useForm({
    defaultValues: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: 'São Paulo',
      state: 'SP'
    }
  });

  useEffect(() => {
    // Get saved addresses from localStorage
    const storedAddresses = localStorage.getItem('savedAddresses');
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses));
    } else {
      // Initialize with default address if none exists
      const defaultAddress = {
        id: '1',
        street: 'Rua Augusta',
        number: '1500',
        neighborhood: 'Consolação',
        city: 'São Paulo',
        state: 'SP',
        isDefault: true
      };
      setAddresses([defaultAddress]);
      localStorage.setItem('savedAddresses', JSON.stringify([defaultAddress]));
    }
  }, []);

  const onSubmit = (data: any) => {
    const newAddress: Address = {
      id: Date.now().toString(),
      street: data.street,
      number: data.number,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      isDefault: true
    };
    
    // Set all other addresses as non-default
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: false
    }));
    
    // Add new address and set as default
    const newAddresses = [...updatedAddresses, newAddress];
    setAddresses(newAddresses);
    
    // Save to localStorage
    localStorage.setItem('savedAddresses', JSON.stringify(newAddresses));
    
    // Update address in parent component
    const formattedAddress = `${newAddress.street}, ${newAddress.number} - ${newAddress.neighborhood}, ${newAddress.city}`;
    onAddressChange(formattedAddress);
    
    // Reset form and close form view
    form.reset();
    setShowForm(false);
    toast.success('Endereço salvo com sucesso!');
  };

  const handleSetDefault = (id: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    
    setAddresses(updatedAddresses);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    
    const defaultAddress = updatedAddresses.find(addr => addr.isDefault);
    if (defaultAddress) {
      const formattedAddress = `${defaultAddress.street}, ${defaultAddress.number} - ${defaultAddress.neighborhood}, ${defaultAddress.city}`;
      onAddressChange(formattedAddress);
      toast.success('Endereço padrão atualizado!');
    }
  };

  const handleDeleteAddress = (id: string) => {
    // Check if it's the last address
    if (addresses.length <= 1) {
      toast.error('Não é possível excluir o único endereço existente');
      return;
    }

    // Check if trying to delete the default address
    const isDefault = addresses.find(addr => addr.id === id)?.isDefault;
    
    // Remove the address
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    
    // If the deleted address was default, set a new default
    if (isDefault) {
      updatedAddresses[0].isDefault = true;
      
      // Update address in parent component
      const defaultAddress = updatedAddresses[0];
      const formattedAddress = `${defaultAddress.street}, ${defaultAddress.number} - ${defaultAddress.neighborhood}, ${defaultAddress.city}`;
      onAddressChange(formattedAddress);
    }
    
    setAddresses(updatedAddresses);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    toast.success('Endereço excluído com sucesso!');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Meus endereços</DialogTitle>
          <DialogDescription>
            Selecione seu endereço de entrega ou cadastre um novo.
          </DialogDescription>
        </DialogHeader>
        
        {!showForm ? (
          <div className="space-y-4">
            <div className="max-h-64 overflow-y-auto space-y-2">
              {addresses.map((address) => (
                <div 
                  key={address.id} 
                  className={`p-3 border rounded-md flex items-start justify-between ${address.isDefault ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                >
                  <div className="flex items-start space-x-2">
                    <MapPin className="text-red-500 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm font-medium">
                        {address.street}, {address.number}
                        {address.complement && ` - ${address.complement}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {address.neighborhood}, {address.city} - {address.state}
                      </p>
                      {address.isDefault && (
                        <span className="text-xs text-red-600 flex items-center mt-1">
                          <Check size={12} className="mr-1" />
                          Endereço principal
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {!address.isDefault && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs mr-1"
                        onClick={() => handleSetDefault(address.id)}
                      >
                        Definir como principal
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 h-8 w-8"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center"
              onClick={() => setShowForm(true)}
            >
              <Plus size={18} className="mr-2" />
              Adicionar novo endereço
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Rua</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da rua" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="complement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Apto, bloco, referência" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Bairro" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Cidade" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="UF" maxLength={2} {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Salvar endereço
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
