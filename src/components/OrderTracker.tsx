
import React from 'react';
import { CheckCircle2, Clock, MapPin, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

type OrderStatus = 'preparing' | 'ready' | 'delivering' | 'delivered';

interface OrderTrackerProps {
  status: OrderStatus;
  estimatedDelivery: string;
  className?: string;
  simplified?: boolean;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  status,
  estimatedDelivery,
  className,
  simplified = false,
}) => {
  const steps = [
    { key: 'preparing', label: 'Preparando', icon: Clock },
    { key: 'ready', label: 'Pronto', icon: CheckCircle2 },
    { key: 'delivering', label: 'A caminho', icon: Truck },
    { key: 'delivered', label: 'Entregue', icon: CheckCircle2 },
  ];

  const getStepStatus = (step: string) => {
    const statusIndex = steps.findIndex(s => s.key === status);
    const stepIndex = steps.findIndex(s => s.key === step);
    
    if (stepIndex < statusIndex) return 'completed';
    if (stepIndex === statusIndex) return 'current';
    return 'upcoming';
  };

  if (simplified) {
    return (
      <div className={cn("w-full", className)}>
        <div className="mb-2">
          <p className="text-gray-600 text-sm mb-1">
            Previsão de entrega
          </p>
          <h3 className="text-base font-semibold">{estimatedDelivery}</h3>
        </div>
        
        <div className="w-full bg-green-100 h-2 rounded-full mb-4">
          <div 
            className="bg-green-500 h-2 rounded-full"
            style={{ width: status === 'preparing' ? '25%' : status === 'ready' ? '50%' : status === 'delivering' ? '75%' : '100%' }}
          ></div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-green-500 text-white rounded-full p-1">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <p className="text-sm font-medium">
              {status === 'preparing' && 'O pedido está sendo preparado e logo sairá pra entrega'}
              {status === 'ready' && 'Seu pedido está pronto e será enviado em breve'}
              {status === 'delivering' && 'Seu pedido está a caminho'}
              {status === 'delivered' && 'Seu pedido foi entregue'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full bg-card rounded-xl border border-border p-6", className)}>
      <div className="mb-6">
        <h3 className="text-lg font-medium">Acompanhando Seu Pedido</h3>
        <p className="text-sm text-muted-foreground">
          Previsão de entrega: {estimatedDelivery}
        </p>
      </div>
      
      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted z-0 transform -translate-x-1/2"></div>
        
        {/* Steps */}
        <div className="relative z-10 space-y-8">
          {steps.map((step, index) => {
            const stepStatus = getStepStatus(step.key);
            return (
              <div key={step.key} className="flex items-start">
                <div 
                  className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center relative z-10",
                    {
                      'bg-accent text-accent-foreground animate-pulse': stepStatus === 'current',
                      'bg-accent/20 text-accent': stepStatus === 'completed',
                      'bg-muted text-muted-foreground': stepStatus === 'upcoming',
                    }
                  )}
                >
                  <step.icon size={22} />
                </div>
                
                <div className="ml-4 flex-1">
                  <h4 
                    className={cn(
                      "font-medium text-base mb-1",
                      {
                        'text-accent': stepStatus === 'current',
                        'text-foreground': stepStatus === 'completed',
                        'text-muted-foreground': stepStatus === 'upcoming',
                      }
                    )}
                  >
                    {step.label}
                  </h4>
                  
                  <p 
                    className={cn(
                      "text-sm",
                      {
                        'text-muted-foreground': stepStatus === 'current' || stepStatus === 'completed',
                        'text-muted-foreground/70': stepStatus === 'upcoming',
                      }
                    )}
                  >
                    {stepStatus === 'current' && `Seu pedido está ${step.label.toLowerCase()}...`}
                    {stepStatus === 'completed' && `Seu pedido foi ${step.label.toLowerCase()}`}
                    {stepStatus === 'upcoming' && `Aguardando para ser ${step.label.toLowerCase()}`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
