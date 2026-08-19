import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function Reveal({ children, className = "", as: Tag = "div", ...rest }) {
  const ref = useScrollReveal();
  return (
    <Tag ref={ref} class={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
