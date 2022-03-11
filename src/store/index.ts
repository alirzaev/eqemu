import { configureStore } from '@reduxjs/toolkit';

import systemReducer from './slices/system';
import vmReducer from './slices/vm';
import launcherReducer from './slices/launcher';
import settingsReducer from './slices/settings';
import windowReducer from './slices/window';
import newImageReducer from './slices/newImage';

export const store = configureStore({
    reducer: {
        system: systemReducer,
        vm: vmReducer,
        launcher: launcherReducer,
        settings: settingsReducer,
        window: windowReducer,
        newImage: newImageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
