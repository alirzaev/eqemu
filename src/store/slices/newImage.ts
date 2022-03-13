import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { getImageFileFormat } from '../../utils';

type Status = 'pending' | 'failed' | 'ready';

interface NewImageState {
    path: string;
    size: number;
    status: Status;
}

const initialState: NewImageState = {
    path: '',
    size: 25,
    status: 'ready',
};

export const createNewImage = createAsyncThunk<Status, void, { state: RootState }>(
    'newImage/createNewImage',
    async (_, { getState }) => {
        const { path, size } = getState().newImage;
        const format = getImageFileFormat(path);

        const result = await electron.system.createImage(path, format, size);

        if (typeof result === 'string') {
            return 'ready';
        } else {
            return 'failed';
        }
    }
);

export const newImageSlice = createSlice({
    name: 'newImage',
    initialState,
    reducers: {
        setNewImageSize: (state: NewImageState, action: PayloadAction<number>) => {
            state.size = action.payload;
        },
        setNewImagePath: (state: NewImageState, action: PayloadAction<string>) => {
            state.path = action.payload;
        },
        resetNewImageState: (state: NewImageState) => {
            state.path = initialState.path;
            state.size = initialState.size;
            state.status = initialState.status;
        },
    },
    extraReducers: builder => {
        builder.addCase(createNewImage.pending, (state: NewImageState) => {
            state.status = 'pending';
        });
        builder.addCase(createNewImage.fulfilled, (state: NewImageState, action: PayloadAction<Status>) => {
            state.status = action.payload;
        });
    },
});

export const { setNewImageSize, setNewImagePath, resetNewImageState } = newImageSlice.actions;

export default newImageSlice.reducer;
