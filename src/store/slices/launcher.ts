import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ShellDelimeter } from '../../enums';

interface LauncherState {
    shell: ShellDelimeter;
}

const initialState: LauncherState = {
    shell: ShellDelimeter.Cmd,
};

export const launcherSlice = createSlice({
    name: 'laucnher',
    initialState,
    reducers: {
        setShell: (state: LauncherState, action: PayloadAction<ShellDelimeter>) => {
            state.shell = action.payload;
        },
    },
});

export const { setShell } = launcherSlice.actions;

export default launcherSlice.reducer;
