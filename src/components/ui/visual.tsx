import Image from "next/image";
import type { VisualAsset } from "@/data/content";
export function Visual({
  asset,
  compact = false,
}: {
  asset: VisualAsset;
  compact?: boolean;
}) {
  return (
    <div
      className={`visual visual-${asset.theme} ${compact ? "visual-compact" : ""}`}
    >
      {asset.src ? (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes="(max-width: 760px) 100vw, 80vw"
          className="object-cover"
        />
      ) : (
        <>
          <div className="visual-grid" aria-hidden="true" />
          <div className="sculpture" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className="visual-top">SWN / EXPERIMENTAL SERIES</span>
          <span className="visual-word" aria-hidden="true">
            {asset.theme === "studio"
              ? "Forma. Função."
              : asset.theme === "fluxio"
                ? "fluxio"
                : "produtiv"}
          </span>
          <span className="visual-caption">
            Estudo visual · imagem em preparação
          </span>
          <span className="visual-index" aria-hidden="true">
            {asset.theme === "produtiv" ? "02" : "01"} / STUDIO
          </span>
        </>
      )}
    </div>
  );
}
