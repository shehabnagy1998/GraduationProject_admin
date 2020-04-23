import React from "react";
import { connect } from "react-redux";

const CircualarProgress = ({
  isRTL,
  symbol,
  condition,
  children,
  effect,
  className
}) => {
  return (
    <div
      className={`loading-container ${className}`}
      style={{ width: effect ? "100%" : "auto" }}
    >
      {condition ? (
        <div className={`loader ${effect ? "mb-4" : ""}`}>
          <i className="fa fa-spinner fa-pulse"></i>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  isRTL: state.isRTL,
  symbol: state.symbol
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CircualarProgress);
