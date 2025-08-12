import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Zap, Shield, Wifi } from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: () => Promise<void>;
}

export function PWAInstallModal({ isOpen, onClose, onInstall }: PWAInstallModalProps) {
  const handleInstall = async () => {
    try {
      await onInstall();
      onClose();
    } catch (error) {
      console.error('Error durante la instalación:', error);
    }
  };

  const features = [
    {
      icon: Smartphone,
      title: 'Acceso Rápido',
      description: 'Accede desde tu pantalla de inicio como una app nativa'
    },
    {
      icon: Zap,
      title: 'Más Rápido',
      description: 'Carga instantánea y mejor rendimiento'
    },
    {
      icon: Shield,
      title: 'Más Seguro',
      description: 'Funciona de forma segura y confiable'
    },
    {
      icon: Wifi,
      title: 'Funciona Sin Internet',
      description: 'Acceso básico incluso sin conexión'
    }
  ];

  return (
    
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="relative p-6 pb-4">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>

                {/* Logo y título */}
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <img 
                      src="/paywise.png" 
                      alt="PayWise Logo" 
                      className="h-12 w-12 object-contain"
                    />
                    <h2 className="text-2xl font-bold text-gray-900">PayWise</h2>
                  </div>
                  <p className="text-gray-600">¡Instala la app en tu dispositivo!</p>
                </div>

                {/* Icono de descarga animado */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex justify-center mb-4"
                >
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                </motion.div>
              </div>

              {/* Características */}
              <div className="px-6 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  ¿Por qué instalar PayWise?
                </h3>
                
                <div className="space-y-3">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-3 rounded-lg bg-orange-50 border border-orange-100"
                      >
                        <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Botones */}
              <div className="p-6 pt-4 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleInstall}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Instalar Ahora</span>
                </motion.button>
                
                <button
                  onClick={onClose}
                  className="w-full text-gray-600 font-medium py-2 px-6 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  Tal vez más tarde
                </button>
              </div>

              {/* Instrucciones adicionales */}
              <div className="px-6 pb-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-blue-800">
                    <span className="font-medium">💡 Tip:</span> También puedes instalar desde el menú de tu navegador (⋮) → "Instalar app" o "Añadir a pantalla de inicio"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}