import type { NavigationItem } from './types';

export const navigationItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    path: '/home',
    icon: 'Home',
  },
  {
    name: 'Clientes',
    path: '/clientes',
    icon: 'Users',
  },
  {
    name: 'Préstamos',
    path: '/prestamos',
    icon: 'CreditCard',
  },
  {
    name: 'Pagos',
    path: '/pagos',
    icon: 'DollarSign',
  },
  {
    name: 'Reportes',
    path: '/reportes',
    icon: 'BarChart3',
  },
  {
    name: 'Configuración',
    path: '/configuracion',
    icon: 'Settings',
  },
];

// Rutas que requieren autenticación
export const protectedRoutes = [
  '/home',
  '/clientes',
  '/prestamos',
  '/pagos',
  '/reportes',
  '/configuracion',
];

// Información adicional para breadcrumbs
export const routeLabels: Record<string, string> = {
  '/home': 'Dashboard',
  '/clientes': 'Clientes',
  '/prestamos': 'Préstamos',
  '/pagos': 'Pagos',
  '/reportes': 'Reportes',
  '/configuracion': 'Configuración',
};