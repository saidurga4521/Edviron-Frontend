import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import schoolReducer from "./schoolSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    schools: schoolReducer,
  },
});
