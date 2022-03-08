export enum GraphicsCard {
    None = 'none',
    Cirrus = 'cirrus',
    Standard = 'std',
    Vmware = 'vmware',
    Qxl = 'qxl',
    Virtio = 'virtio',
}

export enum BootDevice {
    Cdrom = 'd',
    HardDrive = 'c',
    Network = 'n',
}

export enum Shell {
    Cmd = 'cmd',
    PowerShell = 'powershell',
    Bash = 'bash',
}

export enum DiskImageFormat {
    QCow2 = 'qcow2',
    Vmware = 'vmdk',
    Vdi = 'vdi',
    Raw = 'raw',
}
