import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  Receipt,
  Eye,
  ChevronRight,
  SlidersHorizontal,
  CreditCard,
  Clock,
  CheckCircle,
  X,
  User
} from 'lucide-react';
import { useState } from 'react';

export function Pagos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [showModal, setShowModal] = useState(false);
  const [pagosState, setPagosState] = useState([
    { 
      id: 1, 
      cliente: 'Juan Pérez', 
      monto: 50000, 
      fecha: '2024-01-15', 
      tipo: 'abono', 
      prestamo: 'P001',
      metodoPago: 'efectivo',
      hora: '10:30 AM',
      estado: 'confirmado'
    },
    { 
      id: 2, 
      cliente: 'María García', 
      monto: 750000, 
      fecha: '2024-01-14', 
      tipo: 'completo', 
      prestamo: 'P002',
      metodoPago: 'transferencia',
      hora: '02:15 PM',
      estado: 'confirmado'
    },
    { 
      id: 3, 
      cliente: 'Carlos López', 
      monto: 30000, 
      fecha: '2024-01-13', 
      tipo: 'abono', 
      prestamo: 'P003',
      metodoPago: 'efectivo',
      hora: '09:45 AM',
      estado: 'pendiente'
    },
    { 
      id: 4, 
      cliente: 'Ana Martínez', 
      monto: 100000, 
      fecha: '2024-01-12', 
      tipo: 'abono', 
      prestamo: 'P004',
      metodoPago: 'cheque',
      hora: '11:20 AM',
      estado: 'confirmado'
    },
    { 
      id: 5, 
      cliente: 'Luis Rodríguez', 
      monto: 450000, 
      fecha: '2024-01-11', 
      tipo: 'completo', 
      prestamo: 'P005',
      metodoPago: 'transferencia',
      hora: '04:30 PM',
      estado: 'confirmado'
    },
  ]);

  const [formData, setFormData] = useState({
    cliente: '',
    prestamo: '',
    monto: '',
    tipo: 'abono',
    metodoPago: 'efectivo',
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true }),
    estado: 'confirmado',
    observaciones: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nuevoPago = {
      id: Math.max(...pagosState.map(p => p.id)) + 1,
      ...formData,
      monto: parseFloat(formData.monto)
    };
    
    setPagosState([nuevoPago, ...pagosState]);
    setShowModal(false);
    setFormData({
      cliente: '',
      prestamo: '',
      monto: '',
      tipo: 'abono',
      metodoPago: 'efectivo',
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true }),
      estado: 'confirmado',
      observaciones: ''
    });
  };

  const filteredPagos = pagosState.filter(pago => {
    const matchesSearch = pago.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pago.prestamo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'todos' || pago.tipo === selectedFilter;
    const matchesDate = selectedDate === '' || pago.fecha === selectedDate;
    return matchesSearch && matchesFilter && matchesDate;
  });

  const getTipoConfig = (tipo: string) => {
    switch (tipo) {
      case 'completo':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          color: 'text-emerald-700',
          label: 'Pago Completo',
          icon: CheckCircle
        };
      case 'abono':
        return {
          bg: 'bg-sky-50',
          border: 'border-sky-200',
          color: 'text-sky-700',
          label: 'Abono',
          icon: CreditCard
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          color: 'text-gray-700',
          label: 'Desconocido',
          icon: DollarSign
        };
    }
  };

  const getEstadoConfig = (estado: string) => {
    switch (estado) {
      case 'confirmado':
        return {
          bg: 'bg-emerald-50',
          color: 'text-emerald-700',
          label: 'Confirmado'
        };
      case 'pendiente':
        return {
          bg: 'bg-amber-50',
          color: 'text-amber-700',
          label: 'Pendiente'
        };
      default:
        return {
          bg: 'bg-gray-50',
          color: 'text-gray-700',
          label: 'Desconocido'
        };
    }
  };

  const totalHoy = pagosState
    .filter(p => p.fecha === selectedDate)
    .reduce((sum, p) => sum + p.monto, 0);
  
  const pagosHoy = pagosState.filter(p => p.fecha === selectedDate).length;
  const promedioHoy = pagosHoy > 0 ? Math.round(totalHoy / pagosHoy) : 0;
  const totalGeneral = pagosState.reduce((sum, p) => sum + p.monto, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Pagos</h1>
              <p className="text-sm text-gray-600">Registra y gestiona pagos</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Búsqueda */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar pagos..."
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
              {filteredPagos.length} de {pagosState.length}
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
              {/* Filtros por tipo */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">Tipo de Pago</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'todos', label: 'Todos' },
                    { key: 'completo', label: 'Completos' },
                    { key: 'abono', label: 'Abonos' }
                  ].map((filter) => (
                    <motion.button
                      key={filter.key}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedFilter(filter.key)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        selectedFilter === filter.key
                          ? 'bg-orange-100 text-orange-700 border border-orange-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Filtro por fecha */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">Fecha</p>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats del Día */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Hoy</p>
                <p className="text-lg font-bold text-gray-900">${totalHoy.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Pagos Hoy</p>
                <p className="text-lg font-bold text-gray-900">{pagosHoy}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Promedio</p>
                <p className="text-lg font-bold text-gray-900">${promedioHoy.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Total General</p>
                <p className="text-lg font-bold text-gray-900">${totalGeneral.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Receipt className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Pagos */}
      <div className="px-4">
        {filteredPagos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pagos</h3>
            <p className="text-gray-500 text-sm mb-6">No se encontraron pagos con los filtros aplicados</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredPagos.map((pago, index) => {
              const tipoConfig = getTipoConfig(pago.tipo);
              const estadoConfig = getEstadoConfig(pago.estado);
              const IconComponent = tipoConfig.icon;
              
              return (
                <motion.div
                  key={pago.id}
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
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-sm">
                            {pago.cliente.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{pago.cliente}</h3>
                          <p className="text-xs text-gray-500">Préstamo: {pago.prestamo}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>

                    {/* Información del Pago */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Monto</p>
                        <p className="text-lg font-bold text-gray-900">${pago.monto.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Fecha y Hora</p>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <p className="text-xs text-gray-700">{new Date(pago.fecha).toLocaleDateString()}</p>
                        </div>
                        <p className="text-xs text-gray-500">{pago.hora}</p>
                      </div>
                    </div>

                    {/* Método de Pago */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 font-medium mb-1">Método de Pago</p>
                      <p className="text-sm text-gray-700 capitalize">{pago.metodoPago}</p>
                    </div>

                    {/* Tipo, Estado y Acciones */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${tipoConfig.bg} ${tipoConfig.border} border`}>
                          <IconComponent className={`h-4 w-4 ${tipoConfig.color}`} />
                          <span className={`text-xs font-semibold ${tipoConfig.color}`}>
                            {tipoConfig.label}
                          </span>
                        </div>
                        
                        <div className={`px-2 py-1 rounded-full ${estadoConfig.bg}`}>
                          <span className={`text-xs font-medium ${estadoConfig.color}`}>
                            {estadoConfig.label}
                          </span>
                        </div>
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
                          <Receipt className="h-4 w-4 text-emerald-600" />
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

      {/* Modal para Nuevo Pago */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
              className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del Modal */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Nuevo Pago</h2>
                    <p className="text-sm text-gray-600">Registra un nuevo pago</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(false)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </motion.button>
                </div>
              </div>

              {/* Formulario */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Información del Cliente */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Información del Pago</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cliente *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.cliente}
                          onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="Nombre del cliente"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Préstamo *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.prestamo}
                          onChange={(e) => setFormData({...formData, prestamo: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="ID del préstamo"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Monto *
                        </label>
                        <input
                          type="number"
                          required
                          min="0"
                          step="1000"
                          value={formData.monto}
                          onChange={(e) => setFormData({...formData, monto: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="Monto del pago"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Pago *
                        </label>
                        <select
                          required
                          value={formData.tipo}
                          onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="abono">Abono</option>
                          <option value="completo">Pago Completo</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Método de Pago *
                        </label>
                        <select
                          required
                          value={formData.metodoPago}
                          onChange={(e) => setFormData({...formData, metodoPago: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="efectivo">Efectivo</option>
                          <option value="transferencia">Transferencia</option>
                          <option value="cheque">Cheque</option>
                          <option value="tarjeta">Tarjeta</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estado *
                        </label>
                        <select
                          required
                          value={formData.estado}
                          onChange={(e) => setFormData({...formData, estado: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="confirmado">Confirmado</option>
                          <option value="pendiente">Pendiente</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fecha *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.fecha}
                          onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hora *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.hora}
                          onChange={(e) => setFormData({...formData, hora: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="10:30 AM"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observaciones
                      </label>
                      <textarea
                        value={formData.observaciones}
                        onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Observaciones adicionales..."
                      />
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex space-x-3 pt-4">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg"
                    >
                      Registrar Pago
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 h-14 w-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg flex items-center justify-center z-20 hover:shadow-xl transition-all duration-200"
      >
        <Plus className="h-6 w-6 text-white" />
      </motion.button>
    </div>
  );
}