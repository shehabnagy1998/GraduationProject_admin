import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import CircualarProgress from "../Loaders/CircualarProgress";
import SectionTable from "./SectionTable";
import getCourse from "../../store/actions/getCourse";
import listAssistants from "../../store/actions/listAssistants";
import assignAssistants from "../../store/actions/assignAssistants";
import getAllUsers from "../../store/actions/getAllUsers";
import listAll from "../../store/actions/listAll";

const PageCourseAssistant = ({
  courseGet,
  assistantAssign,
  pageLoaders,
  pageErrors,
  courseArr,
  userArr,
  usersGetAll,
  assistantList,
  courseAssistants,
  allList,
}) => {
  const [state, setState] = useState({
    course_code: "",
    assistant_codes: [],
  });
  useEffect(() => {
    courseGet();
    usersGetAll({ role_id: 1 });
    allList();
  }, []);
  useEffect(() => {
    if (courseAssistants.length >= 1) {
      let arr = courseAssistants.map((i) => ({
        value: i.assistant_code,
        label: i.name,
      }));
      setState({ ...state, assistant_codes: arr });
    }
  }, [courseAssistants]);

  const handleChange = (e) => {
    const id = e.target.id,
      value = e.target.value;
    assistantList(value);
    setState({ ...state, [id]: value });
  };

  const handleMulti = (val) => {
    // let valArr = val.map((i) => i.value);
    setState({ ...state, assistant_codes: val });
  };

  const changeToMulti = (arr, value, label) => {
    return arr.map((i) => ({ value: i[value], label: i[label] }));
  };

  // const checkErrors = (_) => {
  //   for (const key in errorState) {
  //     if (errorState.hasOwnProperty(key)) {
  //       const element = errorState[key];
  //       if (element) return false;
  //     }
  //   }
  //   return true;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      course_code: state.course_code,
      assistant_codes: state.assistant_codes.map((i) => i.value),
    };
    // if (checkErrors()) {
    assistantAssign(obj);
    // }
  };

  const animatedComponents = makeAnimated();
  console.log(state);
  return (
    <div className="admin-page">
      <form className="admin-section" onSubmit={handleSubmit}>
        <h1 className="title">Assign Assistant</h1>

        <div className="form-control-container">
          <div className="form-control">
            <select id="course_code" required onChange={handleChange} required>
              <option value="">Choose course</option>
              {courseArr.length >= 1 &&
                courseArr.map((i) => (
                  <option value={i.code} key={i.id}>
                    {i.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-control">
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              value={state.assistant_codes}
              onChange={handleMulti}
              options={changeToMulti(userArr, "code", "name")}
              placeholder="Choose assistants"
              className="custom-select"
            />
          </div>
        </div>
        <div className="btns-container">
          <CircualarProgress condition={pageLoaders.assignAssistants}>
            {pageErrors.assignAssistants === true && (
              <div className="text-error">Failed to assign assistants</div>
            )}
            {pageErrors.assignAssistants && pageErrors.assignAssistants.msg && (
              <div className="text-error">
                {pageErrors.assignAssistants.msg}
              </div>
            )}
            <button className="btn btn-primary center">Assign</button>
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
  courseArr: state.courseArr,
  courseAssistants: state.courseAssistants,
});

const mapDispatchToProps = (dispatch) => ({
  courseGet: (_) => dispatch(getCourse()),
  usersGetAll: (obj) => dispatch(getAllUsers(obj)),

  assistantAssign: (obj) => dispatch(assignAssistants(obj)),
  assistantList: (code) => dispatch(listAssistants(code)),
  allList: () => dispatch(listAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageCourseAssistant);
