import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface LoginResponse {
    id: number;
    token: string;
    email: string;
    role: string;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://transportdb.onrender.com',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, { email: string; password: string }>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
 
});

export const { useLoginUserMutation } = apiSlice as     {useLoginUserMutation: () => ReturnType<typeof apiSlice.endpoints.loginUser.useMutation>; };
