import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CircualarProgress from "../Loaders/CircualarProgress";
import SectionTable from "./SectionTable";
import getGradeYear from "../../store/actions/getGradeYear";
import addGradeYear from "../../store/actions/addGradeYear";

const PageGradeYear = ({
  gradeYearGet,
  gradeYearAdd,
  pageLoaders,
  pageErrors,
}) => {
  const [state, setState] = useState({
    name: "",
  });
  useEffect(() => {
    gradeYearGet();
  }, []);

  const handleChange = (e) => {
    const id = e.target.id,
      value = e.target.value;
    setState({ ...state, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    gradeYearAdd(state);
  };
  return (
    <div className="admin-page">
      <form className="admin-section" onSubmit={handleSubmit}>
        <h1 className="title">add new grade year</h1>
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
          <CircualarProgress condition={pageLoaders.addGradeYear}>
            {pageErrors.addGradeYear === true && (
              <div>Failed to add grade year</div>
            )}
            {pageErrors.addGradeYear && pageErrors.addGradeYear.msg && (
              <div className="text-error">{pageErrors.addGradeYear.msg}</div>
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
});

const mapDispatchToProps = (dispatch) => ({
  gradeYearGet: (_) => dispatch(getGradeYear()),
  gradeYearAdd: (obj) => dispatch(addGradeYear(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageGradeYear);
