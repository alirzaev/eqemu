import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { View } from '../../enums';

interface WindowState {
    activeView: View;
}

const initialState: WindowState = {
    activeView: View.VM_VIEW,
};

export const windowsSlice = createSlice({
    name: 'window',
    initialState,
    reducers: {
        setWindowActiveView: (state: WindowState, action: PayloadAction<View>) => {
            state.activeView = action.payload;
        },
    },
});

export const { setWindowActiveView } = windowsSlice.actions;

export default windowsSlice.reducer;
