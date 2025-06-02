// Importa o que será usado: funções e componentes
import { useState } from "react"; 
import { Dropdown } from 'primereact/dropdown';

const SortBy = ({ onSort }) => {
  // Opções fixas de ordenação disponíveis
  const options = [
    { name: 'mais relevantes', code: 'relevantes' },
    { name: 'menor preço', code: 'menor-preco' },
    { name: 'maior preço', code: 'maior-preco' },
  ];

  // Estado que controla a opção selecionada (começa com a primeira)
  const [selectedOption, setSelectedOption] = useState(options[0].code);

  // Atualiza estado e chama callback toda vez que muda a opção
  const handleChange = (event) => {
    const value = event.value;
    setSelectedOption(value);
    onSort(value);
  };

  // Renderiza o dropdown com opções e valor selecionado
  return (
    <Dropdown
      value={selectedOption}
      onChange={handleChange}
      options={options}
      optionLabel="name"     // texto que aparece na lista
      optionValue="code"     // valor interno selecionado
      className="w-full xl:w-11rem border-none shadow-none"
    />
  );
};

export default SortBy;
