import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import LogoIMG from "../../assets/images/el-shorouk.png";
import * as $ from "jquery";
import logout from "../../store/actions/logout";

const Navbar = ({ browseHistory, userDetails, logoutUser }) => {
  const menuToggler = (_) => {
    const elem1 = $(".menu-section");
    const elem2 = $(".content-section");
    elem1.toggleClass("active");
    elem2.toggleClass("active");
  };

  return (
    <header className={`navbar-container`}>
      <div className="nav-info">
        <button className="menu-toggler" onClick={menuToggler}>
          <i className="fa fa-bars"></i>
        </button>
        <img src={LogoIMG} alt="" className="logo-img" />
      </div>
      <div className="nav-info">
        <div className="dropdown">
          <button className="dropdown-toggler">
            {userDetails.name} <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-menu">
            {/* <button className="dropdown-item">profile-information</button> */}
            <button className="dropdown-item" onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  browseHistory: state.browseHistory,
  userDetails: state.userDetails,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: (_) => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
