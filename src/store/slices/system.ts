import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { SystemInfo } from '../../types';

interface SystemState {
    info: SystemInfo;
}

const initialState: SystemState = {
    info: { platform: 'win32', cpus: 1, memory: 1 },
};

export const loadSystemInfo = createAsyncThunk('system/loadSystemInfo', async (): Promise<SystemInfo | undefined> => {
    try {
        const info = await electron.system.getInfo();

        return info;
    } catch (_) {
        return undefined;
    }
});

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loadSystemInfo.fulfilled, (state, action) => {
            if (action.payload) {
                state.info = action.payload;
            }
        });
    },
});

export default systemSlice.reducer;
