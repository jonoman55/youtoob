import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    selectedCategory: string;
    lastVisited: number;
};

const initialState: AppState = {
    selectedCategory: 'New',
    lastVisited: Date.now(),
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
    },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
