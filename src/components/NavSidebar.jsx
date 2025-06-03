// Importa o que será usado: funções, bibliotecas e componentes
import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Divider } from "primereact/divider";
import MenuItems from "./MenuItems";
import ActionRegLog from "./ActionRegLog";

const NavSidebar = ({ menuheader, menu, currentPath }) => {
  // Estado que controla se a sidebar tá visível ou não
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* Ícone do hambúrguer só aparece no mobile, abre/fecha sidebar */}
      <i
        className="pi pi-bars text-dark-gray text-2xl font-normal block md:hidden cursor-pointer"
        onClick={() => setVisible((prev) => !prev)}
        aria-label="Abrir menu"
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && setVisible((prev) => !prev)
        }
      ></i>

      {/* Sidebar do PrimeReact, aparece da esquerda quando visível */}
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="left"
        className="flex flex-column justify-content-between gap-3 pt-5 px-4"
        content={() => (
          <>
            <div className="flex-1">
              {/* Título fixo do menu */}
              <h2 className="mt-0 mb-3 p-0 text-lg font-medium">PÁGINAS</h2>

              {/* Mapeia as seções do menu e renderiza os itens */}
              {menuheader.map((section, i) => (
                <ul key={i} className="list-none p-0 m-0 overflow-hidden">
                  <MenuItems
                    section={section}
                    currentPath={currentPath}
                    menuData={menu}
                    onHide={() => setVisible(false)}
                  />
                </ul>
              ))}
            </div>
            <div className="pb-3">
              <Divider className="my-4" />
              {/* Área dos botões de login e registro */}
              <div style={{textAlign: "center"}}>
                <ActionRegLog onHide={() => setVisible(false)} />
              </div>
            </div>
          </>
        )}
      />
    </>
  );
};

export default NavSidebar;
