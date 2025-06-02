// Importa o que será usado: funções e dados
import { createContext, useState, useEffect, useContext } from "react";
import { SiteData } from "../data"; // Dados vindos de um objeto externo

// Desestrutura dados do site
const {
  products: { items },
} = SiteData;

// Constante usada pra identificar o carrinho no localStorage
const STORAGE_KEY = "meu_carrinho";

// Cria o contexto do carrinho pra compartilhar entre componentes
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // IDs fixos que sempre vão estar no carrinho (tipo "favoritos")
  const fixedIds = ["1", "2"];

  // Pega os produtos fixos e já adiciona qty 1 pra cada
  const fixedProducts = fixedIds
    .map((id) => items.find((item) => String(item.id) === String(id)))
    .filter(Boolean)
    .map((product) => ({ ...product, qty: 1 }));

  // Estado do carrinho, tenta recuperar do localStorage e garante fixos
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const existingIds = parsed.map((item) => String(item.id));
        const missing = fixedProducts.filter(
          (fp) => !existingIds.includes(String(fp.id))
        );
        return [...parsed, ...missing];
      } catch {
        return fixedProducts;
      }
    }
    return fixedProducts;
  });

  // Sempre que o carrinho mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Adiciona item no carrinho, incrementa se já existir
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Remove item do carrinho
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Limpa todo o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook customizado pra acessar o carrinho
export const useCart = () => {
  return useContext(CartContext);
};
