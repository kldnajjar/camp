import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import adminAuth from "../../services/admin/authService";
import employeeAuth from "../../services/employee/authService";
import userAuth from "../../services/user/authService";
import { getNameSpace } from "../../util/global";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

class ProtectedRoute extends Component {
  state = {
    isSynced: false,
    token: null,
    path: null
  };

  async componentDidMount() {
    const nameSpace = await getNameSpace();
    const origin = window.location.pathname.split("/");
    let token, path;

    if (nameSpace === "admin") {
      token = await adminAuth.getToken();
      path = "/dashboard/login";
    }

    if (nameSpace === "employee") {
      token = await employeeAuth.getToken();
      path = `/${origin[1]}/dashboard/login`;
    }

    if (nameSpace === "user") {
      token = await userAuth.getToken();
      path = `/${origin[1]}/app/login`;
    }

    this.setState({
      isSynced: true,
      token,
      path
    });
  }

  render() {
    const { isSynced, token, path } = this.state;
    if (!isSynced) return null;
    const { component: Component, render, ...rest } = this.props;
    return (
      <React.Suspense fallback={loading()}>
        <Route
          {...rest}
          render={props => {
            if (!token)
              return (
                <Redirect
                  to={{
                    pathname: path,
                    state: { from: props.location }
                  }}
                />
              );
            return Component ? <Component {...props} /> : render(props);
          }}
        />
      </React.Suspense>
    );
  }
}

export default ProtectedRoute;
