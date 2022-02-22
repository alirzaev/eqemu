<template>
  <div>
    <label
      for="drivePath"
      class="form-label"
    >Hard drive
    </label>
    <div class="input-group mb-2">
      <input
        id="drivePath"
        class="form-control"
        type="text"
        :value="drivePath"
        :disabled="!driveEnabled"
        readonly
      >
      <button
        class="btn btn-outline-primary"
        type="button"
        :disabled="!driveEnabled"
        @click="requestDrivePath"
      >
        Select
      </button>
    </div>
    <div>
      <div class="form-check">
        <input
          id="driveEnabled"
          v-model="driveEnabled"
          class="form-check-input"
          type="checkbox"
        >
        <label
          class="form-check-label"
          for="driveEnabled"
        >
          Enabled
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HardDrive',
    computed: {
        driveEnabled: {
            get() {
                return this.$store.state.vm.config.drive.enabled;
            },
            set(value) {
                this.$store.commit('vm/config/drive/setEnabled', value);
            }
        },
        drivePath() {
            return this.$store.state.vm.config.drive.path;
        }
    },
    methods: {
        async requestDrivePath() {
            // eslint-disable-next-line no-undef
            const path = await electron.vmConfig.requestDrivePath();

            this.$store.commit('vm/config/drive/setPath', path.replaceAll('\\', '\\\\'));
        },
    }
};
</script>