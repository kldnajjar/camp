import React, { Component } from "react";
import { Link } from "react-router-dom";

import ConfigurableTable from "../../../components/common/table";
import TableActions from "../../../components/common/tableActions";
// import { dateFormatter, badgeFormatter } from "../../../util/global";

class TableWrapper extends Component {
  url = "/dashboard/stay_types";
  columns = [
    {
      id: 1,
      path: "id",
      label: "ID",
      sort: true,
      filter: {
        path: "id",
        type: "text"
      },
      isResponsive: true
    },
    {
      id: 2,
      path: "name",
      label: "Name",
      filter: {
        path: "name_like",
        type: "text"
      },
      sort: true,
      isResponsive: true,
      content: obj => <Link to={`${this.url}/${obj.id}`}>{obj.name}</Link>
    },
    {
      id: 3,
      path: "disabled",
      label: "Disabled",
      // filter: {
      //   path: "disabled",
      //   type: "select"
      // },
      sort: true,
      isResponsive: true
    }
  ];

  ActionButtons = {
    id: 5,
    label: "Actions",
    isResponsive: false,
    content: obj => (
      <TableActions
        id={obj.id}
        onEdit={this.props.onEdit && (() => this.props.onEdit(obj.id))}
        onDelete={
          this.props.onDelete && (() => this.props.onDelete(obj.id, obj.name))
        }
        editLabel="Edit"
        deleteLabel="Delete"
        showLabel="Show"
      />
    )
  };

  constructor(props) {
    super(props);

    const { onEdit, onDelete, onShow } = this.props;
    if (onEdit || onDelete || onShow) this.columns.push(this.ActionButtons);
  }

  render() {
    const {
      data,
      search,
      sortColumn,
      onSort,
      onSearch,
      onSearchChange,
      onToggleSearch,
      searchByType,
      itemCounts,
      pageLimit,
      currentPage,
      onPageChange,
      onAdd,
      info
    } = this.props;
    return (
      <ConfigurableTable
        items={data}
        columns={this.columns}
        sortColumn={sortColumn}
        search={search}
        onSort={onSort}
        onSearch={onSearch}
        onSearchChange={onSearchChange}
        onToggleSearch={onToggleSearch}
        searchByType={searchByType}
        itemCounts={itemCounts}
        pageLimit={pageLimit}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onAdd={onAdd}
        info={info}
      />
    );
  }
}

TableWrapper.defaultProps = {
  search: null,
  onShow: null,
  onAdd: null,
  onEdit: null,
  onDelete: null,
  onSort: null,
  onSearch: null,
  onToggleSearch: null,
  AddNewBtn: null,
  itemCounts: null,
  onPageChange: null,
  data: null,
  sortColumn: null
};

export default TableWrapper;
