import { axiosInstance } from "../axios/instance";
import endpoints from "./endpoints";

export const getSchools = () => axiosInstance.get(endpoints.GET_SCHOOLS);
