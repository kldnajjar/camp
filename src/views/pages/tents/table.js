import React, { Component } from "react";
import { Link } from "react-router-dom";

import ConfigurableTable from "../../../components/common/table";
import TableActions from "../../../components/common/tableActions";
import { dateFormatter, badgeFormatter } from "../../../util/global";

class TableWrapper extends Component {
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
    }
    // {
    //   id: 2,
    //   path: "name",
    //   label: "Name",
    //   filter: {
    //     path: "name_like",
    //     type: "text"
    //   },
    //   sort: true,
    //   isResponsive: true,
    //   content: obj => <Link to={`/dashboard/tents/${obj.id}`}>{obj.name}</Link>
    // },
    // {
    //   id: 3,
    //   path: "capacity",
    //   label: "Capacity",
    //   filter: {
    //     path: "joined_date",
    //     type: "date"
    //   },
    //   sort: true,
    //   isResponsive: false,
    //   content: company => dateFormatter(company.joined_date)
    // },
    // {
    //   id: 4,
    //   path: "status",
    //   label: "Status",
    //   filter: {
    //     path: "statuses",
    //     param: "[]",
    //     type: "multi-select",
    //     options: [
    //       { value: "enabled", label: "Enabled" },
    //       { value: "disabled", label: "Disabled" }
    //     ]
    //   },
    //   sort: false,
    //   isResponsive: true,
    //   content: company => badgeFormatter(company.status)
    // }
  ];

  ActionButtons = {
    id: 5,
    label: "Actions",
    isResponsive: false,
    content: company => (
      <TableActions
        id={company.id}
        onEdit={this.props.onEdit && (() => this.props.onEdit(company.id))}
        onShow={this.props.onShow && (() => this.props.onShow(company.id))}
        onDelete={
          this.props.onDelete &&
          (() => this.props.onDelete(company.id, company.name))
        }
        editLabel="Edit Company"
        deleteLabel="Delete Company"
        showLabel="Show Employees"
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
