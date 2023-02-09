import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const userLogin = getState().auth.userLogin;
      const isLoggedIn = userLogin.isLoggedIn;
      const token = userLogin?.user?.token;

      if (isLoggedIn) headers.set('authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  reducerPath: 'timesheetApi',
  tagTypes: [
    'Login',
    'CreateUser',
    'CreateTimesheet',
    'GetMyTimesheets',
    'FindMyTimesheets',
    'GetTimesheetDetails',
    'EmployeesTimesheets',
    'AddTaskToTimesheet',
    'RateTimesheet',
  ],
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (payload) => ({
        url: '/login',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['Login'],
    }),

    createUser: build.mutation({
      query: (payload) => ({
        url: '/create-user',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['CreateUser'],
    }),

    createTimesheet: build.mutation({
      query: (payload) => ({
        url: '/timesheet',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['CreateTimesheet'],
    }),

    getMyTimesheets: build.query({
      query: () => '/timesheets',
      providesTags: ['GetMyTimesheets'],
    }),

    findMyTimesheets: build.mutation({
      query: (payload) => ({
        url: '/timesheets',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['FindMyTimesheets'],
    }),

    getTimesheetDetails: build.query({
      query: (id) => `/timesheet/${id}`,
      providesTags: ['GetTimesheetDetails'],
    }),

    getEmployeesTimesheets: build.query({
      query: () => '/employees-timesheets',
      providesTags: ['EmployeesTimesheets'],
    }),

    addTaskToTimesheet: build.mutation({
      query: (payload) => ({
        url: '/task',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['AddTaskToTimesheet'],
    }),

    rateTimesheet: build.mutation({
      query: (payload) => ({
        url: `/rate-timesheet/${payload.timesheetId}`,
        method: 'POST',
        body: payload,
      }),
      providesTags: ['RateTimesheet'],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useCreateUserMutation,
  useCreateTimesheetMutation,
  useGetMyTimesheetsQuery,
  useFindMyTimesheetsMutation,
  useGetTimesheetDetailsQuery,
  useGetEmployeesTimesheetsQuery,
  useAddTaskToTimesheetMutation,
  useRateTimesheetMutation,
} = apiSlice;
