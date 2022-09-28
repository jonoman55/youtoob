import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import type { VideoDownload } from '../types';

/**
 *  Reducer Path Name
 */
const reducerPath: string = 'convertApi';

/**
 * Create API Endpoint Builder Type
 */
type Builder = EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, 'convertApi'>;

/**
 * Base URL
 */
const baseUrl: string = `${process.env.REACT_APP_CONVERT_API_BASE_URL}`;

/**
 * YouTube Convert API - ssyoutube
 */
export const convertApi = createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    endpoints: (builder: Builder) => ({
        convert: builder.mutation<VideoDownload, any>({
            query: (url: string): string | FetchArgs => ({
                url: '/',
                body: { url },
                method: 'POST',
                responseHandler: async (res: Response) => await res.json(),
            }),
            transformResponse: (response: VideoDownload) => response as VideoDownload,
        }),
    }),
});

/**
 * RTKQ Exports
 */
export const {
    useConvertMutation,
} = convertApi;
