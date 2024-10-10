import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface LoginResponse {
    id: number;
    token: string;
    email: string;
    role: string;
}

export interface Details {
    name: string;
    email: string;
    password: string;
    contactPhone: string;
    address: string;
}

export interface RegisterResponse {
    name: string;
    email: string;
    password: string;
    contactPhone: string;
    address: string;
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
        registerUser: builder.mutation<RegisterResponse, Details>({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
 
});

export const { useLoginUserMutation, useRegisterUserMutation } = apiSlice as { 
    useLoginUserMutation: () => ReturnType<typeof apiSlice.endpoints.loginUser.useMutation>; 
    useRegisterUserMutation: () => ReturnType<typeof apiSlice.endpoints.registerUser.useMutation>;
    
};
