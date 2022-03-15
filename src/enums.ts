export enum GraphicsCard {
    NONE = 'none',
    CIRRUS = 'cirrus',
    STANDARD = 'std',
    VMWARE = 'vmware',
    QXL = 'qxl',
    VIRTIO = 'virtio',
}

export enum BootDevice {
    CD_ROM = 'd',
    HARD_DRIVE = 'c',
    NETWORK = 'n',
}

export enum Shell {
    CMD = 'cmd',
    POWERSHELL = 'powershell',
    BASH = 'bash',
}

export enum DiskImageFormat {
    QCOW2 = 'qcow2',
    VMWARE = 'vmdk',
    VDI = 'vdi',
    RAW = 'raw',
}

export enum Chipset {
    Q35 = 'q35',
    I440FX = 'pc',
}

export enum AudioDevice {
    HDA = 'hda',
    AC97 = 'ac97',
}

export enum NetworkCard {
    VIRTIO = 'virtio-net-pci',
    E1000E = 'e1000e',
}
