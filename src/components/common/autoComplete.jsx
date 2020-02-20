import React, { Component } from "react";
import {
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  InputGroup,
  Button
} from "reactstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

class AutoComplete extends Component {
  keyCount = 0;

  render() {
    let {
      data,
      name,
      label,
      isMultiple,
      buttonRef,
      options,
      placeholder,
      error,
      value,
      labelKey,
      defaultSelected,
      setValue,
      selected,
      appendAddOn,
      isLoading,
      disabled,
      onChange,
      onSearch,
      onClear,
      ...reset
    } = this.props;
    // let defaultSelections = defaultSelected.map(item => {
    //   if (item && item[labelKey]) return item[labelKey];
    //   return item;
    // });

    let selections = selected.map(item => {
      if (item && item[labelKey]) return item[labelKey];
      return item;
    });

    //to rerender the auto complete in order to set a new value
    if (setValue) {
      this.keyCount += 1;

      if (defaultSelected.length === 0) {
        // data[name].map(item => defaultSelected.push(item[labelKey]));
        defaultSelected = data[name];
      }
    }

    if (selections.length > 0) this.keyCount += 1;

    return (
      <div className="form-group" key={this.keyCount}>
        {label && (
          <label htmlFor={name}>
            <strong>{label}</strong>
          </label>
        )}
        <FormGroup className="auto-complete-field">
          <InputGroup>
            <AsyncTypeahead
              // clearButton
              labelKey={labelKey}
              caseSensitive={false}
              // value="khaled"
              ref={typeahead => (this.typeahead = typeahead)}
              id={name}
              options={options}
              isLoading={isLoading}
              // selected={selections.length ? selections : }
              defaultSelected={selections.length ? selections : defaultSelected}
              placeholder={placeholder}
              minLength={1}
              className={isMultiple ? "autoCompleteMultiSelect" : ""}
              onChange={onChange}
              onSearch={onSearch}
              disabled={disabled}
              multiple={isMultiple}
              selectHintOnEnter={true}
              {...reset}
            />

            {isMultiple && onClear && (
              <InputGroupAddon addonType="append">
                <Button
                  color="danger"
                  outline
                  onClick={() => onClear(this)}
                  ref={buttonRef}
                >
                  Clear
                </Button>
              </InputGroupAddon>
            )}

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

AutoComplete.defaultProps = {
  defaultSelected: []
};

export default AutoComplete;
