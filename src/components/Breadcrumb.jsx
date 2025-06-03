// Importa o que será usado: funções
import { Link } from "react-router-dom";

const Breadcrumb = ({ product }) => {
  // Se não vier produto, não mostra nada
  if (!product) return null;

  // Puxa category, brand e nome do produto
  const { category, brand, name } = product;

  return (
    <nav aria-label="Breadcrumb" className="mb-4 line-height-1">
      {/* Linha com os itens da trilha (Home > Produtos > etc) */}
      <div className="flex flex-wrap items-center gap-1 text-lg xl:text-base text-gray-800 font-bold leading-none">
        {/* Link que leva pra Home */}
        <Link to="/" className="hover:text-pink-600 hover:underline">
          Home
        </Link>
        <span>/</span>

        {/* Link que leva pra listagem geral de produtos */}
        <Link to="/produtos" className="hover:text-pink-600 hover:underline">
          Produtos
        </Link>

        {/* Se tiver category, mostra o link dela */}
        {category?.value && (
          <>
            <span>/</span>
            <Link to={`/produtos/${category.value}`} className="hover:text-pink-600 hover:underline">
              {category.name}
            </Link>
          </>
        )}

        {/* Se tiver brand, mostra o link com filtro de brand */}
        {brand?.value && (
          <>
            <span>/</span>
            <Link to={`/produtos?brand=${brand.value}`} className="hover:text-pink-600 hover:underline">
              {brand.name}
            </Link>
          </>
        )}

        {/* Nome do produto atual (só texto, sem link) */}
        <span>/</span>
        <span aria-current="page" className="text-gray-700">
          {name}
        </span>
      </div>
    </nav>
  );
};

export default Breadcrumb;
