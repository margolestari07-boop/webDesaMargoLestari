import clsx from "clsx";

interface SectionHeadingProps {
  title: string;
  kicker?: string;
  description?: string;
  level?: "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  title,
  kicker,
  description,
  level = "h2",
  className,
}: SectionHeadingProps) {
  const Heading = level;

  return (
    <header className={clsx("ui-section-heading", className)}>
      {kicker ? <p className="section-kicker">{kicker}</p> : null}
      <Heading className="section-title">{title}</Heading>
      {description ? <p className="directory-intro">{description}</p> : null}
    </header>
  );
}
