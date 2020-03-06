import React, { Component } from "react";

import {
  Card,
  CardBody,
  // CardHeader,
  // Col,
  // Row,
  // Table,
  // Button,
  Badge
} from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { withGetScreen } from "react-getscreen";
import { NavLink } from "react-router-dom";

import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import data from "../../_data.js";

class ConfigurableTable extends Component {
  constructor(props) {
    super(props);

    this.table = data.rows;
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false,
      insertBtn: this.createCustomInsertButton,
      onCellEdit: this.props.onCellEdit,
      onDeleteRow: this.props.onDeleteRow,
      onAddRow: this.props.onAddRow
    };
  }

  badgeFormatter = status => {
    if (status === "Active") return <Badge color="success">Active</Badge>;
    else if (status === "Inactive")
      return <Badge color="secondary">Inactive</Badge>;
    else if (status === "Banned") return <Badge color="danger">Banned</Badge>;
    else if (status === "Pending")
      return <Badge color="warning">Pending</Badge>;
    else return status;
  };

  createCustomInsertButton = onClick => {
    return (
      <button className="btn btn-primary" onClick={onClick}>
        Add company
      </button>
    );
  };

  nameFormat = (cell, row) => {
    const id = `/users/${row.id}`;
    return (
      <NavLink strict to={id}>
        {" "}
        {cell}{" "}
      </NavLink>
    );
  };

  render() {
    // const {
    //   items,
    //   columns,
    //   sortColumn,
    //   search,
    //   onEdit,
    //   onDelete,
    //   onShow,
    //   onSort,
    //   onSearch,
    //   onSearchChange,
    //   onToggleSearch,
    //   searchByType,
    //   itemCounts,
    //   pageLimit,
    //   currentPage,
    //   onPageChange,
    //   onAdd,
    //   autoCompleteOptions,
    //   info
    // } = this.props;

    const cellEditProp = {
      mode: "click"
    };

    return (
      <div className="animated">
        <Card>
          <CardBody>
            <BootstrapTable
              data={this.table}
              version="4"
              striped
              hover
              pagination
              search
              insertRow
              options={this.options}
              cellEdit={cellEditProp}
              containerClass="custom-style"
            >
              <TableHeaderColumn
                dataField="id"
                dataSort
                dataFormat={this.nameFormat}
              >
                ID
              </TableHeaderColumn>
              <TableHeaderColumn isKey dataField="company">
                Company
              </TableHeaderColumn>
              <TableHeaderColumn dataField="joined_date" dataSort>
                Joined date
              </TableHeaderColumn>
              <TableHeaderColumn dataField="subscription" dataSort>
                Subscription
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="status"
                dataFormat={this.badgeFormatter}
                dataSort
              >
                Status
              </TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withGetScreen(ConfigurableTable);
