import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseurl/axiosBaseQuery";
import BASE_URL from "../baseurl/base_url";

export interface TotaluserProps {
  _id?: string;
  name: string;
  email: string;
  is_admin?: boolean;
  is_active: boolean;
  created_at?: string;
}

const TotalUserApi = createApi({
  reducerPath: "totalUserApi", // unique
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<{ users: TotaluserProps[] }, void>({
      query: () => ({
        url: "getAllUser",
        method: "get",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersQuery } = TotalUserApi;
export default TotalUserApi;
