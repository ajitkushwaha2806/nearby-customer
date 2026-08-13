import userReducer from "./slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
        },
    });
};
