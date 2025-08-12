import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
}

interface UseDeviceDetectorReturn {
  deviceInfo: DeviceInfo;
  isAllowedDevice: boolean;
  blockReason: string | null;
}

export function useDeviceDetector(): UseDeviceDetectorReturn {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    userAgent: '',
    screenWidth: 0,
    screenHeight: 0
  });

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Detectar dispositivos móviles por User Agent
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const tabletRegex = /ipad|android(?=.*mobile)|tablet/i;
      
      // Detectar por tamaño de pantalla (breakpoints comunes)
      const isMobileBySize = screenWidth <= 768;
      const isTabletBySize = screenWidth > 768 && screenWidth <= 1024;
      
      // Combinar detección por User Agent y tamaño de pantalla
      const isMobile = mobileRegex.test(userAgent) || isMobileBySize;
      const isTablet = tabletRegex.test(userAgent) || isTabletBySize;
      const isDesktop = !isMobile && !isTablet;

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        userAgent,
        screenWidth,
        screenHeight
      });
    };

    // Detectar al cargar
    detectDevice();

    // Detectar al cambiar el tamaño de ventana
    const handleResize = () => {
      detectDevice();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determinar si el dispositivo está permitido (solo móviles)
  const isAllowedDevice = deviceInfo.isMobile;
  
  // Razón del bloqueo
  const blockReason = !isAllowedDevice 
    ? deviceInfo.isDesktop 
      ? 'Este sistema solo está disponible en dispositivos móviles. Por favor, accede desde tu teléfono o tablet.'
      : 'Dispositivo no compatible. Por favor, accede desde un dispositivo móvil.'
    : null;

  return {
    deviceInfo,
    isAllowedDevice,
    blockReason
  };
}