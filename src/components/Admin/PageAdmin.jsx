import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CircualarProgress from "../Loaders/CircualarProgress";
import SectionTable from "./SectionTable";
import getAllUsers from "../../store/actions/getAllUsers";
import register from "../../store/actions/register";
import { VALIDATION } from "../../store/CONSTANTS";

const PageAssistant = ({
  usersGetAll,
  pageLoaders,
  pageErrors,
  registerUser,
}) => {
  const [state, setState] = useState({
    code: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    role_id: 3,
  });
  useEffect(() => {
    usersGetAll({ role_id: 3 });
  }, []);
  const [errorState, setErrorState] = useState({
    email: false,
    code: false,
    name: false,
    password: false,
    phone: false,
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
  const handleChange = (e) => {
    const id = e.target.id,
      value = e.target.value;
    setState({ ...state, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      registerUser(state);
    }
  };
  return (
    <div className="admin-page">
      <form className="admin-section" onSubmit={handleSubmit}>
        <h1 className="title">add new admin</h1>
        <div className="form-control">
          <input
            type="text"
            placeholder="Code"
            id="code"
            required
            onChange={handleInputValidated}
          />
          {errorState.code && (
            <div className="text-error">must be numbers only</div>
          )}
        </div>
        <div className="form-control-container">
          <div className="form-control">
            <input
              type="text"
              placeholder="Name"
              id="name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <input
              type="tel"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleInputValidated}
            />
            {errorState.phone && (
              <div className="text-error">must be numbers only</div>
            )}
          </div>
        </div>
        <div className="form-control-container">
          <div className="form-control">
            <input
              type="email"
              placeholder="Email"
              id="email"
              required
              onChange={handleInputValidated}
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
                must be 8 characters containing numbers and uppercases
              </div>
            )}
          </div>
        </div>

        <div className="btns-container">
          <CircualarProgress condition={pageLoaders.register}>
            <button className="btn btn-primary center">create</button>
          </CircualarProgress>
        </div>
      </form>
      <div className="admin-section">
        <SectionTable />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pageLoaders: state.pageLoaders,
  pageErrors: state.pageErrors,
  gradeYearArr: state.gradeYearArr,
  departmentArr: state.departmentArr,
});

const mapDispatchToProps = (dispatch) => ({
  usersGetAll: (obj) => dispatch(getAllUsers(obj)),
  registerUser: (obj) => dispatch(register(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageAssistant);
