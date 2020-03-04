import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import auth from "../../services/authService";

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
    let token = await auth.getToken();
    let path = "/login";

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
