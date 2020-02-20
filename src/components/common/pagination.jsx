import React from "react";
import propTypes from "prop-types";
import ReactPaginate from "react-paginate";
import { withGetScreen } from "react-getscreen";

const Pagination = props => {
  const { itemCounts, pageLimit, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemCounts / pageLimit);
  if (pagesCount === 1) return null;

  let marginDisplayed = 3;
  let pageDisplayled = 2;
  if (props.isMobile()) {
    marginDisplayed = 1;
    pageDisplayled = 1;
  }
  return (
    <nav aria-label="Page navigation example">
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        initialPage={0}
        forcePage={currentPage - 1}
        pageCount={pagesCount}
        marginPagesDisplayed={marginDisplayed}
        pageRangeDisplayed={pageDisplayled}
        onPageChange={onPageChange}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        breakClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </nav>
  );
};

Pagination.propTypes = {
  itemCounts: propTypes.number.isRequired,
  pageLimit: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired
};

export default withGetScreen(Pagination);
