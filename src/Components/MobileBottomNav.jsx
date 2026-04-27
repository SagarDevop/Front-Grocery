import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home, Search, ShoppingCart, User, LayoutGrid } from 'lucide-react';
import { cn } from '../Utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Shop', path: '/products', icon: LayoutGrid },
  { name: 'Cart', path: '/cart', icon: ShoppingCart, badge: true },
  { name: 'Profile', path: '/profile', icon: User },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Don't show on dashboard routes or auth page
  const hiddenRoutes = ['/admin-dashboard', '/seller-dashboard', '/auth', '/checkout'];
  const shouldHide = hiddenRoutes.some(route => location.pathname.startsWith(route));
  if (shouldHide) return null;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path) => {
    // If profile/cart and not logged in, go to auth
    if ((path === '/profile' || path === '/cart') && !user) {
      navigate('/auth', { state: { from: path } });
      return;
    }
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[90] md:hidden"
        >
          {/* Gradient fade above nav */}
          <div className="h-6 bg-gradient-to-t from-white dark:from-surface-dark to-transparent pointer-events-none" />
          
          <div className="bg-white/95 dark:bg-surface-dark-gray/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 px-2 pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center justify-around h-16 max-w-md mx-auto">
              {navItems.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;

                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.path)}
                    className={cn(
                      "relative flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300",
                      active 
                        ? "text-brand-600 dark:text-brand-400" 
                        : "text-slate-400 dark:text-slate-500"
                    )}
                  >
                    {/* Active indicator dot */}
                    {active && (
                      <motion.div
                        layoutId="mobile-nav-indicator"
                        className="absolute -top-1 w-1 h-1 bg-brand-500 rounded-full"
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      />
                    )}

                    <div className="relative">
                      <Icon size={active ? 24 : 22} strokeWidth={active ? 2.5 : 2} />
                      
                      {/* Cart Badge */}
                      {item.badge && totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[9px] font-bold text-white ring-2 ring-white dark:ring-surface-dark-gray">
                          {totalItems > 9 ? '9+' : totalItems}
                        </span>
                      )}
                    </div>

                    <span className={cn(
                      "text-[10px] mt-0.5 font-semibold transition-all",
                      active ? "font-bold" : ""
                    )}>
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
