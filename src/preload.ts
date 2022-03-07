import { ipcRenderer, contextBridge } from 'electron';

import {
    VM_REQUEST_CONFIG,
    VM_LOAD_CONFIG,
    VM_REQUEST_DRIVE_PATH,
    VM_REQUEST_CDROM_PATH,
    VM_LAUNCH,
    SYSTEM_REQUEST_INFO
} from './ipc/signals';

import { ElectronBridge } from './types';

contextBridge.exposeInMainWorld('electron', {
    vmConfig: {
        onRequestConfig(callback) {
            ipcRenderer.on(VM_REQUEST_CONFIG, callback);
        },
        onLoadConfig(callback) {
            ipcRenderer.on(VM_LOAD_CONFIG, callback);
        },
        requestDrivePath() {
            return ipcRenderer.invoke(VM_REQUEST_DRIVE_PATH);
        },
        requestCdromPath() {
            return ipcRenderer.invoke(VM_REQUEST_CDROM_PATH);
        },
    },
    vmManager: {
        launchVm(args) {
            ipcRenderer.send(VM_LAUNCH, args);
        },
    },
    system: {
        requestInfo() {
            return ipcRenderer.invoke(SYSTEM_REQUEST_INFO);
        },
    },
} as ElectronBridge);
