import { configureStore } from "@reduxjs/toolkit";
// import masterReducer from "./mastersSlice";
import { mastersApi } from "../service/mastersApi";
// import { setupListeners } from "@reduxjs/toolkit/query";
import { appApi } from "../service/appApi";
import { transactionsApi } from "../service/transactionsApi";

export default configureStore({
    reducer:{
        [mastersApi.reducerPath]: mastersApi.reducer,
        [appApi.reducerPath] : appApi.reducer,
        [transactionsApi.reducerPath] : transactionsApi.reducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(
        mastersApi.middleware, appApi.middleware, transactionsApi.middleware),
});
