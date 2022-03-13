import settings from 'electron-settings';
import os from 'os';
import { extname, join } from 'path';
import { ipcMain, dialog } from 'electron';
import { readFile, writeFile } from 'fs/promises';
import { promisify } from 'util';
import { execFile, spawn, ExecFileException } from 'child_process';

import {
    DIALOG_SHOW_OPEN,
    SETTINGS_GET_KEY,
    SETTINGS_OPEN,
    SETTINGS_SET_KEY,
    SYSTEM_CHECK_QEMU,
    SYSTEM_GET_INFO,
    VM_LAUNCH,
    VM_LOAD_CONFIG,
    VM_EXPORT_CONFIG,
    VM_EXPORT_CONFIG_VALUE,
    DIALOG_SHOW_MESSAGE_BOX,
    DIALOG_SHOW_SAVE,
    SYSTEM_CREATE_IMAGE,
} from './signals';
import { QemuCheckResult } from '../types';
import { DiskImageFormat } from '../enums';
import { QEMU_IMG, QEMU_SYSTEM_X86_64 } from '../consts/system';
import { QEMU_PATH_KEY } from '../consts/settings';

export const onVmExportConfigValue = (window: Electron.BrowserWindow) => {
    ipcMain.on(VM_EXPORT_CONFIG_VALUE, async (_event, config) => {
        const result = await dialog.showSaveDialog(window, {
            filters: [{ name: 'JSON', extensions: ['json'] }],
        });

        if (!result.canceled && result.filePath) {
            const path = extname(result.filePath) === '.json' ? result.filePath : `${result.filePath}.json`;
            await writeFile(path, config, { encoding: 'utf-8' });
        }
    });
};

export const onVmLaunch = (window: Electron.BrowserWindow) => {
    ipcMain.on(VM_LAUNCH, async (_event, args) => {
        const qemuPath = (await settings.get(QEMU_PATH_KEY)) as string;

        if (!qemuPath) {
            await dialog.showMessageBox(window, {
                title: '',
                message: 'Please specify the path to the QEMU folder in the settings',
            });
        }

        const qemuExecutablePath = join(qemuPath, QEMU_SYSTEM_X86_64);

        spawn(`"${qemuExecutablePath}"`, args, {
            detached: true,
            shell: true,
        }).unref();
    });
};

export const onSystemGetInfo = () => {
    ipcMain.handle(SYSTEM_GET_INFO, () => {
        const info = {
            platform: os.platform(),
            cpus: os.cpus().length,
            memory: Math.floor(os.totalmem() / (1024 * 1024 * 1024)), // GiB
        };

        return JSON.parse(JSON.stringify(info));
    });
};

export const onSystemCheckQemu = () => {
    ipcMain.handle(SYSTEM_CHECK_QEMU, (_event, qemuPath: string): Promise<QemuCheckResult> => {
        return Promise.all(
            [QEMU_SYSTEM_X86_64, QEMU_IMG].map(async file => {
                try {
                    const { stdout } = await promisify(execFile)(join(qemuPath, file), ['--version'], {
                        windowsHide: true,
                    });

                    return stdout;
                } catch (error) {
                    return error as ExecFileException;
                }
            })
        ).then(([qemuSystem, qemuImg]) => ({
            qemuSystem,
            qemuImg,
        }));
    });
};

export const onSystemCreateImage = () => {
    ipcMain.handle(SYSTEM_CREATE_IMAGE, async (_event, path: string, format: DiskImageFormat, size: number) => {
        const qemuPath = (await settings.get(QEMU_PATH_KEY)) as string;

        try {
            const { stdout } = await promisify(execFile)(
                join(qemuPath, QEMU_IMG),
                ['create', '-f', `${format}`, path, `${size}G`],
                {
                    windowsHide: true,
                }
            );

            return stdout;
        } catch (error) {
            return error as ExecFileException;
        }
    });
};

export const onMenuVmLoadConfig = (window: Electron.BrowserWindow) => async () => {
    const path = await dialog.showOpenDialog(window, {
        properties: ['openFile'],
        filters: [{ name: 'JSON', extensions: ['json'] }],
    });

    if (path.canceled) {
        return;
    }

    const config = await readFile(path.filePaths[0], { encoding: 'utf-8' });

    window.webContents.send(VM_LOAD_CONFIG, config);
};

export const onMenuVmSaveConfig = (window: Electron.BrowserWindow) => async () => {
    window.webContents.send(VM_EXPORT_CONFIG);
};

export const onMenuSettingsOpen = (window: Electron.BrowserWindow) => async () => {
    window.webContents.send(SETTINGS_OPEN);
};

export const onSettingsGetKey = () => {
    ipcMain.handle(SETTINGS_GET_KEY, (_event, keyPath: string) => {
        return settings.get(keyPath);
    });
};

export const onSettingsSetKey = () => {
    ipcMain.handle(SETTINGS_SET_KEY, (_event, keyPath: string, value) => {
        return settings.set(keyPath, value);
    });
};

export const onShowOpenDialog = (window: Electron.BrowserWindow) => {
    ipcMain.handle(DIALOG_SHOW_OPEN, (_event, dialogOptions: Electron.OpenDialogOptions) => {
        return dialog.showOpenDialog(window, dialogOptions);
    });
};

export const onShowSaveDialog = (window: Electron.BrowserWindow) => {
    ipcMain.handle(DIALOG_SHOW_SAVE, (_event, dialogOptions: Electron.SaveDialogOptions) => {
        return dialog.showSaveDialog(window, dialogOptions);
    });
};

export const onShowMessageBox = (window: Electron.BrowserWindow) => {
    ipcMain.handle(DIALOG_SHOW_MESSAGE_BOX, (_event, messageBoxOptions: Electron.MessageBoxOptions) => {
        return dialog.showMessageBox(window, messageBoxOptions);
    });
};
