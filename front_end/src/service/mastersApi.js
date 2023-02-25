import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import header from "./createAuthHeader";

export const mastersApi = createApi({
    reducerPath: "masters",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001",
        prepareHeaders: (headers) => {
            headers.set('Authorization', header['Authorization']);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        fetchMasters: builder.query({
            query: (orgId) => `/api/getmasters/${orgId}`
        }),
        getCustomers: builder.query({
            query: () => `/api/testApi`
        }),
        createEntity: builder.mutation({
            query: (entity) => ({
                url: `/api/createentity`,
                method: 'POST',
                body: entity,
            }),
        })
    })
});

export const { useFetchMastersQuery, useGetCustomersQuery, useCreateEntityMutation } = mastersApi;