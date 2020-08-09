import React from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

const PageSpinner = ({ isRTL, symbol }) => {
  return (
    <div className="page-loader-container">
      <Loader
        type="Puff"
        color="#fcbb3b"
        height={100}
        width={100}
        //   timeout={3000} //3 secs
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isRTL: state.isRTL,
  symbol: state.symbol
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageSpinner);
