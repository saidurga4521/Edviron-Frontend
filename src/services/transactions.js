import { axiosInstance } from "../axios/instance";
import endpoints from "./endpoints";

export const getTransactions = () =>
  axiosInstance.get(endpoints.GET_TRANSACTIONS());
export const getTransactionBySchool = (school_id) =>
  axiosInstance.get(endpoints.GET_TRANSACTION_BY_SCHOOL(school_id));

export const getTransactionStatus = (id) =>
  axiosInstance.get(endpoints.GET_TRANSACTION_STATUS(id));
