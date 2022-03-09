import { app, BrowserWindow, Menu } from 'electron';
import * as handlers from './ipc/handlers';
import { createApplicationMenu } from './menu';

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
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    if (process.env.NODE_ENV === 'development') {
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    }

    const menu = createApplicationMenu(
        handlers.onMenuVmLoadConfig(mainWindow),
        handlers.onMenuVmSaveConfig(mainWindow),
        handlers.onMenuSettingsOpen(mainWindow)
    );

    Menu.setApplicationMenu(menu);

    handlers.onVmRequestDrivePath(mainWindow);
    handlers.onVmRequestCdromPath(mainWindow);
    handlers.onVmRequestConfigValue(mainWindow);
    handlers.onVmLaunch(mainWindow);

    handlers.onSystemRequestInfo();
    handlers.onSystemCheckQemu();

    handlers.onSettingsGetKey();
    handlers.onSettingsSetKey();

    handlers.onShowOpenDialog(mainWindow);
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
