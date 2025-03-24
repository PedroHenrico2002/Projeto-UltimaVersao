
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CreditCard, DollarSign, Truck } from "lucide-react";
import { toast } from "@/lib/toast";

export type PaymentMethod = 'credit' | 'debit' | 'meal' | 'cash';

interface PaymentMethodsProps {
  onSelectPayment: (method: PaymentMethod, cardDetails?: CardDetails | null) => void;
  selectedMethod?: PaymentMethod;
}

export interface CardDetails {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({ 
  onSelectPayment, 
  selectedMethod = 'credit' 
}) => {
  const [showCardForm, setShowCardForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(selectedMethod);
  const [savedCards, setSavedCards] = useState<CardDetails[]>(() => {
    const cards = localStorage.getItem('savedCards');
    return cards ? JSON.parse(cards) : [];
  });
  
  const form = useForm<CardDetails>({
    defaultValues: {
      number: '',
      name: '',
      expiry: '',
      cvv: ''
    }
  });
  
  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setPaymentMethod(value);
    setShowCardForm(value !== 'cash' && savedCards.length === 0);
    
    if (value === 'cash') {
      onSelectPayment(value, null);
    } else if (savedCards.length > 0) {
      onSelectPayment(value, savedCards[0]);
    }
  };
  
  const handleSaveCard = (data: CardDetails) => {
    // Format card number to show only last 4 digits for display
    const formattedCard = {
      ...data,
      number: data.number.slice(-4).padStart(data.number.length, '*')
    };
    
    const newSavedCards = [...savedCards, formattedCard];
    localStorage.setItem('savedCards', JSON.stringify(newSavedCards));
    setSavedCards(newSavedCards);
    setShowCardForm(false);
    onSelectPayment(paymentMethod, formattedCard);
    toast.success('Cartão salvo com sucesso!');
  };
  
  const handleUseExistingCard = (card: CardDetails) => {
    onSelectPayment(paymentMethod, card);
    setShowCardForm(false);
  };
  
  return (
    <div className="space-y-6">
      <RadioGroup 
        defaultValue={paymentMethod}
        onValueChange={(value) => handlePaymentMethodChange(value as PaymentMethod)}
        className="grid grid-cols-2 gap-4 mb-6"
      >
        <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-accent">
          <RadioGroupItem value="credit" id="credit" />
          <Label htmlFor="credit" className="flex items-center cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Cartão de Crédito</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-accent">
          <RadioGroupItem value="debit" id="debit" />
          <Label htmlFor="debit" className="flex items-center cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Cartão de Débito</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-accent">
          <RadioGroupItem value="meal" id="meal" />
          <Label htmlFor="meal" className="flex items-center cursor-pointer">
            <DollarSign className="mr-2 h-4 w-4" />
            <span>Vale Refeição</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-accent">
          <RadioGroupItem value="cash" id="cash" />
          <Label htmlFor="cash" className="flex items-center cursor-pointer">
            <Truck className="mr-2 h-4 w-4" />
            <span>Pagar na Entrega</span>
          </Label>
        </div>
      </RadioGroup>
      
      {paymentMethod !== 'cash' && (
        <div className="mt-4">
          {savedCards.length > 0 && !showCardForm && (
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Cartões salvos</h3>
              {savedCards.map((card, index) => (
                <div 
                  key={index} 
                  className="border rounded-lg p-4 cursor-pointer hover:border-accent"
                  onClick={() => handleUseExistingCard(card)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span className="font-medium">{card.number}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{card.expiry}</span>
                  </div>
                  <div className="text-sm mt-1">{card.name}</div>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowCardForm(true)} 
                className="mt-2"
              >
                Adicionar novo cartão
              </Button>
            </div>
          )}
          
          {showCardForm && (
            <div className="border rounded-lg p-4 mt-4">
              <h3 className="font-medium mb-4">Adicionar cartão</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSaveCard)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número do cartão</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="1234 5678 9012 3456" 
                            {...field} 
                            maxLength={19}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome no cartão</FormLabel>
                        <FormControl>
                          <Input placeholder="NOME COMO ESTÁ NO CARTÃO" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Validade</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/AA" {...field} maxLength={5} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} maxLength={3} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowCardForm(false)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">Salvar cartão</Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
