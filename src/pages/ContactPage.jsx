// Importa o que será usado: funções, bibliotecas e dados
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Section from "../components/Section";
import { SiteData } from "../data"; // Dados vindos de um objeto externo

const ContactPage = () => {
  // Pega dados do site a partir do objeto SiteData
  const {
    siteinfo: {
      social: { title: socialTitle, tblank, redes },
    },
    contact: {
      title: contactTitle,
      description,
      info: { address, email, phone },
    },
  } = SiteData;

  const toast = useRef(null); // Referência para exibir notificações

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Função que atualiza os campos conforme o usuário digita
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Função para exibir notificações com o Toast
  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  // Validação básica de formato de e-mail usando regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Lógica de envio do formulário e validação dos campos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    const { name, email, message } = formData;

    // Verificações de campos obrigatórios
    if (!name) errors.push("Nome é obrigatório.");
    if (!email) {
      errors.push("E-mail é obrigatório.");
    } else if (!isValidEmail(email)) {
      errors.push("Formato de e-mail inválido.");
    }
    if (!message) errors.push("Mensagem é obrigatória.");

    // Se houver erros, exibe Toast de erro
    if (errors?.length > 0) {
      showToast("error", "Erro no envio", errors.join("\n"));
      return;
    }

    // Envio do formulário via POST para o Formspree
    try {
      const response = await fetch("https://formspree.io/f/xjkwrqew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Sucesso: limpa o formulário e exibe Toast positivo
      if (response.ok) {
        showToast(
          "success",
          "Sucesso",
          "Sua mensagem foi enviada com sucesso!"
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error();
      }
    } catch {
      // Erro de envio
      showToast("error", "Erro", "Sua mensagem não foi enviada!");
    }
  };

  return (
    <Section
      sectionMt={3}
      sectionMb={2}
    >
      {/* Componente de notificação */}
      <Toast ref={toast} />

      {/* Cabeçalho com título e descrição */}
      <div className="flex flex-column align-items-center text-center mb-4">
        <h1 className="text-5xl text-gray-800 mt-0 mb-4">{contactTitle}</h1>
        <p className="text-lg mb-5 xl:w-7 text-gray-700 mt-0">{description}</p>
      </div>

      {/* Informações e formulário */}
      <div className="grid flex-column-reverse md:flex-row">
        {/* Informações de contato e redes sociais */}
        <div className="col-12 md:col-5">
          <Card title="Informações de Contato" className="shadow-2 h-full">
            <div className="flex flex-column gap-3">
              {Object.values({ address, email, phone }).map(
                ({ icon, name, value }, i) => {
                  // Verifica se é email ou telefone
                  const isAddress = name.toLowerCase().includes("endereço");
                  const isEmail = name.toLowerCase().includes("e-mail");
                  const isPhone = name.toLowerCase().includes("telefone");

                  // Cria o href correto
                  const href =  isAddress
                    ? `//google.com/maps/dir//${encodeURIComponent(value)}`
                    : isEmail
                    ? `mailto:${value.replace(/[^\w.@-]/g, "")}`
                    : isPhone
                    ? `tel:${value.replace(/\D/g, "")}`
                    : null;

                  return (
                    <div key={i} className="flex align-items-start">
                      <i className={`${icon} text-3xl mr-3 text-pink-600`}></i>
                      <div>
                        <h3 className="m-0">{name}</h3>
                        <p>
                          {href ? (
                            <a
                              href={href}
                              target="_blank"
                              className="transition-colors duration-400 hover:text-pink-600"
                            >
                              {value}
                            </a>
                          ) : (
                            value
                          )}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            {/* Redes sociais */}
            <div className="mt-3">
              <h3>{socialTitle}</h3>
              <div className="flex gap-2">
                {redes.map(({ link, name, icon }, i) => (
                  <Link
                    key={i} // melhor usar algo único como name do que índice
                    to={link}
                    aria-label={name}
                    role="listitem"
                    className="text-white transition-colors duration-300 hover:text-pink-600"
                    title={name}
                    target={tblank ? "_blank" : undefined}
                    rel={tblank ? "noopener noreferrer" : undefined}
                  >
                    <Button
                      icon={icon}
                      className="border-pink-600 text-pink-600 p-button-rounded p-button-outlined"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Formulário de contato */}
        <div className="col-12 md:col-7">
          <Card title="Formulário de Contato" className="shadow-2">
            <form onSubmit={handleSubmit} method="POST" className="p-fluid">
              {/* Campo Nome */}
              <div className="field mb-3">
                <label htmlFor="name" className="font-medium mb-2 block">
                  Nome
                </label>
                <InputText
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Digite seu nome completo"
                />
              </div>

              {/* Campo E-mail */}
              <div className="field mb-3">
                <label htmlFor="email" className="font-medium mb-2 block">
                  E-mail
                </label>
                <InputText
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Digite seu email"
                />
              </div>

              {/* Campo Mensagem */}
              <div className="field mb-3">
                <label htmlFor="message" className="font-medium mb-2 block">
                  Mensagem
                </label>
                <InputTextarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Digite sua mensagem"
                />
              </div>

              {/* Botão de enviar mensagem */}
              <Button
                type="submit"
                label="Enviar Mensagem"
                icon="pi pi-send"
                className="bg-pink-600 p-button-raised border-0"
              />
            </form>
          </Card>
        </div>
      </div>
    </Section>
  );
};

export default ContactPage;
