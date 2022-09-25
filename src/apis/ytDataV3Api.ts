import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

/**
 *  Reducer Path Name
 */
const reducerPath: string = 'ytDataV3Api';

/**
 * Create API Endpoint Builder Type
 */
type Builder = EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, 'ytDataV3Api'>;

/**
 * Base URL
 */
const baseUrl: string = `${process.env.REACT_APP_YT_API_V3_BASE_URL}`;

/**
 * YouTube Data V3 API Key
 */
const apiKey: string = `${process.env.REACT_APP_YT_API_V3_KEY}`;

/**
 * YouTube Data V3 API
 */
export const ytDataV3Api = createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    endpoints: (builder: Builder) => ({
        getChannelByUsername: builder.query({
            query: (channelName: string) => ({
                url: `/channels?part=snippet&forUsername=${channelName}&key=${apiKey}`,
                responseHandler: async (res: Response) => await res.json(),
            }),
            transformResponse: (response) => response,
        }),
    }),
});

/**
 * RTKQ Exports
 */
export const {
    useGetChannelByUsernameQuery,
} = ytDataV3Api;
