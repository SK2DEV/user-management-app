
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import authReducer from "./slices/auth-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
  },
});

export default store;
