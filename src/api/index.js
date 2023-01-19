import axios from "axios";

export const BASE_URL = "http://localhost:7000";

const $http = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

const POST = async (url, query) => {
  const res = await $http.post(url, query);
  return res;
};

const AUTHORIZED_POST = async (url, query) => {
  const token = localStorage.getItem("appToken");
  const res = await $http.post(url, query, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

const GET = async (url, query) => {
  const res = await $http.get(url, { params: query });
  return res;
};

const AUTHORIZED_GET = async (url, query) => {
  const token = localStorage.getItem("appToken");
  const res = await $http.get(url, {
    params: query,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

const api = {
  signup: "/users/signup",
  login: "/users/login",
  getUser: "/users/", // :id

  getAllBlogs: "/blogs",
  getBlog: "/blogs/", // :id
  getBlogsByUser: "/blogs/user/", // :id
  createBlog: "/blogs",
};

// USERS
export const signup = (data) => {
  return POST(api.signup, data);
};

export const login = (data) => {
  return POST(api.login, data);
};

export const logout = async (callback) => {
  localStorage.removeItem("appToken");
  localStorage.removeItem("userData");
  if (callback) callback();
};

export const getUser = (id, params = {}) => {
  return AUTHORIZED_GET(api.getUser + id, params);
};

// BLOGS
export const getAllBlogs = () => {
  return GET(api.getAllBlogs);
};

export const getBlogsByUser = (id, params = {}) => {
  return GET(api.getBlogsByUser + id, params);
};

export const getBlog = (id, params = {}) => {
  return GET(api.getBlog + id, params);
};

export const createBlog = (data) => {
  return AUTHORIZED_POST(api.createBlog, data);
};
