const endpoints = {
  USER_SIGNUP: "/auth/signUp",
  USER_LOGIN: "/auth/login",
  CREATE_PAYMENT: "/payment/createPayment",
  PAYMENT_STATUS: (id) => `/payment/status/${id}`,
  GET_TRANSACTIONS: () => `/transaction`,
  GET_TRANSACTION_BY_SCHOOL: (school_id) => `/transaction/school/${school_id}`,

  GET_TRANSACTION_STATUS: (id) => `/transaction/status/${id}`,
  GET_SCHOOLS: "/school",
};

export default endpoints;
