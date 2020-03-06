import http from "./httpService";
import endPoints from "./endpoints";
import { exposeSearchQuery } from "../util/global";

const origin = window.location.pathname.split("/");

export async function getProfiles() {
  const { data } = await http.get(endPoints[origin[2]]);
  return data;
}

export async function getProfile(id) {
  const result = await http.get(`${endPoints[origin[2]]}/${id}`);
  return result;
}

export async function getProfilesPerPage(page, limit, sortColumn) {
  const options = `?page[number]=${page}&page[limit]=${limit}&sort[type]=${sortColumn.path}&sort[order]=${sortColumn.order}`;
  const { data } = await http.get(`${endPoints[origin[2]]}${options}`);
  return data;
}

export async function getProfilesFilteredBy(page, limit, sortColumn, search) {
  const filterPath = exposeSearchQuery(search);
  const options = `?page[number]=${page}&page[limit]=${limit}&sort[type]=${sortColumn.path}&${filterPath}sort[order]=${sortColumn.order}`;

  const { data } = await http.get(`${endPoints[origin[2]]}${options}`);
  return data;
}

export async function addNewProfile(data) {
  const options = { ...data };

  const result = await http.post(endPoints[origin[2]], options);
  return result;
}

export async function updateProfile(data, id = null) {
  const options = { ...data };

  if (!id) id = origin[3];

  const result = await http.dispatch(`${endPoints[origin[2]]}/${id}`, options);
  return result;
}

export async function deleteProfile(id = null) {
  if (!id) id = origin[3];

  const result = await http.delete(`${endPoints[origin[2]]}/${id}`);
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
