// Importa o que será usado: funções e componentes
import { useState } from "react";
import CollectionCard from "./CollectionCard";

const CollectionListing = ({ cols = [12], data }) => { 
  // controla qual card tá com hover
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // breakpoints pra montar as classes
  const breakpoints = ["", "md", "lg", "xl", "xxl"];

  // Gera classes de colunas responsivas (tipo col-12, md:col-6, etc)
  const colClasses = cols
    .map((col, i) => {
      const bp = breakpoints[i];
      return bp ? `${bp}:col-${col}` : `col-${col}`;
    })
    .join(" ");

  return (
    <div className="grid">
      {/* Renderiza cada card da coleção com animação no hover */}
      {data.map((collection, index) => (
        <div
          key={index}
          className={`${colClasses}`}
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
          {/* Card da coleção com os dados recebidos */}
          <CollectionCard {...collection} />
        </div>
      ))}
    </div>
  );
};

export default CollectionListing;