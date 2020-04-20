import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import {
  getProfilesPerPage,
  getProfilesFilteredBy,
  deleteProfile,
} from "../../../services/profileService";
import { loader } from "../../../actions/loaderAction";
import Table from "./table";
import Add from "./add";
import Delete from "./delete";
// import Edit from "./edit";

class Users extends Component {
  state = {
    data: null,

    pageLimit: 30,
    currentPage: 1,
    search: {
      isActive: true,
      dropDownOpened: false,
      searchQuery: "",
      filter: {
        searchBy: "Name",
        path: "name",
        type: "text",
      },
    },
    sortColumn: { path: "name", order: "asc" },
    selectedItem: { id: null, name: "" },
    count: null,

    showAddModal: false,
    showDeleteModal: false,

    errors: {},
  };

  url = "/dashboard/payments";
  loading = true;

  info = {
    name: "Payments",
    addButton: "Add",
  };

  async componentDidMount() {
    const { currentPage, pageLimit, sortColumn, errors: errs } = this.state;

    try {
      setTimeout(() => {
        this.props.dispatch(loader(true));
      }, 200);

      const { results: data, count } = await getProfilesPerPage(
        currentPage,
        pageLimit,
        sortColumn
      );

      this.setState({ data, count });
    } catch (err) {
      if (err.response) {
        const errors = { ...errs };
        const details = err.response.data.details;

        let key;
        for (key in details) {
          if (details.hasOwnProperty(key)) {
            errors[key] = details[key];
          }
        }

        this.setState({ errors });
        if (err.response.data.msg) toast.error(err.response.data.msg);
      }
    } finally {
      setTimeout(() => {
        this.props.dispatch(loader(false));
      }, 500);
    }
  }

  editHandler = (id) => {
    this.props.history.push(`${this.url}/${id}`);
  };

  sortHandler = async (sortColumn) => {
    const { pageLimit } = this.state;
    try {
      await this.props.dispatch(loader(true));
      const { results: data, count } = await getProfilesPerPage(
        1,
        pageLimit,
        sortColumn
      );
      this.setState({ data, sortColumn, currentPage: 1, count });
    } catch (err) {
      if (err.response)
        if (err.response.data.msg) toast.error(err.response.data.msg);
    } finally {
      await this.props.dispatch(loader(false));
    }
  };

  onSearchChange = (searchQuery) => {
    const { search: oldSearch } = this.state;
    const search = { ...oldSearch };
    search.searchQuery = searchQuery;
    this.setState({ search });
  };

  searchHandler = async (e) => {
    e.preventDefault();
    try {
      const { sortColumn, pageLimit, search } = this.state;
      await this.props.dispatch(loader(true));
      const { results: data, count } = await getProfilesFilteredBy(
        1,
        pageLimit,
        sortColumn,
        search
      );
      this.setState({
        data,
        sortColumn,
        search,
        currentPage: 1,
        results: data,
        count,
      });
    } catch (err) {
      if (err.response)
        if (err.response.data.msg) toast.error(err.response.data.msg);
    } finally {
      await this.props.dispatch(loader(false));
    }
  };

  searchByType = (item) => {
    const search = { ...this.state.search };
    search.filter = item.filter;
    search.filter.searchBy = item.label;
    search.searchQuery = "";
    this.setState({ search });
  };

  toggleSearch = () => {
    const search = { ...this.state.search };
    search.dropDownOpened = !search.dropDownOpened;
    this.setState({ search });
  };

  handlePagination = async (page) => {
    if (this.loading) return (this.loading = false);

    const { pageLimit, sortColumn, search } = this.state;
    try {
      await this.props.dispatch(loader(true));
      const currentPage = page.selected + 1;
      const { results: data, count } = await getProfilesFilteredBy(
        currentPage,
        pageLimit,
        sortColumn,
        search
      );

      this.setState({ data, currentPage, count });
    } catch (err) {
    } finally {
      await this.props.dispatch(loader(false));
    }
  };

  addModalHandler = () => {
    this.setState({ showAddModal: !this.state.showAddModal });
  };

  showDeleteConfirmationModal = (id, name) => {
    const { selectedItem: info } = this.state;
    const selectedItem = { ...info };
    selectedItem.id = id;
    selectedItem.name = name;
    this.setState({ selectedItem, showDeleteModal: true });
  };

  deleteModalHandler = () => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  };

  deleteHandler = async (id) => {
    let {
      data: oldData,
      currentPage,
      pageLimit,
      sortColumn,
      selectedItem: info,
    } = this.state;
    try {
      this.deleteModalHandler();
      await this.props.dispatch(loader(true));
      await deleteProfile(id);
      const pagesCount = Math.ceil((oldData.totalNumber - 1) / pageLimit);
      if (pagesCount < currentPage && pagesCount !== 0) {
        currentPage = pagesCount;
      }
      const data = await getProfilesPerPage(currentPage, pageLimit, sortColumn);

      const selectedItem = { ...info };
      selectedItem.id = {};
      selectedItem.name = "";

      this.setState({ data, currentPage, selectedItem });
      toast.success("Profile deleted");
    } catch (err) {
      if (err.response)
        if (err.response.data.msg) toast.error(err.response.data.msg);
    } finally {
      await this.props.dispatch(loader(false));
    }
  };

  render() {
    const {
      data,
      sortColumn,
      search,
      pageLimit,
      currentPage,
      showAddModal,
      showDeleteModal,
      selectedItem,
      count,
    } = this.state;
    if (!data) return null;

    return (
      <React.Fragment>
        <Table
          data={data}
          sortColumn={sortColumn}
          onAdd={this.addModalHandler}
          search={search}
          onSearchChange={this.onSearchChange}
          onSearch={this.searchHandler}
          onToggleSearch={this.toggleSearch}
          searchByType={this.searchByType}
          itemCounts={count}
          pageLimit={pageLimit}
          currentPage={currentPage}
          onPageChange={this.handlePagination}
          onDelete={this.showDeleteConfirmationModal}
          // onEdit={this.editHandler}
          onSort={this.sortHandler}
          info={this.info}
        />

        <Add
          showModal={showAddModal}
          onToggle={this.addModalHandler}
          url={this.url}
        />

        <Delete
          showModal={showDeleteModal}
          onToggle={this.deleteModalHandler}
          onDelete={this.deleteHandler}
          info={selectedItem}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ loaderReducer }) => ({
  loaderReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
