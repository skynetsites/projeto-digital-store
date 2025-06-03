// Importa o que será usado: componentes e dados
import HeroSlider from "../components/HeroSlider";
import Section from "../components/Section";
import CollectionListing from "../components/CollectionListing";
import CategoryListing from "../components/CategoryListing";
import ProductListing from "../components/ProductListing";
import SpecialOfferCard from "../components/SpecialOfferCard";
import { SiteData } from "../data"; // Dados vindos de um objeto externo

const HomePage = () => {
  // Pega dados do site a partir do objeto SiteData
  const {
    home: {
      slider,
      collections: { items: collection },
      categories: { items: category },
      offers,
    },
    products: { items: product },
  } = SiteData;
  
  return (
    <>
      {/* Slider principal da página inicial */}
      <HeroSlider data={slider} />

      {/* Seção de Coleções em destaque */}
      <Section
        sectionMb={2.8}
        titleMb={1.5}
        title="Coleções em Destaque"
      >
        <CollectionListing cols={[12, 6, 4]} data={collection} />
      </Section>

      {/* Seção de Categorias em destaque */}
      <Section
        sectionMb={6}
        titleMb={1}
        title="Categorias em Destaque"
        titleAlign="center"
      >
        <CategoryListing cols={[4, 3, 2]} data={category} />
      </Section>

      {/* Seção de Produtos em destaque */}
      <Section
        title="Produtos em Alta"
        titleMb={2}
        sectionMb={3}
        link={{ text: "Ver todos", href: "/produtos" }}
      >
        <ProductListing cols={[6, 3]} data={product} numProducts={8} />
      </Section>

      {/* Seção de Oferta Especial */}
      <Section
        sectionMb={0}
        className="bg-white pt-8 pb-5 xl:pb-6"
      >
        <SpecialOfferCard data={offers} />
      </Section>
    </>
  );
};

export default HomePage;
