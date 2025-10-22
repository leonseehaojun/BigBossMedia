import React from "react";
import { useInView } from "../hooks/useInView";

type Props = React.PropsWithChildren<{
  /** vertical offset in px for the entrance */
  y?: number;
  /** delay in seconds */
  delay?: number;
  /** optional className passthrough */
  className?: string;
}>;

export default function Reveal({ children, y = 16, delay = 0, className }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15, once: true });

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className || ""}`}
      style={{ ["--y" as any]: `${y}px`, ["--d" as any]: `${delay}s` }}
    >
      {children}
    </div>
  );
}
