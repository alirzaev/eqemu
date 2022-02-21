const { spawn } = require('child_process');
const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const { readFile, writeFile } = require('fs/promises');
const { createApplicationMenu } = require('./menu');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        useContentSize: true,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY, // eslint-disable-line no-undef
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY); // eslint-disable-line no-undef

    if (process.env.NODE_ENV === 'development') {
    // Open the DevTools.
        mainWindow.webContents.openDevTools();
    }

    const menu = createApplicationMenu(async () => {
        const path = await dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                { name: 'JSON', extensions: ['json'] }
            ]
        });

        if (path.canceled) {
            return;
        }

        const config = await readFile(path.filePaths[0], { encoding: 'utf-8' });

        mainWindow.webContents.send('vm:load-config', config);
    }, async () => {
        mainWindow.webContents.send('vm:request-config');
    });

    Menu.setApplicationMenu(menu);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('vm:request-config-value', async (_event, config) => {
    const path = await dialog.showSaveDialog({
        filters: [
            { name: 'JSON', extensions: ['json'] }
        ]
    });

    if (!path.canceled) {
        await writeFile(path.filePath, config, { encoding: 'utf-8' });
    }
});

ipcMain.handle('vm:request-drive-path', async () => {
    const path = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'QCOW2', extensions: ['qcow2'] }
        ]
    });

    if (!path.canceled) {
        return path.filePaths[0];
    } else {
        return '';
    }
});

ipcMain.handle('vm:request-cdrom-path', async () => {
    const path = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { extensions: ['iso'] }
        ]
    });

    if (!path.canceled) {
        return path.filePaths[0];
    } else {
        return '';
    }
});

ipcMain.on('vm:launch', async (_event, args) => {
    spawn('qemu-system-x86_64', args, {
        detached: true,
        shell: true,
    });
});