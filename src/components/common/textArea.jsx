import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea";

import {
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  InputGroup
} from "reactstrap";

class TextArea extends Component {
  keyCount = 0;

  render() {
    const {
      name,
      label,
      error,
      autoFocus,
      appendAddOn,
      prependAddOn,
      value,
      setValue,
      placeholder,
      onChange
    } = this.props;

    if (setValue) this.keyCount += 1;

    return (
      <div className="form-group" key={this.keyCount}>
        {label && (
          <label htmlFor={name}>
            <strong>{label}</strong>
          </label>
        )}
        <FormGroup className="textarea-field">
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
            <TextareaAutosize
              defaultValue={value}
              placeholder={placeholder}
              onChange={onChange}
              className="form-control"
              name={name}
              autoFocus={autoFocus}
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
        </FormGroup>
      </div>
    );
  }
}

export default TextArea;
