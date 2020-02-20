import React, { Component } from "react";
import Joi from "joi-browser";
import moment from "moment";

import Input from "./input";
import Select from "./select";
import MultiSelect from "./multiSelect";
import DatePickerWrapper from "./datepicker";
import AutoComplete from "./autoComplete";
import Switch from "./switch";
import Radio from "./radio";
import Checkbox from "./checkbox";
import TextArea from "./textArea";
import SelectWithAddingValue from "./selectWithAddingValue";

class FormWrapper extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;

    const errors = {};
    let item;
    for (item of result.error.details) errors[item.path] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMsg = this.validateProperty(input);
    if (errorMsg) errors[input.name] = errorMsg;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors, isChanged: true });
  };

  handleRadioChange = ({ currentTarget }) => {
    const errors = { ...this.state.errors };
    const input = { value: currentTarget.id, name: currentTarget.name };
    const errorMsg = this.validateProperty(input);
    if (errorMsg) errors[input.name] = errorMsg;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors, isChanged: true });
  };

  handleCheckboxChange = (name, value) => {
    const errors = { ...this.state.errors };
    const isChecked = value.currentTarget.checked;

    const input = {
      value: value.currentTarget.id,
      name: name
    };

    const errorMsg = this.validateProperty(input);
    if (errorMsg) errors[input.name] = errorMsg;
    else delete errors[input.name];

    const data = { ...this.state.data };
    const items = [];
    for (let i = 0; i < data[input.name].length; i++) {
      if (data[input.name][i] !== input.value) items.push(data[input.name][i]);
    }
    isChecked && items.push(input.value);
    data[input.name] = items;

    this.setState({ data, errors, isChanged: true });
  };

  handleDatePickerChange = (
    name,
    timeDefaultFormat,
    storedType,
    displayType,
    dateFormatter
  ) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };

    try {
      let timeValue = timeDefaultFormat;
      if (displayType === "date_time") {
        timeValue.hours = dateFormatter.getHours();
        timeValue.minutes = dateFormatter.getMinutes();
        timeValue.seconds = dateFormatter.getSeconds();
        timeValue.milliseconds = dateFormatter.getMilliseconds();
      }

      const value = new Date(
        dateFormatter.getFullYear(),
        dateFormatter.getMonth(),
        dateFormatter.getDate(),
        timeValue.hours,
        timeValue.minutes,
        timeValue.seconds,
        timeValue.milliseconds
      );

      const input = { value, name };
      const errorMsg = this.validateProperty(input);
      if (errorMsg) errors[input.name] = errorMsg;
      else delete errors[input.name];

      if (storedType === "date_time")
        data[input.name] = moment(input.value).format(
          "YYYY-MM-DDTHH:mm:ss.SSS"
        );
      else if (storedType === "date_only")
        data[input.name] = moment(input.value).format("YYYY-MM-DD");

      this.setState({ data, isChanged: true, errors });
    } catch (error) {
      data[name] = null;
      this.setState({ data, isChanged: false, errors });
    }
  };

  handleMultiSelectChange = (name, value) => {
    const { multiSelect } = this.state;
    multiSelect[name] = value;
    this.setState({ multiSelect, isChanged: true });
  };

  handleAutoCompleteChange = (obj, value) => {
    const errors = { ...this.state.errors };

    let val;
    if (obj.isMultiple) val = (value.length && value) || [];
    else val = (value && value[0]) || "";

    const input = { value: val, name: obj.name };

    const errorMsg = this.validateProperty(input);
    if (errorMsg) errors[input.name] = errorMsg;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, isChanged: true, errors });
  };

  handleSelectWithNewValueChange = async (obj, value) => {
    const errors = { ...this.state.errors };

    if (value.length && value[0].hasOwnProperty("customOption")) {
      await obj.createItem(value[0]);
    }
    let val;

    // if (value && value[0].custom)
    if (obj.isMultiple) val = (value.length && value) || [];
    else val = (value && value[0]) || "";

    const input = { value: val, name: obj.name };

    const errorMsg = this.validateProperty(input);
    if (errorMsg) errors[input.name] = errorMsg;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, isChanged: true, errors });
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {}, isChanged: false });
    if (errors) return;
    this.doSubmit();
  };

  renderButton = (label, isDisabled = false, type = "primary") => {
    return (
      <button
        disabled={this.validate() || isDisabled}
        type="submit"
        className={`btn btn-${type}`}
      >
        {label}
      </button>
    );
  };

  renderInput = (
    name,
    label,
    prependAddOn = "",
    appendAddOn = "",
    placeholder = "",
    type = "text",
    isFocus = false,
    isdisabled = false,
    customOnChange = null,
    autoComplete = "off",
    ariaDescribedby = "",
    items = null
  ) => {
    let { data, errors } = this.state;

    if (items) data = items;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        appendAddOn={appendAddOn}
        prependAddOn={prependAddOn}
        value={data[name] || ""}
        placeholder={placeholder}
        autoComplete={autoComplete}
        ariaDescribedby={ariaDescribedby}
        error={errors[name] || ""}
        onChange={customOnChange || this.handleChange}
        isFocus={isFocus}
        isdisabled={isdisabled}
      />
    );
  };

  renderTextArea = (
    name,
    label,
    placeholder = "",
    setValue = false,
    autoFocus = false,
    prependAddOn = "",
    appendAddOn = "",
    isdisabled = false,
    customOnChange = null,
    items = null
  ) => {
    let { data, errors } = this.state;

    if (items) data = items;
    return (
      <TextArea
        name={name}
        label={label}
        autoFocus={autoFocus}
        setValue={setValue}
        appendAddOn={appendAddOn}
        prependAddOn={prependAddOn}
        value={data[name] || ""}
        placeholder={placeholder}
        error={errors[name] || ""}
        onChange={customOnChange || this.handleChange}
        isdisabled={isdisabled}
      />
    );
  };

  renderRadio = (
    name,
    label,
    options = [],
    isdisabled = false,
    customOnChange = null,
    items = null
  ) => {
    let { data, errors } = this.state;
    if (items) data = items;
    return (
      <Radio
        name={name}
        label={label}
        options={options}
        value={data[name] || ""}
        error={errors[name] || ""}
        onChange={customOnChange || this.handleRadioChange}
        isdisabled={isdisabled}
      />
    );
  };

  renderCheckbox = (
    name,
    label,
    options = [],
    needTooltip = false,
    isdisabled = false,
    customOnChange = null,
    items = null
  ) => {
    let { data, errors } = this.state;
    if (items) data = items;
    return (
      <Checkbox
        name={name}
        label={label}
        needTooltip={needTooltip}
        options={options}
        value={data[name] || ""}
        error={errors[name] || ""}
        onChange={customOnChange || this.handleCheckboxChange.bind(this, name)}
        isdisabled={isdisabled}
      />
    );
  };

  renderSelect = (
    name,
    label,
    options,
    placeholder = null,
    isDisabled = false,
    customOnChange = null,
    items = null,
    classes = ""
  ) => {
    let { data, errors } = this.state;
    if (items) data = items;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        isDisabled={isDisabled}
        placeholder={placeholder}
        options={options}
        onChange={customOnChange || this.handleChange}
        error={errors[name] || ""}
        classes={classes}
      />
    );
  };

  renderMultiSelect = (name, label, options, customOnChange = null) => {
    const { multiSelect, errors } = this.state;
    return (
      <MultiSelect
        name={name}
        selected={multiSelect[name]}
        label={label}
        options={options}
        onChange={
          customOnChange || this.handleMultiSelectChange.bind(this, name)
        }
        error={errors[name] || ""}
      />
    );
  };

  renderDatePicker = (
    name,
    label,
    placeholder = "Select a date",
    isDisable = false,
    storedType = "date_time",
    displayType = "date_only",
    timeDefaultFormat = {
      hours: "00",
      minutes: "00",
      seconds: "00",
      milliseconds: "000"
    },
    filterDate = null,
    customOnChange = null,
    items = null
  ) => {
    let { data, errors } = this.state;
    if (items) data = items;
    return (
      <DatePickerWrapper
        name={name}
        value={data[name] && new Date(data[name])}
        placeholder={placeholder}
        isDisable={isDisable}
        label={label}
        type={displayType}
        onChange={
          (customOnChange &&
            customOnChange.bind(
              this,
              name,
              timeDefaultFormat,
              storedType,
              displayType
            )) ||
          this.handleDatePickerChange.bind(
            this,
            name,
            timeDefaultFormat,
            storedType,
            displayType
          )
        }
        filterDate={filterDate}
        error={errors[name] || ""}
      />
    );
  };

  renderAutoComplete = (
    name,
    label,
    placeholder,
    isMultiple = false,
    labelKey,
    appendAddOn,
    defaultSelected = [],
    setValue = false,
    selected = [],
    buttonRef = null,
    onClear = null,
    onSearch = null,
    options = null,
    customOnChange = null,
    isDisabled = false
  ) => {
    const { isAutoCompleteLoading, suggestions, errors, data } = this.state;
    return (
      <AutoComplete
        data={data}
        name={name}
        label={label}
        isLoading={isAutoCompleteLoading}
        isMultiple={isMultiple}
        buttonRef={buttonRef}
        options={options || suggestions}
        disabled={isDisabled}
        labelKey={labelKey}
        defaultSelected={defaultSelected}
        setValue={setValue}
        selected={selected}
        placeholder={placeholder}
        appendAddOn={appendAddOn}
        onChange={
          (customOnChange &&
            customOnChange.bind(this, {
              name,
              isMultiple
            })) ||
          this.handleAutoCompleteChange.bind(this, {
            name,
            isMultiple
          })
        }
        onSearch={onSearch || this.autoCompleteSearch}
        onClear={onClear}
        error={errors[name] || ""}
      />
    );
  };

  renderSelectWithNewValues = (
    name,
    label,
    options = null,
    createItem,
    labelKey = "name",
    anotherKey = null,
    placeholder = null,
    setValue = false,
    isMultiple = false,
    appendAddOn,
    customOnChange = null
  ) => {
    const { data, errors } = this.state;

    return (
      <SelectWithAddingValue
        data={data}
        name={name}
        label={label}
        labelKey={labelKey}
        anotherKey={anotherKey}
        isMultiple={isMultiple}
        setValue={setValue}
        options={options}
        placeholder={placeholder}
        appendAddOn={appendAddOn}
        onChange={
          (customOnChange &&
            customOnChange.bind(this, {
              name,
              isMultiple,
              createItem
            })) ||
          this.handleSelectWithNewValueChange.bind(this, {
            name,
            isMultiple,
            createItem
          })
        }
        error={errors[name] || ""}
      />
    );
  };

  renderSwitch = (
    name,
    label,
    checked,
    isDisabled,
    styles,
    outline,
    customOnChange = null,
    items = null
  ) => {
    let { data, errors } = this.state;
    if (items) data = items;
    return (
      <Switch
        name={name}
        label={data[label]}
        checked={data[checked]}
        color={data[checked] ? "success" : "secondary"}
        styles={styles}
        isDisabled={isDisabled}
        outline={outline}
        value={data[name]}
        onChange={customOnChange || this.handleChange}
        error={errors[name] || ""}
      />
    );
  };
}

export default FormWrapper;
