// Importa o que será usado: funções, componentes, páginas e dados
import { useEffect } from "react";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductViewPage from "./pages/ProductViewPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnderConstructionPage from "./pages/UnderConstructionPage";
import ContactPage from "./pages/ContactPage";
import { createGlobalStyle } from "styled-components";
import { SiteData } from "./data";  // Dados vindos de um objeto externo

// Define estilos globais que valem pra todas as páginas
export const GlobalStyle = createGlobalStyle`
  // Reset de estilos básicos
  *, *::before, *::after {
    outline: none;
    list-style: none;
    box-sizing: border-box;
  }

  // Estilo base do body
  body {
    background-color: var(--gray-50);
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.4;
    overflow-x: hidden;
  }

  // Remove sublinhado de links
  a {
    text-decoration: none;
    color: inherit;
  }

  // Remove margin/padding de listas
  ul, ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  // Garante que imagens ocupem largura total
  img {
    width: 100%;
    height: auto;
  }

  // Algumas classes utilitárias personalizadas
  .max-w-36rem { max-width: 36rem; }
  .max-w-75rem { max-width: 75rem; }
  .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .rotate-340 { transform: rotate(330deg) !important; }
  .no-effect:focus, .no-effect:active {
    background-color: transparent !important;
    border: none !important;
  }
  .no-effect:focus { outline: none !important; }
  .p-sidebar-mask { padding-top: 4.6rem!important; z-index: 3 !important; }

  // Animações para entrada/saída de componentes
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeSlideOut {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(-30px); }
  }
  .fadein {
    animation: fadeSlideIn 0.6s ease forwards;
    z-index: 2;
  }
  .fadeout {
    animation: fadeSlideOut 0.6s ease forwards;
    z-index: 1;
  }

  // Scroll horizontal sem barra visível
  .scroll-container {
    overflow-x: auto;
    scrollbar-width: none;
  }
  .scroll-container::-webkit-scrollbar {
    height: 0;
    transition: height 0.3s ease;
  }
  .scroll-container:hover::-webkit-scrollbar { height: 8px; }
  .scroll-container::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.3);
    border-radius: .25rem;
  }

  // Estilo dos checkboxes e radio buttons (PrimeReact)
  .p-checkbox .p-checkbox-box,
  .p-radiobutton .p-radiobutton-box {
    border: .12rem solid var(--gray-600);
    transition: all 0.2s;
  }

  .p-checkbox .p-checkbox-box {
    border-radius: .25rem;
  }

  .p-checkbox.p-highlight .p-checkbox-box,
  .p-radiobutton.p-highlight .p-radiobutton-box {
    border-color: var(--pink-600);
    background: var(--pink-600);
    color: var(--surface-a);
  }

  .p-checkbox .p-checkbox-box .p-checkbox-icon,
  .p-radiobutton .p-radiobutton-box .p-radiobutton-icon {
    color: var(--surface-a);
  }

  .p-checkbox.p-highlight .p-checkbox-box .p-checkbox-icon,
  .p-radiobutton.p-highlight .p-radiobutton-icon {
    color: var(--surface-a);
  }

  // Deixa borda rosa quando o label está com hover
  label:hover .p-checkbox .p-checkbox-box,
  label:hover .p-radiobutton .p-radiobutton-box {
    border-width: .2rem;
    border-color: var(--pink-600);
  }

  // Ajustes visuais em dropdowns e preview de imagens
  .p-dropdown {
    & .p-dropdown-label { padding: .6rem 0; }
    & .p-dropdown-trigger { width: 2rem; }
  }
  .p-image-preview-indicator {
    background-color: transparent;
    & i {
      font-size: 2rem;
      padding: 3rem;
      background-color: var(--pink-600);
      color: var(--surface-a);
      opacity: 0.6;
      border-radius: 50%;
    }
  }
  .p-dropdown-panel { 
    & .p-dropdown-items {
      & .p-dropdown-item {
        &.p-highlight {
          color: var(--pink-600);
        }
      }
    }
  }
`;

// Componente principal da aplicação
const App = () => {
  // Puxa os dados do SiteData com desestruturação (evita repetir "SiteData." mil vezes)
  const {
    products: { items: product },
    products: {
      filter: { category },
    },
    siteinfo: { menu, name: siteName },
  } = SiteData;

  // Pega o caminho atual da URL
  const location = useLocation();
  const path = location.pathname;

  // Verifica se a página está em construção
  const isUnderConstruction = menu.some((route) => route.link === path);

  // Checa se a rota acessada é válida
  const isValidRoute = (path) => {
    const menuLinks = menu.map((item) => item.link);
    const extraRoutes = ["/produto/:id", "/produtos/:category"];
    return [...menuLinks, ...extraRoutes].some((pattern) =>
      matchPath({ path: pattern, end: true }, path)
    );
  };

  // Função para fazer a página rolar suavemente pro topo
  const smoothScrollToTop = (duration) => {
    const start = window.scrollY;
    const startTime = performance.now();

    const step = (t) => {
      const p = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      window.scrollTo(0, start * (1 - eased));
      if (p < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  // Executa sempre que muda de rota
  useEffect(() => {
    // Sobe a tela suavemente
    smoothScrollToTop(1500);

    // Carrega fontes/ícones externos se ainda não estão carregados
    const links = [
      {
        id: "tabler-icons",
        href: "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css",
      },
      {
        id: "font-awesome",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
      },
    ];

    links.forEach(({ id, href }) => {
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.id = id;
        document.head.appendChild(link);
      }
    });

    // Define o título da aba com base na URL
    const url = new URL(window.location.href);
    const path = url.pathname;
    const searchParams = new URLSearchParams(url.search);
    let titleBase = "";

    // Página de produto individual
    if (matchPath({ path: "/produto/:id", end: true }, path)) {
      const id = path.split("/")[2];
      const foundProduct = product.find(
        (item) => String(item.id) === String(id)
      );
      titleBase = foundProduct ? foundProduct.name : "Produto não encontrado";
    }
    // Página de listagem por category
    else if (matchPath({ path: "/produtos/:category", end: true }, path)) {
      const categoryPath = path.split("/")[2];
      const categoryItem = category?.find(
        (item) => item.value === categoryPath
      );

      const brand = searchParams.get("brand");
      const gender = searchParams.get("gender");
      const condition = searchParams.get("condition");
      const subcategorys = searchParams.getAll("cat");

      const partes = [];
      if (categoryItem) partes.push(categoryItem.name);
      if (brand) partes.push(capitalize(brand));
      if (gender) partes.push(capitalize(gender));
      if (condition) partes.push(capitalize(condition));
      if (subcategorys.length) partes.push(...subcategorys.map(capitalize));

      titleBase = partes.length
        ? partes.join(" - ")
        : "Categoria não encontrada";
    }
    // Outras rotas normais
    else {
      const routeTitleFromMenu = menu.find((item) => item.link === path)?.name;

      if (routeTitleFromMenu) {
        titleBase = routeTitleFromMenu;
      } else if (isUnderConstruction) {
        titleBase = "Página em Construção";
      } else if (!isValidRoute(path)) {
        titleBase = "404 - Página não Encontrada";
      } else {
        titleBase = ""; // Exibe só o nome do site
      }
    }

    // Aplica o sufixo do nome do site
    document.title = titleBase ? `${titleBase} | ${siteName}` : siteName;

    // Função pra capitalizar palavras (primeira letra maiúscula)
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Remove os links adicionados ao sair da página
    return () => {
      links.forEach(({ id }) => {
        const existing = document.getElementById(id);
        if (existing) {
          existing.remove();
        }
      });
    };
  }, [location]);

  // Aqui define as rotas do app
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProductListingPage />} />
          <Route path="/produtos/:category" element={<ProductListingPage />} />
          <Route path="/produto/:id" element={<ProductViewPage />} />
          <Route path="/contato" element={<ContactPage />} />
          {isUnderConstruction &&
            menu
              .slice(2, 14)
              .map(({link}, i) => (
                <Route
                  key={i}
                  path={link}
                  element={<UnderConstructionPage />}
                />
              ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
