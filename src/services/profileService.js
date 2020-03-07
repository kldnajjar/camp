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

  const result = await http.get(`/${endpoint}/${id}/`);
  return result;
}

export async function getProfilesPerPage(
  page,
  limit,
  sortColumn,
  endpoint = null
) {
  const origin = window.location.pathname.split("/");
  const options = `?page[number]=${page}&page[limit]=${limit}&sort[type]=${sortColumn.path}&sort[order]=${sortColumn.order}`;

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
  const options = `?page[number]=${page}&page[limit]=${limit}&sort[type]=${sortColumn.path}&${filterPath}sort[order]=${sortColumn.order}`;

  if (!endpoint) endpoint = endPoints[origin[2]];

  const { data } = await http.get(`/${endpoint}/${options}`);
  return data;
}

export async function addNewProfile(data, endpoint = null) {
  const origin = window.location.pathname.split("/");
  const options = { ...data };

  if (!endpoint) endpoint = endPoints[origin[2]];

  const result = await http.post(`/${endpoint}/`, options);
  return result;
}

export async function updateProfile(data, id = null, endpoint = null) {
  const origin = window.location.pathname.split("/");
  const options = { ...data };

  if (!id) id = origin[3];
  if (!endpoint) endpoint = endPoints[origin[2]];

  const result = await http.patch(`/${endpoint}/${id}/`, options);
  return result;
}

export async function deleteProfile(id = null, endpoint = null) {
  const origin = window.location.pathname.split("/");

  if (!id) id = origin[3];
  if (!endpoint) endpoint = endPoints[origin[2]];

  const result = await http.delete(`/${endpoint}/${id}/`);
  return result;
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
