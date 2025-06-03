// Importa o que será usado: funções, bibliotecas, componentes e dados
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import ActionRegLog from "./ActionRegLog";
import ActionCar from "./ActionCar";
import NavSidebar from "./NavSidebar";
import SearchBar from "./SearchBar";
import MenuItems from "./MenuItems";
import { SiteData } from "../data"; // Dados vindos de um objeto externo

const Header = () => { 
  // pega a rota atual
  const location = useLocation();
  const currentPath = location.pathname;

  // Pega infos do site do objeto SiteData
  const {
    siteinfo: {
      menusections: { menuheader },
      menu,
    },
  } = SiteData;

  return (
    <header className="sticky top-0 z-5 bg-white">

      {/* Topo: logo, busca, login/cadastro e carrinho */}
      <div className="max-w-75rem mx-auto p-3">
        <div className="flex align-items-center justify-content-between md:justify-content-around md:gap-5">

          {/* Sidebar do menu aparece só no mobile */}
          <div className="block md:hidden">
            <NavSidebar menuheader={menuheader} menu={menu} currentPath={currentPath}  />
          </div>
          
          {/* Logo do site */}
          <Logo />
          
          {/* Campo de busca */}
          <SearchBar /> 

          {/* Área de login e carrinho */}
          <div className="flex align-items-center gap-3 md:gap-7">
            {/* Login/cadastro aparece só no desktop */}
            <div className="hidden md:block">
              <ActionRegLog />
            </div>
            
            {/* Ícone do carrinho */}
            <ActionCar />
          </div>
        </div>
      </div>
      
      {/* Menu principal, só aparece em tela grande */}
      <div className="hidden md:block">
        <div className="max-w-75rem mx-auto px-3">
          <div className="flex flex-wrap gap-5">
            {/* Mapeia as seções do menu e renderiza os itens */}
            {menuheader.map((section, i) => (
              <ul key={i} className="flex gap-5 m-0 p-0 list-none">
                <MenuItems
                  section={section}
                  currentPath={currentPath}
                  menuData={menu}
                />
              </ul>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
