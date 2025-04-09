import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user/user.slice";
import messageReducer from "./slice/message/message.slice";
import socketReducer from "./slice/socket/socket.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    messageReducer,
    socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
