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

export enum ShellDelimeter {
    Cmd = '^',
    PowerShell = '`',
    Bash = '\\',
}
