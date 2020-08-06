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
  const menuToggler = (_) => {
    const elem1 = $(".menu-section");
    const elem2 = $(".content-section");
    elem1.toggleClass("active");
    elem2.toggleClass("active");
  };

  return (
    <div className="sidemenu">
      <div className="sidemenu-list">
        <div className="sidemenu-list-item">
          <Link
            className="list-item-text"
            to="/dashboard/institute"
            onClick={menuToggler}
          >
            institute
          </Link>
        </div>
        <div className="sidemenu-list-item">
          <Link
            className="list-item-text"
            to="/dashboard/department"
            onClick={menuToggler}
          >
            department
          </Link>
        </div>
        <div className="sidemenu-list-item">
          <Link
            className="list-item-text"
            to="/dashboard/gradeYear"
            onClick={menuToggler}
          >
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
              <Link
                className="list-item-text"
                to="/dashboard/user/doctor"
                onClick={menuToggler}
              >
                doctor
              </Link>
            </div>
            <div className="sidemenu-list-item">
              <Link
                className="list-item-text"
                to="/dashboard/user/assistant"
                onClick={menuToggler}
              >
                assistant
              </Link>
            </div>
            <div className="sidemenu-list-item">
              <Link
                className="list-item-text"
                to="/dashboard/user/student"
                onClick={menuToggler}
              >
                student
              </Link>
            </div>
            <div className="sidemenu-list-item">
              <Link
                className="list-item-text"
                to="/dashboard/user/admin"
                onClick={menuToggler}
              >
                admin
              </Link>
            </div>
          </div>
        </div>
        <div
          className="sidemenu-list-item"
          onClick={(_) => handleExpand("course")}
        >
          <div className="f-jbetween-acenter pointer">
            <button className="list-item-text">Course</button>
            <button className="btn-transparent">
              <i className="fa fa-caret-down" id="course-caret"></i>
            </button>
          </div>
          <div className="nesting" id="course-nesting">
            <div className="sidemenu-list-item">
              <Link
                className="list-item-text"
                to="/dashboard/course/manage"
                onClick={menuToggler}
              >
                Manage Courses
              </Link>
            </div>
            <div className="sidemenu-list-item">
              <Link
                className="list-item-text"
                to="/dashboard/course/assistants"
                onClick={menuToggler}
              >
                Courses Assistants
              </Link>
            </div>
          </div>
        </div>
        <div className="sidemenu-list-item">
          <Link
            className="list-item-text"
            to="/dashboard/announcement"
            onClick={menuToggler}
          >
            announcement
          </Link>
        </div>
        <div className="sidemenu-list-item">
          <Link
            className="list-item-text"
            to="/dashboard/help"
            onClick={menuToggler}
          >
            help
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
