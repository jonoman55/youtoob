import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';

/**
 *  Reducer Path Name
 */
const reducerPath: string = 'youtubeApi';

// /**
//  * YouTube API V3 Query Params
//  */
// type Params = {
//     part: string;
//     type: string;
//     regionCode: string;
//     order: string;
//     maxResults: string | number;
// };

// /**
//  * Query Params
//  */
// const params: Params = {
//     part: 'id,snippet',
//     type: 'video',
//     regionCode: 'US',
//     order: 'date',
//     maxResults: 50
// };

/**
 * Create API Endpoint Builder Type
 */
type Builder = EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, 'youtubeApi'>;

/**
 * Base URL
 */
const baseUrl: string = `${process.env.REACT_APP_YT_API_BASE_URL}`;

/**
 * YouTube API V3 - RapidAPI
 */
export const youtubeApi = createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers: Headers): MaybePromise<Headers> => {
            headers.set('X-RapidAPI-Key', `${process.env.REACT_APP_RAPID_API_KEY}`);
            headers.set('X-RapidAPI-Host', `${process.env.REACT_APP_RAPID_API_HOST}`);
            return headers;
        },
    }),
    endpoints: (builder: Builder) => ({
        searchVideos: builder.query<any, any>({
            query: (searchTerm: string): string | FetchArgs => ({
                url: `/search`,
                params: {
                    q: `${searchTerm}`,
                    part: 'snippet,id',
                    regionCode: 'US',
                    maxResults: '50',
                    order: 'date'
                },
                responseHandler: async (res: Response) => await res.json(),
            }),
            transformResponse: (response) => response,
        }),
        videoDetails: builder.query<any, any>({
            query: (id: string | number): string | FetchArgs => ({
                url: `/videos`,
                params: {
                    id: `${id}`,
                    part: 'contentDetails,snippet,statistics',
                    regionCode: 'US',
                },
                responseHandler: async (res: Response) => await res.json(),
            }),
            transformResponse: (response) => response,
        }),
        relatedVideos: builder.query<any, any>({
            query: (id: string | number): string | FetchArgs => ({
                url: `/search`,
                params: {
                    relatedToVideoId: `${id}`,
                    part: 'id,snippet',
                    type: 'video',
                    regionCode: 'US',
                    maxResults: '50'
                },
                responseHandler: async (res: Response) => await res.json(),
            }),
            transformResponse: (response) => response,
        }),
        channelDetails: builder.query<any, any>({
            query: (id: string | number): string | FetchArgs => ({
                url: `/channels`,
                params: {
                    id: `${id}`,
                    part: 'snippet,statistics',
                    regionCode: 'US',
                    order: 'date'
                },
                responseHandler: async (res: Response) => await res.json(),
            }),
            transformResponse: (response) => response,
        }),
        channelVideos: builder.query<any, any>({
            query: (id: string | number): string | FetchArgs => ({
                url: `/search`,
                params: {
                    channelId: `${id}`,
                    part: 'snippet,id',
                    order: 'date',
                    regionCode: 'US',
                    maxResults: '50'
                },
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
    useSearchVideosQuery,
    useVideoDetailsQuery,
    useRelatedVideosQuery,
    useChannelDetailsQuery,
    useChannelVideosQuery,
} = youtubeApi;
