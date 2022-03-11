import { ipcRenderer, contextBridge } from 'electron';

import {
    VM_EXPORT_CONFIG,
    VM_LOAD_CONFIG,
    VM_LAUNCH,
    SYSTEM_GET_INFO,
    SETTINGS_OPEN,
    SETTINGS_GET_KEY,
    SETTINGS_SET_KEY,
    DIALOG_SHOW_OPEN,
    SYSTEM_CHECK_QEMU,
    DIALOG_SHOW_MESSAGE_BOX,
    DIALOG_SHOW_SAVE,
    SYSTEM_CREATE_IMAGE,
} from './ipc/signals';
import { ElectronBridge } from './types';

contextBridge.exposeInMainWorld('electron', {
    vmConfig: {
        onExportConfig(callback) {
            ipcRenderer.on(VM_EXPORT_CONFIG, callback);
        },
        onLoadConfig(callback) {
            ipcRenderer.on(VM_LOAD_CONFIG, callback);
        },
    },
    vmManager: {
        launchVm(args) {
            ipcRenderer.send(VM_LAUNCH, args);
        },
    },
    system: {
        getInfo() {
            return ipcRenderer.invoke(SYSTEM_GET_INFO);
        },
        checkQemu(qemuPath) {
            return ipcRenderer.invoke(SYSTEM_CHECK_QEMU, qemuPath);
        },
        createImage(path, format, size) {
            return ipcRenderer.invoke(SYSTEM_CREATE_IMAGE, path, format, size);
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
        showSaveDialog(dialogOptions) {
            return ipcRenderer.invoke(DIALOG_SHOW_SAVE, dialogOptions);
        },
        showMessageBox(messageBoxOptions) {
            return ipcRenderer.invoke(DIALOG_SHOW_MESSAGE_BOX, messageBoxOptions);
        },
    },
} as ElectronBridge);
