import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';

/**
 *  Reducer Path Name
 */
const reducerPath: string = 'youtubeApi';

/**
 * YouTube API V3 Query Params
 */
type Params = {
    part: string,
    type: string,
    maxResults: string | number;
};

/**
 * Query Params
 */
const params: Params = {
    part: 'id,snippet',
    type: 'video',
    maxResults: 50
};

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
                url: `/search?part=snippet&q=${searchTerm}`,
                params,
                responseHandler: async (res: Response) => await res.json(),
            }),
            transformResponse: (response) => response,
        }),
        searchCategoryVideos: builder.query<any, any>({
            query: (selectedCategory: string): string | FetchArgs => ({
                url: `/search?part=snippet&q=${selectedCategory}`,
                params,
                responseHandler: async (res: Response) => await res.json(),
            }),
            transformResponse: (response) => response,
        }),
        videoDetails: builder.query<any, any>({
            query: (id: string | number): string | FetchArgs => ({
                url: `/search?part=snippet&relatedToVideoId=${id}&type=video`,
                params,
                responseHandler: async (res: Response) => await res.json(),
            }),
            transformResponse: (response) => response,
        }),
        videosById: builder.query<any, any>({
            query: (id: string | number): string | FetchArgs => ({
                url: `/search?part=snippet&relatedToVideoId=${id}&type=video`,
                params,
                responseHandler: async (res: Response) => await res.json(),
            }),
            transformResponse: (response) => response,
        }),
        channelDetails: builder.query<any, any>({
            query: (id: string | number): string | FetchArgs => ({
                url: `/search?channelId=${id}&part=snippet%2Cid&order=date`,
                params,
                responseHandler: async (res: Response) => await res.json(),
            }),
            transformResponse: (response) => response,
        }),
        channelVideosById: builder.query<any, any>({
            query: (id: string | number): string | FetchArgs => ({
                url: `/channels?part=snippet&id=${id}`,
                params,
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
    useSearchCategoryVideosQuery,
    useVideoDetailsQuery,
    useVideosByIdQuery,
    useChannelDetailsQuery,
    useChannelVideosByIdQuery,
} = youtubeApi;
