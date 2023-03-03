import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import header from "./createAuthHeader";

export const transactionsApi = createApi({
    reducerPath: "transactionsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001",
        prepareHeaders: (headers) => {
            headers.set('Authorization', header['Authorization']);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getLedgerBalance: builder.query({
            query: (orgId) => `/api/getallbalances/${orgId}`,
            providesTags: ['ClosingBalance'], 
        }),
        createVoucher: builder.mutation({
            query: (requestObject) => ({
                url: `/api/createvoucher`,
                method: 'POST',
                body: requestObject,
            }),
            invalidatesTags: ['ClosingBalance'],
        })
    }),
});

export const { useGetLedgerBalanceQuery, useCreateVoucherMutation } = transactionsApi;
