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

export interface Vehicle {
    vehicle_spec_id: number;
    availability: 'available' | 'booked';
    rental_rate: number;
}

export interface Payment {
    id: number;
    booking_id: number;
    amount: number;
    payment_status: 'paid' | 'pending';
    payment_date: string;
    payment_method: 'cash' | 'card';
    created_at: string;
    updated_at: string;
}

export interface booking {
    id: number;
    user_id: number;
    vehicle_id: number;
    location_id: number;
    booking_date: string;
    return_date: string;
    total_amount: string;
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
        fetchAllVehicles: builder.query<Vehicle[], void>({
            query: () => '/vehicles',
        }),
        fetchVehicleById: builder.query<Vehicle, void>({
            query: (id) => `/vehicles/${id}`,
        }),
        fetchAllPayments: builder.query<Payment[], void>({
            query: () => '/payments',
        }),
        fetchPaymentById: builder.query<Payment, void>({
            query: (id) => `/payments/${id}`,
        }),
        checkout: builder.mutation({
            query: (chekout) => ({
                url: '/create-checkout-session',
                method: 'POST',
                body: chekout,
            }),
        }),
        bookVehicle: builder.mutation<booking, Partial<booking>>({
            query: (booking) => ({
                url: '/bookings',
                method: 'POST',
                body: booking,
            }),
        }),
        fetchAllBookings: builder.query<booking[], void>({
            query: () => '/bookings',
        }),
    }),
 
});

export const { useLoginUserMutation, useRegisterUserMutation, useFetchUserDetailsQuery,
    useFetchAllVehiclesQuery, useFetchVehicleByIdQuery, useFetchAllPaymentsQuery, useFetchPaymentByIdQuery,
    useCheckoutMutation , useBookVehicleMutation, useFetchAllBookingsQuery
 } = apiSlice as { 
    useLoginUserMutation: () => ReturnType<typeof apiSlice.endpoints.loginUser.useMutation>; 
    useRegisterUserMutation: () => ReturnType<typeof apiSlice.endpoints.registerUser.useMutation>;
    useFetchUserDetailsQuery: () => ReturnType<typeof apiSlice.endpoints.fetchUserDetails.useQuery>;
    useFetchAllVehiclesQuery: () => ReturnType<typeof apiSlice.endpoints.fetchAllVehicles.useQuery>;
    useFetchVehicleByIdQuery: () => ReturnType<typeof apiSlice.endpoints.fetchVehicleById.useQuery>;
    useFetchAllPaymentsQuery: () => ReturnType<typeof apiSlice.endpoints.fetchAllPayments.useQuery>;
    useFetchPaymentByIdQuery: () => ReturnType<typeof apiSlice.endpoints.fetchPaymentById.useQuery>;
    useCheckoutMutation: () => ReturnType<typeof apiSlice.endpoints.checkout.useMutation>;
    useBookVehicleMutation: () => ReturnType<typeof apiSlice.endpoints.bookVehicle.useMutation>;
    useFetchAllBookingsQuery: () => ReturnType<typeof apiSlice.endpoints.fetchAllBookings.useQuery>;
};
