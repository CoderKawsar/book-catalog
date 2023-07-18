import "../styles/ErrorComponent.css";

const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h2 className="error-heading">Error</h2>
        <p className="error-message">{message}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
