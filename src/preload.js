import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    vmConfig: {
        onRequestConfig(callback) {
            ipcRenderer.on('vm:request-config', callback);
        },
        onLoadConfig(callback) {
            ipcRenderer.on('vm:load-config', callback);
        },
        requestDrivePath() {
            return ipcRenderer.invoke('vm:request-drive-path');
        },
        requestCdromPath() {
            return ipcRenderer.invoke('vm:request-cdrom-path');
        },
    },
    vmManager: {
        launchVm(args) {
            ipcRenderer.send('vm:launch', args);
        },
    },
});