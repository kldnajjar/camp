import React, { Component } from "react";
import { Link } from "react-router-dom";

import ConfigurableTable from "../../../components/common/table";
import TableActions from "../../../components/common/tableActions";
// import { dateFormatter, badgeFormatter } from "../../../util/global";

class TableWrapper extends Component {
  url = "/dashboard/stay_reservations";
  reservation_type_options = [
    {
      id: "company",
      name: "Company",
    },
    {
      id: "individual",
      name: "Individual",
    },
  ];

  columns = [
    {
      id: 1,
      path: "id",
      label: "Document Number",
      sort: true,
      filter: {
        path: "document_number",
        type: "text",
      },
      isResponsive: true,
    },
    {
      id: 2,
      path: "reservation_type",
      label: "Reservation Type",
      sort: true,
      isResponsive: true,
      content: (obj) => {
        let value = "";
        this.props.reservation_type_options.map((reservation_type) => {
          if (reservation_type.id === obj.reservation_type)
            value = reservation_type.name;
          return reservation_type;
        });
        return <Link to={`${this.url}/${obj.id}`}>{value}</Link>;
      },
    },
    {
      id: 3,
      path: "contact_name",
      label: "Contact Name",
      sort: false,
      isResponsive: false,
    },
    {
      id: 4,
      path: "guests_count",
      label: "Guests Count",
      sort: false,
      isResponsive: true,
    },
  ];

  ActionButtons = {
    id: 5,
    label: "Actions",
    isResponsive: false,
    content: (obj) => (
      <TableActions
        id={obj.id}
        onEdit={this.props.onEdit && (() => this.props.onEdit(obj.id))}
        onDelete={
          !this.props.isDashboard &&
          this.props.onDelete &&
          (() => this.props.onDelete(obj.id, obj.name))
        }
        onConfirm={
          this.props.isDashboard &&
          (() => this.props.confirmReservation(obj.id))
        }
        onCancel={
          this.props.isDashboard && (() => this.props.cancelReservation(obj.id))
        }
        editLabel="Edit"
        deleteLabel="Delete"
        showLabel="Show"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
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
      isColored = null,
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
        isColored={isColored}
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
