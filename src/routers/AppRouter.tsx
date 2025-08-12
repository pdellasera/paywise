import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/helpers';
import { useDeviceDetector } from '@/hook';
import { DeviceBlocker } from '@/components/DeviceBlocker/DeviceBlocker';
import { PWAProvider } from '@/components/PWAProvider';
import { LoginForm } from '@/modules/auth';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/modules/home/dashboard';
import { Clientes } from '@/modules/clientes/clientes';
import { Prestamos } from '@/modules/prestamos/prestamos';
import { Pagos } from '@/modules/pagos/pagos';
import { Reportes } from '@/modules/reporte/reportes';
import { Configuracion } from '@/modules/configuracion/configuracion';

// Componente que maneja la lógica de autenticación y detección de dispositivos
function AuthenticatedApp() {
  const { isAuthenticated, isLoading } = useAuth();
  const { deviceInfo, isAllowedDevice, blockReason } = useDeviceDetector();
  const location = useLocation();

  // Mostrar loading mientras se carga la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        <p className="ml-2">Cargando...</p>
      </div>
    );
  }

  // Bloquear si el dispositivo no está permitido
  if (!isAllowedDevice && blockReason) {
    return <DeviceBlocker reason={blockReason} deviceInfo={deviceInfo} />;
  }

  // Si no está autenticado y no está en la página de login, redirigir
  if (!isAuthenticated && location.pathname !== '/') {
    return <Navigate to="/" replace />;
  }

  // Si está autenticado y está en la página de login, redirigir al home
  if (isAuthenticated && location.pathname === '/') {
    return <Navigate to="/home" replace />;
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={!isAuthenticated ? <LoginForm /> : <Navigate to="/home" replace />} 
      />
      <Route 
        path="/home" 
        element={
          isAuthenticated ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
      <Route 
        path="/clientes" 
        element={
          isAuthenticated ? (
            <Layout>
              <Clientes />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
      <Route 
        path="/prestamos" 
        element={
          isAuthenticated ? (
            <Layout>
              <Prestamos />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
      <Route 
        path="/pagos" 
        element={
          isAuthenticated ? (
            <Layout>
              <Pagos />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
      <Route 
        path="/reportes" 
        element={
          isAuthenticated ? (
            <Layout>
              <Reportes />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
      <Route 
        path="/configuracion" 
        element={
          isAuthenticated ? (
            <Layout>
              <Configuracion />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function AppRouter() {
  return (
    <AuthProvider>
      <PWAProvider>
        <BrowserRouter>
          <AuthenticatedApp />
        </BrowserRouter>
      </PWAProvider>
    </AuthProvider>
  );
}
