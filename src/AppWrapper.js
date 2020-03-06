import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import { connect } from "react-redux";

import ProtectedRoute from "./components/common/protectedRoute";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const Layout = React.lazy(() =>
  import("./containers/DefaultLayout/DefaultLayout")
);

const Page404 = React.lazy(() => import("./views/Pages/404/not-found"));
const Login = React.lazy(() => import("./views/Pages/Login"));

class AppWrapper extends Component {
  render() {
    const { isLoading } = this.props.loaderReducer;
    return (
      <React.Fragment>
        <ToastContainer />
        <LoadingOverlay active={isLoading} spinner text="Loading">
          <BrowserRouter>
            <React.Suspense fallback={loading()}>
              <Switch>
                <Route path="/login" name="Login Page" component={Login} />
                <ProtectedRoute path="/dashboard" component={Layout} />
                <Route path="/" component={Login} exact />
                <Route path="/not-found" name="404" component={Page404} />
                {/* <Redirect from="/" to="/dashboard" exact /> */}
                <Redirect to="/not-found" />
              </Switch>
            </React.Suspense>
          </BrowserRouter>
        </LoadingOverlay>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ loaderReducer }) => ({
  loaderReducer
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
