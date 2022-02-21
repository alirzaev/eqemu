<template>
  <div class="app">
    <div class="app-vm-config-wrapper">
      <VmConfig />
    </div>
    <div class="app-launcher-wrapper">
      <VmLauncher />
    </div>
  </div>
</template>

<script>
import VmConfig from './VmConfig.vue';
import VmLauncher from './VmLauncher.vue';

export default {
    components: {
        VmConfig,
        VmLauncher,
    },
    computed: {
        config() {
            return this.$store.state.vm.config;
        },
    },
    created() {
        electron.vmConfig.onRequestConfig(async (event) => { // eslint-disable-line
            const config = {
                memory: this.config.memory,
                cpu: this.config.cpu,
                drive: this.config.drive,
                cdrom: this.config.cdrom,
                acceleration: this.config.acceleration,
                bootOrder: this.config.bootOrder,
                graphics: this.config.graphics,
                audio: this.config.audio,
                networking: this.config.networking,
                spiceAgent: this.config.spiceAgent,
                spiceServer: this.config.spiceServer,
            };

            event.sender.send('vm:request-config-value', JSON.stringify(config));
        });

        electron.vmConfig.onLoadConfig(async (_event, config) => { // eslint-disable-line
            config = JSON.parse(config);

            this.$store.commit('vm/patchConfig', config);
        });
    },
};
</script>

<style>
.app {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-grow: 1;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
  margin: 1rem;
}

.app-launcher-wrapper,
.app-vm-config-wrapper {
  flex-grow: 1;
  padding: 0;
  width: 100%;
}
</style>