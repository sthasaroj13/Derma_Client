import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseurl/axiosBaseQuery";
import BASE_URL from "../baseurl/base_url";

export interface activitiesUserProps {
  id: number;
  user: string;
  action: string;
  time: string;
}

const activitiesUsersApi = createApi({
  reducerPath: "activitiesUsersApi", // unique
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getActivitiesUsers: builder.query<
      { activities: activitiesUserProps[] },
      number | void
    >({
      query: (limit = 10) => ({
        url: `activities?limit=${limit}`,
        method: "get",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetActivitiesUsersQuery } = activitiesUsersApi;
export default activitiesUsersApi;
