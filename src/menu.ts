import { app, Menu, shell } from 'electron';

export function createApplicationMenu(
    loadVmConfigCallback: () => Promise<void>,
    saveVmConfigCallback: () => Promise<void>
) {
    const isMac = process.platform === 'darwin';

    const template: Electron.MenuItemConstructorOptions[] = [
        // { role: 'appMenu' }
        ...(isMac
            ? ([
                  {
                      label: app.name,
                      submenu: [
                          { role: 'about' },
                          { type: 'separator' },
                          { role: 'services' },
                          { type: 'separator' },
                          { role: 'hide' },
                          { role: 'hideOthers' },
                          { role: 'unhide' },
                          { type: 'separator' },
                          { role: 'quit' },
                      ],
                  },
              ] as Electron.MenuItemConstructorOptions[])
            : []),
        // { role: 'fileMenu' }
        {
            label: 'File',
            submenu: [
                { label: 'Open', click: loadVmConfigCallback },
                { label: 'Save', click: saveVmConfigCallback },
                isMac ? { role: 'close' } : { role: 'quit' },
            ],
        },
        // { role: 'editMenu' }
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                ...(isMac
                    ? ([
                          { role: 'pasteAndMatchStyle' },
                          { role: 'delete' },
                          { role: 'selectAll' },
                          { type: 'separator' },
                          {
                              label: 'Speech',
                              submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }],
                          },
                      ] as Electron.MenuItemConstructorOptions[])
                    : ([
                          { role: 'delete' },
                          { type: 'separator' },
                          { role: 'selectAll' },
                      ] as Electron.MenuItemConstructorOptions[])),
            ],
        },
        // { role: 'viewMenu' }
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' },
            ],
        },
        // { role: 'windowMenu' }
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
                ...(isMac
                    ? ([
                          { type: 'separator' },
                          { role: 'front' },
                          { type: 'separator' },
                          { role: 'window' },
                      ] as Electron.MenuItemConstructorOptions[])
                    : ([{ role: 'close' }] as Electron.MenuItemConstructorOptions[])),
            ],
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: async () => {
                        await shell.openExternal('https://github.com/alirzaev/eqemu');
                    },
                },
            ],
        },
    ];

    return Menu.buildFromTemplate(template);
}
