import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import CircualarProgress from "../Loaders/CircualarProgress";
import SectionTable from "./SectionTable";
import changeInfo from "../../store/actions/changeInfo";
import NoPicIMG from "../../assets/images/no-pic.png";
import Navbar from "../Navbar/Navbar";
import { VALIDATION, CDN } from "../../store/CONSTANTS";
import SectionModal from "./SectionModal";

const PageMyProfile = ({
  infoChange,
  announcemnetAdd,
  pageLoaders,
  pageErrors,
  userDetails,
}) => {
  const [state, setState] = useState({
    email: "",
    name: "",
    phone: "",
    imageText: "",
    profile_image: "",
  });

  const [changePassModal, setChangePassModal] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (userDetails.code) {
      const IMG = userDetails.profile_image
        ? `${CDN}/${userDetails.profile_image}`
        : "";
      setState({
        email: userDetails.email,
        name: userDetails.name,
        phone: userDetails.phone,
        imageText: IMG,
      });
    }
  }, [userDetails]);
  const [errorState, setErrorState] = useState({
    email: false,
    name: false,
    phone: false,
    profile_image: false,
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

  const handleChange = (e) => {
    const id = e.target.id,
      value = e.target.value;
    setState({ ...state, [id]: value });
  };
  const handleInputValidated = (e) => {
    const id = e.target.id,
      val = e.target.value;
    if (VALIDATION[id].test(val)) {
      setErrorState({ ...errorState, [id]: false });
    } else {
      setErrorState({ ...errorState, [id]: true });
    }
    setState({ ...state, [id]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.imageText) {
      setErrorState({ ...errorState, profile_image: true });
      return;
    }
    if (checkErrors()) infoChange(state);
  };

  const handleFileChange = (e) => {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = async function () {
        let base64 = reader.result;
        // base64 = base64.replace("data:imageText/jpeg;", "");
        setState({ ...state, imageText: base64, profile_image: file });
        setErrorState({ ...errorState, profile_image: false });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete = (_) => {
    setState({ ...state, profile_image: "", imageText: "" });
  };
  const ProfilePic = state.imageText ? state.imageText : NoPicIMG;
  console.log(userDetails);
  return (
    <main className="main-container">
      <aside className="menu-section"></aside>
      <article className="content-section">
        <Navbar NoBTN={true} />
        <div className="admin-page">
          <form className="admin-section" onSubmit={handleSubmit}>
            <div className="picture-container">
              <div className="picture-content">
                <img src={ProfilePic} alt="" />
                <input
                  type="file"
                  ref={ref}
                  style={{ display: "none" }}
                  accept="imageText/*"
                  onChange={handleFileChange}
                />
                <div className="img-overlay">
                  <button type="button" onClick={(_) => ref.current.click()}>
                    upload
                  </button>
                  <button type="button" onClick={handleDelete}>
                    delete
                  </button>
                </div>
              </div>
              {errorState.image && (
                <div className="text-error">
                  Please choose image by clicking the above picture
                </div>
              )}
            </div>
            <div className="form-control">
              <input
                type="email"
                placeholder="Email"
                id="email"
                required
                onChange={handleInputValidated}
                style={{ textAlign: "center" }}
                value={state.email}
              />
              {errorState.code && (
                <div className="text-error">
                  must be like example@example.com
                </div>
              )}
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="Name"
                id="name"
                required
                onChange={handleChange}
                style={{ textAlign: "center" }}
                value={state.name}
              />
            </div>
            <div className="form-control">
              <input
                type="tel"
                placeholder="Phone"
                id="phone"
                required
                onChange={handleInputValidated}
                style={{ textAlign: "center" }}
                value={state.phone}
              />
              {errorState.phone && (
                <div className="text-error">must be numbers only</div>
              )}
            </div>
            <div className="btns-container center">
              <CircualarProgress condition={pageLoaders.changeInfo}>
                {pageErrors.changeInfo === true && (
                  <div className="text-error">Failed to edit user info</div>
                )}
                {pageErrors.changeInfo && pageErrors.changeInfo.msg && (
                  <div className="text-error">{pageErrors.changeInfo.msg}</div>
                )}
                <button className="btn btn-primary center  ">edit</button>
              </CircualarProgress>
              <button
                type="button"
                onClick={(_) => setChangePassModal(true)}
                className="btn btn-danger center mx-3"
              >
                change password
              </button>
            </div>
          </form>
        </div>
      </article>
      {changePassModal && (
        <SectionModal
          changePassModal={changePassModal}
          setChangePassModal={setChangePassModal}
        />
      )}
    </main>
  );
};

const mapStateToProps = (state) => ({
  pageLoaders: state.pageLoaders,
  pageErrors: state.pageErrors,
  userDetails: state.userDetails,
});

const mapDispatchToProps = (dispatch) => ({
  infoChange: (obj) => dispatch(changeInfo(obj)),
  announcemnetAdd: (obj) => dispatch(changeInfo(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageMyProfile);
