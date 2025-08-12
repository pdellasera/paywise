import { createContext, useContext, useState, useEffect } from 'react';
import type {ReactNode} from 'react';;

// Tipos para el usuario
interface User {
  id: string;
  email: string;
  nombre: string;
  rol: string;
}

// Tipos para el contexto de autenticación
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props del provider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si hay un usuario guardado al cargar la aplicación
  useEffect(() => {
    const savedUser = localStorage.getItem('cobranza_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('cobranza_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Función de login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulación de autenticación
      if (email === 'admin@cobranza.com' && password === 'admin123') {
        const userData: User = {
          id: '1',
          email: 'admin@cobranza.com',
          nombre: 'Administrador',
          rol: 'admin'
        };
        
        setUser(userData);
        localStorage.setItem('cobranza_user', JSON.stringify(userData));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  // Función de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('cobranza_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto de autenticación
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}