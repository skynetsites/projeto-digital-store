// Importa o que será usado: funções
import { Link } from 'react-router-dom'; 

const MenuItems = ({ section, currentPath, menuData, onHide }) => {
  // Se não tiver itens válidos no section, não mostra nada
  if (!Array.isArray(section.items)) return null;

  return (
    <>
      {section.items
        .map(i => menuData[i])
        .filter(Boolean)
        .map(({name, link}, i) => {
          const isActive = currentPath === link; 
          const linkClass = `${section.class} ${isActive ? section.active : section.hover}`.trim();

          return (
            <li key={i}>
              <Link 
                to={link}
                className={`inline-block relative transition-duration-400 ${linkClass}`}
                title={name}
                aria-current={isActive ? "page" : undefined}
                onClick={onHide}
              >
                {name}
              </Link>
            </li>
          );
        })}
    </>
  );
};

export default MenuItems;
