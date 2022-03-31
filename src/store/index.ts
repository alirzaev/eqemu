import { configureStore } from '@reduxjs/toolkit';

import systemReducer from './slices/system';
import vmReducer from './slices/vm';
import settingsReducer from './slices/settings';
import windowReducer from './slices/window';

export const store = configureStore({
    reducer: {
        system: systemReducer,
        vm: vmReducer,
        settings: settingsReducer,
        window: windowReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
