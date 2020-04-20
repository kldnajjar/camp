import React, { Component } from "react";
import { Link } from "react-router-dom";

import ConfigurableTable from "../../../components/common/table";
import TableActions from "../../../components/common/tableActions";
// import { dateFormatter, badgeFormatter } from "../../../util/global";

class TableWrapper extends Component {
  url = "/dashboard/payments";
  payment_type_option = [
    { id: "cash", name: "Cash" },
    { id: "credit", name: "Credit" },
  ];

  columns = [
    {
      id: 1,
      path: "id",
      label: "ID",
      sort: true,
      isResponsive: true,
    },
    {
      id: 2,
      path: "amount",
      label: "Amount",
      filter: {
        path: "amount",
        type: "text",
      },
      sort: true,
      isResponsive: true,
      content: (obj) => <Link to={`${this.url}/${obj.id}`}>{obj.amount}</Link>,
    },
    {
      id: 3,
      path: "payment_type",
      label: "Payment Type",
      filter: {
        path: "payment_type",
        type: "select",
        options: [
          { id: "cash", name: "Cash" },
          { id: "credit", name: "Credit" },
        ],
      },
      content: (obj) =>
        this.payment_type_option.map((item) => {
          let value = "";
          if (item.id === obj.payment_type) value = item.name;

          return value;
        }),
      isResponsive: true,
    },
    {
      id: 4,
      path: "expenses",
      label: "Expenses",
      filter: {
        path: "expenses",
        type: "text",
      },
      sort: true,
      isResponsive: true,
    },
    {
      id: 5,
      path: "date",
      label: "Payment Date",
      filter: {
        path: "date",
        type: "date",
      },
      isResponsive: true,
    },
  ];

  ActionButtons = {
    id: 7,
    label: "Actions",
    isResponsive: false,
    content: (obj) => (
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
    ),
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
      info,
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
  sortColumn: null,
};

export default TableWrapper;
