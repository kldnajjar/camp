import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const Login = React.lazy(() => import('./views/Pages/Login'));


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
            <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;