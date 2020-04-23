import React from "react";
import { connect } from "react-redux";
import PageInstitute from "../Institute/PageInstitute";
import PageDepartment from "../Department/PageDepartment";
import PageGradeYear from "../GradeYear/PageGradeYear";
import Navbar from "../Navbar/Navbar";
import Sidemenu from "../Sidemenu/Sidemenu";
import { Switch, Route, Redirect } from "react-router-dom";

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
          {<Redirect to="/dashboard/institute" />}
        </Switch>
      </article>
    </main>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageDashboard);
