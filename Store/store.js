import { configureStore } from "@reduxjs/toolkit";
import User from "./Reducer/UserReducer";

export const store = configureStore({
    reducer:{
        User
    }
})