import { ACCELERATORS, BOOT_OPTIONS, GRAPHICS_CARDS } from '@/enums';
import { VmCdrom } from './cdrom';
import { VmDrive } from './drive';
import { VmSpiceServer } from './spiceServer';

export const VmConfig = {
    namespaced: true,
    state: () => ({
        memory: 1,
        cpu: {
            cores: 2,
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
    }),
    modules: {
        cdrom: VmCdrom,
        drive: VmDrive,
        spiceServer: VmSpiceServer,
    },
    actions: {
        load: (context, obj) => {
            const indirect = ['cdrom', 'drive', 'spiceServer'];
            
            Object.keys(context.state)
                .filter(key => indirect.findIndex(v => v === key) === -1)
                .forEach((key) => {
                    context.commit('patch', {
                        [key]: obj[key],
                    });
                });

            context.commit('cdrom/load', obj.cdrom);
            context.commit('drive/load', obj.drive);
            context.commit('spiceServer/load', obj.spiceServer);
        },
    },
    mutations: {
        patch: (state, patch) => {
            Object.entries(patch).forEach(([key, value]) => {
                state[key] = value;
            });
        },
    },
    getters: {
        plainObject: (state) => {
            const config = {
                memory: state.memory,
                cpu: state.cpu,
                drive: state.drive,
                cdrom: state.cdrom,
                acceleration: state.acceleration,
                bootDevice: state.bootDevice,
                graphics: state.graphics,
                audio: state.audio,
                networking: state.networking,
                spiceAgent: state.spiceAgent,
                spiceServer: state.spiceServer,
            };

            return JSON.parse(JSON.stringify(config));
        }
    },
};