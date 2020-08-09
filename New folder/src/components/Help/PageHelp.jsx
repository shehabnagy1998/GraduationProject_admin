import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CircualarProgress from "../Loaders/CircualarProgress";
import SectionTable from "./SectionTable";
import getHelps from "../../store/actions/getHelps";
import solveHelp from "../../store/actions/solveHelp";
import getInstitute from "../../store/actions/getInstitute";

const PageHelp = ({
  helpsGet,
  helpSolve,
  pageLoaders,
  pageErrors,
  helpArr,
  instituteGet,
}) => {
  useEffect(() => {
    helpsGet();
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-section">
        <SectionTable />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pageLoaders: state.pageLoaders,
  pageErrors: state.pageErrors,
  helpArr: state.helpArr,
});

const mapDispatchToProps = (dispatch) => ({
  helpsGet: (_) => dispatch(getHelps()),
  instituteGet: (_) => dispatch(getInstitute()),
  helpSolve: (obj) => dispatch(solveHelp(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageHelp);
