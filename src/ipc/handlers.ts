import settings from 'electron-settings';
import os from 'os';
import { ipcMain, dialog } from 'electron';
import { readFile, writeFile } from 'fs/promises';
import { spawn } from 'child_process';
import {
    SYSTEM_REQUEST_INFO,
    VM_LAUNCH,
    VM_LOAD_CONFIG,
    VM_REQUEST_CDROM_PATH,
    VM_REQUEST_CONFIG,
    VM_REQUEST_CONFIG_VALUE,
    VM_REQUEST_DRIVE_PATH,
} from './signals';

export const onVmRequestConfigValue = (window: Electron.BrowserWindow) => {
    ipcMain.on(VM_REQUEST_CONFIG_VALUE, async (_event, config) => {
        const path = await dialog.showSaveDialog(window, {
            filters: [{ name: 'JSON', extensions: ['json'] }],
        });

        if (!path.canceled && path.filePath) {
            await writeFile(path.filePath, config, { encoding: 'utf-8' });
        }
    });
};

export const onVmRequestDrivePath = (window: Electron.BrowserWindow) => {
    ipcMain.handle(VM_REQUEST_DRIVE_PATH, async () => {
        const path = await dialog.showOpenDialog(window, {
            properties: ['openFile'],
            filters: [{ name: 'QCOW2', extensions: ['qcow2'] }],
        });

        if (!path.canceled) {
            return path.filePaths[0];
        } else {
            return '';
        }
    });
};

export const onVmRequestCdromPath = (window: Electron.BrowserWindow) => {
    ipcMain.handle(VM_REQUEST_CDROM_PATH, async () => {
        const path = await dialog.showOpenDialog(window, {
            properties: ['openFile'],
            filters: [{ extensions: ['iso'], name: 'ISO images' }],
        });

        if (!path.canceled) {
            return path.filePaths[0];
        } else {
            return '';
        }
    });
};

export const onVmLaunch = (window: Electron.BrowserWindow) => {
    ipcMain.on(VM_LAUNCH, async (_event, args) => {
        let qemuSystemExecutablePath = await settings.get('qemu.system.path');

        if (!qemuSystemExecutablePath) {
            await dialog.showMessageBox(window, {
                title: '',
                message: "Please provide the path to 'qemu-system-x86_64' executable",
            });

            const path = await dialog.showOpenDialog(window, {
                properties: ['openFile'],
            });

            if (!path.canceled) {
                qemuSystemExecutablePath = path.filePaths[0];

                await settings.set('qemu.system.path', qemuSystemExecutablePath);
            } else {
                return;
            }
        }

        spawn(`"${qemuSystemExecutablePath}"`, args, {
            detached: true,
            shell: true,
        }).unref();
    });
};

export const onSystemRequestInfo = () => {
    ipcMain.handle(SYSTEM_REQUEST_INFO, () => {
        const info = {
            platform: os.platform(),
            cpus: os.cpus().length,
            memory: Math.floor(os.totalmem() / (1024 * 1024 * 1024)), // GiB
        };

        return JSON.parse(JSON.stringify(info));
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
    window.webContents.send(VM_REQUEST_CONFIG);
};
