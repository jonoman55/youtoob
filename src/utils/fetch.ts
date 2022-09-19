import axios, { AxiosError, AxiosResponse } from 'axios';

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
