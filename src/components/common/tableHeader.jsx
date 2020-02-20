import React, { Component } from "react";
import { withGetScreen } from "react-getscreen";

class TableHeader extends Component {
  raiseSort = column => {
    if (!column.sort) return;

    let order = "asc";
    let path = column.path;
    if (this.props.sortColumn.path === path)
      order = this.props.sortColumn.order === "asc" ? "desc" : "asc";

    const sortColumn = { path, order };
    this.props.onSort(sortColumn);
  };

  renderIcon = column => {
    const { sortColumn } = this.props;

    if (!column.sort) return;

    if (sortColumn.path && sortColumn.path !== column.path)
      return <i className="fa fa-sort light-gray ml-1" />;

    if (sortColumn.path && sortColumn.order === "asc")
      return <i className="fa fa-sort-asc ml-1" />;
    else if (sortColumn.path && sortColumn.order === "desc");
    return <i className="fa fa-sort-desc ml-1" />;
  };

  renderColumnDependOnScreenSize = props => {
    const isMobile = props.isMobile();
    return props.columns.map(column => {
      return isMobile && !column.isResponsive ? null : (
        <th
          key={column.id}
          scope="col"
          className={column.sort ? "clickable" : ""}
          onClick={() => this.raiseSort(column)}
        >
          {column.label}
          {this.renderIcon(column)}
        </th>
      );
    });
  };

  render() {
    return (
      <thead>
        <tr>{this.renderColumnDependOnScreenSize(this.props)}</tr>
      </thead>
    );
  }
}

export default withGetScreen(TableHeader);
