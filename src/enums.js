export const GRAPHICS_CARDS = Object.freeze([
    { text: 'None', value: 'none' },
    { text: 'Cirrus', value: 'cirrus' },
    { text: 'Standard', value: 'std' },
    { text: 'VMware SVGA-II', value: 'vmware' },
    { text: 'QXL', value: 'qxl' },
    { text: 'VirtIO', value: 'virtio' },
]);

export const BOOT_OPTIONS = Object.freeze([
    { text: 'CD-ROM', value: 'd' },
    { text: 'Hard drive', value: 'c' },
    { text: 'Network', value: 'n' },
]);

export const SHELL_NEW_LINE_DELIMETERS = Object.freeze([
    { text: 'cmd', value: '^' },
    { text: 'PowerShell', value: '`' },
    { text: 'bash', value: '\\' },
]);