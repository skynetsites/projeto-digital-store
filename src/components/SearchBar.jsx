// Importa o que será usado: funções, bibliotecas e dados
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { SiteData } from "../data"; // Dados vindos de um objeto externo

const SearchBar = () => {
  // Estado pra controlar visibilidade da barra, texto da busca e dropdown de sugestões
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const iconRef = useRef(null);
  const op = useRef(null);

  // Pega os filtros de produtos do SiteData
  const {
    products: { filter },
  } = SiteData;

  // Abre/fecha a barra de busca no mobile
  const toggleDiv = () => {
    setVisible((prev) => !prev);
  };

  // Fecha a busca se clicar fora dele
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      op.current &&
      !op.current.contains(event.target) &&
      iconRef.current &&
      !iconRef.current.contains(event.target)
    ) {
      setVisible(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  // Normaliza texto removendo acentos, minúsculas e espaços extras pra comparar fácil
  const normalizeText = (text) =>
    text.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").trim();

  // Função que executa a busca, navega para página correta com base na query
  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      navigate("/produtos");
      setIsDropdownOpen(false);
      return;
    }

    const normalizedQuery = normalizeText(trimmedQuery);

    // Tenta achar uma category igual à query
    const categoryFound = filter.category.find(
      (cat) => normalizeText(cat.value) === normalizedQuery
    );

    // Navega pra página da category ou faz busca genérica
    if (categoryFound) {
      navigate(`/produtos/${categoryFound.value}`);
    } else {
      navigate(`/produtos?filter=${encodeURIComponent(trimmedQuery)}`);
    }

    setIsDropdownOpen(false);
  };

  // Executa busca ao apertar Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Quando usuário clica numa sugestão, seta query e navega direto
  const handleSelectSuggestion = (value) => {
    setQuery(value);
    const normalizedValue = normalizeText(value);

    const categoryFound = filter.category.find(
      (cat) => normalizeText(cat.value) === normalizedValue
    );

    if (categoryFound) {
      navigate(`/produtos/${categoryFound.value}`);
    } else {
      navigate(`/produtos?filter=${encodeURIComponent(value)}`);
    }

    setIsDropdownOpen(false);
  };

  // Junta todas as opções de filtro numa lista, tira duplicados e filtra pelas sugestões que batem com query
  const allFilterOptions = Object.values(filter)
    .flat()
    .map(({ value }) => value);

  const uniqueSuggestions = Array.from(new Set(allFilterOptions));

  const filteredSuggestions = uniqueSuggestions.filter((value) =>
    normalizeText(value).includes(normalizeText(query))
  );

  return (
    <>
      {/* Barra de busca que aparece/desaparece no mobile e responsiva */}
      <div
        ref={op}
        className="absolute left-0 top-0 w-full bg-white p-3 
          md:mt-0 md:p-0 md:static md:mt-0 md:px-0 
          md:pb-0 md:flex md:flex-1 md:relative"
          style={{ ...(visible && { marginTop: "4rem" }),  }}
          hidden={!visible}
      >
        <div className="relative w-full bg-gray-200 border-round-lg" style={{ maxWidth: "100%" }}>
          <div className="flex w-full items-center border rounded overflow-hidden">
            {/* Input de busca com controle de estado e ativação do dropdown */}
            <InputText
              type="search"
              value={query}
              onChange={(e) => {
                const value = e.target.value;
                setQuery(value);
                setIsDropdownOpen(!!value);
              }}
              onInput={(e) => {
                const value = e.target.value;
                setQuery(value);
                setIsDropdownOpen(!!value);
                if (value === "") navigate("/produtos");
              }}
              onFocus={() => setIsDropdownOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Pesquisar produto..."
              className="flex-grow bg-transparent border-none no-effect shadow-none px-3 py-2 w-11"
              autoComplete="off"
              style={{ minWidth: 0 }}
            />
            {/* Botão de busca com ícone */}
            <Button
              rounded
              text
              onClick={handleSearch}
              severity="secondary"
              aria-label="Search"
              className="no-effect border-none shadow-none"
              style={{ width: "3rem", minWidth: "3rem", height: "100%", padding: ".9rem" }}
            >
              <i className="pi pi-search xl:text-xl"></i>
            </Button>
          </div>

          {/* Dropdown com sugestões filtradas baseado no texto digitado */}
          {isDropdownOpen && query && filteredSuggestions.length > 0 && (
            <ul
              className="absolute left-0 right-0 bg-white border border-gray-300 rounded shadow mt-1 max-h-48 overflow-auto"
              style={{
                listStyleType: "none",
                paddingLeft: 0,
                marginTop: "0.25rem",
                zIndex: 20,
              }}
            >
              {filteredSuggestions.map((name) => (
                <li
                  key={name}
                  onClick={() => handleSelectSuggestion(name)}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Ícone de lupa que mostra/esconde a barra no mobile */}
      <i
        ref={iconRef}
        className="pi pi-search relative text-light-gray-2 text-xl block md:hidden cursor-pointer"
        onClick={toggleDiv}
        aria-label="Pesquisar"
        style={{ marginRight: "-1.5rem" }}
      ></i>
    </>
  );
};

export default SearchBar;
