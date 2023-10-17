
import './loading.css'; // You can create a CSS file for your component styles

function LoaderComponent() {
  return (
    <div className="container">
      <div className="row">
        <div id="loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="loading"></div>
        </div>
      </div>
    </div>
  );
}

export default LoaderComponent;
