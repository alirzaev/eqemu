import { DEFAULT_VM_CONFIG } from '../../const';

export const VM = {
    namespaced: true,
    state: () => ({
        config: DEFAULT_VM_CONFIG
    }),
    mutations: {
        patchConfig: (state, patch) => {
            // state.config[param] = patch;
            state.config = { ...state.config, ...patch };
        },
        setCpuCores: (state, cores) => {
            state.config.cpu.cores = cores;
        },
        setMemorySize: (state, size) => {
            state.config.memory = size;
        },
        updateDrive: (state, drive) => {
            state.config.drive = drive;
        },
        updateCdrom: (state, cdrom) => {
            state.config.cdrom = cdrom;
        },
        setAccelerator: (state, accel) => {
            state.config.acceleration = accel;
        },
        setBootDevice: (state, device) => {
            state.config.bootFrom = device;
        },
        updateGraphics: (state, graphics) => {
            state.config.graphics = graphics;
        },
        updateAudio: (state, audio) => {
            state.config.audio = audio;
        }
    }
};
