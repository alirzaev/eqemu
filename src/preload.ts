import { ipcRenderer, contextBridge } from 'electron';
import { SystemInfo } from './types';

contextBridge.exposeInMainWorld('electron', {
    vmConfig: {
        onRequestConfig(callback: (event: Electron.IpcRendererEvent) => void) {
            ipcRenderer.on('vm:request-config', callback);
        },
        onLoadConfig(callback: (event: Electron.IpcRendererEvent, config: string) => void) {
            ipcRenderer.on('vm:load-config', callback);
        },
        requestDrivePath(): Promise<string> {
            return ipcRenderer.invoke('vm:request-drive-path');
        },
        requestCdromPath(): Promise<string> {
            return ipcRenderer.invoke('vm:request-cdrom-path');
        },
    },
    vmManager: {
        launchVm(args: string[]): void {
            ipcRenderer.send('vm:launch', args);
        },
    },
    system: {
        requestInfo(): Promise<SystemInfo> {
            return ipcRenderer.invoke('system:request-info');
        },
    },
});