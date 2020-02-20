import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Card, CardBody, Badge } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import data from "./_data";

class DataTable extends Component {
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

  // just an example
  nameFormat(cell, row) {
    const id = `/users/${row.id}`;
    return (
      <NavLink strict to={id}>
        {" "}
        {cell}{" "}
      </NavLink>
    );
  }

  createCustomInsertButton = onClick => {
    return (
      <button className="btn btn-primary" onClick={onClick}>
        Add company
      </button>
    );
  };

  render() {
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

  badgeFormatter = status => {
    if (status === "Active") return <Badge color="success">Active</Badge>;
    else if (status === "Inactive")
      return <Badge color="secondary">Inactive</Badge>;
    else if (status === "Banned") return <Badge color="danger">Banned</Badge>;
    else if (status === "Pending")
      return <Badge color="warning">Pending</Badge>;
    else return status;
  };
}

export default DataTable;
