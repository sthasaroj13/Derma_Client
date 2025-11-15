import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseurl/axiosBaseQuery";
import BASE_URL from "../baseurl/base_url";

const PredictSkinApi = createApi({
  reducerPath: "predictApi",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Prediction"],
  endpoints: (builder) => ({
    predictSkin: builder.mutation<any, FormData>({
      query: (PredictData) => ({
        url: "predict",
        method: "post",
        data: PredictData,
        headers: { "Content-Type": "multipart/form-data" },
      }),
      invalidatesTags: ["Prediction"],
    }),

    getPrdictSkin: builder.query<any, void>({
      query: () => ({
        url: "predict/history",
        method: "GET",
      }),
      providesTags: ["Prediction"],
    }),
  }),
});

export const { usePredictSkinMutation, useGetPrdictSkinQuery } = PredictSkinApi;
export default PredictSkinApi;
