import Image from "next/image";
import { amoraImages, type AmoraImageKey } from "@/data/amora";

export function AmoraImage({
  asset,
  sizes,
  eager = false,
  className,
}: {
  asset: AmoraImageKey;
  sizes: string;
  eager?: boolean;
  className?: string;
}) {
  const image = amoraImages[asset];
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      className={className}
      style={{ objectFit: "cover" }}
    />
  );
}
