import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import solveHelp from "../../store/actions/solveHelp";
import CircualarProgress from "../Loaders/CircualarProgress";

const SectionModal = ({
  editing,
  setEditing,
  helpSolve,
  pageErrors,
  pageLoaders,
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
    helpSolve(editing, setEditing);
  };
  return (
    <>
      <div className="backdrop" onClick={(_) => setEditing({})} />
      <article className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">
              <span>solve help</span>
            </div>
            <button className="modal-close-btn" onClick={(_) => setEditing({})}>
              <i className="fa fa-close" />
            </button>
          </div>
          <form className="modal-body" onSubmit={handleSubmit}>
            <div className="modal-form b-0">
              <div className="form-control">
                <textarea
                  rows="10"
                  placeholder="Enter your solve"
                  id="solution"
                  value={editing.solution}
                  onChange={handleChange}
                  required
                  className="dark"
                ></textarea>
              </div>
            </div>

            <div className="btns-container">
              <CircualarProgress condition={pageLoaders.solveHelp}>
                <button className="btn btn-primary center">submit</button>
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
  helpSolve: async (obj, setEditing) => dispatch(solveHelp(obj, setEditing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionModal);
