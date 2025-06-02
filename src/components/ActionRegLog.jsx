// Importa o que será usado: funções e dados
import { Link } from "react-router-dom";
import { SiteData } from "../data"; // Dados vindos de um objeto externo

const ActionRegLog = ({onHide}) => {
  // Pega os menus direto do objeto SiteData
  const {
    siteinfo: {
      menu, // Pega o array com os itens do menu
    },
  } = SiteData;

  // Seleciona só os itens 11 e 12 do menu (Login e Cadastrar)
  const menuItems = menu.slice(11, 13);

  return (
    <div className="flex xl:flex-row flex-column-reverse align-items-center xl:gap-3 relative">
      {/* Renderiza os botões de login e cadastro com link */}
      {menuItems.map(({ link, name, style }, i) => (
        <Link
          key={i}
          to={link}
          className={`inline-block border-none shadow-none transition-colors transition-linear transition-duration-400 w-full xl:w-max mb-3 xl:m-0 ${style || ""}`}
          title={name}
          onClick={onHide}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};

export default ActionRegLog;
