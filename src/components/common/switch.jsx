import React, { Component } from "react";
import { FormGroup, InputGroup } from "reactstrap";
import { AppSwitch } from "@coreui/react";

class Switch extends Component {
  render() {
    const {
      color,
      styles,
      name,
      label,
      outline,
      isDisabled,
      checked,
      error,
      ...reset
    } = this.props;
    return (
      <div className="switch-field form-group">
        <label htmlFor={name}>
          <strong>{label}</strong>
        </label>
        <FormGroup>
          <InputGroup>
            <AppSwitch
              id={name}
              className={styles}
              color={color}
              label={true}
              outline={outline}
              disabled={isDisabled}
              checked={checked}
              {...reset}
            />
          </InputGroup>
          {error && <div className="alert alert-danger">{error}</div>}
        </FormGroup>
      </div>
    );
  }
}

Switch.defaultProps = {
  styles: "mx-1",
  color: "success",
  outline: "alt",
  checked: true
};

export default Switch;
