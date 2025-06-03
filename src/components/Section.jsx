// Importa o que será usado: funções
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Section = ({ sectionMt = 2, sectionMb = 2, titleMb = 2, title, titleAlign = 'between', link, className = '', children }) => {
  // Estado pra saber se é mobile ou não, usado pra ajustar margens
  const [isMobile, setIsMobile] = useState(false);

  // Atualiza isMobile sempre que a janela muda de tamanho
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // roda logo de cara pra definir o estado

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Define a classe pra alinhar o título conforme prop
  const justifyContentClass = titleAlign === 'center' ? 'justify-content-center' : 'justify-content-between';

  return (
    <section
      className={className}
      style={{
        marginTop: isMobile ? `calc(${sectionMt}rem / 2)` : `${sectionMt}rem`,
        marginBottom: isMobile ? `calc(${sectionMb}rem / 2)` : `${sectionMb}rem`,
      }}
    >
      <div className="max-w-75rem mx-auto p-3">
        {/* Título com alinhamento e link opcional */}
        {title && (
          <div
            className={`flex ${justifyContentClass} align-items-center`}
            style={{ marginBottom: `${titleMb}rem` }}
          >
            <h2 className="text-1xl xl:text-3xl m-0 font-bold">{title}</h2>
            {link && link.href && (
              <Link
                to={link.href}
                className="text-base text-pink-600 font-bold transition-duration-400 hover:text-pink-700 hover:underline"
              >
                <span>{link.text}</span>
                <i className="pi pi-arrow-right ml-2"></i>
              </Link>
            )}
          </div>
        )}
        {/* Conteúdo passado como filho do componente */}
        {children}
      </div>
    </section>
  );
};

export default Section;
