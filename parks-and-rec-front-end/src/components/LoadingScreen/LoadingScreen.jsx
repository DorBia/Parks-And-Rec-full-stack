import "./LoadingScreen.scss"
import { Spinner } from "react-bootstrap";

const LoadingScreen = () => {
  return (
    <div className="loading">
      <h2 className="display-1">Loading... </h2>
      <Spinner animation="border" className="loading__spinner" />
    </div>
  );
};

export default LoadingScreen;
