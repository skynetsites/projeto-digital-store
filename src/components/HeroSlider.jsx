// Importa o que será usado: funções e bibliotecas
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';

const HeroSlider = ({ data }) => {
  // Pega os itens do slider do data
  const { items } = data;
  const navigate = useNavigate();
  
  // controla índice da imagem ativa
  const [index, setIndex] = useState(0);

  // Função pra ir pra próxima imagem, volta pro começo no fim
  const next = () => setIndex((prev) => (prev + 1) % items.length);

  // Autoplay que troca a imagem a cada 4 segundos
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full mb-4 xl:mb-5 overflow-hidden bg-gray-100">
      {/* Container principal do slider, altura fixa */}
      <div className="relative max-w-75rem mx-auto p-3 xl:h-30rem" style={{ height: '43rem' }}>
        {/* Mapeia os slides */}
        {items.map(({ subtitle, title, description, link, label, image, width, rotate, }, i) => {
          // Só mostra o slide ativo e o anterior (pra transição ficar suave)
          if (i !== index && i !== (index - 1 + items.length) % items.length) return null;
          const isActive = i === index;

          return (
            // Slide com fadein/fadeout
            <div key={i} className={`absolute top-0 left-0 w-full h-full ${isActive ? 'fadein' : 'fadeout'}`}>
              <div className="flex flex-column-reverse xl:flex-row align-items-center justify-content-center xl:justify-content-around relative h-full">
                {/* Texto do slide: subtítulo, título, descrição e botão */}
                <div className="text-center md:text-left flex-shrink-0 w-11 xl:w-5" style={{ flex: '0 0 45%' }}>
                  <span className="inline-block text-pink-600 text-lg font-bold mb-2">{subtitle}</span>
                  <h3 className="mt-0 mb-2 text-gray-900 text-5xl line-height-1 xl:text-7xl xl:w-11">{title}</h3>
                  <p className="mb-5 text-gray-800 text-lg xl:w-11">{description}</p>
                  <Button
                    label={label}
                    onClick={() => navigate(link)} // navega pra link ao clicar
                    className="w-full xl:w-auto xl:px-6 bg-pink-600 text-white text-sm font-normal border-none shadow-none transition-colors transition-linear transition-duration-400 hover:bg-pink-700"
                  />
                </div>

                {/* Imagem do slide, com estilo e rotação */}
                <figure className="flex pr-0 xl:pr-8 justify-content-center align-items-center z-5 flex-shrink-0 w-10 xl:w-5 m-0 relative" style={{ flex: '0 0 50%' }}>
                  <Image
                    src={image}
                    alt={title}
                    imageClassName='mr-0 xl:mr-9'
                    style={{ width: `${width}rem`, marginLeft: '-2rem', objectFit: 'contain', transform: `rotate(${rotate}deg)` }}
                  />
                </figure>

                {/* Circulo decorativo no canto */}
                <div
                  className="absolute right-0 z-1 border-circle"
                  style={{
                    top: '2.5rem',
                    width: '9.375rem',
                    height: '9.375rem',
                    backgroundImage: 'radial-gradient(var(--yellow-400) 2px, transparent 2px)',
                    backgroundSize: '0.9375rem 0.9375rem',
                    animation: 'fadeIn 1s ease',
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botões de navegação abaixo do slider */}
      <div className="flex justify-content-center align-items-center w-full gap-2 relative z-1 mb-5 xl:mb-6 transform -translate-x-1/2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)} // próximo slide ao clicar no botão
            className={`w-1rem h-1rem border-circle border-round border-none cursor-pointer hover:bg-pink-600 ${index === i ? 'bg-pink-600' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
