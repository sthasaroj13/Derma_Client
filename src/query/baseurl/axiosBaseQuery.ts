// import type { BaseQueryFn } from "@reduxjs/toolkit/query";
// import type { AxiosRequestConfig } from "axios";
// import axios from "axios";

// export const axiosBaseQuery = ({ baseUrl }: { baseUrl: string }): BaseQueryFn<any, unknown, { message: string }> => async ({ url, method, params, data, headers }: AxiosRequestConfig) => {
//     try {
//         const response = await axios({
//             url: `${baseUrl}${url}`,
//             method,
//             params,
//             data,
//             headers
//         });

//         return { data: response.data };
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             return {
//                 error: { message: error.response ? error.response.data : error.message },
//             };
//         } else {
//             return {
//                 error: { message: 'An unknown error occurred' },
//             };
//         }
//     }
// };
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";

export const axiosBaseQuery = ({
    baseUrl,
}: {
    baseUrl: string;
}): BaseQueryFn<
    AxiosRequestConfig,
    unknown,
    { message: string | { detail?: string } }
> =>
    async ({ url, method, params, data, headers }: AxiosRequestConfig) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios({
                url: `${baseUrl}${url}`,
                method,
                params,
                data,
                headers: {
                    ...headers,
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            });

            return { data: response.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    error: {
                        message: error.response?.data || error.message,
                    },
                };
            }
            return {
                error: { message: "An unknown error occurred" },
            };
        }
    };