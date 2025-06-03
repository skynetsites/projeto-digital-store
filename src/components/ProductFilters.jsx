// Importa o que será usado: biblioteca, componentes e dados
import { Divider } from "primereact/divider";
import FilterGroup from "../components/FilterGroup";
import { SiteData } from "../data"; // Dados vindos de um objeto externo

// pega os filtros do SiteData (Marca, Categoria, Gênero e Condição)
const {
  products: {
    filter: { brand, category, gender, condition },
  },
} = SiteData;

const filterTitle = [ "Marca", "Categoria", "Gênero", "Condição" ];

// junta os filtros numa variável só pra facilitar
const filtersRaw = { brand, category, gender, condition };

const ProductFilters = ({ filters = {}, updateFilter }) => {
  return (
    <>
      <h3 className="my-3 md:mt-0">Filtrar por</h3>
      <Divider className="mt-0 mb-3" />

      {/* renderiza grupo de filtros dinamicamente pra cada tipo */}
      {Object.entries(filtersRaw).map(([key, options], i) => {
        const filterKey = key === "category" ? "categorys" : key;
        const inputType = key === "condition" ? "radio" : "checkbox";
        const selectedValues =
          inputType === "radio"
            ? filters[filterKey]
              ? [filters[filterKey]]
              : []
            : filters[filterKey] || [];

        return (
          <FilterGroup
            key={key}
            title={filterTitle[i]} // ✅ usa o título correto com base na ordem
            inputType={inputType}
            options={options}
            selectedValues={selectedValues}
            onChange={(val) => updateFilter(filterKey, val)}
          />
        );
      })}
    </>
  );
};

export default ProductFilters;
