import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, AlertCircle, CheckCircle, Clock, ChevronRight, Eye, CreditCard, Calendar, DollarSign, X, Save, User, Percent } from 'lucide-react';

export function Prestamos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cliente: '',
    monto: '',
    plazo: '',
    tasaInteres: '',
    fechaInicio: '',
    garantia: '',
    observaciones: ''
  });

  // Convertir prestamos en estado para poder agregar nuevos
  const [prestamos, setPrestamos] = useState([
    { id: 1, cliente: 'Juan Pérez', monto: 500000, estado: 'activo', vencimiento: '2024-02-15', telefono: '+57 300 123 4567' },
    { id: 2, cliente: 'María García', monto: 750000, estado: 'vencido', vencimiento: '2024-01-20', telefono: '+57 301 234 5678' },
    { id: 3, cliente: 'Carlos López', monto: 300000, estado: 'activo', vencimiento: '2024-03-10', telefono: '+57 302 345 6789' },
    { id: 4, cliente: 'Ana Martínez', monto: 1000000, estado: 'pagado', vencimiento: '2024-01-30', telefono: '+57 303 456 7890' },
    { id: 5, cliente: 'Luis Rodríguez', monto: 450000, estado: 'activo', vencimiento: '2024-02-25', telefono: '+57 304 567 8901' },
  ]);

  const getEstadoConfig = (estado: string) => {
    switch (estado) {
      case 'activo':
        return {
          icon: Clock,
          color: 'text-sky-600',
          bg: 'bg-sky-50',
          border: 'border-sky-200',
          label: 'Activo'
        };
      case 'vencido':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          label: 'Vencido'
        };
      case 'pagado':
        return {
          icon: CheckCircle,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          label: 'Pagado'
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          label: 'Desconocido'
        };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calcular fecha de vencimiento basada en el plazo
    const fechaInicio = new Date(formData.fechaInicio);
    const fechaVencimiento = new Date(fechaInicio);
    fechaVencimiento.setMonth(fechaVencimiento.getMonth() + parseInt(formData.plazo));
    
    // Crear nuevo préstamo
    const nuevoPrestamo = {
      id: Math.max(...prestamos.map(p => p.id)) + 1,
      cliente: formData.cliente,
      monto: parseInt(formData.monto),
      estado: 'activo',
      vencimiento: fechaVencimiento.toISOString().split('T')[0],
      telefono: '+57 300 000 0000' // Placeholder
    };
    
    // Agregar el nuevo préstamo al INICIO de la lista
    setPrestamos(prevPrestamos => [nuevoPrestamo, ...prevPrestamos]);
    
    // Limpiar formulario y cerrar modal
    setShowModal(false);
    setFormData({
      cliente: '',
      monto: '',
      plazo: '',
      tasaInteres: '',
      fechaInicio: '',
      garantia: '',
      observaciones: ''
    });
  };

  const filteredPrestamos = prestamos.filter(prestamo => {
    const matchesSearch = prestamo.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'todos' || prestamo.estado === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    activos: prestamos.filter(p => p.estado === 'activo').length,
    vencidos: prestamos.filter(p => p.estado === 'vencido').length,
    pagados: prestamos.filter(p => p.estado === 'pagado').length,
    total: prestamos.reduce((sum, p) => sum + p.monto, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Mobile-First */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Préstamos</h1>
              <p className="text-sm text-gray-600 mt-1">Gestiona tu cartera</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filtros</span>
            </motion.button>
            <span className="text-sm text-gray-500">{filteredPrestamos.length} préstamos</span>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mt-4"
              >
                <div className="flex flex-wrap gap-2">
                  {['todos', 'activo', 'vencido', 'pagado'].map((filter) => (
                    <motion.button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedFilter === filter
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {filter === 'todos' ? 'Todos' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stats Cards - Mobile Optimized */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Activos</p>
                <p className="text-lg font-bold text-gray-900">{stats.activos}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Vencidos</p>
                <p className="text-lg font-bold text-gray-900">{stats.vencidos}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Pagados</p>
                <p className="text-lg font-bold text-gray-900">{stats.pagados}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Total</p>
                <p className="text-sm font-bold text-gray-900">${(stats.total / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Préstamos List - Card Style Mobile */}
        <div className="space-y-3">
          {filteredPrestamos.map((prestamo, index) => {
            const estadoConfig = getEstadoConfig(prestamo.estado);
            const IconComponent = estadoConfig.icon;
            
            return (
              <motion.div
                key={prestamo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
              >
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-sm">
                          {prestamo.cliente.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{prestamo.cliente}</h3>
                        <p className="text-xs text-gray-500">ID: {prestamo.id}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>

                  {/* Content */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Monto</p>
                      <p className="text-lg font-bold text-gray-900">${prestamo.monto.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Vencimiento</p>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <p className="text-sm text-gray-700">{new Date(prestamo.vencimiento).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${estadoConfig.bg} ${estadoConfig.border} border`}>
                      <IconComponent className={`h-4 w-4 ${estadoConfig.color}`} />
                      <span className={`text-xs font-semibold ${estadoConfig.color}`}>
                        {estadoConfig.label}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </motion.button>
                      {prestamo.estado === 'activo' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                        >
                          <CreditCard className="h-4 w-4" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPrestamos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron préstamos</h3>
            <p className="text-gray-500 text-sm">Intenta ajustar los filtros de búsqueda</p>
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-20"
      >
        <Plus className="h-6 w-6" />
      </motion.button>

      {/* Modal para Nuevo Préstamo */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-4"
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
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Nuevo Préstamo</h2>
                  <p className="text-sm text-gray-600">Completa la información del préstamo</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </motion.button>
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
                      <h3 className="text-lg font-semibold text-gray-900">Información del Cliente</h3>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Cliente *</label>
                      <input
                        type="text"
                        name="cliente"
                        value={formData.cliente}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Nombre completo del cliente"
                      />
                    </div>
                  </div>

                  {/* Información del Préstamo */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Detalles del Préstamo</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Monto *</label>
                        <input
                          type="number"
                          name="monto"
                          value={formData.monto}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="500000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Plazo (meses) *</label>
                        <input
                          type="number"
                          name="plazo"
                          value={formData.plazo}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="12"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tasa de Interés (%) *</label>
                        <div className="relative">
                          <input
                            type="number"
                            name="tasaInteres"
                            value={formData.tasaInteres}
                            onChange={handleInputChange}
                            required
                            step="0.1"
                            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            placeholder="15.5"
                          />
                          <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Inicio *</label>
                        <input
                          type="date"
                          name="fechaInicio"
                          value={formData.fechaInicio}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Garantía</label>
                      <input
                        type="text"
                        name="garantia"
                        value={formData.garantia}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Descripción de la garantía"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Observaciones</label>
                      <textarea
                        name="observaciones"
                        value={formData.observaciones}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Notas adicionales sobre el préstamo"
                      />
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex space-x-3 pt-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancelar
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Crear Préstamo</span>
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}