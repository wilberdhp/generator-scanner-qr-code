import './ContainerStyles.css';

export const Container = ({ children, isActive, scanner, createQR }) => {
  const createClassName = createQR ? "container create-qr" : "";
  const className = `${scanner ? "container scanner" : createClassName}`;

  return (
    <div className={isActive ? `${className} active` : className}>
      {children}
    </div>
  )
}