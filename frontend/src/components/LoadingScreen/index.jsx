import "./styles.css";

import PropTypes from "prop-types";

import Loading from "@/assets/animations/loading.gif";

function LoadingScreen({ children, isLoading }) {
  return (
    <div className="h-screen w-screen">
      {isLoading ? (
        <div className="loading-screen">
          <img className="loading-screen-gif" src={Loading} />
        </div>
      ) : null}
      {children}
    </div>
  );
}

LoadingScreen.propTypes = {
  children: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default LoadingScreen;
