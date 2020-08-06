import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import editAnnouncement from "../../store/actions/editAnnouncement";
import CircualarProgress from "../Loaders/CircualarProgress";
import NoPicIMG from "../../assets/images/no-pic2.png";
import { CDN } from "../../store/CONSTANTS";

const SectionModal = ({
  editing,
  setEditing,
  announcementEdit,
  pageErrors,
  pageLoaders,
}) => {
  const handleChange = (e) => {
    setEditing({ ...editing, [e.target.id]: e.target.value });
  };
  const ref = useRef(null);

  const handleFileChange = (e) => {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = async function () {
        let base64 = reader.result;
        // base64 = base64.replace("data:imageText/jpeg;", "");
        setEditing({ ...editing, imageText: base64, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const ProfilePic = editing.imageText
    ? editing.imageText
    : `${CDN}/${editing.image}`;

  useEffect(() => {
    $(document).scrollTop(250);
    $("body").css("overflow", "hidden");
    return () => {
      $("body").css("overflow", "auto");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    announcementEdit(editing, setEditing);
  };
  return (
    <>
      <div className="backdrop" onClick={(_) => setEditing({})} />
      <article className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">
              <span>edit announcement</span>
            </div>
            <button className="modal-close-btn" onClick={(_) => setEditing({})}>
              <i className="fa fa-close" />
            </button>
          </div>
          <form className="modal-body" onSubmit={handleSubmit}>
            <div className="modal-form b-0">
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
                  </div>
                </div>
              </div>
              <div className="form-control-container">
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Title"
                    id="title"
                    required
                    value={editing.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <input
                    type="tel"
                    placeholder="Text"
                    id="text"
                    required
                    value={editing.text}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="btns-container">
              <CircualarProgress condition={pageLoaders.editAnnouncement}>
                {pageErrors.editAnnouncement === true && (
                  <div className="text-error">Failed to edit announcement</div>
                )}
                {pageErrors.editAnnouncement &&
                  pageErrors.editAnnouncement.msg && (
                    <div className="text-error">
                      {pageErrors.editAnnouncement.msg}
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
  announcementEdit: async (obj, setEditing) =>
    dispatch(editAnnouncement(obj, setEditing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionModal);
