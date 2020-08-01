import React from "react";
import { connect } from "react-redux";
import PageInstitute from "../Institute/PageInstitute";
import PageDepartment from "../Department/PageDepartment";
import PageGradeYear from "../GradeYear/PageGradeYear";
import Navbar from "../Navbar/Navbar";
import Sidemenu from "../Sidemenu/Sidemenu";
import { Switch, Route, Redirect } from "react-router-dom";
import PageStudent from "../Student/PageStudent";
import PageDoctor from "../Doctor/PageDoctor";
import PageAssistant from "../Assistant/PageAssistant";
import PageAdmin from "../Admin/PageAdmin";
import PageCourse from "../Course/PageCourse";
import PageCourseAssistant from "../CourseAssistant/PageCourseAssistant";
import PageAnnouncement from "../announcement/PageAnnouncement";
import PageHelp from "../Help/PageHelp";

const PageDashboard = () => {
  return (
    <main className="main-container">
      <aside className="menu-section">
        <Sidemenu />
      </aside>
      <article className="content-section">
        <Navbar />
        <Switch>
          <Route path="/dashboard/institute" component={PageInstitute} />
          <Route path="/dashboard/department" component={PageDepartment} />
          <Route path="/dashboard/gradeYear" component={PageGradeYear} />
          <Route path="/dashboard/announcement" component={PageAnnouncement} />
          <Route path="/dashboard/course/manage" component={PageCourse} />
          <Route path="/dashboard/help" component={PageHelp} />
          <Route
            path="/dashboard/course/assistants"
            component={PageCourseAssistant}
          />
          <Route path="/dashboard/user/student" component={PageStudent} />
          <Route path="/dashboard/user/doctor" component={PageDoctor} />
          <Route path="/dashboard/user/assistant" component={PageAssistant} />
          <Route path="/dashboard/user/admin" component={PageAdmin} />
          <Redirect to="/dashboard/institute" />
        </Switch>
      </article>
    </main>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageDashboard);
