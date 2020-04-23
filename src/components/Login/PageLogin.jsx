import React, { useState } from "react";
import { connect } from "react-redux";
import BackIMG from "../../assets/images/pic.jpg";
import { VALIDATION } from "../../store/CONSTANTS";
import login from "../../store/actions/login";
import CircualarProgress from "../Loaders/CircualarProgress";

const PageLogin = ({ pageLoaders, pageErrors, loginUser }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errorState, setErrorState] = useState({
    email: false,
    password: false,
  });
  const checkErrors = (_) => {
    for (const key in errorState) {
      if (errorState.hasOwnProperty(key)) {
        const element = errorState[key];
        if (element) return false;
      }
    }
    return true;
  };

  const handleInputValidated = (e) => {
    const id = e.target.id,
      val = e.target.value;
    if (VALIDATION[id].test(val)) {
      setErrorState({ ...errorState, [id]: false });
    } else {
      setErrorState({ ...errorState, [id]: true });
    }
    setState({ ...state, [id]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      loginUser({ ...state, role_id: 3 });
    }
  };

  return (
    <main className="login-page">
      <form onSubmit={handleSubmit} className="login-content-section">
        <h1 className="title">Login</h1>
        <div className="form-control">
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleInputValidated}
            required
          />
          {errorState.email && (
            <div className="text-error">must be like example@example.com</div>
          )}
        </div>
        <div className="form-control">
          <input
            type="password"
            placeholder="Password"
            id="password"
            required
            onChange={handleInputValidated}
          />
          {errorState.password && (
            <div className="text-error">
              must be 8 characters at least containing numbers and uppercases
            </div>
          )}
        </div>
        <CircualarProgress condition={pageLoaders.login}>
          {pageErrors.login === true && <div>Failed to login</div>}
          {pageErrors.login && pageErrors.login.msg && (
            <div className="text-error">{pageErrors.login.msg}</div>
          )}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </CircualarProgress>
      </form>
      <div className="login-img-section">
        <img src={BackIMG} alt="" />
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  pageLoaders: state.pageLoaders,
  pageErrors: state.pageErrors,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (obj) => dispatch(login(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageLogin);
