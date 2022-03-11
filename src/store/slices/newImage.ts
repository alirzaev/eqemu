import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { extname } from 'path';

import { RootState } from '..';
import { DiskImageFormat } from '../../enums';
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

export const selectNewImagePath = createAsyncThunk<string | null, void, { state: RootState }>(
    'newImage/selectPath',
    async (_, { getState }) => {
        const { newImage } = getState();

        const result = await electron.dialog.showSaveDialog({
            defaultPath: newImage.path,
            filters: [
                { name: 'QEMU disk image', extensions: ['qcow2'] },
                { name: 'VMware disk image', extensions: ['vmdk'] },
                { name: 'VirtualBox disk image', extensions: ['vdi'] },
            ],
        });

        if (result.canceled || !result.filePath) {
            return null;
        }

        const path = result.filePath;

        if (extname(path) === '') {
            return `${path}.${DiskImageFormat.QCow2}`;
        } else {
            return path;
        }
    }
);

export const createNewImage = createAsyncThunk<Status, void, { state: RootState }>(
    'newImage/create',
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
        resetNewImageState: (state: NewImageState) => {
            state.path = initialState.path;
            state.size = initialState.size;
            state.status = initialState.status;
        },
    },
    extraReducers: builder => {
        builder.addCase(selectNewImagePath.fulfilled, (state: NewImageState, action: PayloadAction<string | null>) => {
            if (action.payload) {
                state.path = action.payload;
            }
        });

        builder.addCase(createNewImage.pending, (state: NewImageState) => {
            state.status = 'pending';
        });
        builder.addCase(createNewImage.fulfilled, (state: NewImageState, action: PayloadAction<Status>) => {
            state.status = action.payload;
        });
    },
});

export const { setNewImageSize, resetNewImageState } = newImageSlice.actions;

export default newImageSlice.reducer;
