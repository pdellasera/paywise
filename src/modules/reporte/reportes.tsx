import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download, 
  Calendar,
  Users,
  CreditCard,
  DollarSign,
  FileText,
  Search,
  ChevronRight,
  SlidersHorizontal,
  Eye,
  Share,
  RefreshCw
} from 'lucide-react';
import { useState } from 'react';

export function Reportes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedPeriod, setSelectedPeriod] = useState('mes');

  const reportes = [
    {
      id: 1,
      title: 'Reporte de Clientes',
      description: 'Análisis completo de la cartera de clientes',
      icon: Users,
      color: 'from-sky-400 to-sky-600',
      category: 'clientes',
      lastGenerated: '2024-01-15',
      status: 'actualizado',
      size: '2.3 MB'
    },
    {
      id: 2,
      title: 'Reporte de Préstamos',
      description: 'Estado y rendimiento de préstamos',
      icon: CreditCard,
      color: 'from-emerald-400 to-emerald-600',
      category: 'prestamos',
      lastGenerated: '2024-01-14',
      status: 'actualizado',
      size: '1.8 MB'
    },
    {
      id: 3,
      title: 'Reporte Financiero',
      description: 'Ingresos, gastos y rentabilidad',
      icon: DollarSign,
      color: 'from-purple-400 to-purple-600',
      category: 'financiero',
      lastGenerated: '2024-01-13',
      status: 'pendiente',
      size: '3.1 MB'
    },
    {
      id: 4,
      title: 'Reporte de Vencimientos',
      description: 'Préstamos próximos a vencer',
      icon: Calendar,
      color: 'from-red-400 to-red-600',
      category: 'vencimientos',
      lastGenerated: '2024-01-15',
      status: 'actualizado',
      size: '1.2 MB'
    },
    {
      id: 5,
      title: 'Reporte de Pagos',
      description: 'Historial y análisis de pagos recibidos',
      icon: BarChart3,
      color: 'from-amber-400 to-amber-600',
      category: 'pagos',
      lastGenerated: '2024-01-12',
      status: 'actualizado',
      size: '2.7 MB'
    },
    {
      id: 6,
      title: 'Reporte de Morosidad',
      description: 'Análisis de clientes morosos y recuperación',
      icon: TrendingUp,
      color: 'from-orange-400 to-orange-600',
      category: 'morosidad',
      lastGenerated: '2024-01-11',
      status: 'pendiente',
      size: '1.9 MB'
    }
  ];

  const filteredReportes = reportes.filter(reporte => {
    const matchesSearch = reporte.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reporte.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || reporte.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'actualizado':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          color: 'text-emerald-700',
          label: 'Actualizado'
        };
      case 'pendiente':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          color: 'text-amber-700',
          label: 'Pendiente'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          color: 'text-gray-700',
          label: 'Desconocido'
        };
    }
  };

  const totalReportes = reportes.length;
  const reportesActualizados = reportes.filter(r => r.status === 'actualizado').length;
  const reportesPendientes = reportes.filter(r => r.status === 'pendiente').length;
  const eficiencia = Math.round((reportesActualizados / totalReportes) * 100);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Reportes</h1>
              <p className="text-sm text-gray-600">Análisis y estadísticas</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Búsqueda */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar reportes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Filtros y Stats */}
          <div className="flex items-center justify-between">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filtros</span>
            </motion.button>
            
            <div className="text-xs text-gray-500">
              {filteredReportes.length} de {totalReportes}
            </div>
          </div>
        </div>
      </div>

      {/* Filtros Expandibles */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-b border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Filtros por categoría */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">Categoría</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'todos', label: 'Todos' },
                    { key: 'clientes', label: 'Clientes' },
                    { key: 'prestamos', label: 'Préstamos' },
                    { key: 'financiero', label: 'Financiero' },
                    { key: 'pagos', label: 'Pagos' }
                  ].map((filter) => (
                    <motion.button
                      key={filter.key}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(filter.key)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        selectedCategory === filter.key
                          ? 'bg-orange-100 text-orange-700 border border-orange-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Filtro por período */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">Período</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'semana', label: 'Esta Semana' },
                    { key: 'mes', label: 'Este Mes' },
                    { key: 'trimestre', label: 'Trimestre' }
                  ].map((period) => (
                    <motion.button
                      key={period.key}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedPeriod(period.key)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        selectedPeriod === period.key
                          ? 'bg-sky-100 text-sky-700 border border-sky-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {period.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Rápidas */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Reportes</p>
                <p className="text-lg font-bold text-gray-900">{totalReportes}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Actualizados</p>
                <p className="text-lg font-bold text-gray-900">{reportesActualizados}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Eficiencia</p>
                <p className="text-lg font-bold text-gray-900">{eficiencia}%</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <PieChart className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Pendientes</p>
                <p className="text-lg font-bold text-gray-900">{reportesPendientes}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Reportes */}
      <div className="px-4">
        {filteredReportes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay reportes</h3>
            <p className="text-gray-500 text-sm mb-6">No se encontraron reportes con los filtros aplicados</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredReportes.map((reporte, index) => {
              const statusConfig = getStatusConfig(reporte.status);
              const IconComponent = reporte.icon;
              
              return (
                <motion.div
                  key={reporte.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${reporte.color} flex items-center justify-center shadow-sm`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{reporte.title}</h3>
                          <p className="text-xs text-gray-500">{reporte.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>

                    {/* Información del Reporte */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Última Generación</p>
                        <p className="text-sm font-medium text-gray-700">
                          {new Date(reporte.lastGenerated).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Tamaño</p>
                        <p className="text-sm font-medium text-gray-700">{reporte.size}</p>
                      </div>
                    </div>

                    {/* Estado y Acciones */}
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.border} border`}>
                        <div className={`h-2 w-2 rounded-full ${statusConfig.color.replace('text-', 'bg-')}`}></div>
                        <span className={`text-xs font-semibold ${statusConfig.color}`}>
                          {statusConfig.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 transition-colors"
                        >
                          <Eye className="h-4 w-4 text-sky-600" />
                        </motion.button>
                        
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
                        >
                          <Download className="h-4 w-4 text-emerald-600" />
                        </motion.button>
                        
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
                        >
                          <Share className="h-4 w-4 text-purple-600" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Gráfico de Tendencias */}
      <div className="px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Tendencia de Reportes</h3>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <RefreshCw className="h-4 w-4 text-orange-600" />
            </motion.button>
          </div>
          
          <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <p className="text-gray-600 font-medium mb-1">Gráfico de Tendencias</p>
              <p className="text-xs text-gray-500">Visualización de datos en tiempo real</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 h-14 w-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg flex items-center justify-center z-20 hover:shadow-xl transition-all duration-200"
      >
        <Download className="h-6 w-6 text-white" />
      </motion.button>
    </div>
  );
}