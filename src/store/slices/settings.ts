import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationSettings } from '../../types';
import { QEMU_PATH_KEY } from '../../consts/settings';

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

export const loadSettings = createAsyncThunk('settings/loadSettings', async (): Promise<ApplicationSettings> => {
    const qemuPath = ((await electron.settings.getSettingsKey(QEMU_PATH_KEY)) as string) ?? '';
    const status = await validateQemuPath(qemuPath);

    return {
        qemu: {
            path: qemuPath,
            status: status,
        },
    };
});

export const setQemuPath = createAsyncThunk<QemuStatus, string>('settings/setQemuPath', async path => {
    await electron.settings.setSettingsKey(QEMU_PATH_KEY, path);

    return validateQemuPath(path);
});

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loadSettings.pending, (state: SettingsState) => {
            state.loaded = false;
        });
        builder.addCase(loadSettings.fulfilled, (state: SettingsState, action: PayloadAction<ApplicationSettings>) => {
            state.qemu = action.payload.qemu;
            state.loaded = true;
        });

        builder.addCase(setQemuPath.pending, (state: SettingsState, action) => {
            state.qemu.path = action.meta.arg;
            state.qemu.status = { qemuSystem: 'pending', qemuImg: 'pending' };
        });
        builder.addCase(setQemuPath.fulfilled, (state: SettingsState, action: PayloadAction<QemuStatus>) => {
            state.qemu.status = action.payload;
        });
    },
});

export default settingsSlice.reducer;
