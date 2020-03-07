import React from "react";
import moment from "moment";
import "moment-timezone";
import { Badge } from "reactstrap";

export async function getNameSpace() {
  const pathNames = await window.location.pathname.split("/");
  if (pathNames[1] === "dashboard") return "admin";

  if (pathNames[2] && pathNames[2] === "dashboard") return "employee";

  return "user";
}

export function dateFormatter(cell) {
  if (!cell) {
    return "";
  }
  return `${
    moment(cell).format("Do MMM YYYY")
      ? moment(cell).format("Do MMM YYYY")
      : moment(cell).format("Do MMM YYYY")
  }`;
}

export function dateTimeFormatter(cell) {
  if (!cell) {
    return "";
  }
  return `${
    moment(cell).format("Do MMM YYYY h:mm a")
      ? moment(cell).format("Do MMM YYYY h:mm a")
      : moment(cell).format("Do MMM YYYY h:mm a")
  }`;
}

export function dateViewFormatter(cell) {
  if (!cell) {
    return "";
  }
  return `${
    moment(cell).format("DD-MMM-YY")
      ? moment(cell).format("DD-MMM-YY")
      : moment(cell).format("DD-MMM-YY")
  }`;
}

export function dateNowFormatter(cell) {
  const today = dateComparisonFormatter(new Date());
  const date = dateComparisonFormatter(cell);

  const isBefore = moment(date).isBefore(today);
  const isToday = moment(date).isSame(today);

  return isBefore || isToday;
}

export function isEarliestBeforeLatest(early, latest) {
  if (!early || !latest) return false;

  const earlyDate = dateComparisonFormatter(early);
  const latestDate = dateComparisonFormatter(latest);

  const isBefore = moment(latestDate).isBefore(earlyDate);
  // const isSame = moment(latestDate).isSame(earlyDate);

  return isBefore;
}

export function isTodayFormat(cell) {
  const today = dateComparisonFormatter(new Date());
  const date = dateComparisonFormatter(cell);

  const isToday = moment(date).isSame(today);

  return isToday;
}

export function isYesterdayFormat(cell) {
  const yesterday = dateComparisonFormatter(
    moment(new Date()).subtract(1, "days")
  );
  const date = dateComparisonFormatter(cell);

  const isYesterday = moment(date).isSame(yesterday);

  return isYesterday;
}

export function changeDateToUTC(date) {
  return moment(date)
    .utc()
    .format();
}

export function changeDateToTimezone(date, timezone = "Europe/London") {
  // Asia/Dubai
  // Europe/London
  return moment(date).tz(timezone);
}

export function badgeFormatter(status) {
  if (status === "enabled") return <Badge color="success">Enabled</Badge>;
  else if (status === "disabled")
    return <Badge color="secondary">Disabled</Badge>;
  else return status;
}

export function capitalizeFirstLetter(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function convertTimeFrom24To12(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time
  ];

  if (time.length === 1) {
    return time[0] + " AM";
  } else if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
    return time.join(""); // return adjusted time or original string
  }
}

export function exposeSearchQuery(search) {
  const { searchQuery, filter } = search;

  let exposedValue = "";
  let filterPath = `${filter.path.toLowerCase()}`;

  if (typeof searchQuery === "object") {
    if (searchQuery.length) {
      filterPath = searchQuery.map(
        item =>
          (exposedValue += getFilterTemplate(filterPath, filter, item.value))
      );
    } else {
      const date = new Date(searchQuery).getTime();
      exposedValue = getFilterTemplate(filterPath, filter, date);
    }
  } else exposedValue = getFilterTemplate(filterPath, filter, searchQuery);

  return exposedValue;
}

export function getFileExtension(filename) {
  return filename
    .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
    .toLowerCase();
}

export function getFilterExtraParam(obj) {
  let str = "";
  obj.map(
    item =>
      (str += `&${item.name}=${
        item.value.indexOf("able_") !== -1
          ? capitalizeFirstLetter(item.value)
          : item.value
      }`)
  );
  return str;
}

export function parseTime(s) {
  var c = s.split(":");
  return parseInt(c[0]) * 60 + parseInt(c[1]);
}

export function convertFromMinToHours(min) {
  const hours = min / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  const twoDigitRminutes = rminutes === 0 ? "00" : rminutes;

  const timeIn24 = `${rhours}:${twoDigitRminutes}`;
  const timeIn12 = convertTimeFrom24To12(timeIn24);
  return [timeIn24, timeIn12];
}

function getFilterTemplate(filterPath, filter, value) {
  if (filter.param) {
    if (value) return `${filterPath}${filter.param}=${value}&`;
  } else {
    if (value) return `${filterPath}=${value}&`;
  }

  return "";
}

function dateComparisonFormatter(cell) {
  if (!cell) {
    return "";
  }
  return `${
    moment(cell).format("YYYY-MM-DD")
      ? moment(cell).format("YYYY-MM-DD")
      : moment(cell).format("YYYY-MM-DD")
  }`;
}

export default {
  getNameSpace,
  dateFormatter,
  dateNowFormatter,
  dateTimeFormatter,
  isTodayFormat,
  isYesterdayFormat,
  isEarliestBeforeLatest,
  convertTimeFrom24To12,
  changeDateToTimezone,
  changeDateToUTC,
  badgeFormatter,
  exposeSearchQuery,
  capitalizeFirstLetter,
  getFilterExtraParam,
  getFileExtension,
  parseTime,
  convertFromMinToHours
};
