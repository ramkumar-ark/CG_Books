import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import header from "./createAuthHeader";
import REACT_APP_API_END_POINT from "./apiEndpoint";

const apiEndPoint = REACT_APP_API_END_POINT;

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiEndPoint,
        prepareHeaders: (headers) => {
            headers.set('Authorization', header['Authorization']);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSelectedOrg: builder.query({
            query: (userId) => `/api/getselectedorg/${userId}`,
            providesTags: ['Organizations'],
            // transformResponse: (response, meta, arg) => response.data, 
        }),
        getUserOrgs: builder.query({
            query: (userId) => `/api/getassociatedorgs/${userId}`,
            providesTags: ['Organizations'],
            // transformErrorResponse: (response, meta, arg) => response.data,
        }),
        setSelectedOrg: builder.mutation({
            query: (userId, orgId) => ({
                url: `/api/setselectedorg/${userId}`,
                method: 'PATCH',
                body: {orgId},
            }),
            invalidatesTags: ['Organizations'],
        }),
        validateUser: builder.mutation({
            query: (email) => ({
                url: `/api/resetpassword/validateuser`,
                method: 'POST',
                body: {email},
            }),
        }),
        resendOtp: builder.mutation({
            query: (email) => ({
                url: `/api/resetpassword/resendotp`,
                method: 'POST',
                body: {email},
            }),
        }),
        verifyOtp: builder.mutation({
            query: ({email, otp, resetToken}) => ({
                url: `/api/resetpassword/verifyotp`,
                method: 'POST',
                body: {email, otp, resetToken},
            }),
        }),
        resetPassword: builder.mutation({
            query: ({email, password, requestToken}) => ({
                url: `/api/resetpassword/changepassword`,
                method: 'POST',
                body: {email, password, requestToken},
            }),
        }),

    })
});

export const { useGetSelectedOrgQuery, useGetUserOrgsQuery, useSetSelectedOrgMutation, 
    useValidateUserMutation, useResendOtpMutation, useVerifyOtpMutation, useResetPasswordMutation 
} = appApi;
