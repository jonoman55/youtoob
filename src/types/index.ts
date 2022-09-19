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

/**
 * Video Details
 */
export type Video = {
    id: {
        videoId?: string;
        channelId?: string;
        kind?: string;
    };
    snippet: {
        title?: string;
        channelId?: string;
        channelTitle?: string;
        thumbnails?: {
            high: {
                url: string;
            };
        };
    };
    statistics: {
        viewCount?: string;
        likeCount?: string;
        subscriberCount?: string;
    };
};

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