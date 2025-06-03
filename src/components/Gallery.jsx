// Importa o que será usado: funções e bibliotecas
import { useState, useEffect } from 'react';
import { Image } from 'primereact/image';

const Gallery = ({ product = {}, products }) => {
  // Pega as fotos do produto ou usa array vazio
  const photos = Array.isArray(product.photos) ? product.photos : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const icon = <i className="pi pi-search"></i>;

  // Troca a imagem com fade in/out
  const changeImage = (index) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true);
    }, 300);
  };

  // Vai pra próxima imagem (lógica meio bagunçada pra lidar com fotos ou image)
  const next = () => {
    const nextIndex =
      currentIndex === photos.length - 1
        ? 0
        : currentIndex + 1 &&
          currentIndex === product.image.length - 1
        ? 0
        : currentIndex + 1;

    changeImage(nextIndex);
  };

  // Vai pra imagem anterior (mesma lógica meio confusa do next)
  const prev = () => {
    const prevIndex =
      currentIndex === 0
        ? photos.length - 1
        : currentIndex - 1 &&
          currentIndex === 0
        ? product.image.length - 1
        : currentIndex - 1;

    changeImage(prevIndex);
  };

  // Troca pra imagem clicada se for diferente da atual
  const setImage = (index) => {
    if (index !== currentIndex) changeImage(index);
  };

  // Autoplay: troca a imagem a cada 4 segundos se tiver fotos
  useEffect(() => {
    if (!photos.length && !product.image?.length) return;
    const timer = setTimeout(next, 4000);
    return () => clearTimeout(timer);
  }, [currentIndex, photos.length, product.image?.length]);

  // Cor de fundo da imagem atual, tenta primeiro fotos, depois produtos
  const currentBgColor =
    photos[currentIndex]?.bgcolor || products.bgcolors?.[currentIndex];

  // Imagem principal da vez, tenta fotos, depois produto
  const currentImage =
    photos[currentIndex]?.image || product.image;

  return (
    <div className="flex flex-column align-items-center gap-3 w-full mb-4 xl:mb-0">

      {/* Imagem principal com zoom, transição e botões de navegação */}
      <div
        className="relative w-full border-round-xl p-3"
        style={{ backgroundColor: currentBgColor }}
      >
        <div className="flex justify-content-center align-items-center h-18rem xl:h-26rem overflow-hidden relative">
          <Image
            src={currentImage}
            zoomSrc={currentImage}
            alt="Product"
            imageClassName={`w-full transition-opacity h-auto px-5 xl:px-8 ${
              fade ? 'fadein' : 'fadeout'
            }`}
            indicatorIcon={icon}
            preview
          />
        </div>

        {/* Botão anterior */}
        <button
          onClick={prev}
          className="absolute left-0 top-50 translate-y--50 p-0 pl-2 border-none bg-transparent font-bold text-xl cursor-pointer z-2"
          aria-label="Previous image"
        >
          <i className="pi pi-angle-left text-pink-700" style={{ fontSize: '2.5rem' }}></i>
        </button>

        {/* Botão próximo */}
        <button
          onClick={next}
          className="absolute right-0 top-50 translate-y--50 p-0 pr-2 border-none bg-transparent font-bold text-xl cursor-pointer z-2"
          aria-label="Next image"
        >
          <i className="pi pi-angle-right text-pink-700" style={{ fontSize: '2.5rem' }}></i>
        </button>
      </div>

      {/* Miniaturas das imagens embaixo, até 5 */}
      <div className="flex gap-2 xl:gap-3 w-full max-w-lg">
        {[...Array(5)].map((_, idx) => {
          const item = photos[idx];
          const isActive = idx === currentIndex;
          const image = item?.image || product.image;
          const bgcolor = item?.bgcolor || products.bgcolors[idx];

          return (
            <div
              key={idx}
              onClick={() => setImage(idx)}
              className={`flex flex-column flex-1 border-round-md cursor-pointer border-2 h-4rem xl:h-6rem justify-content-center align-items-center ${
                isActive ? 'border-pink-600' : 'border-transparent'
              }`}
              style={{ backgroundColor: bgcolor }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setImage(idx)}
              aria-label={`Selecionar imagem ${idx + 1}`}
            >
              <Image
                src={image}
                alt={`thumb-${idx}`}
                imageClassName="border-round w-full h-auto px-2 xl:px-3"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
