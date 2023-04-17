import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import header from "./createAuthHeader";

export const transactionsApi = createApi({
    reducerPath: "transactionsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_END_POINT,
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
        getCustomerMonthlyIncome: builder.query({
            query: (params) => `/api/getcustomermonthlyincome/${params.orgId}/${params.customerLedgerId}`,
            providesTags: ['ClosingBalance'],
        }),
        getVendorMonthlyExpense: builder.query({
            query: (params) => `/api/getvendormonthlyexpense/${params.orgId}/${params.vendorLedgerId}`,
            providesTags: ['ClosingBalance'],
        }),
        getLedgerTransactions: builder.query({
            query: (params) => `/api/getledgertransactions/${params.orgId}/${params.ledgerId}`,
            providesTags: ['ClosingBalance'],
        }),
        getAutoGeneratedVchNo: builder.query({
            query:(params) => `/api/getautogeneratedvchno/${params.orgId}/${params.voucherName}/${params.voucherDate}`,
            providesTags: ['ClosingBalance']            
        }),
        getUnpaidVouchers: builder.query({
            query: (params) => `/api/getunpaidvouchers/${params.orgId}/${params.primaryVoucherType}`,
            providesTags: ['ClosingBalance']
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
        updateOffsetTransactions: builder.mutation({
            query: ({params, body}) => ({
                url: `/api/updateoffsettransactions/${params.orgId}/${params.entityId}/${params.receiptTransactionId}`,
                method: 'PATCH',
                body: body,
            }),
            invalidatesTags:['ClosingBalance'],
        }),

    }),
});

export const { 
    useGetLedgerBalanceQuery, useCreateVoucherMutation, useGetVouchersQuery , useGetVoucherDataQuery,
    useDeleteVoucherEntryMutation, useUpdateVoucherEntryMutation, useGetCustomerMonthlyIncomeQuery,
    useGetLedgerTransactionsQuery, useGetAutoGeneratedVchNoQuery, useGetUnpaidVouchersQuery,
    useUpdateOffsetTransactionsMutation, useGetVendorMonthlyExpenseQuery,
} = transactionsApi;
