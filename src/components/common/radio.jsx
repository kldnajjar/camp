import React, { Component } from "react";
import { Input, FormGroup, Label } from "reactstrap";

class Radio extends Component {
  render() {
    const {
      name,
      label,
      value,
      options,
      error,
      onChange,
      isdisabled,
      ...reset
    } = this.props;

    let visibleOptions = options.filter(option => option.isVisible === true);
    if (!visibleOptions.length) visibleOptions = options;

    // const uniqueName = `${label.split(' ').join('_')}-${name}`
    return (
      <div className="radio-field form-group">
        <label htmlFor={name} className="d-block">
          <strong>{label}</strong>
        </label>

        {visibleOptions.map(option => (
          <FormGroup check inline key={option.id} className="mr-3">
            <Input
              className="form-check-input"
              type="radio"
              id={option.id}
              name={name}
              onChange={onChange}
              checked={option.id === value ? true : false}
              value={option.name}
              {...reset}
            />
            <Label className="form-check-label" check htmlFor={option.id}>
              {option.name}
            </Label>
          </FormGroup>
        ))}

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Radio;
