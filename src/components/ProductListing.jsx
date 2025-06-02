// Importa o que será usado: funções e componentes
import { useState } from "react";
import ProductCard from "../components/ProductCard";

const ProductListing = ({ cols = [12], data, numProducts = 0 }) => {
  // estado pra saber qual produto tá com hover
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // breakpoints pra responsividade nas colunas
  const breakpoints = ["", "md", "lg", "xl", "xxl"];

  // monta as classes CSS das colunas conforme os breakpoints e array cols
  const colClasses = cols
    .map((col, index) =>
      breakpoints[index] ? `${breakpoints[index]}:col-${col}` : `col-${col}`
    )
    .join(" ");

  // define quantos produtos mostrar, se tiver limite
  const numProductsToShow = parseInt(numProducts, 10);
  const relatedProducts =
    numProductsToShow > 0 ? data.slice(0, numProductsToShow) : data;

  return (
    <div className="grid">
      {relatedProducts &&
        relatedProducts.map((product, index) => (
          <div
            key={product.id}
            className={`${colClasses} mb-0`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              transform:
                hoveredIndex === index
                  ? "translateY(-0.5rem) scale(1.05)"
                  : "translateY(0) scale(1)",
              transition: "transform 0.3s ease",
            }}
          >
            <ProductCard {...product} />
          </div>
        ))}
    </div>
  );
};

export default ProductListing;
