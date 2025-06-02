// Importa o que será usado: funções e componentes
import { useState } from "react";
import CategoryCard from "./CategoryCard";

const CategoryListing = ({ cols = [12], data }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const breakpoints = ["", "md", "lg", "xl", "xxl"];

  // Monta as classes de col (ex: col-12, md:col-6...) com base nos breakpoints
  const colClasses = cols
    .map((col, index) =>
      breakpoints[index]
        ? `${breakpoints[index]}:col-${col}`
        : `col-${col}`
    )
    .join(" ");

  return (
    <div className="scroll-container flex overflow-x-auto md:grid md:justify-content-center md:align-items-center md:overflow-visible">
      
      {/* Loop nas categorias pra renderizar cada uma */}
      {data.map((category, index) => (
        <div
          key={index}
          className={colClasses}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          style={{
            transform:
              hoverIndex === index
                ? "translateY(-0.5rem) scale(1.05)"
                : "translateY(0) scale(1)",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Componente que exibe o card da categoria */}
          <CategoryCard
            {...category}
            index={index}
            hoverIndex={hoverIndex}
            setHoverIndex={setHoverIndex}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryListing;
