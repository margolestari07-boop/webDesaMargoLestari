export function FieldError({
  id,
  children,
}: {
  id?: string;
  children?: string;
}) {
  if (!children) return null;

  return (
    <p className="ui-field-error" id={id} role="alert">
      {children}
    </p>
  );
}
