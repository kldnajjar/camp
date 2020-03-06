import React, { Component } from "react";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button
} from "reactstrap";

import Searchbox from "./searchBox";
import Pagination from "../../components/common/pagination";
import { withGetScreen } from "react-getscreen";

class ConfigurableTable extends Component {
  render() {
    const {
      items,
      columns,
      sortColumn,
      search,
      onEdit,
      onDelete,
      onShow,
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
      autoCompleteOptions,
      info
    } = this.props;

    return (
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <i className={info.icon} /> {info.name}
                </Col>
                <Col>
                  {onAdd && (
                    <Button
                      outline
                      color="primary"
                      className="btn-sm float-right"
                      onClick={onAdd}
                    >
                      {info.addButton}
                    </Button>
                  )}
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                {!this.props.isMobile() && <Col />}
                <Col>
                  {search && search.isActive && (
                    <Searchbox
                      items={columns}
                      search={search}
                      onChange={onSearchChange}
                      dropDownOpened={search.dropDownOpened}
                      onSearch={onSearch}
                      onToggle={onToggleSearch}
                      autoCompleteOptions={autoCompleteOptions}
                      searchByType={searchByType}
                    />
                  )}
                </Col>
              </Row>
              {items && !items.length && <h4>No matching records found</h4>}
              {items && items.length !== 0 && (
                <React.Fragment>
                  <div className="table-responsive">
                    <Table hover bordered striped responsive>
                      <TableHeader
                        columns={columns}
                        onSort={onSort}
                        sortColumn={sortColumn}
                      />
                      <TableBody
                        columns={columns}
                        items={items}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onShow={onShow}
                      />
                    </Table>
                  </div>
                  <Pagination
                    itemCounts={itemCounts}
                    pageLimit={pageLimit}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                  />
                </React.Fragment>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withGetScreen(ConfigurableTable);
