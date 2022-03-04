import { configureStore } from '@reduxjs/toolkit';

import systemReducer from './slices/system';
import vmReducer from './slices/vm';
import launcherReducer from './slices/launcher';

export const store = configureStore({
    reducer: {
        system: systemReducer,
        vm: vmReducer,
        launcher: launcherReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
