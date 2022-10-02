import type { AnyAction, Reducer } from '@reduxjs/toolkit';
import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {
    Persistor,
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import appReducer from '../reducers/appSlice';
import themeReducer from '../reducers/themeSlice';
import { youtubeApi } from '../apis/youtubeApi';
import { convertApi } from './../apis/convertApi';
import { ytDataV3Api } from './../apis/ytDataV3Api';

type CombinedState = typeof rootReducer extends Reducer<infer U, any> ? U : never;

const persistConfig = {
    key: 'root',
    storage,
    stateReconciles: hardSet as (inboundState: CombinedState) => CombinedState,
    version: 1,
    whitelist: [
        'app',
        'theme'
    ],
    blacklist: [
        'youtubeApi',
        'convertApi',
        'ytDataV3Api'
    ],
};

const rootReducer = combineReducers({
    app: appReducer,
    theme: themeReducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
    [convertApi.reducerPath]: convertApi.reducer,
    [ytDataV3Api.reducerPath]: ytDataV3Api.reducer
});

const persistedReducer: Reducer<any, AnyAction> = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER
            ],
        },
    }).concat(
        youtubeApi.middleware,
        convertApi.middleware,
        ytDataV3Api.middleware
    ),
});

setupListeners(store.dispatch);

export const persistor: Persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
