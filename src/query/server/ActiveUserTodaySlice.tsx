import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseurl/axiosBaseQuery";
import BASE_URL from "../baseurl/base_url";

interface todayActiveUserProps {
  _id: string;
  name: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  created_at: string;
}
const activeUserTodayApi = createApi({
  reducerPath: "activeUserTodayApi",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["ActiveUser"],
  endpoints: (builder) => ({
    getAllactiveUsers: builder.query<{ users: todayActiveUserProps[] }, void>({
      query: () => ({
        url: "getAllUser",
        method: "get",
      }),
      providesTags: ["ActiveUser"],
    }),
  }),
});
export const { useGetAllactiveUsersQuery } = activeUserTodayApi;
export default activeUserTodayApi;
