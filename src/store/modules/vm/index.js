import { VmConfig } from './config';

export const VM = {
    namespaced: true,
    state: () => ({}),
    modules: {
        config: VmConfig,
    },
    mutations: {},
    getters: {
        params: (state) => {
            const config = state.config;

            const params = [
                'qemu-system-x86_64',
                `-accel ${config.acceleration}`,
                `-smp ${config.cpu.cores}`,
                `-m ${config.memory}G`,
                `-vga ${config.graphics.card}`,
                `-boot order=${config.bootDevice},menu=on`,
                '-usbdevice tablet',
            ];

            if (config.drive.enabled && config.drive.path) {
                params.push(`-drive "file=${config.drive.path},format=qcow2"`);
            }

            if (config.cdrom.enabled && config.cdrom.path) {
                params.push(`-cdrom "${config.cdrom.path}"`);
            }

            if (config.networking.enabled) {
                params.push('-net nic,model=e1000 -net user');
            }

            if (config.audio.enabled) {
                params.push('-soundhw hda');
            }

            if (config.spiceAgent.enabled) {
                params.push(
                    '-device virtio-serial',
                    '-chardev spicevmc,id=vdagent,debug=0,name=vdagent',
                    '-device virtserialport,chardev=vdagent,name=com.redhat.spice.0',
                );
            }

            if (config.spiceServer.enabled) {
                params.push(`-spice port=${config.spiceServer.port},password=${config.spiceServer.password}`);
            }

            return params;
        }
    },
};
