import { useId } from "react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export function EmptyState({ title, description, children }: EmptyStateProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="ui-empty-state">
      <p className="section-kicker">Informasi belum tersedia</p>
      <h2 id={headingId}>{title}</h2>
      <p>{description}</p>
      {children}
    </section>
  );
}
