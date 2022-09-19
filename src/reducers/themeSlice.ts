import { createSlice } from '@reduxjs/toolkit';

import { getItem } from '../utils';

const theme: string = getItem('theme') as string;

interface ThemeState {
    darkMode: boolean;
};

const initialState: ThemeState = {
    darkMode: Boolean(theme) ? false : true
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state: ThemeState) => {
            state.darkMode = !state.darkMode;
            localStorage.setItem(
                'theme',
                state.darkMode.toString()
            );
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
