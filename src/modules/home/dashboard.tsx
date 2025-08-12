import { motion } from 'framer-motion';
import {
  Users,
  CreditCard,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Calendar
} from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      name: 'Total Clientes',
      value: '248',
      icon: Users,
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Préstamos Activos',
      value: '156',
      icon: CreditCard,
      change: '+8%',
      changeType: 'positive',
    },
    {
      name: 'Monto Total',
      value: '$2,450,000',
      icon: DollarSign,
      change: '+15%',
      changeType: 'positive',
    },
    {
      name: 'Préstamos Vencidos',
      value: '23',
      icon: AlertTriangle,
      change: '-5%',
      changeType: 'negative',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Resumen general de tu sistema de cobranza</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="p-3 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0">
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                </div>
                <div className="sm:ml-4 text-center sm:text-left flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate mb-1">
                      {stat.name}
                    </dt>
                    <dd className="flex flex-col sm:flex-row sm:items-baseline justify-center sm:justify-start">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-0">
                        {stat.value}
                      </div>
                      <div className={`sm:ml-2 flex items-center justify-center sm:justify-start text-xs sm:text-sm font-semibold px-2 py-1 rounded-full ${stat.changeType === 'positive'
                          ? 'text-emerald-700 bg-emerald-50'
                          : 'text-red-700 bg-red-50'
                        }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contenido adicional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximos vencimientos */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white shadow-sm rounded-lg p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Próximos Vencimientos</h3>
            <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between py-3 px-3 rounded-lg bg-amber-50 border-l-4 border-amber-400">
                <div>
                  <p className="text-sm font-medium text-gray-900">Cliente {item}</p>
                  <p className="text-xs text-amber-700">Vence en {item} días</p>
                </div>
                <span className="text-sm font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                  ${(item * 50000).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actividad reciente */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white shadow-sm rounded-lg p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Actividad Reciente</h3>
            <div className="h-8 w-8 rounded-lg bg-sky-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-sky-600" />
            </div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-3 py-3 px-3 rounded-lg bg-emerald-50 border-l-4 border-emerald-400">
                <div className="h-3 w-3 bg-emerald-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Pago recibido de Cliente {item}</p>
                  <p className="text-xs text-emerald-700">Hace {item} horas</p>
                </div>
                <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}