import React, { Component } from "react";
import { Prompt } from "react-router-dom";

class UnSavedChanges extends Component {
  state = {};
  render() {
    return (
      <Prompt
        when={this.props.isChanged}
        message={() => {
          return `Are you sure you want to leave?`;
        }}
      />
    );
  }
}

export default UnSavedChanges;
