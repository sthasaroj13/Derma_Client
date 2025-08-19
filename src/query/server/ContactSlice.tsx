import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseurl/axiosBaseQuery";
import BASE_URL from "../baseurl/base_url";
import type { ContactForm } from "../../Types/contact";

const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    contactUser: builder.mutation<
      { message: string; success: boolean },
      ContactForm
    >({
      query: (contactData) => ({
        url: "contact",
        method: "post",
        data: contactData,
      }),
    }),
  }),
});
export const { useContactUserMutation } = contactApi;
export default contactApi;
