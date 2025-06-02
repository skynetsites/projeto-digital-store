// Importa o que será usado: funções e bibliotecas
import { Link } from "react-router-dom";
import { Image } from 'primereact/image';

const CategoryCard = ({ name, image, link, index, hoverIndex, setHoverIndex }) => {
  // Verifica se o card está "ativo" (hover ou é o primeiro da lista)
  const isActive = hoverIndex === null ? index === 0 : hoverIndex === index;

  return (
    <Link
      to={link}
      className="flex flex-column align-items-center text-center px-3 xl:px-0"
      title={name}
      onMouseEnter={() => setHoverIndex(index)}
      onMouseLeave={() => setHoverIndex(null)}
    >
      {/* Círculo com a imagem da categoria, com sombra se estiver ativo */}
      <figure
        className="flex justify-content-center align-items-center bg-white border-circle w-7rem xl:w-8rem h-7rem xl:h-8rem"
        style={{
          boxShadow: isActive ? "0px 4px 25px 0px #0000000D" : "none",
        }}
      >
        <Image
          src={image}
          alt={name}
          style={{
            filter: isActive ? "none" : "grayscale(100%) brightness(1.5)",
            transform: isActive ? "scale(1.05)" : "scale(1)",
            transition: "filter 0.3s ease, transform 0.3s ease",
          }}
        />
      </figure>

      {/* Nome da categoria com destaque e zoom no hover */}
      <figcaption
        className="pb-0 z-2 relative cursor-pointer text-base font-semibold m-0"
        style={{
          color: isActive ? "var(--pink-600)" : "var(--gray-800)",
          transform: isActive ? "scale(1.05)" : "scale(1)",
          transition: "color 0.3s ease-in-out, transform 0.3s ease-in-out",
          marginTop: '-5px',
        }}
      >
        {name}
      </figcaption>
    </Link>
  );
};

export default CategoryCard;
