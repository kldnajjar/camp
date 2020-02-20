import React, { Component } from "react";
import { Input, FormGroup, Label, UncontrolledTooltip } from "reactstrap";

class Checkbox extends Component {
  render() {
    const {
      name,
      label,
      value,
      options,
      error,
      onChange,
      isdisabled,
      needTooltip,
      ...reset
    } = this.props;

    let visibleOptions = options.filter(option => option.isVisible === true);
    if (!visibleOptions.length) visibleOptions = options;

    return (
      <div className="form-group">
        <label htmlFor={name} className="d-block" id={name}>
          <strong>{label}</strong>
        </label>

        {visibleOptions.map(option => (
          <FormGroup
            check
            inline
            key={option.id}
            className="checkbox-field mr-3"
          >
            <Input
              className="form-check-input"
              type="checkbox"
              id={option.id}
              name={option.id}
              onChange={onChange}
              checked={value.indexOf(option.id) !== -1 ? true : false}
              value={option.name}
              {...reset}
            />
            <Label
              className="form-check-label"
              check
              htmlFor={option.id}
              id={`${option.id}_label`}
            >
              {option.name}
            </Label>
            {needTooltip && option.tooltip && (
              <UncontrolledTooltip
                placement="bottom"
                target={`${option.id}_label`}
              >
                {option.tooltip}
              </UncontrolledTooltip>
            )}
          </FormGroup>
        ))}

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Checkbox;
