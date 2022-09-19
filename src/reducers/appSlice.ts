import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    tabValue: number;
    drawerOpen: boolean;
    navbarAlignment: string;
    showToolbar: boolean;
};

const initialState: AppState = {
    tabValue: 0,
    drawerOpen: false,
    navbarAlignment: 'Home',
    showToolbar: true,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        reset: () => initialState,
        setTabValue: (state: AppState, action: PayloadAction<number>) => {
            state.tabValue = action.payload;
        },
        setDrawerOpen: (state: AppState, action: PayloadAction<boolean>) => {
            state.drawerOpen = action.payload;
        },
        setNavbarAlignment: (state: AppState, action: PayloadAction<string>) => {
            state.navbarAlignment = action.payload;
        },
        setShowToolbar: (state: AppState, action: PayloadAction<boolean>) => {
            state.showToolbar = action.payload;
        },
    },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;