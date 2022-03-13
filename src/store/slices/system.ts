import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SystemInfo } from '../../types';

interface SystemState {
    platform: NodeJS.Platform;
    cpus: number;
    memory: number;
}

const initialState: SystemState = {
    platform: 'win32',
    cpus: 1,
    memory: 1,
};

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        setSystemInfo: (state: SystemState, action: PayloadAction<SystemInfo>) => {
            state.platform = action.payload.platform;
            state.cpus = action.payload.cpus;
            state.memory = action.payload.memory;
        },
    },
});

export const { setSystemInfo } = systemSlice.actions;

export default systemSlice.reducer;
