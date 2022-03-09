import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ActiveView = 'main' | 'settings';

interface WindowState {
    activeView: ActiveView;
}

const initialState: WindowState = {
    activeView: 'main',
};

export const windowsSlice = createSlice({
    name: 'window',
    initialState,
    reducers: {
        setWindowActiveView: (state: WindowState, action: PayloadAction<ActiveView>) => {
            state.activeView = action.payload;
        },
    },
});

export const { setWindowActiveView } = windowsSlice.actions;

export default windowsSlice.reducer;
