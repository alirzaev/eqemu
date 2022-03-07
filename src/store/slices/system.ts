import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const getInfo = createAsyncThunk('system/getInfo', async () => {
    const info = await electron.system.requestInfo();

    return info;
});

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        setInfo: (state: SystemState, action: PayloadAction<SystemState>) => {
            state.platform = action.payload.platform;
            state.cpus = action.payload.cpus;
            state.memory = action.payload.memory;
        },
    },
    extraReducers: builder => {
        builder.addCase(getInfo.fulfilled, (state, action) => {
            state.platform = action.payload.platform;
            state.cpus = action.payload.cpus;
            state.memory = action.payload.memory;
        });
    },
});

export const { setInfo } = systemSlice.actions;

export default systemSlice.reducer;
