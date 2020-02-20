import React, { Component } from "react";
import {
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  InputGroup
} from "reactstrap";
import PhoneInput from "react-phone-number-input";

class PhoneNumber extends Component {
  render() {
    const {
      name,
      label,
      error,
      ariaDescribedby,
      isFocus,
      isdisabled,
      appendAddOn,
      prependAddOn,
      type,
      ...reset
    } = this.props;

    let style = "";
    if (type === "file") style = "no-border";

    return (
      <div className="form-group">
        {label && (
          <label htmlFor={name}>
            <strong>{label}</strong>
          </label>
        )}
        {/* <FormGroup className="input-field">
          <InputGroup>
            {prependAddOn && (
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  {isNaN(parseFloat(prependAddOn)) ? (
                    <i className={prependAddOn} />
                  ) : (
                    prependAddOn
                  )}
                </InputGroupText>
              </InputGroupAddon>
            )}
            <input
              autoFocus={isFocus}
              disabled={isdisabled}
              id={name}
              name={name}
              type={type}
              aria-describedby={ariaDescribedby}
              className={`form-control ${style}`}
              {...reset}
              //   ref={this.usernameRef}
            />
            {appendAddOn && (
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  {isNaN(parseFloat(appendAddOn)) ? (
                    <i className={appendAddOn} />
                  ) : (
                    appendAddOn
                  )}
                </InputGroupText>
              </InputGroupAddon>
            )}
          </InputGroup>
          {error && <div className="alert alert-danger">{error}</div>}
        </FormGroup> */}
      </div>
    );
  }
}

// Input.defaultProps = {
//   isFocus: false,
//   autoComplete: "off",
//   ariaDescribedby: "",
//   type: "text",
//   appendAddOn: ""
// };

export default PhoneNumber;
