import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CircualarProgress from "../Loaders/CircualarProgress";
import SectionTable from "./SectionTable";
import getInstitute from "../../store/actions/getInstitute";
import addInstitute from "../../store/actions/addInstitute";

const PageInstitute = ({
  instituteGet,
  instituteAdd,
  pageLoaders,
  pageErrors,
}) => {
  const [state, setState] = useState({
    name: "",
  });
  useEffect(() => {
    instituteGet();
  }, []);

  const handleChange = (e) => {
    const id = e.target.id,
      value = e.target.value;
    setState({ ...state, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    instituteAdd(state);
  };
  return (
    <div className="admin-page">
      <form className="admin-section" onSubmit={handleSubmit}>
        <h1 className="title">add new institute</h1>
        <div className="form-control">
          <input
            type="text"
            placeholder="Name"
            id="name"
            required
            onChange={handleChange}
          />
        </div>
        <div className="btns-container">
          <CircualarProgress condition={pageLoaders.addInstitute}>
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
});

const mapDispatchToProps = (dispatch) => ({
  instituteGet: (_) => dispatch(getInstitute()),
  instituteAdd: (obj) => dispatch(addInstitute(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageInstitute);
