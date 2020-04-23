import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import editGradeYear from "../../store/actions/editGradeYear";
import CircualarProgress from "../Loaders/CircualarProgress";

const SectionModal = ({
  editing,
  setEditing,
  gradeYearEdit,
  pageErrors,
  pageLoaders,
}) => {
  const handleChange = (e) => {
    setEditing({ ...editing, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    $("body").css("overflow", "hidden");
    return () => {
      $("body").css("overflow", "auto");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    gradeYearEdit(editing, setEditing);
  };
  return (
    <>
      <div className="backdrop" />
      <article className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">
              <span>edit grade year</span>
            </div>
            <button className="modal-close-btn" onClick={(_) => setEditing({})}>
              <i className="fa fa-close" />
            </button>
          </div>
          <form className="modal-body" onSubmit={handleSubmit}>
            <div className="modal-form b-0">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Name"
                  id="name"
                  value={editing.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="btns-container">
              <CircualarProgress condition={pageLoaders.editGradeYear}>
                {pageErrors.editGradeYear === true && (
                  <div>Failed to edit grade year</div>
                )}
                {pageErrors.editGradeYear && pageErrors.editGradeYear.msg && (
                  <div className="text-error">
                    {pageErrors.editGradeYear.msg}
                  </div>
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
  isRTL: state.isRTL,
  symbol: state.symbol,
  pageLoaders: state.pageLoaders,
  pageErrors: state.pageErrors,
});

const mapDispatchToProps = (dispatch) => ({
  gradeYearEdit: async (obj, setEditing) =>
    dispatch(editGradeYear(obj, setEditing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionModal);
