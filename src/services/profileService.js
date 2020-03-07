import http from "./httpService";
import endPoints from "./endpoints";
import { exposeSearchQuery } from "../util/global";

export async function getProfiles(endpoint = null) {
  const origin = window.location.pathname.split("/");

  if (!endpoint) endpoint = endPoints[origin[2]];

  const { data } = await http.get(`/${endpoint}/`);
  return data;
}

export async function getProfile(id, endpoint = null) {
  const origin = window.location.pathname.split("/");

  if (!endpoint) endpoint = endPoints[origin[2]];

  const { data } = await http.get(`/${endpoint}/${id}/`);
  return data;
}

export async function getProfilesPerPage(
  page,
  limit,
  sortColumn,
  endpoint = null
) {
  const origin = window.location.pathname.split("/");
  let ordering = sortColumn.path;
  if (sortColumn.order === "desc") ordering = `-${ordering}`;

  const options = `?page=${page}&per_page=${limit}&ordering=${ordering}`;

  if (!endpoint) endpoint = endPoints[origin[2]];

  const { data } = await http.get(`/${endpoint}/${options}`);
  return data;
}

export async function getProfilesFilteredBy(
  page,
  limit,
  sortColumn,
  search,
  endpoint = null
) {
  const origin = window.location.pathname.split("/");
  const filterPath = exposeSearchQuery(search);
  let ordering = sortColumn.path;
  if (sortColumn.order === "desc") ordering = `-${ordering}`;

  const options = `?page=${page}&per_page=${limit}${filterPath}ordering=${ordering}`;

  if (!endpoint) endpoint = endPoints[origin[2]];

  const { data } = await http.get(`/${endpoint}/${options}`);
  return data;
}

export async function addNewProfile(values, endpoint = null) {
  const origin = window.location.pathname.split("/");
  const options = { ...values };

  if (!endpoint) endpoint = endPoints[origin[2]];

  const { data } = await http.post(`/${endpoint}/`, options);
  return data;
}

export async function updateProfile(values, id = null, endpoint = null) {
  const origin = window.location.pathname.split("/");
  const options = { ...values };

  if (!id) id = origin[3];
  if (!endpoint) endpoint = endPoints[origin[2]];

  const { data } = await http.patch(`/${endpoint}/${id}/`, options);
  return data;
}

export async function deleteProfile(id = null, endpoint = null) {
  const origin = window.location.pathname.split("/");

  if (!id) id = origin[3];
  if (!endpoint) endpoint = endPoints[origin[2]];

  const { data } = await http.delete(`/${endpoint}/${id}/`);
  return data;
}

export default {
  getProfiles,
  getProfile,
  getProfilesPerPage,
  getProfilesFilteredBy,
  addNewProfile,
  updateProfile,
  deleteProfile
};
