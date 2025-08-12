import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/helpers';
import { LoginForm } from '@/modules/auth';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/modules/home/dashboard';
import { Clientes } from '@/modules/clientes/clientes';
import { Prestamos } from '@/modules/prestamos/prestamos';
import { Pagos } from '@/modules/pagos/pagos';
import { Reportes } from '@/modules/reporte/reportes';
import { Configuracion } from '@/modules/configuracion/configuracion';

// Componente que maneja la lógica de autenticación
function AuthenticatedApp() {
  
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-2">Cargando...</p>
      </div>
    );
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
      <BrowserRouter>
        <AuthenticatedApp />
      </BrowserRouter>
    </AuthProvider>
  );
}
