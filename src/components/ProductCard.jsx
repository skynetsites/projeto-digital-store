// Importa o que será usado: funções e bibliotecas
import { Link } from "react-router-dom";
import { Image } from "primereact/image";

const ProductCard = ({ id, badge, name, image, category, price, price2 }) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* badge que destaca o produto, aparece no canto superior esquerdo */}
      {badge && (
        <div
          className="absolute top-0 left-0 m-3 text-xs text-dark-gray-2 font-bold py-1 xl:py-2 px-2 xl:px-3 border-round-2xl z-10"
          style={{ background: "#e7ff86" }}
        >
          {badge}
        </div>
      )}

      {/* link que leva pra página do produto */}
      <Link to={`/produto/${id}`} className="flex flex-column" title={name}>
        {/* imagem do produto em circulo e sombra */}
        <figure
          className="flex justify-content-center align-items-center h-12rem xl:h-17rem m-0 p-3 xl:p-5 bg-white border-round-sm"
          style={{ boxShadow: "6px 16px 30px 0px #6962620D" }}
        >
          <Image
            src={image}
            alt={name}
            style={{ objectFit: "contain", transform: "rotate(-20deg)" }}
          />
        </figure>

        {/* informações do produto: categoria, nome e preço */}
        <div className="py-2 md:py-3 pb-5 z-10 relative cursor-pointer">
          {/* categoria que pode ser string ou objeto */}
          <h3 className="text-base text-gray-500 font-semibold m-0 mb-1">
            {category?.name || category}
          </h3>

          {/* nome do produto, com corte se for muito grande */}
          <h2 className="text-xl font-medium text-dark-gray-2 m-0 mb-2 overflow-hidden text-overflow-ellipsis white-space-nowrap">
            {name}
          </h2>

          {/* preço: mostra preço normal e com desconto */}
          <div className="text-base xl:text-xl font-bold text-gray-700">
            {price2 ? (
              <>
                <span className="line-through font-semibold text-gray-500 mr-2">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(price))}
                </span>
                <span>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(price2))}
                </span>
              </>
            ) : (
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(price))}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
