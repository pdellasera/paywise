import { createContext, useContext, useState, useEffect } from 'react';
import type {ReactNode} from 'react';

import { usePWA } from '@/hook/usePWA';
import { PWAInstallModal } from '../PWAInstallModal/PWAInstallModal';

interface PWAContextType {
  showInstallModal: () => void;
  hideInstallModal: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

interface PWAProviderProps {
  children: ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
  const { isInstallable, isInstalled, showInstallPrompt, isSupported } = usePWA();
  const [showModal, setShowModal] = useState(false);
  const [hasShownPrompt, setHasShownPrompt] = useState(false);

  // Auto-mostrar modal después de 30 segundos si es instalable y no se ha mostrado
  useEffect(() => {
    if (isInstallable && !isInstalled && !hasShownPrompt && isSupported) {
      const timer = setTimeout(() => {
        setShowModal(true);
        setHasShownPrompt(true);
      }, 30000); // 30 segundos

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, hasShownPrompt, isSupported]);

  const showInstallModal = () => {
    if (isInstallable && !isInstalled) {
      setShowModal(true);
    }
  };

  const hideInstallModal = () => {
    setShowModal(false);
  };

  const handleInstall = async () => {
    await showInstallPrompt();
    setShowModal(false);
  };

  const value: PWAContextType = {
    showInstallModal,
    hideInstallModal,
    isInstallable,
    isInstalled
  };

  return (
    <PWAContext.Provider value={value}>
      {children}
      <PWAInstallModal 
        isOpen={showModal}
        onClose={hideInstallModal}
        onInstall={handleInstall}
      />
    </PWAContext.Provider>
  );
}

export function usePWAContext(): PWAContextType {
  const context = useContext(PWAContext);
  if (context === undefined) {
    throw new Error('usePWAContext must be used within a PWAProvider');
  }
  return context;
}