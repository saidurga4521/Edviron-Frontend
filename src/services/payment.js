import { axiosInstance } from "../axios/instance";
import endpoints from "./endpoints";

export const createPayment = (payload) =>
  axiosInstance.post(endpoints.CREATE_PAYMENT, payload);
export const paymentStatus = (id) =>
  axiosInstance.get(endpoints.PAYMENT_STATUS(id));
