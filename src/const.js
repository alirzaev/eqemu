import { ACCELERATORS, BOOT_OPTIONS, GRAPHICS_CARDS } from './enums';

export const DEFAULT_VM_CONFIG = {
    memory: 1,
    cpu: {
        cores: 2,
    },
    drive: {
        path: '',
    },
    cdrom: {
        path: '',
    },
    acceleration: ACCELERATORS[0].value,
    bootDevice: BOOT_OPTIONS[0].value,
    graphics: {
        card: GRAPHICS_CARDS[0].value,
    },
    audio: {
        enabled: true,
    },
    networking: {
        enabled: true,
    },
    spiceAgent: {
        enabled: false,
    },
    spiceServer: {
        enabled: false,
        port: 3000,
        password: 'password',
    }
};
