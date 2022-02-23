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
    created() {
        electron.vmConfig.onRequestConfig(async (event) => { // eslint-disable-line
            const config = this.$store.getters['vm/config/plainObject'];
            
            event.sender.send('vm:request-config-value', JSON.stringify(config));
        });

        electron.vmConfig.onLoadConfig(async (_event, config) => { // eslint-disable-line
            config = JSON.parse(config);

            this.$store.dispatch('vm/config/load', config);
        });

        this.$store.dispatch('system/loadInfo');
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