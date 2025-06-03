// Importa o que será usado: funções, bibliotecas, componentes e dados
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import Section from "../components/Section";
import { SiteData } from "../data"; // Dados vindos de um objeto externo

const UnderConstructionPage = () => {
  // Pega dados do site a partir do objeto SiteData
  const {
    underconst: { 
      title, 
      description,
      button,
    },
  } = SiteData;

  return (
    // Componente de seção com estilos e alinhamentos aplicados
    <Section
      sectionMt={2}
      sectionMb={5}
      className="flex flex-column align-items-center justify-content-center text-center mx-auto xl:w-5"
    >
      {/* Ícone que representa a página em construção */}
      <div className="text-8xl mb-1">🚧</div>

      {/* Título e descrição, vindo do objeto de dados */}
      <h2 className="text-4xl mt-0 mb-2">{title}</h2>
      <p className="mb-5 text-lg">{description}</p>

      {/* Lista de botões com links internos, gerada a partir dos dados */}
      <div className="flex flex-column xl:flex-row w-full align-items-center justify-content-center gap-3">
        {button.map(({ link, label, icon, style }, i) => (
          <Link
            key={i}
            to={link}
            title={label}
            className="w-full xl:w-auto shadow-none"
          >
            <Button
              label={label}
              icon={icon}
              className={`w-full border-pink-600 shadow-none transition-colors transition-linear transition-duration-400 ${style} hover:bg-pink-700`}
            />
          </Link>
        ))}
      </div>
    </Section>
  );
};

export default UnderConstructionPage;
