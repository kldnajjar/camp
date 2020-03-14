import React, { Component } from "react";
import Select from "react-select";

class MultiSelect extends Component {
  options = [];

  render() {
    const {
      name,
      label,
      options,
      error,
      selected = [],
      placeholder,
      onChange,
      ...reset
    } = this.props;

    this.options = options.map(option => ({
      label: option.name,
      value: option.id
    }));

    return (
      <div className="multi-select-field form-group">
        <label htmlFor={name}>
          <strong>{label}</strong>
        </label>
        <Select
          name={name}
          value={selected}
          options={this.options}
          onChange={onChange}
          placeholder={placeholder}
          multi
          {...reset}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default MultiSelect;
