import React, { Component } from "react";
import { Tooltip } from "reactstrap";

class TableActions extends Component {
  state = {
    isSearchOpen: false,
    isEditOpen: false,
    isDeleteOpen: false,
    isRoleOpen: false,
    isConfirm: false,
    isCancel: false
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
  toggleConfirm = () => {
    this.setState({ isConfirm: !this.state.isConfirm });
  };
  toggleCancel = () => {
    this.setState({ isCancel: !this.state.isCancel });
  };

  render() {
    const {
      onEdit,
      onDelete,
      onConfirm,
      onCancel,
      id,
      deleteLabel,
      editLabel,
      confirmLabel,
      cancelLabel
    } = this.props;
    const { isEditOpen, isDeleteOpen, isConfirm, isCancel } = this.state;

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

        {onConfirm && (
          <React.Fragment>
            <button
              className="btn btn-success mx-1"
              onClick={onConfirm}
              id={`confirm-tooltip-${id}`}
            >
              <i className="fa fa-thumbs-o-up" />
            </button>
            <Tooltip
              placement="top"
              isOpen={isConfirm}
              target={`confirm-tooltip-${id}`}
              toggle={this.toggleConfirm}
            >
              {confirmLabel}
            </Tooltip>
          </React.Fragment>
        )}

        {onCancel && (
          <React.Fragment>
            <button
              className="btn btn-danger mx-1"
              onClick={onCancel}
              id={`cancel-tooltip-${id}`}
            >
              <i className="fa fa-thumbs-o-down" />
            </button>
            <Tooltip
              placement="top"
              isOpen={isCancel}
              target={`cancel-tooltip-${id}`}
              toggle={this.toggleCancel}
            >
              {cancelLabel}
            </Tooltip>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default TableActions;
