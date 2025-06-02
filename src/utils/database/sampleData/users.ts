
/**
 * Dados de exemplo para usuários do sistema
 * 
 * Este arquivo contém usuários pré-definidos que serão carregados
 * automaticamente quando o sistema inicializar pela primeira vez
 */
import { User } from '../types'; // Importa a interface User para garantir tipagem correta

// Função para gerar IDs únicos de exemplo (evita dependência circular)
const gerarIdExemplo = (): string => {
  // Gera uma string aleatória combinando duas sequências
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Função para gerar um ID público do usuário (número de 5 dígitos)
const gerarIdPublico = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

// Array com usuários de exemplo para popular o banco de dados
export const sampleUsers: User[] = [
  {
    id: gerarIdExemplo(), // ID interno único do banco de dados
    userId: gerarIdPublico(), // ID público visível para outros usuários
    name: 'Administrador', // Nome completo do usuário
    email: 'admin@belegendary.com', // Email único no sistema
    authType: 'email', // Tipo de autenticação utilizada
    createdAt: new Date().toISOString() // Data de criação no formato ISO
  },
  {
    id: gerarIdExemplo(),
    userId: gerarIdPublico(),
    name: 'Maria Silva',
    email: 'maria@example.com',
    authType: 'email',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 dias atrás
  },
  {
    id: gerarIdExemplo(),
    userId: gerarIdPublico(),
    name: 'João Santos',
    email: 'joao@example.com',
    authType: 'google', // Autenticação via Google
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 dias atrás
  },
  {
    id: gerarIdExemplo(),
    userId: gerarIdPublico(),
    name: 'Ana Oliveira',
    email: 'ana@example.com',
    authType: 'facebook', // Autenticação via Facebook
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() // 15 dias atrás
  }
];
