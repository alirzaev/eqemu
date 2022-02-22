<template>
  <div>
    <label
      for="cdromPath"
      class="form-label"
    >Optical drive
    </label>
    <div class="input-group mb-2">
      <input
        id="cdromPath"
        class="form-control"
        type="text"
        :value="cdromPath"
        :disabled="!cdromEnabled"
        readonly
      >
      <button
        class="btn btn-outline-primary"
        type="button"
        :disabled="!cdromEnabled"
        @click="requestCdromPath"
      >
        Select
      </button>
    </div>
    <div>
      <div class="form-check">
        <input
          id="cdromEnabled"
          v-model="cdromEnabled"
          class="form-check-input"
          type="checkbox"
        >
        <label
          class="form-check-label"
          for="cdromEnabled"
        >
          Enabled
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'OpticalDrive',
    computed: {
        cdromEnabled: {
            get() {
                return this.$store.state.vm.config.cdrom.enabled;
            },
            set(value) {
                this.$store.commit('vm/config/cdrom/setEnabled', value);
            }
        },
        cdromPath() {
            return this.$store.state.vm.config.cdrom.path;
        }
    },
    methods: {
        async requestCdromPath() {
            // eslint-disable-next-line no-undef
            const path = await electron.vmConfig.requestCdromPath();
            
            this.$store.commit('vm/config/cdrom/setPath', path.replaceAll('\\', '\\\\'));
        },
    }
};
</script>