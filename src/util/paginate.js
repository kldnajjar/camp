import _ from "lodash";

export function paginate(items, pageNumber, pageLimit) {
  const startIndex = (pageNumber - 1) * pageLimit;
  return _(items)
    .slice(startIndex)
    .take(pageLimit)
    .value();
}

export function initGlobalPaginationObject() {
  window.global = {
    pagination: {}
  };
}

export function getGlobalPaginationNumber() {
  const origin = window.location.pathname.split("/");
  const name = origin[2];

  const pageNumber = window.global.pagination[name];

  if (!pageNumber) {
    initGlobalPaginationObject();
    window.global = {
      pagination: { [name]: 1 }
    };
  }

  return window.global.pagination[name];
}

export function updateGlobalPaginationNumber(number) {
  const origin = window.location.pathname.split("/");
  const name = origin[2];
  window.global.pagination[name] = number;
}
