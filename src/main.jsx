import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import App from "./App.jsx";
import store from "./Redux/Store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";

/**
 * Service Worker Registration
 * Registers the SW for production PWA caching and offline support.
 * In development, we skip registration to avoid caching issues.
 */
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const IS_PRODUCTION = window.location.hostname !== 'localhost';
    
    if (IS_PRODUCTION) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });
        
        console.log('✅ SW registered with scope:', registration.scope);

        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated') {
              console.log('🔄 New SW activated. Refreshing for latest content.');
              // Optionally show a toast to the user
            }
          });
        });
      } catch (error) {
        console.error('❌ SW registration failed:', error);
      }
    } else {
      // In development, unregister any existing SWs to prevent caching issues
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        registration.unregister();
        console.log('🧹 Dev mode: Unregistered SW');
      }
    }
  }
};

// Register SW after app loads
window.addEventListener('load', registerServiceWorker);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
