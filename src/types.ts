import type { ExecFileException } from 'child_process';
import * as rt from 'runtypes';

import { MAX_CPU_CORES_COUNT, MAX_SPICE_SERVER_PORT, MIN_CPU_CORES_COUNT, MIN_SPICE_SERVER_PORT } from './consts/vm';
import { AudioDevice, BootDevice, Chipset, DiskImageFormat, GraphicsCard } from './enums';

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
        cores: rt.Number.withConstraint(v => Number.isInteger(v)).withConstraint(
            v => v >= MIN_CPU_CORES_COUNT && v <= MAX_CPU_CORES_COUNT
        ),
    }),
    chipset: rt.Optional(RuntypeEnum(Chipset)),
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
        type: rt.Optional(RuntypeEnum(AudioDevice)),
    }),
    network: rt.Record({
        enabled: rt.Boolean,
    }),
    spiceAgent: rt.Record({
        enabled: rt.Boolean,
    }),
    spiceServer: rt.Record({
        enabled: rt.Boolean,
        port: rt.Number.withConstraint(v => Number.isInteger(v)).withConstraint(
            v => v >= MIN_SPICE_SERVER_PORT && v <= MAX_SPICE_SERVER_PORT
        ),
        ticketing: rt.Boolean,
        password: rt.String,
        usbRedirection: rt.Boolean,
    }),
});

export interface VmConfig extends rt.Static<typeof VmConfigRuntype> {
    chipset: Chipset;
    audio: {
        enabled: boolean;
        type: AudioDevice;
    };
}

export type QemuCheckStatus = 'valid' | 'pending' | 'invalid';

export interface QemuCheckResult {
    qemuSystem: ExecFileException | string;
    qemuImg: ExecFileException | string;
}

export interface ApplicationSettings {
    qemu: {
        path: string;
        status: {
            qemuSystem: QemuCheckStatus;
            qemuImg: QemuCheckStatus;
        };
    };
}
