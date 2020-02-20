import React, { Component } from "react";
import {
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  InputGroup
} from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";

class SelectWithAddingValue extends Component {
  keyCount = 0;

  render() {
    let {
      data,
      name,
      label,
      setValue,
      labelKey,
      anotherKey,
      isMultiple,
      options,
      placeholder,
      error,
      appendAddOn,
      onChange,
      ...reset
    } = this.props;

    let defaultSelected = [];
    if (data[name] && data[name].id) {
      defaultSelected = [data[name]];
      this.keyCount += 1;
    }

    if (setValue) {
      this.keyCount += 1;
    }

    return (
      <div className="form-group" key={this.keyCount}>
        {label && (
          <label htmlFor={name}>
            <strong>{label}</strong>
          </label>
        )}
        <FormGroup className="select-with-new-value-field">
          <InputGroup>
            <Typeahead
              defaultSelected={defaultSelected}
              id={name}
              labelKey={labelKey}
              allowNew={true}
              renderMenuItemChildren={option => (
                <div>
                  {option.name}
                  <div>
                    <small>{option[anotherKey]}</small>
                  </div>
                </div>
              )}
              multiple={isMultiple}
              newSelectionPrefix="Add new: "
              options={options}
              placeholder={placeholder}
              onChange={onChange}
              selectHintOnEnter={true}
              {...reset}
            />

            {!isMultiple && appendAddOn && (
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className={appendAddOn} />
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

export default SelectWithAddingValue;
