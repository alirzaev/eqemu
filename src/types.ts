import { BootDevice, GraphicsCard } from './enums';

export interface SystemInfo {
    platform: NodeJS.Platform;
    cpus: number;
    memory: number;
}

export interface ElectronBridge {
    vmConfig: {
        onRequestConfig: (callback: (event: Electron.IpcRendererEvent) => void) => void;
        onLoadConfig: (callback: (event: Electron.IpcRendererEvent, config: string) => void) => void;
        requestDrivePath: () => Promise<string>;
        requestCdromPath: () => Promise<string>;
    };
    vmManager: {
        launchVm: (args: string[]) => void;
    };
    system: {
        requestInfo: () => Promise<SystemInfo>;
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

export enum DiskImageFormat {
    QCow2 = 'qcow2',
    Vmware = 'vmdk',
    Vdi = 'vdi',
    Raw = 'raw',
}
