import axios from "axios";
const API_URL = `api/`;

const register = (data) => {
  return axios.post(API_URL + "signup", data);
};

const login = async (data) => {
  const response = await axios
    .post(API_URL + "signin", data);

  if (response.data.api_token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;