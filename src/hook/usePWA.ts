import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface UsePWAReturn {
  isInstallable: boolean;
  isInstalled: boolean;
  showInstallPrompt: () => Promise<void>;
  hideInstallPrompt: () => void;
  isSupported: boolean;
}

export function usePWA(): UsePWAReturn {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Verificar si PWA es soportado
    const checkPWASupport = () => {
      return 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;
    };

    setIsSupported(checkPWASupport());

    // Verificar si ya está instalado
    const checkIfInstalled = () => {
      // Verificar si está en modo standalone (instalado)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      // Verificar si está en iOS Safari en modo standalone
      const isIOSStandalone = (window.navigator as any).standalone === true;
      
      return isStandalone || isIOSStandalone;
    };

    setIsInstalled(checkIfInstalled());

    // Escuchar el evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Escuchar cuando la app se instala
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    if (isSupported) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);
    }

    return () => {
      if (isSupported) {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      }
    };
  }, [isSupported]);

  // Registrar service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  const showInstallPrompt = async (): Promise<void> => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('Usuario aceptó la instalación');
      } else {
        console.log('Usuario rechazó la instalación');
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Error al mostrar prompt de instalación:', error);
    }
  };

  const hideInstallPrompt = (): void => {
    setDeferredPrompt(null);
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    showInstallPrompt,
    hideInstallPrompt,
    isSupported
  };
}