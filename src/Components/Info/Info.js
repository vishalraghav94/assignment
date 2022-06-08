import "./Info.css";

export const Info = ({ heading, title, subtitle, ...rest }) => {
  return (
    <div className="free-room-container" {...rest}>
      <h1>{heading}</h1>
      <h4>{title}</h4>
      <h5>{subtitle}</h5>
    </div>
  );
};
