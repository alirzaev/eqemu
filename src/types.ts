import type { ExecFileException } from 'child_process';
import * as rt from 'runtypes';

import { BootDevice, DiskImageFormat, GraphicsCard } from './enums';

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
        checkQemu: (qemuPath: string) => Promise<QemuCheckResult>;
        createImage: (path: string, format: DiskImageFormat, size: number) => Promise<ExecFileException | string>;
    };
    settings: {
        onOpenSettings: (callback: (event: Electron.IpcRendererEvent) => void) => void;
        getSettingsKey: (keyPath: string) => Promise<unknown>;
        setSettingsKey: (keyPath: string, value: unknown) => Promise<void>;
    };
    dialog: {
        showOpenDialog: (dialogOption: Electron.OpenDialogOptions) => Promise<Electron.OpenDialogReturnValue>;
        showSaveDialog: (dialogOption: Electron.SaveDialogOptions) => Promise<Electron.SaveDialogReturnValue>;
        showMessageBox: (messageBoxOptions: Electron.MessageBoxOptions) => Promise<Electron.MessageBoxReturnValue>;
    };
}

function RuntypeEnum<E>(e: Record<string, E>): rt.Runtype<E> {
    const values = Object.values<unknown>(e);

    const isEnumValue = (input: unknown): input is E => values.includes(input);
    const errorMessage = (input: unknown): string =>
        `Failed constraint check. Expected one of ${JSON.stringify(values)}, but received ${JSON.stringify(input)}`;

    return rt.Unknown.withConstraint<E>(object => isEnumValue(object) || errorMessage(object));
}

export const VmConfigRuntype = rt.Record({
    memory: rt.Number.withConstraint(v => Number.isInteger(v)).withConstraint(v => v >= 1),
    cpu: rt.Record({
        cores: rt.Number.withConstraint(v => Number.isInteger(v)).withConstraint(v => v >= 1 && v <= 4),
    }),
    cdrom: rt.Record({
        enabled: rt.Boolean,
        path: rt.String,
    }),
    drive: rt.Record({
        enabled: rt.Boolean,
        path: rt.String,
    }),
    bootDevice: RuntypeEnum(BootDevice),
    graphics: rt.Record({
        card: RuntypeEnum(GraphicsCard),
    }),
    audio: rt.Record({
        enabled: rt.Boolean,
    }),
    network: rt.Record({
        enabled: rt.Boolean,
    }),
    spiceAgent: rt.Record({
        enabled: rt.Boolean,
    }),
    spiceServer: rt.Record({
        enabled: rt.Boolean,
        port: rt.Number.withConstraint(v => Number.isInteger(v)).withConstraint(v => v >= 0 && v <= 65535),
        ticketing: rt.Boolean,
        password: rt.String,
        usbRedirection: rt.Boolean,
    }),
});

export type VmConfig = rt.Static<typeof VmConfigRuntype>;

export type QemuCheckStatus = 'valid' | 'pending' | 'invalid';

export interface QemuCheckResult {
    QemuSystemx86_64: ExecFileException | string;
    QemuImg: ExecFileException | string;
}

export interface ApplicationSettings {
    qemu: {
        path: string;
        status: {
            QemuSystemx86_64: QemuCheckStatus;
            QemuImg: QemuCheckStatus;
        };
    };
}
