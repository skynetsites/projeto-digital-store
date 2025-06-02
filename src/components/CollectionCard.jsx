// Importa o que será usado: funções e bibliotecas
import { Link } from "react-router-dom";
import { Image } from "primereact/image";
import { Button } from "primereact/button";

const CollectionCard = ({ badge, name, label, image, link, width, rotate, top, left }) => {

  return (
    <div className="relative xl:h-15rem h-14rem overflow-hidden border-round-lg bg-primary-100 shadow-2">
      {/* Todo o card é clicável, leva pro link da coleção */}
      <Link to={link} title={name} className="block h-full relative">
        
        {/* Mostra o badge (selo) se foi passado */}
        {badge && (
          <div
            className="absolute top-0 left-0 m-4 text-xs font-bold py-2 px-3 border-round-2xl z-2"
            style={{ backgroundColor: "#e7ff86" }}
          >
            {badge}
          </div>
        )}

        {/* Bloco inferior com nome da coleção e botão */}
        <div className="absolute left-0 bottom-0 w-full p-4 z-2 transition duration-300 ease-in">
          <h3
            className="text-4xl mt-0 mb-4 text-shadow-2 w-12rem"
            style={{ lineHeight: "2rem" }}
          >
            {name}
          </h3>

          {/* Botão que convida pra ver a coleção */}
          <Button
            label={label}
            className="inline-block px-5 border-round-lg font-bold transition-colors transition-linear duration-400 text-center bg-white text-pink-600 border-white shadow-1 hover:bg-pink-600 hover:text-white"
            style={{ paddingTop: ".7rem", paddingBottom: ".7rem" }}
          />
        </div>

        {/* Imagem posicionada e rotacionada dinamicamente */}
        <Image
          src={image}
          alt={`Imagem de ${name}`}
          imageClassName="absolute"
          imageStyle={{
            width: `${width}%`,
            transform: `rotate(${rotate}deg)`,
            top: `${top}rem`,
            left: `${left}rem`,
          }}
        />
      </Link>
    </div>
  );
};

export default CollectionCard;
