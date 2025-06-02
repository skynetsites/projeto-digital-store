// Importa o que será usado: estilos, ícones e componentes
import "primereact/resources/themes/lara-light-blue/theme.css"
import "primeflex/themes/primeone-light.css"
import "primereact/resources/primereact.min.css" 
import "primeflex/primeflex.css"
import "primeicons/primeicons.css"
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      {/* Cabeçalho do site sempre visível no topo */}
      <Header />

      {/* Área principal que vai trocar conforme a rota */}
      <main>
        {children}
      </main>

      {/* Rodapé que aparece em todas as páginas */}
      <Footer />
    </>
  );
};

export default Layout;
