// Importa o que será usado: funções
import { useState } from "react";

const ProductOptions = ({ sizes = [], colors = [], type, shape = "circle", radius = "50%", className = "mb-2" }) => {
  // estado inicial: escolhe tamanho e cor padrão (ou null se vazio)
  const [selectedSize, setSelectedSize] = useState(sizes.length > 0 ? sizes[2] || sizes[0] : null);
  const [selectedOption, setSelectedOption] = useState(colors.length > 0 ? colors[1] || colors[0] : null);

  // define título do grupo (tamanho ou cor)
  const title = sizes.length > 0 
                ? "Tamanho" 
                : colors.length > 0 
                ? "Cor" 
                : "";

  // flags pra saber se o tipo é cor ou texto
  const isColorType = type === "color";
  const isTextType = type === "text";

  // função pra mudar tamanho selecionado
  const handleSizeClick = (size) => setSelectedSize(size);
  // função pra mudar cor/texto selecionado
  const handleOptionClick = (option) => setSelectedOption(option);

  return (
    <div className="flex flex-column gap-3">

      {/* mostra opções de tamanho clicáveis e estilizadas */}
      {sizes.length > 0 && (
        <div className="flex flex-column gap-2">
          <p className="text-base font-medium text-gray-700 m-0 mb-1">{title}</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size, index) => {
              const isSelected = selectedSize === size;

              // estilos base, selecionado e não selecionado pra tamanho
              const baseStyle = {
                width: "2.6rem",
                height: "2.6rem",
                borderRadius: "15%",
                border: "2px solid var(--surface-a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontWeight: 500,
                userSelect: "none",
              };
              const selectedStyle = {
                ...baseStyle,
                backgroundColor: "var(--pink-600)",
                color: "var(--surface-a)",
                border: "1px solid var(--pink-600)",
              };
              const unselectedStyle = {
                ...baseStyle,
                backgroundColor: "var(--surface-a)",
                color: "var(--gray-600)",
                border: "1px solid var(--gray-600)",
              };

              return (
                <div
                  key={index}
                  style={isSelected ? selectedStyle : unselectedStyle}
                  onClick={() => handleSizeClick(size)}
                  aria-pressed={isSelected}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleSizeClick(size)}
                >
                  {size}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* mostra opções de cor/texto clicáveis com estilo e seleção */}
      {colors.length > 0 && (
        <div className={`flex flex-column gap-2 ${className}`}>
          <p className="text-base font-medium text-gray-700 m-0 mb-1">{title}</p>
          <div className="flex flex-wrap align-items-center gap-2">
            {colors.map((option, index) => {
              const isSelected = selectedOption === option;

              // estilo externo e interno, formata círculo/quadrado e cor/texto
              const outerStyle = {
                borderRadius: shape === "square" ? radius : "50%",
                border: isSelected ? "2px solid var(--pink-600)" : "2px solid transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                userSelect: "none",
              };
              const innerStyle = {
                width: "2.5rem",
                height: "2.5rem",
                backgroundColor: isColorType ? option : "transparent",
                color: isTextType ? "var(--gray-800)" : "transparent",
                borderRadius: shape === "square" ? radius : "50%",
                border: "2px solid var(--surface-a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: isTextType ? 600 : undefined,
              };

              return (
                <div
                  key={index}
                  style={outerStyle}
                  onClick={() => handleOptionClick(option)}
                  aria-pressed={isSelected}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleOptionClick(option)}
                >
                  <div style={innerStyle}>
                    {isTextType ? option : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOptions;
