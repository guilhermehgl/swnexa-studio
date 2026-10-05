import styles from "./volt.module.css";

// Code-native poster studies. A single component is the asset replacement point.
export function VoltGraphic({
  kind,
  className = "",
}: {
  kind: "rings" | "bars" | "star" | "grid";
  className?: string;
}) {
  return (
    <div
      className={`${styles.graphic} ${styles[kind]} ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: kind === "star" ? 8 : 6 }, (_, index) => (
        <i key={index} style={{ "--i": index } as React.CSSProperties} />
      ))}
    </div>
  );
}
