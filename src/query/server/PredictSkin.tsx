import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseurl/axiosBaseQuery";
import BASE_URL from "../baseurl/base_url";

const PredictSkinApi = createApi({
  reducerPath: "predictApi",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),

  endpoints: (builder) => ({
    predictSkin: builder.mutation<any, FormData>({
      query: (PredictData) => ({
        url: "predict",
        method: "post",
        data: PredictData,
        headers: { "Content-Type": "multipart/form-data" },
      }),
    }),
  }),
});

export const { usePredictSkinMutation } = PredictSkinApi;
export default PredictSkinApi;
