import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from 'react-router-dom';

// Lazy load components for performance
const Home = lazy(() => import('./Components/Home'));
const ProductList = lazy(() => import('./Components/ProductList'));
const ContactUs = lazy(() => import('./Components/ContactUs'));
const CategoryPage = lazy(() => import("./Components/CategoryPage"));
const Cart = lazy(() => import("./Components/Cart"));
const CheckoutPage = lazy(() => import("./Components/CheckoutPage"));
const BecomeSeller = lazy(() => import('./Seller/BecomeSeller'));
const ProductDetail = lazy(() => import('./Components/ProductDetail'));
const AuthForm = lazy(() => import('./Components/AuthForm'));
const AdminDashboard = lazy(() => import('./Components/AdminDashboard'));
const SellerDashboard = lazy(() => import('./Seller/SellerDashboard'));
const ProductCard = lazy(() => import('./Components/ProductCard'));
const UserProfile = lazy(() => import('./Components/Profile/UserProfile'));

// Seller Sub-components
const SellerProduct = lazy(() => import('./Seller/SellerProduct'));
const SellerOrder = lazy(() => import('./Seller/SellerOrder'));
const SellerEarning = lazy(() => import('./Seller/SellerEarning'));
const SellerProfile = lazy(() => import('./Seller/SellerProfile'));
const AddProductForm = lazy(() => import('./Seller/AddProductForm'));

// Static Components (loaded immediately for perceived performance)
import Navbar from './Components/Navbar';
import MobileBottomNav from './Components/MobileBottomNav';
import PWAInstallPrompt from './Components/PWAInstallPrompt';
import { Toaster } from "react-hot-toast"; 
import { fetchCart, syncCart } from "./Redux/cartThunks";
import { clearCart } from "./Redux/cartSlice";
import { fetchWishlist, clearWishlist } from "./Redux/wishlistSlice";
import { refreshUserProfile } from "./Redux/authThunk";
import { logoutUser } from "./Redux/authSlice";
import ProtectedRoute from "./Components/ProtectedRoute";

// Premium Loading Spinner for Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-surface-dark">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-400 dark:text-slate-500 font-bold animate-pulse text-xs uppercase tracking-[0.2em]">Loading...</p>
    </div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/admin-dashboard') || location.pathname.startsWith('/seller-dashboard');

  // Listen for global session expiration events (from apiConfig)
  useEffect(() => {
    const handleLogout = () => {
      console.warn("Session expired signal received. Logging out.");
      dispatch(logoutUser());
    };
    window.addEventListener('session-expired', handleLogout);
    return () => window.removeEventListener('session-expired', handleLogout);
  }, [dispatch]);

  // Initial Load & Auth Sync
  useEffect(() => {
    // 1. Session Sanity Check
    const token = localStorage.getItem('token');
    if (user?._id && !token) {
      console.warn("Session Mismatch: User present but Token missing. Logging out.");
      dispatch(logoutUser());
      return;
    }

    // 2. Refresh Sync
    if (user?._id) {
      console.log("Persistence Sync: Refreshing session for:", user.email);
      dispatch(refreshUserProfile());
      dispatch(fetchCart(user.email));  
      dispatch(fetchWishlist()); 
    } else if (!user) {
      dispatch(clearCart());
      dispatch(clearWishlist());
    }
  }, [user?._id, dispatch]);

  // Sync Cart to DB on changes (debounced)
  useEffect(() => {
    if (user?._id && cartItems.length >= 0) {
      const timeoutId = setTimeout(() => {
        dispatch(syncCart(user.email, cartItems));
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [cartItems, user?._id, dispatch]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Desktop/Tablet Top Navigation */}
      {!isDashboard && <Navbar />}
      
      <Suspense fallback={<PageLoader />}>
        {/* Main content area — add bottom padding for mobile nav */}
        <main className={!isDashboard ? "pb-20 md:pb-0" : ""}>
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/admin-dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }>
               <Route path="sellers" element={<AdminDashboard />} />
               <Route path="products" element={<AdminDashboard />} />
               <Route path="users" element={<AdminDashboard />} />
               <Route path="orders" element={<AdminDashboard />} />
               <Route path="settings" element={<AdminDashboard />} />
            </Route>

            <Route path="/products" element={<ProductList />} />
            <Route path="/search" element={<ProductList />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            <Route path="/contact" element={<ContactUs/>} />
            
            <Route path='/cart' element={
              <ProtectedRoute>
                <Cart/>
              </ProtectedRoute>
            } />
            
            <Route path='/checkout' element={
              <ProtectedRoute>
                <CheckoutPage/>
              </ProtectedRoute>
            } />

            <Route path='/seller' element={<BecomeSeller/>} />
            
            <Route path="/seller-dashboard" element={
              <ProtectedRoute allowedRoles={['seller']}>
                <SellerDashboard />
              </ProtectedRoute>
            }>
              <Route path="sellerproductlist" element={<SellerProduct />} />
              <Route path="add-product" element={<AddProductForm />} />
              <Route path="orders" element={<SellerOrder />} />
              <Route path="profile" element={<SellerProfile />} />
              <Route path="earnings" element={<SellerEarning />} />
            </Route>

            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
            
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/auth" element={<AuthForm />} />
          </Routes>
        </main>
      </Suspense>

      {/* Mobile Bottom Navigation (only visible on mobile) */}
      {!isDashboard && <MobileBottomNav />}
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </>
  )
}

export default App
