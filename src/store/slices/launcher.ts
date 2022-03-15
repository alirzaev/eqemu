import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Shell } from '../../enums';

interface LauncherState {
    shell: Shell;
}

const initialState: LauncherState = {
    shell: Shell.CMD,
};

export const launcherSlice = createSlice({
    name: 'laucnher',
    initialState,
    reducers: {
        setShell: (state: LauncherState, action: PayloadAction<Shell>) => {
            state.shell = action.payload;
        },
    },
});

export const { setShell } = launcherSlice.actions;

export default launcherSlice.reducer;
