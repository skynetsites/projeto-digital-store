// Importa o que será usado: funções
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';

  // Função que normaliza texto tirando acento e deixando tudo minúsculo
  const normalize = (text) =>
  text?.toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "") || "";

  // Componente do grupo de filtro, pode ser checkbox ou radio
  const FilterGroup = ({ title, inputType, options, selectedValues = [], onChange }) => {
  
    // Quando muda, chama o onChange que veio de fora com o valor novo
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <div className="py-2">
      <h4 className='mt-0 mb-3'>{title}</h4>
      {/* Mapeia as opções e cria checkbox ou radio pra cada uma */}
      {options.map((option) => {
        // Checa se a opção tá selecionada (diferente pra checkbox e radio)
        const isChecked = inputType === 'checkbox'
          ? selectedValues.includes(option.value)
          : normalize(selectedValues) === normalize(option.value);

        return (
          // Label clicável com checkbox ou radio e o nome da opção
          <label key={option.value} className="flex align-items-center cursor-pointer mb-2">
            {inputType === 'checkbox' ? (
              <Checkbox 
                inputId={option.value}
                value={option.value}
                onChange={() => handleChange(option.value)}
                checked={isChecked}
                className="mr-2"
              />
            ) : (
              <RadioButton
                inputId={option.value}
                name={title}
                value={option.value}
                onChange={() => handleChange(option.value)}
                checked={isChecked}
                className="mr-2"
              />
            )}
            <span>{option.name}</span>
          </label>
        );
      })}
    </div>
  );
};

export default FilterGroup;
