import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CircualarProgress from "../Loaders/CircualarProgress";
import SectionTable from "./SectionTable";
import getCourse from "../../store/actions/getCourse";
import getDepartment from "../../store/actions/getDepartment";
import getGradeYear from "../../store/actions/getGradeYear";
import addCourse from "../../store/actions/addCourse";
import getAllUsers from "../../store/actions/getAllUsers";

const PageCourse = ({
  courseGet,
  courseAdd,
  pageLoaders,
  pageErrors,
  departmentGet,
  departmentArr,
  gradeYearGet,
  gradeYearArr,
  userArr,
  usersGetAll,
}) => {
  const [state, setState] = useState({
    name: "",
    code: "",
    total_mark: "",
    grade_year_id: "",
    department_id: "",
    doctor_code: "",
  });
  useEffect(() => {
    courseGet();
    departmentGet();
    gradeYearGet();
    usersGetAll({ role_id: 2 });
  }, []);

  const handleChange = (e) => {
    const id = e.target.id,
      value = e.target.value;
    setState({ ...state, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    courseAdd(state);
  };
  return (
    <div className="admin-page">
      <form className="admin-section" onSubmit={handleSubmit}>
        <h1 className="title">add new course</h1>
        <div className="form-control">
          <input
            type="text"
            placeholder="Code"
            id="code"
            required
            onChange={handleChange}
          />
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
              type="text"
              placeholder="Total mark"
              id="total_mark"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-control-container">
          <div className="form-control">
            <select id="doctor_code" required onChange={handleChange}>
              <option value="">Choose doctor</option>
              {userArr.length >= 1 &&
                userArr.map((i) => (
                  <option value={i.code} key={i.code}>
                    {i.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-control">
            <select id="department_id" required onChange={handleChange}>
              <option value="">Choose department</option>
              {departmentArr.length >= 1 &&
                departmentArr.map((i) => (
                  <option value={i.id} key={i.id}>
                    {i.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-control">
            <select id="grade_year_id" required onChange={handleChange}>
              <option value="">Choose grade year</option>
              {gradeYearArr.length >= 1 &&
                gradeYearArr.map((i) => (
                  <option value={i.id} key={i.id}>
                    {i.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="btns-container">
          <CircualarProgress condition={pageLoaders.addCourse}>
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
  userArr: state.userArr,
  departmentArr: state.departmentArr,
  gradeYearArr: state.gradeYearArr,
});

const mapDispatchToProps = (dispatch) => ({
  courseGet: (_) => dispatch(getCourse()),
  departmentGet: (_) => dispatch(getDepartment()),
  gradeYearGet: (_) => dispatch(getGradeYear()),
  usersGetAll: (obj) => dispatch(getAllUsers(obj)),

  courseAdd: (obj) => dispatch(addCourse(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageCourse);
