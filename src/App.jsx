import React, { useEffect } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import PageLogin from "./components/Login/PageLogin";
import { REDUX_BROWSE_HISTORY, CDN, REDUX_SOCKET } from "./store/CONSTANTS";
import PageDashboard from "./components/Dashboard/PageDashboard";
import PageSpinner from "./components/Loaders/PageSpinner";
import socketIOClient from "socket.io-client";
import PageMyProfile from "./components/MyProfile/PageMyProfile";

function App({ pageLoaders, browseHistorySet, userDetails, socketSet }) {
  const browseHistory = useHistory();
  useEffect(() => {
    browseHistorySet(browseHistory);
    const socket = socketIOClient(CDN);
    socket.on("NOTIFICATION", (data) => {
      console.log(data);
    });
    socketSet(socket);
    return (_) => {
      socket.disconnect();
    };
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
        {userDetails.code && (
          <Route path="/my-profile" component={PageMyProfile} />
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
  socketSet: (value) => dispatch({ type: REDUX_SOCKET, value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
