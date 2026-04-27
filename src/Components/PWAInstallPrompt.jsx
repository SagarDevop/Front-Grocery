import { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);

    // Check if already installed (standalone mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || window.navigator.standalone === true;
    
    if (isStandalone) return; // Already installed, don't show

    // Check if user dismissed recently
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      const threeDays = 3 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < threeDays) return;
    }

    // Listen for the beforeinstallprompt event (Chrome/Edge/Samsung)
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt after a delay (better UX)
      setTimeout(() => setShowPrompt(true), 5000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // For iOS, show after a delay if on mobile
    if (isIOSDevice && !isStandalone) {
      setTimeout(() => setShowPrompt(true), 8000);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`PWA install outcome: ${outcome}`);
      setDeferredPrompt(null);
      setShowPrompt(false);
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSGuide(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  return (
    <AnimatePresence>
      {showPrompt && !showIOSGuide && (
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 z-[100] max-w-sm mx-auto"
        >
          <div className="bg-white dark:bg-surface-dark-gray rounded-[2rem] shadow-2xl shadow-slate-900/20 border border-slate-200 dark:border-slate-700 p-5 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 via-brand-500 to-emerald-400" />
            
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-500/30">
                <Smartphone className="text-white" size={24} />
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                  Install GreenCart App
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  Get the app-like experience with faster access, offline support & push notifications.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleInstall} className="text-xs h-9 px-4">
                    <Download size={14} className="mr-1.5" /> Install Now
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleDismiss} className="text-xs h-9 text-slate-500">
                    Not Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* iOS Install Guide Modal */}
      {showIOSGuide && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-end justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-surface-dark-gray rounded-[2rem] shadow-2xl p-8 max-w-sm w-full mb-4"
          >
            <div className="text-center">
              <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-500/30">
                <Download className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                Install GreenCart
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                To install GreenCart on your iPhone:
              </p>
              <ol className="text-left space-y-3 mb-6">
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-6 h-6 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">1</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Tap the <strong>Share</strong> button <span className="inline-block px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs">⬆</span> in Safari
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-6 h-6 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">2</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Scroll down and tap <strong>"Add to Home Screen"</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-6 h-6 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">3</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Tap <strong>"Add"</strong> to confirm
                  </span>
                </li>
              </ol>
              <Button onClick={handleDismiss} className="w-full h-12 rounded-xl">
                Got It
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
