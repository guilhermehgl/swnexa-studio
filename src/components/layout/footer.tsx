import { ArrowUpRight } from "lucide-react";
export function Footer() {
  return (
    <footer className="shell footer">
      <div>
        <a href="#" className="footer-brand">
          SWNexa Studio<span>®</span>
        </a>
        <p>Uma divisão da SWNexa. Ideias em movimento.</p>
      </div>
      <a href="#conteudo">
        Voltar ao topo <ArrowUpRight size={17} />
      </a>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} SWNexa Studio</span>
        <span>Design com intenção. Código com propósito.</span>
      </div>
    </footer>
  );
}
