import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CircualarProgress from "../Loaders/CircualarProgress";
import SectionTable from "./SectionTable";
import getDepartment from "../../store/actions/getDepartment";
import addDepartment from "../../store/actions/addDepartment";
import getInstitute from "../../store/actions/getInstitute";

const PageDepartment = ({
  departmentGet,
  departmentAdd,
  pageLoaders,
  pageErrors,
  instituteArr,
  instituteGet,
}) => {
  const [state, setState] = useState({
    name: "",
    institute_id: "",
  });
  useEffect(() => {
    instituteGet();
    departmentGet();
  }, []);

  const handleChange = (e) => {
    const id = e.target.id,
      value = e.target.value;
    setState({ ...state, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    departmentAdd(state);
  };
  return (
    <div className="admin-page">
      <form className="admin-section" onSubmit={handleSubmit}>
        <h1 className="title">add new department</h1>
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
          <select id="institute_id" required onChange={handleChange}>
            <option value="">Choose institute</option>
            {instituteArr.length >= 1 &&
              instituteArr.map((i) => (
                <option value={i.id} key={i.id}>
                  {i.name}
                </option>
              ))}
          </select>
        </div>
        <div className="btns-container">
          <CircualarProgress condition={pageLoaders.addDepartment}>
            {pageErrors.addDepartment === true && (
              <div>Failed to add department</div>
            )}
            {pageErrors.addDepartment && pageErrors.addDepartment.msg && (
              <div className="text-error">{pageErrors.addDepartment.msg}</div>
            )}
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
  instituteArr: state.instituteArr,
});

const mapDispatchToProps = (dispatch) => ({
  departmentGet: (_) => dispatch(getDepartment()),
  instituteGet: (_) => dispatch(getInstitute()),
  departmentAdd: (obj) => dispatch(addDepartment(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageDepartment);
