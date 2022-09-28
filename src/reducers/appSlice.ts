import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { VideoDownload } from '../types';

interface AppState {
    selectedCategory: string;
    lastVisited: number;
    dialogOpen: boolean;
    videoDownload: VideoDownload | null;
};

const initialState: AppState = {
    selectedCategory: 'New',
    lastVisited: Date.now(),
    dialogOpen: false,
    videoDownload: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        reset: (state: AppState) => {
            state = initialState;
        },
        setSelectedCategory: (state: AppState, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload;
        },
        setLastVisited: (state: AppState, action: PayloadAction<number>) => {
            if (state.lastVisited !== action.payload) {
                state.lastVisited = action.payload;
            }
        },
        setDialogOpen: (state: AppState, action: PayloadAction<boolean>) => {
            state.dialogOpen = action.payload;
        },
        setVideoDownload: (state: AppState, action: PayloadAction<VideoDownload | null>) => {
            state.videoDownload = action.payload;
        },
    },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
