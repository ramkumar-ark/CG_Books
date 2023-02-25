import { configureStore } from "@reduxjs/toolkit";
// import masterReducer from "./mastersSlice";
import { mastersApi } from "../service/mastersApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export default configureStore({
    reducer:{
        [mastersApi.reducerPath]: mastersApi.reducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(mastersApi.middleware),
});
