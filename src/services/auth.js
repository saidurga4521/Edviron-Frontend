import { axiosInstance } from "../axios/instance";
import endpoints from "./endpoints";

export const login = (payload) =>
  axiosInstance.post(endpoints.USER_LOGIN, payload);
export const signUp = (payload) =>
  axiosInstance.post(endpoints.USER_SIGNUP, payload);
