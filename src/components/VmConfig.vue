<template>
  <div class="vm-config">
    <div class="vm-config-inner">
      <HorizontalLayout :even="true">
        <Cpu />
        <Ram />
      </HorizontalLayout>

      <OpticalDrive />
      <HardDrive />

      <HorizontalLayout :even="true">
        <BootDevice />
        <GraphicsCard />
      </HorizontalLayout>

      <HorizontalLayout :even="true">
        <AudioDevice />
        <NetworkSettings />
      </HorizontalLayout>
    
      <SpiceAgent />
      <SpiceServer />
    </div>
  </div>
</template>

<script>
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

import HorizontalLayout from './HorizontalLayout.vue';

export default {
    name: 'VmConfig',
    components: {
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

        HorizontalLayout,
    },
};
</script>

<style>
.vm-config {
  position: relative;
  height: 100%;
}
.vm-config-inner {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 1rem;
  height: 100%;
  overflow: auto;
}
</style>