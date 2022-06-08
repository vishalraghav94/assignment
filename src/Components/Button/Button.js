import "./Button.css";

export const Button = ({ onClick, children, ...props }) => {
  return (
    <button {...props} className="button" onClick={onClick}>
      {children}
    </button>
  );
};
