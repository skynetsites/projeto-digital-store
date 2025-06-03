// Importa o que será usado: funções e contextos
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { CartProvider } from "./context/CartContext";
import App from "./App";

// Configurações globais do PrimeReact
const config = {
  hideOverlaysOnDocumentScrolling: true,
  // outras configs, se quiser
};

// Monta a aplicação com os contextos e rotas
createRoot(document.getElementById("root")).render(
  <PrimeReactProvider value={config}>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </PrimeReactProvider>
);
