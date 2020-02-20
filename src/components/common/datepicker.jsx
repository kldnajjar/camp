import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { withGetScreen } from "react-getscreen";
// import moment from "moment";

class DatePickerWrapper extends Component {
  render() {
    const {
      name,
      label,
      type,
      value,
      placeholder,
      isDisable,
      error,
      filterDate,
      onChange
    } = this.props;
    // moment.tz.setDefault("Asia/Dubai");
    return (
      <div className="datepicker-field form-group">
        {label && (
          <label htmlFor={name}>
            <strong>{label}</strong>
          </label>
        )}
        {type === "date_only" && (
          <DatePicker
            name={name}
            filterDate={date => {
              if (filterDate) return filterDate(date);
              else return true;
            }}
            selected={value}
            disabled={isDisable}
            onChange={onChange}
            isClearable={true}
            dateFormat={"dd-MMM-yy"}
            className={"form-control"}
            autoComplete={"off"}
            placeholderText={placeholder}
            withPortal={this.props.isMobile()}
            onFocus={e => (e.target.readOnly = true)}
            onBlur={e => (e.target.readOnly = false)}
          />
        )}
        {type === "date_time" && (
          <DatePicker
            name={name}
            filterDate={date => {
              if (filterDate) return filterDate(date);
              else return true;
            }}
            selected={value}
            disabled={isDisable}
            onChange={onChange}
            showTimeSelect
            dateFormat={"dd-MMM-yy h:mm aa"}
            timeFormat="HH:mm"
            className={"form-control"}
            autoComplete={"off"}
            placeholderText={placeholder}
            withPortal={true}
            onFocus={e => (e.target.readOnly = true)}
            onBlur={e => (e.target.readOnly = false)}
          />
        )}
        {type === "time_only" && (
          <DatePicker
            name={name}
            filterDate={date => {
              if (filterDate) return filterDate(date);
              else return true;
            }}
            selected={value}
            disabled={isDisable}
            onChange={onChange}
            showTimeSelect
            showTimeSelectOnly
            dateFormat={"h:mm aa"}
            timeFormat="HH:mm"
            className={"form-control"}
            autoComplete={"off"}
            placeholderText={placeholder}
            withPortal={this.props.isMobile()}
            onFocus={e => (e.target.readOnly = true)}
            onBlur={e => (e.target.readOnly = false)}
          />
        )}

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default withGetScreen(DatePickerWrapper);
