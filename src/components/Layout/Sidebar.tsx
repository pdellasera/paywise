import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  CreditCard, 
  DollarSign, 
  BarChart3, 
  Settings,
  X 
} from 'lucide-react';
import { navigationItems } from '@/routers/routeConfig';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap = {
  Home,
  Users,
  CreditCard,
  DollarSign,
  BarChart3,
  Settings,
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <motion.div
        initial={{ x: -256 }}
        animate={{ x: isOpen ? 0 : -256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-gray-800 lg:hidden shadow-2xl"
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            {/* Header con botón cerrar */}
            <div className="flex items-center justify-between px-4 mb-2">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mr-3 shadow-lg">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <h1 className="text-xl font-bold text-white">CobranzaApp</h1>
              </div>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navegación */}
            <nav className="mt-8 flex-1 space-y-2 px-3">
              {navigationItems.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }: { isActive: boolean }) =>
                      `group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                      }`
                    }
                  >
                    <Icon className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                      'group-hover:text-orange-300'
                    }`} />
                    {item.name}
                    {item.badge && (
                      <span className="ml-auto bg-orange-500 text-white text-xs rounded-full px-2 py-1 shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Footer del sidebar móvil */}
            <div className="px-4 py-3 border-t border-gray-700">
              <div className="flex items-center text-xs text-gray-400">
                <div className="h-2 w-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
                Sistema activo
              </div>
            </div>
          </div>
        </div>
      </motion.div>
  );
}