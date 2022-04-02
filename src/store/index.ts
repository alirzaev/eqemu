import { configureStore } from '@reduxjs/toolkit';

import vmReducer from './slices/vm';
import settingsReducer from './slices/settings';
import windowReducer from './slices/window';

export const store = configureStore({
    reducer: {
        vm: vmReducer,
        settings: settingsReducer,
        window: windowReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
