// Importa o que será usado: funções, bibliotecas e contexto
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { Divider } from "primereact/divider";
import { CartContext } from "../context/CartContext"; // contexto do carrinho

const ActionCar = () => {
  // Setup inicial: navegação, referência do dropdown e visibilidade
  const navigate = useNavigate();
  const iconRef = useRef(null);
  const op = useRef(null);
  const [visible, setVisible] = useState(false);

  // Pega dados e funções do carrinho pelo contexto
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  // Abre/fecha o carrinho
  const toggleDiv = () => {
    setVisible((prev) => !prev);
  };

  // Fecha o carrinho se clicar fora dele
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      op.current &&
      !op.current.contains(event.target) &&
      iconRef.current &&
      !iconRef.current.contains(event.target)
    ) {
      setVisible(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  // Calcula o total do carrinho (usa o preço promocional se tiver)
  const total = cartItems.reduce((sum, { price, price2, qty = 1 }) => {
    const normalPrice = parseFloat(price) || 0;
    const promoPrice = parseFloat(price2);
    const priceToUse = !isNaN(promoPrice) ? promoPrice : normalPrice;
    return sum + priceToUse * qty;
  }, 0);

  return (
    <>
      {/* Ícone do carrinho com badge mostrando o total de itens */}
      <i
        ref={iconRef}
        className="pi pi-shopping-cart p-overlay-badge text-pink-600 cursor-pointer text-xl"
        onClick={toggleDiv}
        aria-label="Carrinho"
      >
        <Badge
          value={cartItems.reduce((acc, { qty = 1 }) => acc + qty, 0)}
          className="bg-pink-600 text-surface-0 h-1rem min-w-min px-1 line-height-2 top-0 right-0"
        />
      </i>

      {/* Dropdown que aparece com os itens do carrinho */}
      <div
        ref={op}
        className={`absolute bg-white p-3 shadow-2 transition-all transition-duration-300 z-5 w-11 xl:w-18rem mx-3 xl:mx-0 left-0 xl:left-auto border-round-md ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "4.5rem", pointerEvents: visible ? "auto" : "none" }}
      >
        {/* Título e divisor do carrinho */}
        <h3 className="mt-0 mb-2 text-lg">Meu Carrinho</h3>
        <Divider className="mt-0 mb-3" />

        {/* Mostra msg se o carrinho estiver vazio */}
        {cartItems.length === 0 && <p>Carrinho vazio</p>}

        {/* Lista os produtos do carrinho */}
        {cartItems.map(
          ({ id, name, category, price, price2, qty = 1, image }, i) => {
            const normalPrice = parseFloat(price) || 0;
            const promoPrice = parseFloat(price2);
            const hasPromo = !isNaN(promoPrice);

            return (
              // Bloco de item do carrinho (linkável pro produto)
              <div
                key={id || i}
                className="flex mb-2 border-bottom-1 border-50 gap-2"
                title={name}
                onClick={() => navigate(`/produto/${id}`)}
                style={{ cursor: "pointer" }}
              >
                {/* Imagem do produto */}
                <figure className="flex justify-content-center align-items-center w-4rem h-4rem bg-indigo-200 m-0 overflow-hidden">
                  <Image
                    src={image}
                    className="w-3rem"
                    alt={name}
                    style={{
                      objectFit: "contain",
                      transform: "rotate(-20deg)",
                    }}
                  />
                </figure>

                {/* Informações do produto: nome, categoria, quantidade, preço */}
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-xs text-gray-600 font-bold m-0">
                    {category?.name}
                  </h3>
                  <h4 className="mt-0 mb-1 text-sm overflow-hidden text-overflow-ellipsis white-space-nowrap w-12">
                    {name}
                  </h4>
                  <p className="flex m-0 text-xs font-bold text-pink-600">
                    {hasPromo ? (
                      <>
                        {/* Mostra preço antigo e novo se tiver promo */}
                        <span className="line-through font-semibold text-gray-500 mr-2">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(normalPrice)}
                        </span>
                        <span>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(promoPrice)}
                        </span>
                      </>
                    ) : (
                      <span>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(normalPrice)}
                      </span>
                    )}
                    {qty > 1 && (
                      <span className="ml-auto text-pink-600 font-semibold">
                        {`(x${qty})`}
                      </span>
                    )}
                  </p>
                </div>

                {/* Ícone pra remover item do carrinho */}
                <i
                  className="pi pi-times w-1rem p-0 text-red-600 text-xs font-medium flex align-items-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(id);
                  }}
                ></i>
              </div>
            );
          }
        )}

        {/* Rodapé do dropdown com total, limpar tudo e ver carrinho */}
        <div className="mt-3">
          <Divider className="mt-0 mb-2" />
          <div className="flex justify-content-between align-items-center">
            <div className="font-medium">Valor total:</div>
            <span className="text-pink-600 font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(total)}
            </span>
          </div>

          <Divider className="mt-2 mb-3" />

          <div className="flex justify-content-between align-items-center">
            {/* Esvazia o carrinho */}
            <Button
              label="Esvaziar"
              className="text-color font-bold underline bg-transparent p-0 cursor-pointer border-none shadow-none transition-colors transition-linear transition-duration-400 hover:text-pink-700"
              onClick={clearCart}
            />
            {/* Leva para página do carrinho */}
            <Button
              label="Ver Carrinho"
              onClick={() => navigate("/carrinho")}
              className="bg-pink-600 text-sm font-normal border-none shadow-none transition-colors transition-linear transition-duration-400 hover:bg-pink-700"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionCar;
