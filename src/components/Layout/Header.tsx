import { Menu, Bell, User, LogOut, Download } from 'lucide-react';
import { useAuth } from '@/helpers';
import { usePWAContext } from '@/components/PWAProvider';
import { motion } from 'framer-motion';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const { showInstallModal, isInstallable, isInstalled } = usePWAContext();

  return (
    
    <header className="bg-orange-600 shadow-lg border-b border-orange-700">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Botón menú móvil */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-white hover:text-orange-100 hover:bg-orange-700 transition-colors duration-200"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo PayWise para móvil */}
          <div className="lg:hidden flex items-center space-x-2">
            <img 
              src="/paywise.png" 
              alt="PayWise Logo" 
              className="h-50 w-50 object-contain"
            />
          </div>

          {/* Logo PayWise para desktop (oculto en móvil) */}
          <div className="hidden lg:flex items-center space-x-3">
            <img 
              src="/paywise.png" 
              alt="PayWise Logo" 
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-2xl font-bold text-white drop-shadow-sm">PayWise</h1>
          </div>

          {/* Acciones del usuario */}
          <div className="flex items-center space-x-4">
            {/* Botón de instalación PWA */}
            {isInstallable && !isInstalled && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={showInstallModal}
                className="p-2 text-white hover:text-orange-100 hover:bg-orange-700 rounded-lg transition-colors duration-200 relative"
                title="Instalar App"
              >
                <Download className="h-5 w-5" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white" />
              </motion.button>
            )}

            {/* Notificaciones */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-white hover:text-orange-100 hover:bg-orange-700 rounded-lg transition-colors duration-200 relative"
            >
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </motion.button>

            {/* Perfil de usuario */}
            <div className="relative flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-sky-500 flex items-center justify-center ring-2 ring-white">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white drop-shadow-sm">
                    {user?.nombre}
                  </p>
                  <p className="text-xs text-orange-100 capitalize">
                    {user?.rol}
                  </p>
                </div>
              </div>

              {/* Botón logout */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="p-2 text-white hover:text-red-300 hover:bg-orange-700 rounded-lg transition-colors duration-200"
                title="Cerrar sesión"
              >
                <LogOut className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}