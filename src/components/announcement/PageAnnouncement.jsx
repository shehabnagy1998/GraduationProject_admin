import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import CircualarProgress from "../Loaders/CircualarProgress";
import SectionTable from "./SectionTable";
import getAnnouncement from "../../store/actions/getAnnouncement";
import addAnnouncement from "../../store/actions/addAnnouncement";
import NoPicIMG from "../../assets/images/no-pic.png";

const PageAnnouncement = ({
  annuncementGet,
  announcemnetAdd,
  pageLoaders,
  pageErrors,
}) => {
  const [state, setState] = useState({
    title: "",
    text: "",
    imageText: "",
    image: "",
  });
  const [errorState, setErrorState] = useState({
    image: false,
  });
  const ref = useRef(null);

  useEffect(() => {
    annuncementGet();
  }, []);

  const handleChange = (e) => {
    const id = e.target.id,
      value = e.target.value;
    setState({ ...state, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.imageText) {
      setErrorState({ ...errorState, image: true });
      return;
    }
    announcemnetAdd(state);
  };

  const handleFileChange = (e) => {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = async function () {
        let base64 = reader.result;
        // base64 = base64.replace("data:imageText/jpeg;", "");
        setState({ ...state, imageText: base64, image: file });
        setErrorState({ ...errorState, image: false });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete = (_) => {
    setState({ ...state, image: "", imageText: "" });
  };
  const ProfilePic = state.imageText ? state.imageText : NoPicIMG;

  return (
    <div className="admin-page">
      <form className="admin-section" onSubmit={handleSubmit}>
        <h1 className="title">add new announcement</h1>
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
        <div className="form-control-container">
          <div className="form-control">
            <input
              type="text"
              placeholder="Title"
              id="title"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <input
              type="tel"
              placeholder="Text"
              id="text"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="btns-container">
          <CircualarProgress condition={pageLoaders.addAnnouncement}>
            {pageErrors.addAnnouncement === true && (
              <div className="text-error">Failed to add announcement</div>
            )}
            {pageErrors.addAnnouncement && pageErrors.addAnnouncement.msg && (
              <div className="text-error">{pageErrors.addAnnouncement.msg}</div>
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
  annuncementGet: (_) => dispatch(getAnnouncement()),
  announcemnetAdd: (obj) => dispatch(addAnnouncement(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageAnnouncement);
