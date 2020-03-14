import React, { Component } from "react";

class Select extends Component {
  keyCount = 0;

  render() {
    const {
      name,
      label,
      options,
      isDisabled,
      placeholder,
      error,
      value,
      classes,
      ...reset
    } = this.props;

    // let visibleOptions = options;
    // if (!visibleOptions) return null;

    let visibleOptions = options.filter(option => option.isVisible === true);
    if (!visibleOptions.length) visibleOptions = options;
    this.keyCount += 1;

    return (
      <div className="select-field form-group" key={this.keyCount}>
        {label && (
          <label htmlFor={name}>
            <strong>{label}</strong>
          </label>
        )}
        <select
          id={name}
          disabled={isDisabled}
          name={name}
          defaultValue={value && value.length && value.toString().toLowerCase()}
          {...reset}
          className={`form-control ${classes}`}
        >
          {placeholder && (
            <option value="" default>
              {placeholder}
            </option>
          )}
          {visibleOptions.map(option => (
            <option
              key={option.id}
              value={option.id.toString().toLowerCase()}
              // value={option.name.toLowerCase()}
              // selected={option.id === value}
            >
              {option.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Select;
