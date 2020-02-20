import React from "react";
import {
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroupButtonDropdown
} from "reactstrap";

import Select from "react-select";
import DatePicker from "react-datepicker";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { withGetScreen } from "react-getscreen";

const Searchbox = props => {
  const {
    items,
    search,
    dropDownOpened,
    onSearch,
    onChange,
    onToggle,
    searchByType,
    autoCompleteOptions
  } = props;

  return (
    <div className="row justify-content-end mb-3">
      <Col>
        <form onSubmit={onSearch}>
          <InputGroup>
            <InputGroupButtonDropdown
              addonType="prepend"
              isOpen={dropDownOpened}
              toggle={() => {
                setTimeout(() => {
                  onToggle();
                }, 100);
              }}
            >
              <DropdownToggle caret color="secondary">
                {search && search.filter && search.filter.searchBy
                  ? search.filter.searchBy
                  : "Search"}
              </DropdownToggle>
              <DropdownMenu className={dropDownOpened ? "show" : ""}>
                {items.map(
                  item =>
                    item.filter &&
                    item.filter.path && (
                      <DropdownItem
                        key={item.id}
                        onClick={() => searchByType(item)}
                      >
                        {item.label}
                      </DropdownItem>
                    )
                )}
              </DropdownMenu>
            </InputGroupButtonDropdown>
            <Col className="px-0">
              {getSearchFieldDependOnColumn(
                search,
                onChange,
                autoCompleteOptions
              )}
            </Col>

            <InputGroupAddon addonType="append">
              <Button type="button" color="primary" onClick={onSearch}>
                {getSearchIconOrText(props.isMobile())}
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </Col>
    </div>
  );
};

function getSearchIconOrText(isMobile) {
  if (isMobile) return <i className="fa fa-search fa-lg" />;
  else return "Search";
}

function getSearchFieldDependOnColumn(search, onChange, autoCompleteOptions) {
  if (!search || !search.filter || !search.filter.type) return;

  const type = search.filter.type;
  const { searchQuery, filter } = search;

  if (type === "text")
    return (
      <Input
        type="text"
        name="query"
        placeholder="Search ..."
        value={searchQuery}
        autoComplete="off"
        onChange={e => onChange(e.currentTarget.value)}
      />
    );

  if (type === "date")
    return (
      <DatePicker
        selected={searchQuery}
        onChange={onChange}
        dateFormat={"dd-MM-yy"}
        className={"form-control"}
        placeholderText={"Select a date"}
      />
    );

  if (type === "time")
    return (
      <DatePicker
        selected={searchQuery}
        onChange={onChange}
        className={"form-control"}
        placeholderText={"Select a time"}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        dateFormat="h:mm aa"
        timeCaption="Time"
      />
    );

  if (type === "date_time")
    return (
      <DatePicker
        selected={searchQuery}
        onChange={onChange}
        className={"form-control"}
        placeholderText={"Select a date & time"}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="dd-MM-yy h:mm aa"
        timeCaption="time"
      />
    );

  if (type === "multi-select")
    return (
      <Select
        name="form-field-name2"
        value={searchQuery}
        options={filter.options}
        onChange={onChange}
        multi
      />
    );

  if (type === "auto-complete")
    return (
      <AsyncTypeahead
        labelKey={filter.labelKey}
        id={`searchbox-${filter.path}`}
        multiple={filter.isMultiple}
        options={autoCompleteOptions}
        isLoading={filter.isLoading}
        placeholder={filter.placeholder}
        minLength={3}
        onChange={filter.onChange}
        onSearch={filter.onSearch}
      />
    );
}

export default withGetScreen(Searchbox);
