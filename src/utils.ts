import { DiskImageFormat, SystemInfo, VmConfig } from './types';

export function buildQemuCmdArgs(config: VmConfig, system: SystemInfo): string[] {
    const params = [
        'qemu-system-x86_64',
        '-machine q35',
        `-smp ${config.cpu.cores}`,
        `-m ${config.memory}G`,
        `-vga ${config.graphics.card}`,
        `-boot order=${config.bootDevice},menu=on`,
        '-usbdevice tablet',
    ];

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
        params.push('-net nic,model=e1000e -net user');
    }

    if (config.audio.enabled) {
        params.push('-soundhw hda');
    }

    if (config.spiceAgent.enabled) {
        params.push(
            '-device virtio-serial',
            '-chardev spicevmc,id=vdagent,debug=0,name=vdagent',
            '-device virtserialport,chardev=vdagent,name=com.redhat.spice.0'
        );
    }

    if (config.spiceServer.enabled) {
        if (config.spiceServer.ticketing) {
            params.push(`-spice port=${config.spiceServer.port},password=${config.spiceServer.password}`);
        } else {
            params.push(`-spice port=${config.spiceServer.port},disable-ticketing=on`);
        }

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

export function getPathExtension(path: string): string {
    const fileName = path.split(/[\\/]/).pop() ?? '';
    const pos = fileName?.lastIndexOf('.') ?? -1;

    if (fileName === '' || pos < 1) {
        return '';
    } else {
        return fileName.slice(pos + 1);
    }
}

export function getImageFileFormat(path: string): DiskImageFormat {
    const extension = getPathExtension(path);

    switch (extension) {
        case 'qcow2':
            return DiskImageFormat.QCow2;
        case 'vmdk':
            return DiskImageFormat.Vmware;
        case 'vdi':
            return DiskImageFormat.Vdi;
        default:
            return DiskImageFormat.Raw;
    }
}
