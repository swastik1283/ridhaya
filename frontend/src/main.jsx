import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext.jsx';
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("❌ 'root' element not found in index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
    <ShopContextProvider>
      <App />
      </ShopContextProvider>
    </BrowserRouter>
  </StrictMode>
);
