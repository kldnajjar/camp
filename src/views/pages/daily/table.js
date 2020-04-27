import React, { Component } from "react";

import ConfigurableTable from "../../../components/common/table";
// import { dateFormatter, badgeFormatter } from "../../../util/global";

class TableWrapper extends Component {
  url = "/dashboard/daily";

  columns = [
    {
      id: 1,
      path: "date",
      label: "Date",
      isResponsive: true,
    },
    {
      id: 2,
      path: "gross",
      label: "gross",
      isResponsive: true,
    },
    {
      id: 3,
      path: "total_amount",
      label: "Total Amount",
      isResponsive: true,
    },
    {
      id: 4,
      path: "total_cash",
      label: "Total Cash",
      isResponsive: true,
    },
    {
      id: 5,
      path: "total_credit",
      label: "Total Credit",
      isResponsive: true,
    },
    {
      id: 6,
      path: "total_expenses",
      label: "Total Expenses",
      isResponsive: true,
    },
  ];

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
