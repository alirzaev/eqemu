<template>
  <div class="app row justify-content-center">
    <form class="col-12 col-md-6">
      <div class="mb-3 row justify-content-center">
        <div class="col">
          <AccelerationSettings />
        </div>
        <div class="col">
          <Cpu />
        </div>
        <div class="col">
          <Ram />
        </div>
      </div>
      <div class="mb-3">
        <OpticalDrive />
      </div>
      <div class="mb-3">
        <HardDrive />
      </div>
      <div class="mb-3 row justify-content-center">
        <div class="col-6">
          <BootDevice />
        </div>
        <div class="col-6">
          <GraphicsCard />
        </div>
      </div>
      <div class="mb-3 row justify-content-center">
        <div class="col-6">
          <AudioDevice />
        </div>
        <div class="col-6">
          <NetworkSettings />
        </div>
      </div>
      <div class="mb-3">
        <SpiceAgent />
      </div>
      <div class="mb-3">
        <SpiceServer />
      </div>
    </form>
    <div class="col-12 col-md-6">
      <VmLauncher />
    </div>
  </div>
</template>

<script>
import AccelerationSettings from './vm/AccelerationSettings.vue';
import AudioDevice from './vm/AudioDevice.vue';
import BootDevice from './vm/BootDevice.vue';
import CPU from './vm/CPU.vue';
import GraphicsCard from './vm/GraphicsCard.vue';
import HardDrive from './vm/HardDrive.vue';
import NetworkSettings from './vm/NetworkSettings.vue';
import OpticalDrive from './vm/OpticalDrive.vue';
import RAM from './vm/RAM.vue';
import SpiceAgent from './vm/SpiceAgent.vue';
import SpiceServer from './vm/SpiceServer.vue';
import VmLauncher from './VmLauncher.vue';

export default {
    components: {
        AccelerationSettings,
        AudioDevice,
        BootDevice,
        Cpu: CPU,
        GraphicsCard,
        HardDrive,
        NetworkSettings,
        OpticalDrive,
        Ram: RAM,
        SpiceAgent,
        SpiceServer,
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
  margin: 0.5rem;
}
</style>