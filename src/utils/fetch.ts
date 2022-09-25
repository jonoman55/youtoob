import axios, { AxiosError, AxiosResponse } from 'axios';
import { demoProfilePicture } from '../constants';

import type { AxiosOptions } from '../types';

export const BASE_URL: string = 'https://youtube-v31.p.rapidapi.com';

const options: AxiosOptions = {
    params: {
        maxResults: 50,
    },
    headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    },
};

/**
 * Fetch Data From API
 * @param {string} url Target URL
 * @returns {Promise<any>} Axios Response or Error
 */
export const fetchFromAPI = async (url: string): Promise<any> => {
    try {
        const { data }: AxiosResponse<any, any> = await axios.get(`${BASE_URL}/${url}`, options);
        return data;
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return error;
    }
};

/**
 * Fetch Channel Image URL
 * @param {string} channelName YouTube Channel Name
 * @returns {Promise<string>} Channel Image URL
 */
export const fetchChannelImageUrl = async (channelName: string): Promise<string> => {
    const url: string = `${process.env.REACT_APP_YT_API_V3_BASE_URL}/channels?part=snippet&forUsername=${channelName}&key=${process.env.REACT_APP_YT_API_V3_KEY}`;
    const response: AxiosResponse<any, any> = await axios.get(url);
    if (response.status === 200) {
        const data: any = response.data;
        return data.items[0].snippet.thumbnails.default.url as string;
    }
    return demoProfilePicture;
};

// TODO : Implement a createApi rtkq instance for this api
/**
 * Fetch From YouTube Data API v3
 * @param {string} endpoint YouTube API Endpoint
 * @returns {Promise<string>} Channel Image URL
 */
export const fetchFromYouTubeApi = async (endpoint: string): Promise<any> => {
    try {
        const url: string = `${process.env.REACT_APP_YT_API_V3_BASE_URL}/${endpoint}&key=${process.env.REACT_APP_YT_API_V3_KEY}`;
        const { data }: AxiosResponse<any, any> = await axios.get(url);
        return data;
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return error;
    }
};
