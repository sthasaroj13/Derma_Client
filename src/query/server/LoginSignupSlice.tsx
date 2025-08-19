import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseurl/axiosBaseQuery";
import BASE_URL from "../baseurl/base_url";
import type { loginprops, signupprops } from "../../Types/loginsignupType";
interface LoginResponse {
  email: string;
  message: string;
  user: string;
  token: string;
  name: string;
}
const LoginSignupApi = createApi({
  reducerPath: "loginSignup",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    addUser: builder.mutation<
      { message: string; success: boolean },
      signupprops
    >({
      query: (userData) => ({
        url: "signup",
        method: "post",
        data: userData,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation<LoginResponse, loginprops>({
      query: (userData) => ({
        url: "login",
        method: "post",
        data: userData,
      }),
      invalidatesTags: ["User"],
    }),
    getUser: builder.query<any, string>({
      query: (email) => ({
        url: `get-user?email=${encodeURIComponent(email)}`,
        method: "get",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<any, { email: string; data: any }>({
      query: ({ email, data }) => ({
        url: `update-profile?email=${encodeURIComponent(email)}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useAddUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} = LoginSignupApi;
export default LoginSignupApi;
