import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import editDepartment from "../../store/actions/editDepartment";
import CircualarProgress from "../Loaders/CircualarProgress";

const SectionModal = ({
  editing,
  setEditing,
  departmentEdit,
  pageErrors,
  pageLoaders,
  instituteArr,
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
    departmentEdit(editing, setEditing);
  };
  return (
    <>
      <div className="backdrop" onClick={(_) => setEditing({})} />
      <article className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">
              <span>edit department</span>
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
              <div className="form-control">
                <select
                  id="institute_id"
                  required
                  onChange={handleChange}
                  value={editing.institute_id}
                >
                  <option value="">Choose institute</option>
                  {instituteArr.length >= 1 &&
                    instituteArr.map((i) => (
                      <option value={i.id}>{i.name}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className="btns-container">
              <CircualarProgress condition={pageLoaders.editDepartment}>
                {pageErrors.editDepartment === true && (
                  <div className="text-error">Failed to edit department</div>
                )}
                {pageErrors.editDepartment && pageErrors.editDepartment.msg && (
                  <div className="text-error">
                    {pageErrors.editDepartment.msg}
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
  instituteArr: state.instituteArr,
});

const mapDispatchToProps = (dispatch) => ({
  departmentEdit: async (obj, setEditing) =>
    dispatch(editDepartment(obj, setEditing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionModal);
