import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import CircualarProgress from "../Loaders/CircualarProgress";
import NoPicIMG from "../../assets/images/no-pic2.png";
import { CDN, VALIDATION } from "../../store/CONSTANTS";
import changePassword from "../../store/actions/changePassword";

const SectionModal = ({
  passwordChange,
  pageErrors,
  pageLoaders,
  changePassModal,
  setChangePassModal,
}) => {
  useEffect(() => {
    $("body").css("overflow", "hidden");
    return () => {
      $("body").css("overflow", "auto");
    };
  }, []);

  const [state, setState] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [errorState, setErrorState] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
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

  const handleChangeConfirm = (e) => {
    const id = e.target.id,
      value = e.target.value;
    if (value === state.new_password) {
      setErrorState({ ...errorState, [id]: false });
    } else {
      setErrorState({ ...errorState, [id]: true });
    }
    setState({ ...state, [id]: value });
  };

  const handleInputValidated = (e) => {
    const id = e.target.id,
      val = e.target.value;
    if (VALIDATION["password"].test(val)) {
      setErrorState({ ...errorState, [id]: false });
    } else {
      setErrorState({ ...errorState, [id]: true });
    }

    if (id === "new_password") {
      if (val === state.confirm_password) {
        setErrorState({ ...errorState, confirm_password: false });
      } else {
        setErrorState({ ...errorState, confirm_password: true });
      }
    }
    setState({ ...state, [id]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) passwordChange(state, setChangePassModal);
  };

  return (
    <>
      <div className="backdrop" />
      <article className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">
              <span>Change Password</span>
            </div>
            <button
              className="modal-close-btn"
              onClick={(_) => setChangePassModal(false)}
            >
              <i className="fa fa-close" />
            </button>
          </div>
          <form className="modal-body" onSubmit={handleSubmit}>
            <div className="modal-form b-0">
              <div className="form-control">
                <input
                  type="password"
                  placeholder="Old Password"
                  id="old_password"
                  required
                  onChange={handleInputValidated}
                />
                {errorState.old_password && (
                  <div className="text-error">
                    must be 8 characters containing numbers and uppercases
                  </div>
                )}
              </div>
              <div className="form-control">
                <input
                  type="password"
                  placeholder="New Password"
                  id="new_password"
                  required
                  onChange={handleInputValidated}
                />
                {errorState.new_password && (
                  <div className="text-error">
                    must be 8 characters containing numbers and uppercases
                  </div>
                )}
              </div>
              <div className="form-control">
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  id="confirm_password"
                  required
                  onChange={handleChangeConfirm}
                />
                {errorState.confirm_password && (
                  <div className="text-error">
                    must be same as the new password
                  </div>
                )}
              </div>
            </div>

            <div className="btns-container">
              <CircualarProgress condition={pageLoaders.changePassword}>
                {pageErrors.changePassword === true && (
                  <div className="text-error">Failed to change password</div>
                )}
                {pageErrors.changePassword && pageErrors.changePassword.msg && (
                  <div className="text-error">
                    {pageErrors.changePassword.msg}
                  </div>
                )}
                <button className="btn btn-primary center">Change</button>
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
  passwordChange: async (obj, setEditing) =>
    dispatch(changePassword(obj, setEditing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionModal);
