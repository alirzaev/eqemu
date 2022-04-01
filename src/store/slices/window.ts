import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ActiveView = 'vm-view' | 'settings' | 'create-new-image';

interface WindowState {
    activeView: ActiveView;
}

const initialState: WindowState = {
    activeView: 'vm-view',
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
