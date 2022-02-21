export const GRAPHICS_CARDS = Object.freeze([
    { text: 'None', value: 'none' },
    { text: 'Cirrus', value: 'cirrus' },
    { text: 'Standard', value: 'std' },
    { text: 'VMware SVGA-II', value: 'vmware' },
    { text: 'QXL', value: 'qxl' },
    { text: 'VirtIO', value: 'virtio' },
]);

export const ACCELERATORS = Object.freeze([
    { text: 'TCG', value: 'tcg' },
    { text: 'WHPX', value: 'whpx,kernel-irqchip=off' },
    { text: 'HAXM', value: 'hax' },
    { text: 'KVM', value: 'kvm' },
    { text: 'HVF', value: 'hvf' },
]);

export const BOOT_OPTIONS = Object.freeze([
    { text: 'CD-ROM', value: 'd' },
    { text: 'Hard drive', value: 'c' },
    { text: 'Network', value: 'n' },
]);