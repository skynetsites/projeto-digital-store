// Importa o que será usado: funções, componentes e dados
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Section from "../components/Section";
import ProductListing from "../components/ProductListing";
import BuyBox from "../components/BuyBox";
import Gallery from "../components/Gallery";
import { SiteData } from "../data"; // Dados vindos de um objeto externo

const ProductViewPage = () => {
  // Pega dados do site a partir do objeto SiteData
  const {
    products,
    products: { items },
  } = SiteData;
  
  // Pega o ID do produto da URL
  const { id } = useParams();

  // Busca o produto correspondente usando o ID (convertido para número)
  const product = items.find(
    (item) => item.id === parseInt(id)
  );

  return (
    <>
      {/* Seção principal com informações do produto */}
      <Section
        sectionMb={3}
      >
        {/* Caminho de navegação no topo da página */}
        <Breadcrumb product={product} />

        {/* Galeria de imagens e caixa de compra lado a lado */}
        <div className="grid">
          <div className="col">
            <Gallery product={product} products={products} />
          </div>
          <div className="col-12 xl:col-fixed xl:w-30rem">
            <BuyBox product={product} products={products} />
          </div>
        </div>
      </Section>

      {/* Seção com produtos relacionados */}
      <Section
        title="Produtos Relacionados"
        titleMb={2}
        sectionMb={2}
        link={{ text: "Ver todos", href: "/produtos" }}
      >
        <ProductListing
          cols={[6,4,3]}
          numProducts={4}
          data={items}
        />
      </Section>
    </>
  );
};

export default ProductViewPage;
