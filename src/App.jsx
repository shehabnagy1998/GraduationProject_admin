import React, { useEffect } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import PageLogin from "./components/Login/PageLogin";
import { REDUX_BROWSE_HISTORY } from "./store/CONSTANTS";
import PageDashboard from "./components/Dashboard/PageDashboard";
import PageSpinner from "./components/Loaders/PageSpinner";

function App({ pageLoaders, browseHistorySet, userDetails }) {
  const browseHistory = useHistory();
  useEffect(() => {
    browseHistorySet(browseHistory);
  }, []);

  return (
    <>
      {pageLoaders.logout && <PageSpinner />}
      <ToastContainer />
      <Switch>
        {!userDetails.code && (
          <Route path="/login" exact component={PageLogin} />
        )}
        {userDetails.code && (
          <Route path="/dashboard/" component={PageDashboard} />
        )}
        {!userDetails.code && <Redirect from="*" to="/login" />}
        {userDetails.code && <Redirect from="*" to="/dashboard/" />}
      </Switch>
    </>
  );
}

const mapStateToProps = (state) => ({
  pageLoaders: state.pageLoaders,
  pageErrors: state.pageErrors,
  userDetails: state.userDetails,
});

const mapDispatchToProps = (dispatch) => ({
  browseHistorySet: (value) => dispatch({ type: REDUX_BROWSE_HISTORY, value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
