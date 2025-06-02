// Importa o que será usado: funções, bibliotecas, componentes e contexto
import { useRef, useContext } from "react";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import ProductOptions from "./ProductOptions";
import { CartContext } from "../context/CartContext";

const BuyBox = ({ product, products }) => {
  // Toast pra mostrar alertas e navegação pra mudar de página
  const toast = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); // Pega função de adicionar ao carrinho

  // Quebra o preço em partes: símbolo, número e centavos
  const formatPriceParts = (value) => {
    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

    const match = formatted.match(/^(\D+)\s?(\d+)(,\d{2})$/);
    return {
      symbol: match?.[1] || "",
      integer: match?.[2] || "",
      cents: match?.[3] || "",
    };
  };

  // Formata os dois preços: normal e promocional (se tiver)
  const original = formatPriceParts(product.price);
  const discount = product.price2 ? formatPriceParts(product.price2) : null;

  // Pega tamanhos e cores do produto, ou usa os padrões
  const {
    sizes: productSizes = [],
    colors: productColors = [],
  } = product;

  const {
    sizes: defaultSizes = [],
    colors: defaultColors = [],
  } = products;

  // Define quais tamanhos e cores mostrar (preferência pro que tem no produto)
  const sizes = productSizes.length ? productSizes : defaultSizes;
  const colors = productColors.length ? productColors : defaultColors;

  return (
    <>
      {/* Toast pra mostrar alerta de produto adicionado */}
      <Toast ref={toast} />

      {/* Caixa principal com nome, preço, descrição, etc */}
      <div className="p-0 xl:pl-3 w-full flex flex-column gap-3">
        {/* Nome do produto em destaque */}
        <h1 className="text-4xl font-bold m-0 line-height-1 overflow-hidden text-overflow-ellipsis white-space-nowrap w-full">
          {product.name}
        </h1>

        {/* Mostra categoria, marca e código do produto */}
        <div className="text-sm text-gray-500">
          {product.category.name} | {product.brand.name} | <span className="font-medium">REF:</span>{" "}
          {product.code || "38416711"}
        </div>

        {/* Estrelas de avaliação + nota + número de avaliações */}
        <div className="flex align-items-center gap-2 mb-0">
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <i
                key={i}
                className={`pi ${
                  i < Math.floor(product.rating || 4.7) ? "pi-star-fill text-yellow-500" : "pi-star text-yellow-500"
                }`}
              ></i>
            ))}
          </div>
          <div
            className="flex align-items-center bg-yellow-500 text-white text-sm font-bold line-height-1"
            style={{ padding: ".3rem .7rem", borderRadius: ".3rem" }}
          >
            {product.rating || 4.7} <i className="pi pi-star-fill text-xs ml-1"></i>
          </div>
          <span className="text-sm text-gray-500">({product.reviews || 90} avaliações)</span>
        </div>

        {/* Mostra o preço atual e o antigo se tiver promoção */}
        <div className="flex align-items-baseline text-sm font-bold text-base">
          {discount ? (
            <>
              <span className="ml-1 font-semibold text-gray-800">{original.symbol}</span>
              <span className="text-4xl">{original.integer}</span>
              <span>{original.cents}</span>
              <span className="ml-2 text-gray-500 line-through">
                {discount.integer}
                {discount.cents}
              </span>
            </>
          ) : (
            <>
              <span className="text-sm">{original.symbol}</span>
              <span className="text-3xl">{original.integer}</span>
              <span className="text-sm">{original.cents}</span>
            </>
          )}
        </div>

        {/* Bloco com descrição do produto */}
        <div className="text-base">
          <p className="font-semibold text-gray-700 m-0 mb-2">Descrição do produto</p>
          <p className="font-normal text-gray-800 m-0">{product.description}</p>
        </div>

        {/* Renderiza as opções de tamanhos e cores */}
        <ProductOptions sizes={sizes} shape="square" radius="8px" type="text" />
        <ProductOptions colors={colors} shape="circle" type="color" className="mb-3" />

        {/* Botão de comprar que adiciona o produto e mostra toast */}
        <Button
          label="COMPRAR"
          icon="pi pi-shopping-cart"
          className="w-full bg-yellow-500 border-none text-white font-bold text-base hover:bg-yellow-400"
          onClick={() => {
            addToCart(product); // Adiciona produto ao carrinho
            toast.current.show({
              severity: "success",
              summary: "Produto adicionado!",
              sticky: true,
              detail: (
                <div className="flex flex-column align-items-start" style={{ flex: 1 }}>
                  <div className="font-medium text-lg my-1 pb-3 text-900">
                    O produto <span className="font-bold">{product.name}</span> foi adicionado ao carrinho.
                  </div>
                  <Button
                    label="Ver Carrinho"
                    size="small"
                    className="p-button-sm bg-pink-600 text-white border-none hover:bg-pink-700"
                    onClick={() => navigate("/carrinho")} // Vai direto pro carrinho
                  />
                </div>
              ),
              life: 4000, // Toast fica por 40 segundos
            });
          }}
        />
      </div>
    </>
  );
};

export default BuyBox;
