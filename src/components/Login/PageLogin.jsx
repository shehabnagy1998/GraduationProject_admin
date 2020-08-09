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
    <>
      {/* <Helmet>
        <title>EA-Study | Login</title>
        <meta charSet="utf-8" />
      </Helmet> */}
      <main className="form-pages-container">
        <form className="text-container" onSubmit={handleSubmit}>
          <h1 className="title">login</h1>

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
          <CircualarProgress condition={pageLoaders.login} effect={true}>
            <button type="submit" className="btn btn-primary btn-block">
              login
            </button>
          </CircualarProgress>
        </form>
        <article className="login-picture-container">
          <img src={BackIMG} alt="" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,224L48,229.3C96,235,192,245,288,213.3C384,181,480,107,576,101.3C672,96,768,160,864,202.7C960,245,1056,267,1152,229.3C1248,192,1344,96,1392,48L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </article>
      </main>
    </>
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
