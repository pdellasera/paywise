import { motion } from 'framer-motion';
import { Smartphone, Monitor, Tablet, AlertTriangle } from 'lucide-react';

interface DeviceBlockerProps {
  reason: string;
  deviceInfo: {
    isDesktop: boolean;
    isTablet: boolean;
    screenWidth: number;
    screenHeight: number;
  };
}

export function DeviceBlocker({ reason, deviceInfo }: DeviceBlockerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        {/* Icono de advertencia */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center"
        >
          <AlertTriangle className="h-10 w-10 text-orange-600" />
        </motion.div>

        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <img 
            src="/paywise.png" 
            alt="PayWise Logo" 
            className="h-12 w-12 object-contain"
          />
          <h1 className="text-2xl font-bold text-gray-900">PayWise</h1>
        </div>

        {/* Título */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Dispositivo No Compatible
        </h2>

        {/* Mensaje */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {reason}
        </p>

        {/* Iconos de dispositivos */}
        <div className="flex justify-center items-center space-x-6 mb-6">
          <div className="flex flex-col items-center">
            <div className={`p-3 rounded-full ${
              deviceInfo.isDesktop 
                ? 'bg-red-100 text-red-600' 
                : 'bg-gray-100 text-gray-400'
            }`}>
              <Monitor className="h-6 w-6" />
            </div>
            <span className="text-xs text-gray-500 mt-1">Desktop</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`p-3 rounded-full ${
              deviceInfo.isTablet 
                ? 'bg-orange-100 text-orange-600' 
                : 'bg-gray-100 text-gray-400'
            }`}>
              <Tablet className="h-6 w-6" />
            </div>
            <span className="text-xs text-gray-500 mt-1">Tablet</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Smartphone className="h-6 w-6" />
            </div>
            <span className="text-xs text-green-600 mt-1 font-medium">Móvil ✓</span>
          </div>
        </div>

        {/* Información del dispositivo */}
        <div className="bg-gray-50 rounded-lg p-4 text-left">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Información del dispositivo:</h3>
          <div className="space-y-1 text-xs text-gray-600">
            <p><span className="font-medium">Resolución:</span> {deviceInfo.screenWidth} x {deviceInfo.screenHeight}</p>
            <p><span className="font-medium">Tipo detectado:</span> {
              deviceInfo.isDesktop ? 'Desktop' : 
              deviceInfo.isTablet ? 'Tablet' : 'Móvil'
            }</p>
          </div>
        </div>

        {/* Instrucciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200"
        >
          <p className="text-sm text-orange-800">
            <span className="font-medium">💡 Consejo:</span> Abre este enlace en tu teléfono móvil para acceder al sistema.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}