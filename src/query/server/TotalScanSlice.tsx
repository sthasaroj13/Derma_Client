import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseurl/axiosBaseQuery";
import BASE_URL from "../baseurl/base_url";

export interface TotalScanProps {
  total_predictions: number;
}

const TotalScanApi = createApi({
  reducerPath: "totalScanApi", // unique
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUserScan: builder.query<TotalScanProps, void>({
      query: () => ({
        url: "predict/totalScan",
        method: "get",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetAllUserScanQuery } = TotalScanApi;
export default TotalScanApi;
