import { ipcRenderer, contextBridge } from 'electron';

import {
    VM_REQUEST_CONFIG,
    VM_LOAD_CONFIG,
    VM_REQUEST_DRIVE_PATH,
    VM_REQUEST_CDROM_PATH,
    VM_LAUNCH,
    SYSTEM_REQUEST_INFO,
    SETTINGS_OPEN,
    SETTINGS_GET_KEY,
    SETTINGS_SET_KEY,
    DIALOG_SHOW_OPEN,
    SYSTEM_CHECK_QEMU,
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
        checkQemu(qemuPath) {
            return ipcRenderer.invoke(SYSTEM_CHECK_QEMU, qemuPath);
        },
    },
    settings: {
        onOpenSettings(callback) {
            ipcRenderer.on(SETTINGS_OPEN, callback);
        },
        getSettingsKey(keyPath) {
            return ipcRenderer.invoke(SETTINGS_GET_KEY, keyPath);
        },
        setSettingsKey(keyPath, value) {
            ipcRenderer.invoke(SETTINGS_SET_KEY, keyPath, value);
        },
    },
    dialog: {
        showOpenDialog(dialogOptions) {
            return ipcRenderer.invoke(DIALOG_SHOW_OPEN, dialogOptions);
        },
    },
} as ElectronBridge);
