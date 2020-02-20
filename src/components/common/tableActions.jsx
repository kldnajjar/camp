import React, { Component } from "react";
import { Tooltip } from "reactstrap";

class TableActions extends Component {
  state = {
    isSearchOpen: false,
    isEditOpen: false,
    isDeleteOpen: false,
    isRoleOpen: false
  };

  toggleSearch = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  toggleEdit = () => {
    this.setState({ isEditOpen: !this.state.isEditOpen });
  };
  toggleDelete = () => {
    this.setState({ isDeleteOpen: !this.state.isDeleteOpen });
  };
  toggleRole = () => {
    this.setState({ isRoleOpen: !this.state.isRoleOpen });
  };

  render() {
    const {
      onEdit,
      onDelete,
      onShow,
      onRole,
      id,
      deleteLabel,
      editLabel,
      showLabel,
      roleLabel
    } = this.props;
    const { isSearchOpen, isEditOpen, isDeleteOpen, isRoleOpen } = this.state;

    return (
      <div>
        {onShow && (
          <React.Fragment>
            <button
              className="btn btn-success mx-1"
              onClick={onShow}
              id={`search-tooltip-${id}`}
            >
              <i className="fa fa-eye" />
            </button>
            <Tooltip
              placement="top"
              isOpen={isSearchOpen}
              target={`search-tooltip-${id}`}
              toggle={this.toggleSearch}
            >
              {showLabel}
            </Tooltip>
          </React.Fragment>
        )}

        {onRole && (
          <React.Fragment>
            <button
              className="btn btn-warning mx-1"
              onClick={onRole}
              id={`role-tooltip-${id}`}
            >
              <i className="fa fa-archive" />
            </button>
            <Tooltip
              placement="top"
              isOpen={isRoleOpen}
              target={`role-tooltip-${id}`}
              toggle={this.toggleRole}
            >
              {roleLabel}
            </Tooltip>
          </React.Fragment>
        )}

        {onEdit && (
          <React.Fragment>
            <button
              className="btn btn-info mx-1"
              onClick={onEdit}
              id={`edit-tooltip-${id}`}
            >
              <i className="fa fa-edit" />
            </button>
            <Tooltip
              placement="top"
              isOpen={isEditOpen}
              target={`edit-tooltip-${id}`}
              toggle={this.toggleEdit}
            >
              {editLabel}
            </Tooltip>
          </React.Fragment>
        )}

        {onDelete && (
          <React.Fragment>
            <button
              className="btn btn-danger mx-1"
              onClick={onDelete}
              id={`deleted-tooltip-${id}`}
            >
              <i className="fa fa-trash-o" />
            </button>
            <Tooltip
              placement="top"
              isOpen={isDeleteOpen}
              target={`deleted-tooltip-${id}`}
              toggle={this.toggleDelete}
            >
              {deleteLabel}
            </Tooltip>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default TableActions;
