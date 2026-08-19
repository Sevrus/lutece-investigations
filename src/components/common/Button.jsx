export default function Button({
  as: Tag = "button",
  className = "",
  children,
  ...rest
}) {
  return (
    <Tag class={`btn-primary ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
