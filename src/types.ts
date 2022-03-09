import { BootDevice, GraphicsCard } from './enums';

export interface SystemInfo {
    platform: NodeJS.Platform;
    cpus: number;
    memory: number;
}

export interface ElectronBridge {
    vmConfig: {
        onExportConfig: (callback: (event: Electron.IpcRendererEvent) => void) => void;
        onLoadConfig: (callback: (event: Electron.IpcRendererEvent, config: string) => void) => void;
    };
    vmManager: {
        launchVm: (args: string[]) => void;
    };
    system: {
        getInfo: () => Promise<SystemInfo>;
        checkQemu: (qemuPath: string) => Promise<[Error | null, string]>;
    };
    settings: {
        onOpenSettings: (callback: (event: Electron.IpcRendererEvent) => void) => void;
        getSettingsKey: (keyPath: string) => Promise<unknown>;
        setSettingsKey: (keyPath: string, value: unknown) => Promise<void>;
    };
    dialog: {
        showOpenDialog: (dialogOption: Electron.OpenDialogOptions) => Promise<Electron.OpenDialogReturnValue>;
    };
}

export interface VmConfig {
    memory: number;
    cpu: {
        cores: number;
    };
    cdrom: {
        enabled: boolean;
        path: string;
    };
    drive: {
        enabled: boolean;
        path: string;
    };
    bootDevice: BootDevice;
    graphics: {
        card: GraphicsCard;
    };
    audio: {
        enabled: boolean;
    };
    network: {
        enabled: boolean;
    };
    spiceAgent: {
        enabled: boolean;
    };
    spiceServer: {
        enabled: boolean;
        port: number;
        ticketing: boolean;
        password: string;
        usbRedirection: boolean;
    };
}

export interface ApplicationSettings {
    qemu: {
        path: string;
        status: 'valid' | 'pending' | 'invalid';
    };
}
