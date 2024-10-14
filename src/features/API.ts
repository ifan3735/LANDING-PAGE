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

export interface User2 {   
    id: number;
    name: string;
    email: string;
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
        fetchUserDetails: builder.query<User2, void>({
            query: (id) => `/users/${id}`,
        }),
        fetchAllVehicles: builder.query<any, void>({
            query: () => '/vehicles',
        }),
        fetchVehicleById: builder.query<any, void>({
            query: (id) => `/vehicles/${id}`,
        }),
    }),
 
});

export const { useLoginUserMutation, useRegisterUserMutation, useFetchUserDetailsQuery,
    useFetchAllVehiclesQuery, useFetchVehicleByIdQuery
 } = apiSlice as { 
    useLoginUserMutation: () => ReturnType<typeof apiSlice.endpoints.loginUser.useMutation>; 
    useRegisterUserMutation: () => ReturnType<typeof apiSlice.endpoints.registerUser.useMutation>;
    useFetchUserDetailsQuery: () => ReturnType<typeof apiSlice.endpoints.fetchUserDetails.useQuery>;
    useFetchAllVehiclesQuery: () => ReturnType<typeof apiSlice.endpoints.fetchAllVehicles.useQuery>;
    useFetchVehicleByIdQuery: () => ReturnType<typeof apiSlice.endpoints.fetchVehicleById.useQuery>;
};
