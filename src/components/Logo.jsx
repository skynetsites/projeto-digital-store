// Importa o que será usado: funções e dados
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SiteData } from "../data"; // Dados vindos de um objeto externo

const Logo = ({ isWhite }) => {
  // Estado pra saber se tá no mobile (tela menor que 768px)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  // Pega o nome e ícone do site direto dos dados fixos
  const {
    siteinfo: { name, icon },
  } = SiteData;

  // Detecta resize da tela pra atualizar isMobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      // só atualiza estado se realmente mudou (pra evitar rerender desnecessário)
      setIsMobile(prev => (prev !== mobile ? mobile : prev));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Retorna o link do logo, com ícone e nome, muda cor e tamanho conforme props e tela
  return (
    <Link
      to="/"
      className={`flex align-items-center gap-1 ${isWhite ? "text-white" : "text-pink-600"}`}
      title={name}
      style={{ fontSize: isMobile ? "2rem" : "2.4rem" }}
    >
      <i className={icon}></i>
      <span className="font-semibold">{name}</span>
    </Link>
  );
};

export default Logo;