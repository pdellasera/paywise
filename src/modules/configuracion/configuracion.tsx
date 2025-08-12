import  { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Shield, 
  Database,
  Settings,
  Save,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '@/helpers';

export function Configuracion() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const configuraciones = [
    {
      id: 2,
      title: 'Notificaciones',
      description: 'Configura alertas, recordatorios y preferencias de comunicación',
      icon: Bell,
      color: 'from-amber-400 to-amber-600',
      category: 'notificaciones',
      priority: 'alta'
    },
    {
      id: 3,
      title: 'Seguridad',
      description: 'Contraseña, autenticación y configuración de seguridad',
      icon: Shield,
      color: 'from-red-400 to-red-600',
      category: 'seguridad',
      priority: 'alta'
    },
    {
      id: 5,
      title: 'Datos y Backup',
      description: 'Respaldo, exportación y gestión de datos del sistema',
      icon: Database,
      color: 'from-emerald-400 to-emerald-600',
      category: 'datos',
      priority: 'media'
    },
    {
      id: 6,
      title: 'Sistema',
      description: 'Configuración general, idioma y preferencias del sistema',
      icon: Settings,
      color: 'from-sky-400 to-sky-600',
      category: 'sistema',
      priority: 'baja'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Simplificado */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
              <p className="text-gray-600">Personaliza tu experiencia en CobranzaApp</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md"
            >
              <Save className="h-6 w-6 text-white" />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* User Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Mi Perfil</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
              >
                <Edit3 className="h-5 w-5 text-gray-600" />
              </motion.button>
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl">
                  {user?.nombre?.split(' ').map(n => n[0]).join('') || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{user?.nombre || 'Usuario'}</h3>
                <p className="text-gray-500 capitalize">Rol: {user?.rol || 'Admin'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <p className="text-gray-600">{user?.email || 'usuario@cobranzaapp.com'}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <p className="text-gray-600">Ciudad, País</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6"
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Configuración Rápida</h3>
            
            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Notificaciones Email</p>
                    <p className="text-sm text-gray-500">Alertas de vencimientos</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    emailNotifications ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </motion.button>
              </div>

              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <Bell className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Notificaciones Push</p>
                    <p className="text-sm text-gray-500">Alertas en tiempo real</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    pushNotifications ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </motion.button>
              </div>

              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                    {darkMode ? <Moon className="h-6 w-6 text-white" /> : <Sun className="h-6 w-6 text-white" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Modo Oscuro</p>
                    <p className="text-sm text-gray-500">Tema de la aplicación</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    darkMode ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Configuration Cards */}
        <div className="space-y-4">
          {configuraciones.map((config, index) => {
            const IconComponent = config.icon;
            
            return (
              <motion.div
                key={config.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-sm`}>
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{config.title}</h3>
                        <p className="text-gray-500 mt-1 leading-relaxed">{config.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 h-14 w-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg flex items-center justify-center z-20"
      >
        <Save className="h-6 w-6 text-white" />
      </motion.button>
    </div>
  );
}