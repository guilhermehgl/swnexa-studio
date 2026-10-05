import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./concept-return.module.css";

export function ConceptReturn() {
  return (
    <nav className={styles.bar} aria-label="Retorno ao SWNexa Studio">
      <Link className={styles.link} href="/#projetos">
        <ArrowLeft size={18} aria-hidden="true" />
        Voltar aos projetos
      </Link>
    </nav>
  );
}
