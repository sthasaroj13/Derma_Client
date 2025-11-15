import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseurl/axiosBaseQuery";
import BASE_URL from "../baseurl/base_url";

export interface MostPredictSkinProps {
  most_predicted_disease: string;
  count: number;
}

const MostPredictSkinApi = createApi({
  reducerPath: "MostPredictSkinApi",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMostPredictSkin: builder.query<MostPredictSkinProps, void>({
      query: () => ({
        url: "predict/most-predicted",
        method: "get",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetMostPredictSkinQuery } = MostPredictSkinApi;
export default MostPredictSkinApi;
