import React, { Component } from "react";
import { Provider } from "react-redux";

import AppWrapper from "./AppWrapper";
import store from "./store";

class App extends Component {
  state = {
    lang: {
      displayed: "en",
      next: "ar"
    }
  };

  onLangChange = () => {
    let { lang } = this.state;

    if (lang.displayed === "en") {
      lang.displayed = "ar";
      lang.next = "en";
    } else if (lang.displayed === "ar") {
      lang.displayed = "en";
      lang.next = "ar";
    }

    this.setState({ lang });
  };

  render() {
    const { lang } = this.state;
    return (
      <Provider store={store}>
        <AppWrapper lang={lang} onLangChange={this.onLangChange} />
      </Provider>
    );
  }
}
export default App;
