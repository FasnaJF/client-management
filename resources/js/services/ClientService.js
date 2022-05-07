import axios from "axios";
import authHeader from "../services/auth.header";
const API_URL = `/api`;

const getAll = () => {
  return axios.get(API_URL + `/clients`, { headers: authHeader() });
};
const get = id => {
  return axios.get( API_URL + `/clients/${id}`, { headers: authHeader() });
};
const create = data => {
  return axios.post( API_URL + `/clients`, data, { headers: authHeader() });
};
const update = (id, data) => {
  return axios.put( API_URL + `/clients/${id}`, data, { headers: authHeader() });
};
const remove = id => {
  return axios.delete( API_URL + `/clients/${id}`, { headers: authHeader() });
};
const removeAll = () => {
  return axios.delete( API_URL + `/clients`, { headers: authHeader() });
};

const ClientService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};
export default ClientService;