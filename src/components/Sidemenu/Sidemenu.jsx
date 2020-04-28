import React from "react";
import { Link } from "react-router-dom";
import * as $ from "jquery";

const Sidemenu = () => {
  const handleExpand = (id) => {
    const elem = $(`#${id}-nesting`);
    const caret = $(`#${id}-caret`);
    elem.toggleClass("active");
    if (elem.hasClass("active")) {
      elem.slideDown();
      caret.attr("class", "fa fa-caret-up");
    } else {
      elem.slideUp();
      caret.attr("class", "fa fa-caret-down");
    }
  };

  return (
    <div className="sidemenu">
      <div className="sidemenu-list">
        <div className="sidemenu-list-item">
          <Link className="list-item-text" to="/dashboard/institute">
            institute
          </Link>
        </div>
        <div className="sidemenu-list-item">
          <Link className="list-item-text" to="/dashboard/department">
            department
          </Link>
        </div>
        <div className="sidemenu-list-item">
          <Link className="list-item-text" to="/dashboard/gradeYear">
            grade year
          </Link>
        </div>
        <div
          className="sidemenu-list-item"
          onClick={(_) => handleExpand("user")}
        >
          <div className="f-jbetween-acenter pointer">
            <button className="list-item-text">user</button>
            <button className="btn-transparent">
              <i className="fa fa-caret-down" id="user-caret"></i>
            </button>
          </div>
          <div className="nesting" id="user-nesting">
            <div className="sidemenu-list-item">
              <Link className="list-item-text" to="/dashboard/user/doctor">
                doctor
              </Link>
            </div>
            <div className="sidemenu-list-item">
              <Link className="list-item-text" to="/dashboard/user/assistant">
                assistant
              </Link>
            </div>
            <div className="sidemenu-list-item">
              <Link className="list-item-text" to="/dashboard/user/student">
                student
              </Link>
            </div>
            <div className="sidemenu-list-item">
              <Link className="list-item-text" to="/dashboard/user/admin">
                admin
              </Link>
            </div>
          </div>
        </div>
        <div className="sidemenu-list-item">
          <Link className="list-item-text" to="/dashboard/course">
            courses
          </Link>
        </div>
        {/* <div className="sidemenu-list-item">
          <Link className="list-item-text" to="/">
            announcement
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Sidemenu;
