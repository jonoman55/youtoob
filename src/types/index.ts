import { LazyExoticComponent, PropsWithChildren } from "react";
import { AxiosRequestConfig } from 'axios';

/**
 * Props With Children (React 18)
 */
export type Children = PropsWithChildren;

/**
 * React Lazy Load - Code Splitting
 */
export type Lazy = LazyExoticComponent<() => JSX.Element>;

// TODO : Update types in each component to match API calls
/**
 * Video
 */
export type Video = {
    brandingSettings?: {
        channel?: {
            country: string;
            description: string;
            keywords: string;
            title: string;
            unsubscribedTrailer: string;
        };
        image?: {
            bannerExternalUrl: string;
        };
    };
    id: {
        videoId?: string;
        channelId?: string;
        kind?: string;
    };
    snippet: {
        title?: string;
        channelId?: string;
        channelTitle?: string;
        thumbnails?: Thumbnails;
    };
    statistics: {
        subscriberCount?: string;
        viewCount?: string;
        likeCount?: string;
    };
};

/**
 * Thumbnail Image
 */
export type Image = {
    url: string;
    width?: number;
    height?: number;
};

/**
 * Thumbnails
 */
export type Thumbnails = {
    default: Image;
    high: Image;
    medium: Image;
};

/**
 * Video
 */
export type TVideo = {
    kind: string;
    id: {
        kind: string;
        videoId: string;
    };
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: Thumbnails;
        channelTitle: string;
        liveBroadcastContent: string;
        publishTime: string;
    };
};

/**
 * Video Details
 */
export type TVideoDetails = {
    kind: string;
    id: string;
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            default: Image;
            medium: Image;
            high: Image;
            standard: Image;
            maxres: Image;
        },
        channelTitle: string;
        tags: string[];
        categoryId: string;
        liveBroadcastContent: string;
        defaultLanguage: string;
        localized: {
            title: string;
            description: string;
        },
        defaultAudioLanguage: string;
    },
    contentDetails: {
        duration: string;
        dimension: string;
        definition: string;
        caption: string;
        licensedContent: boolean;
        contentRating: {};
        projection: string;
    },
    statistics: {
        viewCount: string;
        likeCount: string;
        favoriteCount: string;
        commentCount: string;
    };
};

/**
 * Videos
 */
export type TVideos = {
    kind: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    },
    items: TVideoDetails[];
};

/**
 * Channels
 */
export type TChannels = {
    kind: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    },
    items: TChannelDetails[];
};

/**
 * Channel Details
 */
export type TChannelDetails = {
    brandSettings: {
        channel: {
            country: string;
            description: string;
            keywords: string;
            title: string;
            unsubscribedTrailer: string;
        };
        image: {
            bannerExternalUrl: string;
        };
    };
    contentDetails: {
        relatedPlaylists: {
            likes: string;
            uploads: string;
        };
    };
    id: string;
    kind: string;
    snippet: {
        country: string;
        description: string;
        localized: {
            description: string;
            title: string;
        };
        publishedAt: string;
        thumbnails: Thumbnails;
        title: string;
    };
    statistics: {
        hiddenSubscriberCount: boolean;
        subscriberCount: string;
        viewCount: string;
        likeCount: string;
    };
};

export type TKind = "video" | "channel";

/**
 * Rapid API HTTP Options
 */
export type HttpOptions = {
    params: {
        maxResults: number;
    };
    headers: {
        'X-RapidAPI-Key': string;
        'X-RapidAPI-Host': string;
    }
};

/**
 * Axios Options
 */
export type AxiosOptions = AxiosRequestConfig<HttpOptions>;

/**
 * Category
 */
export type Category = {
    name: string;
    icon: JSX.Element;
};

/**
 * MUI Custom Palette
 */
export type CustomPalette = {
    palette: {
        ytBlack: string;
        gray: string;
        lightGray: string;
        darkGray: string;
        red: string;
        lightRed: string;
        darkRed: string;
        yellow: string;
        lightYellow: string;
        darkYellow: string;
        green: string;
        lightGreen: string;
        darkGreen: string;
        orange: string;
        lightOrange: string;
        darkOrange: string;
        blue: string;
        lightBlue: string;
        darkBlue: string;
        purple: string;
        turquoise: string;
        pink: string;
    }
};