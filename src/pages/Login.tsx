
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, ArrowRight, Facebook } from 'lucide-react';
import { toast } from '@/lib/toast';
import { Separator } from '@/components/ui/separator';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [hasRegisteredUsers, setHasRegisteredUsers] = useState(false);
  const [shouldReturnToConfirmOrder, setShouldReturnToConfirmOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there are any registered users in localStorage
    const registeredUsers = localStorage.getItem('registeredUsers');
    if (registeredUsers) {
      setHasRegisteredUsers(true);
    } else {
      // If no registered users, force to registration view
      setIsLogin(false);
    }
    
    // Check if we should return to confirm order page
    const returnToConfirmOrder = sessionStorage.getItem('returnToConfirmOrder');
    if (returnToConfirmOrder) {
      setShouldReturnToConfirmOrder(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simple validation
      if (!email || !password) {
        toast.error('Por favor, preencha todos os campos');
        return;
      }
      
      // Check if user exists in registered users
      const registeredUsers = localStorage.getItem('registeredUsers');
      if (registeredUsers) {
        const users = JSON.parse(registeredUsers);
        const user = users.find((u: any) => u.email === email);
        
        if (user) {
          // In a real app, we would validate password here
          localStorage.setItem('user', JSON.stringify(user));
          toast.success('Login realizado com sucesso!');
          
          // Clear return flag in session storage
          if (shouldReturnToConfirmOrder) {
            sessionStorage.removeItem('returnToConfirmOrder');
            navigate('/confirm-order');
          } else {
            navigate('/');
          }
        } else {
          toast.error('Usuário não encontrado. Por favor, cadastre-se primeiro.');
          setIsLogin(false);
        }
      } else {
        toast.error('Não há usuários cadastrados. Por favor, cadastre-se primeiro.');
        setIsLogin(false);
      }
    } else {
      // Registration
      // Simple validation
      if (!name || !email || !password) {
        toast.error('Por favor, preencha todos os campos');
        return;
      }
      
      // Create new user
      const newUser = {
        name,
        email,
      };
      
      // Save to registered users
      const registeredUsers = localStorage.getItem('registeredUsers');
      let users = [];
      if (registeredUsers) {
        users = JSON.parse(registeredUsers);
      }
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      
      // Also log the user in
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast.success('Cadastro realizado com sucesso! Você está conectado.');
      
      // Clear return flag in session storage
      if (shouldReturnToConfirmOrder) {
        sessionStorage.removeItem('returnToConfirmOrder');
        navigate('/confirm-order');
      } else {
        navigate('/');
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    // In a real implementation, this would redirect to the OAuth provider
    const newUser = {
      name: provider === 'google' ? 'Usuário Google' : 'Usuário Facebook',
      email: provider === 'google' ? 'usuario@gmail.com' : 'usuario@facebook.com',
      authProvider: provider
    };
    
    // Save to registered users if not exists
    const registeredUsers = localStorage.getItem('registeredUsers');
    let users = [];
    if (registeredUsers) {
      users = JSON.parse(registeredUsers);
      // Check if user already exists
      const existingUser = users.find((u: any) => u.email === newUser.email);
      if (!existingUser) {
        users.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(users));
      }
    } else {
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    }
    
    // Log the user in
    localStorage.setItem('user', JSON.stringify(newUser));
    
    toast.success(`Login com ${provider === 'google' ? 'Google' : 'Facebook'} realizado com sucesso!`);
    
    // Navigate based on return flag
    if (shouldReturnToConfirmOrder) {
      sessionStorage.removeItem('returnToConfirmOrder');
      navigate('/confirm-order');
    } else {
      navigate('/');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center">
        <div className="page-container">
          <div className="max-w-md mx-auto">
            {/* Form Card */}
            <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden animate-scale-in">
              <div className="p-8">
                <div className="text-center mb-8">
                  <h1 className="heading-md mb-2">{isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}</h1>
                  <p className="text-muted-foreground">
                    {isLogin 
                      ? 'Digite suas credenciais para acessar sua conta' 
                      : 'Preencha seus dados para começar'}
                  </p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    {!isLogin && (
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                            <User size={18} />
                          </div>
                          <Input 
                            id="name"
                            type="text"
                            placeholder="João da Silva"
                            className="pl-10"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                          <Mail size={18} />
                        </div>
                        <Input 
                          id="email"
                          type="email"
                          placeholder="nome@exemplo.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="password">Senha</Label>
                        {isLogin && (
                          <Link
                            to="/forgot-password"
                            className="text-sm text-accent hover:text-accent/80 transition-colors"
                          >
                            Esqueceu a senha?
                          </Link>
                        )}
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                          <Lock size={18} />
                        </div>
                        <Input 
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      {isLogin ? 'Entrar' : 'Criar Conta'}
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6">
                  <div className="flex items-center justify-center">
                    <Separator className="flex-grow" />
                    <span className="px-3 text-sm text-muted-foreground">ou continue com</span>
                    <Separator className="flex-grow" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSocialLogin('google')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="mr-2">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        <path d="M1 1h22v22H1z" fill="none"/>
                      </svg>
                      Google
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSocialLogin('facebook')}
                    >
                      <Facebook size={20} className="mr-2 text-blue-600" />
                      Facebook
                    </Button>
                  </div>
                </div>
                
                {hasRegisteredUsers && (
                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
                      <button
                        type="button"
                        className="ml-1 text-accent hover:text-accent/80 transition-colors font-medium"
                        onClick={() => setIsLogin(!isLogin)}
                      >
                        {isLogin ? 'Cadastre-se' : 'Entrar'}
                      </button>
                    </p>
                  </div>
                )}
              </div>
              
              <div className="p-6 bg-muted/30 border-t border-border">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Ao continuar, você concorda com nossos{' '}
                    <Link to="/terms" className="text-foreground/80 hover:text-foreground underline">
                      Termos de Serviço
                    </Link>{' '}
                    e{' '}
                    <Link to="/privacy" className="text-foreground/80 hover:text-foreground underline">
                      Política de Privacidade
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
