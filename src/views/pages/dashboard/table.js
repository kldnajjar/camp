import React, { Component } from "react";
import { Link } from "react-router-dom";

import ConfigurableTable from "../../../components/common/table";
import TableActions from "../../../components/common/tableActions";
// import { dateFormatter, badgeFormatter } from "../../../util/global";

class TableWrapper extends Component {
  url = "/dashboard/food_reservations";
  reservation_type_options = [
    {
      id: "company",
      name: "Company"
    },
    {
      id: "individual",
      name: "Individual"
    }
  ];

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
      path: "reservation_type",
      label: "Reservation Type",
      filter: {
        path: "reservation_type",
        type: "select",
        options: [
          {
            value: "company",
            label: "Company"
          },
          {
            value: "individual",
            label: "Individual"
          }
        ]
      },
      sort: true,
      isResponsive: true,
      content: obj => {
        let value = "";
        this.props.reservation_type_options.map(reservation_type => {
          if (reservation_type.id === obj.reservation_type)
            value = reservation_type.name;
          return reservation_type;
        });
        return <Link to={`${this.url}/${obj.id}`}>{value}</Link>;
      }
    },
    {
      id: 3,
      path: "contact_name",
      label: "Contact Name",
      filter: {
        path: "contact_name",
        type: "text"
      },
      sort: false,
      isResponsive: false
    },
    {
      id: 4,
      path: "contact_number",
      label: "Contact Number",
      filter: {
        path: "contact_name",
        type: "text"
      },
      sort: true,
      isResponsive: true
    },
    {
      id: 5,
      path: "reservation_date",
      label: "Reservation Date",
      filter: {
        path: "reservation_date",
        type: "date"
      },
      sort: true,
      isResponsive: true
    },
    {
      id: 6,
      path: "guests_count",
      label: "Guests Count",
      filter: {
        path: "guests_count",
        type: "text"
      },
      sort: true,
      isResponsive: true
    }
  ];

  ActionButtons = {
    id: 7,
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
