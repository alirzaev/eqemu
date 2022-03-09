import settings from 'electron-settings';
import os from 'os';
import { join } from 'path';
import { ipcMain, dialog } from 'electron';
import { readFile, writeFile } from 'fs/promises';
import { execFile, spawn } from 'child_process';

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
} from './signals';

export const onVmExportConfigValue = (window: Electron.BrowserWindow) => {
    ipcMain.on(VM_EXPORT_CONFIG_VALUE, async (_event, config) => {
        const path = await dialog.showSaveDialog(window, {
            filters: [{ name: 'JSON', extensions: ['json'] }],
        });

        if (!path.canceled && path.filePath) {
            await writeFile(path.filePath, config, { encoding: 'utf-8' });
        }
    });
};

export const onVmLaunch = (window: Electron.BrowserWindow) => {
    ipcMain.on(VM_LAUNCH, async (_event, args) => {
        const qemuPath = (await settings.get('qemu.system.path')) as string;

        if (!qemuPath) {
            await dialog.showMessageBox(window, {
                title: '',
                message: 'Please specify the path to the QEMU folder in the settings',
            });
        }

        const qemuExecutablePath = join(qemuPath, 'qemu-system-x86_64');

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
    ipcMain.handle(SYSTEM_CHECK_QEMU, (_event, qemuPath: string) => {
        return new Promise(resolve => {
            execFile(
                join(qemuPath, 'qemu-system-x86_64'),
                ['--version'],
                {
                    windowsHide: true,
                },
                (error, stdout, stderr) => {
                    if (error) {
                        resolve([error, stderr]);
                    } else {
                        resolve([null, stdout]);
                    }
                }
            );
        });
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
