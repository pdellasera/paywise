import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Users, 
  Phone, 
  Mail, 
  MapPin,
  CreditCard,
  ChevronRight,
  SlidersHorizontal,
  X,
  Save,
  User
} from 'lucide-react';
import { useState } from 'react';

export function Clientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    cedula: '',
    fechaNacimiento: '',
    ocupacion: '',
    ingresos: ''
  });

  // Convertir la lista de clientes en un estado
  const [clientes, setClientes] = useState([
    { 
      id: 1, 
      nombre: 'Juan Pérez', 
      email: 'juan.perez@email.com', 
      telefono: '+1 234 567 8901',
      direccion: 'Av. Principal 123',
      prestamosActivos: 2,
      montoTotal: 150000,
      estado: 'activo',
      ultimoPago: '2024-01-15'
    },
    { 
      id: 2, 
      nombre: 'María García', 
      email: 'maria.garcia@email.com', 
      telefono: '+1 234 567 8902',
      direccion: 'Calle Secundaria 456',
      prestamosActivos: 1,
      montoTotal: 75000,
      estado: 'activo',
      ultimoPago: '2024-01-14'
    },
    { 
      id: 3, 
      nombre: 'Carlos López', 
      email: 'carlos.lopez@email.com', 
      telefono: '+1 234 567 8903',
      direccion: 'Plaza Central 789',
      prestamosActivos: 3,
      montoTotal: 225000,
      estado: 'moroso',
      ultimoPago: '2023-12-20'
    },
    { 
      id: 4, 
      nombre: 'Ana Martínez', 
      email: 'ana.martinez@email.com', 
      telefono: '+1 234 567 8904',
      direccion: 'Barrio Norte 321',
      prestamosActivos: 1,
      montoTotal: 50000,
      estado: 'activo',
      ultimoPago: '2024-01-12'
    },
    { 
      id: 5, 
      nombre: 'Luis Rodríguez', 
      email: 'luis.rodriguez@email.com', 
      telefono: '+1 234 567 8905',
      direccion: 'Zona Sur 654',
      prestamosActivos: 0,
      montoTotal: 0,
      estado: 'inactivo',
      ultimoPago: '2023-11-30'
    },
  ]);

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'todos' || cliente.estado === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getEstadoConfig = (estado: string) => {
    switch (estado) {
      case 'activo':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          color: 'text-emerald-700',
          label: 'Activo'
        };
      case 'moroso':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          color: 'text-red-700',
          label: 'Moroso'
        };
      case 'inactivo':
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          color: 'text-gray-700',
          label: 'Inactivo'
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Crear nuevo cliente con ID único
    const nuevoCliente = {
      id: Math.max(...clientes.map(c => c.id)) + 1, // Generar ID único
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      direccion: formData.direccion,
      prestamosActivos: 0,
      montoTotal: 0,
      estado: 'activo',
      ultimoPago: new Date().toISOString().split('T')[0] // Fecha actual
    };
    
    // Agregar el nuevo cliente al INICIO de la lista
    setClientes(prevClientes => [nuevoCliente, ...prevClientes]);
    
    // Limpiar formulario y cerrar modal
    setShowModal(false);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      cedula: '',
      fechaNacimiento: '',
      ocupacion: '',
      ingresos: ''
    });
  };

  const totalClientes = clientes.length;
  const clientesActivos = clientes.filter(c => c.estado === 'activo').length;
  const clientesMorosos = clientes.filter(c => c.estado === 'moroso').length;
  const montoTotalCartera = clientes.reduce((sum, c) => sum + c.montoTotal, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Clientes</h1>
              <p className="text-sm text-gray-600">Gestiona tu cartera</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
              <Users className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Búsqueda */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar clientes..."
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
              {filteredClientes.length} de {totalClientes}
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
            <div className="px-4 py-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'todos', label: 'Todos', count: totalClientes },
                  { key: 'activo', label: 'Activos', count: clientesActivos },
                  { key: 'moroso', label: 'Morosos', count: clientesMorosos },
                  { key: 'inactivo', label: 'Inactivos', count: clientes.filter(c => c.estado === 'inactivo').length }
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
                    {filter.label} ({filter.count})
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Rápidas */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Cartera</p>
                <p className="text-lg font-bold text-gray-900">${montoTotalCartera.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Activos</p>
                <p className="text-lg font-bold text-gray-900">{clientesActivos}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className="px-4">
        {filteredClientes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay clientes</h3>
            <p className="text-gray-500 text-sm mb-6">No se encontraron clientes con los filtros aplicados</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredClientes.map((cliente, index) => {
              const estadoConfig = getEstadoConfig(cliente.estado);
              
              return (
                <motion.div
                  key={cliente.id}
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
                            {cliente.nombre.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{cliente.nombre}</h3>
                          <p className="text-xs text-gray-500">ID: {cliente.id}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>

                    {/* Información de Contacto */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-600">{cliente.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-600">{cliente.telefono}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-600">{cliente.direccion}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Préstamos</p>
                        <p className="text-sm font-bold text-gray-900">{cliente.prestamosActivos}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Monto Total</p>
                        <p className="text-sm font-bold text-gray-900">${cliente.montoTotal.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Estado y Último Pago */}
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${estadoConfig.bg} ${estadoConfig.border} border`}>
                        <div className={`h-2 w-2 rounded-full ${estadoConfig.color.replace('text-', 'bg-')}`}></div>
                        <span className={`text-xs font-semibold ${estadoConfig.color}`}>
                          {estadoConfig.label}
                        </span>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Último pago</p>
                        <p className="text-xs font-medium text-gray-700">
                          {new Date(cliente.ultimoPago).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 h-14 w-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg flex items-center justify-center z-20 hover:shadow-xl transition-all duration-200"
      >
        <Plus className="h-6 w-6 text-white" />
      </motion.button>

      {/* Modal Formulario Nuevo Cliente */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
              className="bg-white rounded-t-3xl w-full max-w-lg max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del Modal */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Nuevo Cliente</h2>
                      <p className="text-sm text-gray-600">Completa la información</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowModal(false)}
                    className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </motion.button>
                </div>
              </div>

              {/* Formulario */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Información Personal */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                      <span>Información Personal</span>
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="Ej: Juan Pérez"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cédula/DNI *
                        </label>
                        <input
                          type="text"
                          name="cedula"
                          value={formData.cedula}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="Ej: 12345678"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fecha de Nacimiento
                        </label>
                        <input
                          type="date"
                          name="fechaNacimiento"
                          value={formData.fechaNacimiento}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Información de Contacto */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-sky-500"></div>
                      <span>Información de Contacto</span>
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="Ej: juan@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="Ej: +1 234 567 8901"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dirección *
                        </label>
                        <input
                          type="text"
                          name="direccion"
                          value={formData.direccion}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="Ej: Av. Principal 123"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Información Laboral */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span>Información Laboral</span>
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ocupación
                        </label>
                        <input
                          type="text"
                          name="ocupacion"
                          value={formData.ocupacion}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="Ej: Ingeniero, Comerciante, etc."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ingresos Mensuales
                        </label>
                        <input
                          type="number"
                          name="ingresos"
                          value={formData.ingresos}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="Ej: 50000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex space-x-3 pt-6">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancelar
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Guardar Cliente</span>
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