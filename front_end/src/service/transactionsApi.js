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
        getVouchers: builder.query({
            query: (params) => `/api/getvouchers/${params.orgId}/${params.voucher}`,
            providesTags: ['ClosingBalance'],
        }),
        getVoucherData: builder.query({
            query: (params) => `/api/getvoucherdata/${params.orgId}/${params.voucher}/${params.transactionId}`,
            providesTags: ['ClosingBalance'],
        }),
        createVoucher: builder.mutation({
            query: (requestObject) => ({
                url: `/api/createvoucher`,
                method: 'POST',
                body: requestObject,
            }),
            invalidatesTags: ['ClosingBalance'],
        }),
        deleteVoucherEntry: builder.mutation({
            query: (requestObject) => ({
                url: `/api/deletevoucherentry/${requestObject.params.orgId}`,
                method: 'DELETE',
                body: {...requestObject.body},
            }),
            invalidatesTags: ['ClosingBalance'],
        }),
        updateVoucherEntry: builder.mutation({
            query: (requestObject) => ({
                url: `/api/updatevoucherdata/${requestObject.params.orgId}/${requestObject.params.transactionId}/${requestObject.params.otherDetailsId}`,
                method: 'PATCH',
                body: requestObject.body,                
            }),
            invalidatesTags:['ClosingBalance'],
        }),

    }),
});

export const { 
    useGetLedgerBalanceQuery, useCreateVoucherMutation, useGetVouchersQuery , useGetVoucherDataQuery,
    useDeleteVoucherEntryMutation, useUpdateVoucherEntryMutation,
} = transactionsApi;
