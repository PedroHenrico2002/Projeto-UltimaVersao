
import React from 'react';

export const SystemArchitecture: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-md">
      <h2 className="text-xl font-bold mb-4">Arquitetura do Sistema</h2>
      
      <div className="overflow-x-auto">
        <svg width="700" height="600" viewBox="0 0 700 600" className="mx-auto">
          {/* Background Layers */}
          <rect x="50" y="20" width="600" height="120" fill="#f0f9ff" stroke="#93c5fd" strokeWidth="1" rx="8" />
          <text x="350" y="45" textAnchor="middle" className="text-sm font-semibold fill-blue-600">Frontend (Cliente)</text>
          
          <rect x="50" y="160" width="600" height="120" fill="#f0f9ff" stroke="#93c5fd" strokeWidth="1" rx="8" />
          <text x="350" y="185" textAnchor="middle" className="text-sm font-semibold fill-blue-600">Autenticação</text>
          
          <rect x="50" y="300" width="600" height="120" fill="#f0f9ff" stroke="#93c5fd" strokeWidth="1" rx="8" />
          <text x="350" y="325" textAnchor="middle" className="text-sm font-semibold fill-blue-600">Armazenamento de Dados</text>
          
          <rect x="50" y="440" width="600" height="120" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" rx="8" />
          <text x="350" y="465" textAnchor="middle" className="text-sm font-semibold fill-green-600">Camada de API e Serviços</text>
          
          {/* Frontend Components */}
          <rect x="80" y="60" width="120" height="60" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" rx="6" />
          <text x="140" y="85" textAnchor="middle" className="text-xs font-medium">React + Vite</text>
          <text x="140" y="105" textAnchor="middle" className="text-xs">Interface do Usuário</text>
          
          <rect x="220" y="60" width="120" height="60" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" rx="6" />
          <text x="280" y="85" textAnchor="middle" className="text-xs font-medium">Tailwind CSS</text>
          <text x="280" y="105" textAnchor="middle" className="text-xs">Estilização</text>
          
          <rect x="360" y="60" width="120" height="60" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" rx="6" />
          <text x="420" y="85" textAnchor="middle" className="text-xs font-medium">React Router</text>
          <text x="420" y="105" textAnchor="middle" className="text-xs">Navegação</text>
          
          <rect x="500" y="60" width="120" height="60" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" rx="6" />
          <text x="560" y="85" textAnchor="middle" className="text-xs font-medium">Tanstack Query</text>
          <text x="560" y="105" textAnchor="middle" className="text-xs">Gerenciamento de Estado</text>
          
          {/* Authentication Layer */}
          <rect x="150" y="200" width="120" height="60" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" rx="6" />
          <text x="210" y="225" textAnchor="middle" className="text-xs font-medium">Auth Local</text>
          <text x="210" y="245" textAnchor="middle" className="text-xs">Email/Senha</text>
          
          <rect x="290" y="200" width="120" height="60" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" rx="6" />
          <text x="350" y="225" textAnchor="middle" className="text-xs font-medium">Google Auth</text>
          <text x="350" y="245" textAnchor="middle" className="text-xs">Login com Google</text>
          
          <rect x="430" y="200" width="120" height="60" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" rx="6" />
          <text x="490" y="225" textAnchor="middle" className="text-xs font-medium">Facebook Auth</text>
          <text x="490" y="245" textAnchor="middle" className="text-xs">Login com Facebook</text>
          
          {/* Data Storage */}
          <rect x="150" y="340" width="160" height="60" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" rx="6" />
          <text x="230" y="365" textAnchor="middle" className="text-xs font-medium">Local Storage</text>
          <text x="230" y="385" textAnchor="middle" className="text-xs">Dados do Cliente</text>
          
          <rect x="390" y="340" width="160" height="60" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" rx="6" />
          <text x="470" y="365" textAnchor="middle" className="text-xs font-medium">Banco de Dados</text>
          <text x="470" y="385" textAnchor="middle" className="text-xs">Dados do Servidor</text>
          
          {/* API Layer */}
          <rect x="120" y="480" width="140" height="60" fill="#ffffff" stroke="#16a34a" strokeWidth="2" rx="6" />
          <text x="190" y="505" textAnchor="middle" className="text-xs font-medium">API de Autenticação</text>
          <text x="190" y="525" textAnchor="middle" className="text-xs">Gerenciamento de Usuários</text>
          
          <rect x="280" y="480" width="140" height="60" fill="#ffffff" stroke="#16a34a" strokeWidth="2" rx="6" />
          <text x="350" y="505" textAnchor="middle" className="text-xs font-medium">API de Pedidos</text>
          <text x="350" y="525" textAnchor="middle" className="text-xs">Gestão de Pedidos</text>
          
          <rect x="440" y="480" width="140" height="60" fill="#ffffff" stroke="#16a34a" strokeWidth="2" rx="6" />
          <text x="510" y="505" textAnchor="middle" className="text-xs font-medium">API de Restaurantes</text>
          <text x="510" y="525" textAnchor="middle" className="text-xs">Catálogo e Cardápios</text>
          
          {/* Connecting Lines */}
          {/* Frontend to Auth */}
          <line x1="350" y1="120" x2="350" y2="160" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,5" />
          
          {/* Auth to Storage */}
          <line x1="350" y1="280" x2="350" y2="300" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,5" />
          
          {/* Storage to API */}
          <line x1="350" y1="420" x2="350" y2="440" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,5" />
        </svg>
      </div>
    </div>
  );
};
