import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationSettings } from '../../types';

interface SettingsState extends ApplicationSettings {
    loaded: boolean;
}

const initialState: SettingsState = {
    loaded: false,
    qemu: {
        path: '',
        status: {
            qemuSystem: 'invalid',
            qemuImg: 'invalid',
        },
    },
};

type QemuStatus = typeof initialState.qemu.status;

async function validateQemuPath(qemuPath: string): Promise<QemuStatus> {
    const { qemuSystem, qemuImg } = await electron.system.checkQemu(qemuPath);
    const QEMU_SYSTEM_RE = /^QEMU emulator version (\d+.\d+.\d+)/;
    const QEMU_IMG_RE = /^qemu-img version (\d+.\d+.\d+)/;

    return {
        qemuSystem: typeof qemuSystem === 'string' && qemuSystem.match(QEMU_SYSTEM_RE) ? 'valid' : 'invalid',
        qemuImg: typeof qemuImg === 'string' && qemuImg.match(QEMU_IMG_RE) ? 'valid' : 'invalid',
    };
}

export const loadSettings = createAsyncThunk('settings/load', async (): Promise<ApplicationSettings> => {
    const qemuPath = ((await electron.settings.getSettingsKey('qemu.system.path')) as string) ?? '';
    const status = await validateQemuPath(qemuPath);

    return {
        qemu: {
            path: qemuPath,
            status: status,
        },
    };
});

export const updateQemuPath = createAsyncThunk('settings/updateQemuPath', async (_, { dispatch }) => {
    const result = await electron.dialog.showOpenDialog({
        properties: ['openDirectory'],
    });

    if (result.canceled) {
        return null;
    }

    const path = result.filePaths[0];

    await electron.settings.setSettingsKey('qemu.system.path', path);

    dispatch(setQemuPath(path));
    dispatch(setQemuStatus({ qemuSystem: 'pending', qemuImg: 'pending' }));

    const status = await validateQemuPath(path);
    dispatch(setQemuStatus(status));
});

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setQemuStatus: (state: SettingsState, action: PayloadAction<QemuStatus>) => {
            state.qemu.status = action.payload;
        },
        setQemuPath: (state: SettingsState, action: PayloadAction<string>) => {
            state.qemu.path = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(loadSettings.pending, (state: SettingsState) => {
            state.loaded = false;
        });
        builder.addCase(loadSettings.fulfilled, (state: SettingsState, action: PayloadAction<ApplicationSettings>) => {
            state.qemu = action.payload.qemu;
            state.loaded = true;
        });
    },
});

const { setQemuPath, setQemuStatus } = settingsSlice.actions;

export default settingsSlice.reducer;
