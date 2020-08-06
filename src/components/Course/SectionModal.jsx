import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import editCourse from "../../store/actions/editCourse";
import CircualarProgress from "../Loaders/CircualarProgress";

const SectionModal = ({
  editing,
  setEditing,
  courseEdit,
  pageErrors,
  pageLoaders,
  userArr,
  departmentArr,
  gradeYearArr,
}) => {
  const handleChange = (e) => {
    setEditing({ ...editing, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    $(document).scrollTop(250);
    $("body").css("overflow", "hidden");
    return () => {
      $("body").css("overflow", "auto");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    courseEdit(editing, setEditing);
  };
  return (
    <>
      <div className="backdrop" onClick={(_) => setEditing({})} />
      <article className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">
              <span>edit course</span>
            </div>
            <button className="modal-close-btn" onClick={(_) => setEditing({})}>
              <i className="fa fa-close" />
            </button>
          </div>
          <form className="modal-body" onSubmit={handleSubmit}>
            <div className="modal-form b-0">
              <div className="form-control-container">
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Name"
                    id="name"
                    value={editing.name}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Total mark"
                    id="total_mark"
                    value={editing.total_mark}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-control">
                <select
                  id="doctor_code"
                  required
                  onChange={handleChange}
                  value={editing.doctor_code}
                >
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
                <select
                  id="department_id"
                  required
                  onChange={handleChange}
                  value={editing.department_id}
                >
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
                <select
                  id="grade_year_id"
                  required
                  onChange={handleChange}
                  value={editing.grade_year_id}
                >
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
              <CircualarProgress condition={pageLoaders.editCourse}>
                {pageErrors.editCourse === true && (
                  <div className="text-error">Failed to edit course</div>
                )}
                {pageErrors.editCourse && pageErrors.editCourse.msg && (
                  <div className="text-error">{pageErrors.editCourse.msg}</div>
                )}
                <button className="btn btn-primary center">edit</button>
              </CircualarProgress>
            </div>
          </form>
        </div>
      </article>
    </>
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
  courseEdit: async (obj, setEditing) => dispatch(editCourse(obj, setEditing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionModal);
