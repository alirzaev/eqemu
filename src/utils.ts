import { createContext, useContext } from 'react';
import { extname } from 'path';

import { QEMU_SYSTEM_X86_64 } from './consts/system';
import { AudioDevice, Chipset, DiskImageFormat, NetworkCard, Shell } from './enums';
import { SystemInfo, VmConfig, VmConfigRuntype } from './types';

export function buildQemuCmdArgs(config: VmConfig, system: SystemInfo): string[] {
    const params = [
        QEMU_SYSTEM_X86_64,
        `-machine ${config.chipset}`,
        `-smp ${config.cpu.cores}`,
        `-m ${config.memory}G`,
        `-vga ${config.graphics.card}`,
        `-boot order=${config.bootDevice},menu=on`,
        '-usbdevice tablet',
        '-usbdevice keyboard',
    ];

    if (system.platform === 'win32') {
        params.push('-monitor stdio');
    }

    if (system.platform === 'win32') {
        params.push('-accel hax -accel whpx,kernel-irqchip=off -accel tcg');
    } else if (system.platform === 'darwin') {
        params.push('-accel hax -accel hvf -accel tcg');
    } else if (system.platform === 'linux') {
        params.push('-accel kvm -accel tcg');
    }

    if (config.drive.enabled && config.drive.path) {
        const format = getImageFileFormat(config.drive.path);

        params.push(`-drive "file=${config.drive.path},format=${format}"`);
    }

    if (config.cdrom.enabled && config.cdrom.path) {
        params.push(`-cdrom "${config.cdrom.path}"`);
    }

    if (config.network.enabled) {
        params.push(`-net nic,model=${config.network.type} -net user`);
    }

    if (config.audio.enabled) {
        switch (config.audio.type) {
            case AudioDevice.AC97:
                params.push('-device AC97');
                break;
            case AudioDevice.HDA:
            default:
                params.push('-device intel-hda -device hda-duplex');
                break;
        }
    }

    if (config.spiceAgent.enabled) {
        params.push(
            '-device virtio-serial',
            '-chardev spicevmc,id=vdagent,debug=0,name=vdagent',
            '-device virtserialport,chardev=vdagent,name=com.redhat.spice.0'
        );
    }

    if (config.spiceServer.enabled) {
        params.push(`-spice port=${config.spiceServer.port},disable-ticketing=on`);

        if (config.spiceServer.usbRedirection) {
            params.push(
                '-device ich9-usb-ehci1,id=usb',
                '-device ich9-usb-uhci1,masterbus=usb.0,firstport=0,multifunction=on',
                '-device ich9-usb-uhci2,masterbus=usb.0,firstport=2',
                '-device ich9-usb-uhci3,masterbus=usb.0,firstport=4',
                '-chardev spicevmc,name=usbredir,id=usbredirchardev1',
                '-device usb-redir,chardev=usbredirchardev1,id=usbredirdev1',
                '-chardev spicevmc,name=usbredir,id=usbredirchardev2',
                '-device usb-redir,chardev=usbredirchardev2,id=usbredirdev2',
                '-chardev spicevmc,name=usbredir,id=usbredirchardev3',
                '-device usb-redir,chardev=usbredirchardev3,id=usbredirdev3'
            );
        }
    }

    return params;
}

export function getImageFileFormat(path: string): DiskImageFormat {
    const extension = extname(path).slice(1);

    switch (extension) {
        case 'qcow2':
            return DiskImageFormat.QCOW2;
        case 'vmdk':
            return DiskImageFormat.VMWARE;
        case 'vdi':
            return DiskImageFormat.VDI;
        default:
            return DiskImageFormat.RAW;
    }
}

export function getShellMultilineDelimeter(shell: Shell): string {
    switch (shell) {
        case Shell.CMD:
            return '^';
        case Shell.POWERSHELL:
            return '`';
        case Shell.BASH:
            return '\\';
    }
}

export function parseVmConfig(data: string): VmConfig | null {
    try {
        const json = JSON.parse(data);
        const config = VmConfigRuntype.check(json);

        return {
            ...config,
            chipset: config.chipset ?? Chipset.Q35,
            audio: {
                ...config.audio,
                type: AudioDevice.HDA,
            },
            network: {
                ...config.network,
                type: NetworkCard.E1000E,
            },
        };
    } catch (e) {
        return null;
    }
}

export const SystemInfoContext = createContext<SystemInfo>({ platform: 'win32', cpus: 1, memory: 1 });

export function useSystemInfo() {
    return useContext(SystemInfoContext);
}
