import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import header from "./createAuthHeader";

export const mastersApi = createApi({
    reducerPath: "masters",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_END_POINT,
        prepareHeaders: (headers) => {
            headers.set('Authorization', header['Authorization']);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        fetchMasters: builder.query({
            query: (orgId) => `/api/getmasters/${orgId}`,
            providesTags: ['mastersCreation']
        }),
        getCustomers: builder.query({
            query: (orgId) => `/api/getcustomers/${orgId}`,
            providesTags: ['mastersCreation'],
        }),
        getBankAccounts: builder.query({
            query: (orgId) => `api/getbankaccounts/${orgId}`,
            providesTags: ['mastersCreation'],
        }),
        getEntity: builder.query({
            query: ({params}) => `api/getentity/${params.orgId}/${params.entityId}`,
            providesTags: ['mastersCreation'],
        }),
        getVendors: builder.query({
            query: (orgId) => `/api/getVendors/${orgId}`,
            providesTags: ['mastersCreation'],
        }),
        getAccountTypeLedgers: builder.query({
            query: ({params}) => `/api/getledgersunderaccounttype/${params.orgId}/${params.accountType}`,
            providesTags: ['mastersCreation'],
        }),
        createEntity: builder.mutation({
            query: (entity) => ({
                url: `/api/createentity`,
                method: 'POST',
                body: entity,
            }),
            invalidatesTags: ['mastersCreation'],
        }),
        updateEntity: builder.mutation({
            query: ({params, body}) => ({
                url: `api/updateentity/${params.entityId}`,
                method: 'PATCH',
                body: body,
            }),
            invalidatesTags: ['mastersCreation'],
        }),
        createBankAccount: builder.mutation({
            query: ({params, body}) => ({
                url: `api/addbankaccount/${params.orgId}`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['mastersCreation'],
        }),
        deleteEntity: builder.mutation({
            query: ({params}) => ({
                url: `api/deleteentity/${params.orgId}/${params.entityId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['mastersCreation'],
        }),
    })
});

export const { 
    useFetchMastersQuery, useGetCustomersQuery, useCreateEntityMutation, useUpdateEntityMutation,
    useCreateBankAccountMutation, useGetBankAccountsQuery, useDeleteEntityMutation, useGetEntityQuery,
    useGetVendorsQuery, useGetAccountTypeLedgersQuery,
} = mastersApi;
