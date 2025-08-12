import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);  // ✅ Activa el loading
    setError('');

    try {
      // Simulación de autenticación
      if (email === 'admin@cobranza.com' && password === 'admin123') {
        const userData = {
          id: '1',
          email: 'admin@cobranza.com',
          nombre: 'Administrador',
          rol: 'admin'
        };

        localStorage.setItem('cobranza_user', JSON.stringify(userData));
        window.location.href = "/home"
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error durante el login');
    } finally {
      setIsLoading(false);  // ✅ Desactiva el loading
    }
  };

  // Función para llenar automáticamente las credenciales de prueba
  const fillTestCredentials = () => {
    setEmail('admin@cobranza.com');
    setPassword('admin123');
    setError(''); // Limpiar cualquier error previo
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sistema de Cobranza
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inicia sesión en tu cuenta
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}  // ✅ Deshabilita el botón durante loading
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}  {/* ✅ Muestra texto de loading */}
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">Credenciales de prueba:</p>
            <div className="bg-gray-100 p-3 rounded-md">
              <button
                type="button"
                onClick={fillTestCredentials}
                className="w-full text-left hover:bg-gray-200 p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <p className="font-medium text-blue-600">👆 Click aquí para usar credenciales de prueba</p>
                <p className="text-xs mt-1">Email: admin@cobranza.com</p>
                <p className="text-xs">Contraseña: admin123</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}