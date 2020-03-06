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
    const { onEdit, onDelete, id, deleteLabel, editLabel } = this.props;
    const { isEditOpen, isDeleteOpen } = this.state;

    return (
      <div>
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
