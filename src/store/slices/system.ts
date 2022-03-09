import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const getSystemInfo = createAsyncThunk('system/getInfo', async () => {
    const info = await electron.system.getInfo();

    return info;
});

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getSystemInfo.fulfilled, (state, action) => {
            state.platform = action.payload.platform;
            state.cpus = action.payload.cpus;
            state.memory = action.payload.memory;
        });
    },
});

export default systemSlice.reducer;
