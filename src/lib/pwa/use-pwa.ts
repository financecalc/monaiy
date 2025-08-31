'use client';

import { useEffect, useState } from 'react';

interface PWAState {
  isInstalled: boolean;
  isOnline: boolean;
  hasUpdate: boolean;
  isLoading: boolean;
}

export function usePWA() {
  const [pwaState, setPwaState] = useState<PWAState>({
    isInstalled: false,
    isOnline: navigator.onLine,
    hasUpdate: false,
    isLoading: true,
  });

  useEffect(() => {
    let registration: ServiceWorkerRegistration | null = null;

    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          registration = await navigator.serviceWorker.register('/sw.js');
          console.log('SW registered: ', registration);

          // Check if app is installed
          const isInstalled =
            window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as { standalone?: boolean }).standalone === true;

          setPwaState(prev => ({
            ...prev,
            isInstalled,
            isLoading: false,
          }));

          // Listen for updates
          registration.addEventListener('updatefound', () => {
            if (registration) {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (
                    newWorker.state === 'installed' &&
                    navigator.serviceWorker.controller
                  ) {
                    setPwaState(prev => ({ ...prev, hasUpdate: true }));
                  }
                });
              }
            }
          });

          // Listen for controller change
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            setPwaState(prev => ({ ...prev, hasUpdate: false }));
          });
        } catch (error) {
          console.error('SW registration failed: ', error);
          setPwaState(prev => ({ ...prev, isLoading: false }));
        }
      } else {
        setPwaState(prev => ({ ...prev, isLoading: false }));
      }
    };

    // Online/offline detection
    const handleOnline = () =>
      setPwaState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () =>
      setPwaState(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    registerServiceWorker();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updateApp = async () => {
    if (pwaState.hasUpdate && 'serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    }
  };

  const installApp = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        // Trigger install prompt
        const event = new Event('beforeinstallprompt');
        window.dispatchEvent(event);
      }
    }
  };

  return {
    ...pwaState,
    updateApp,
    installApp,
  };
}
