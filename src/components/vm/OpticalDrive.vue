<template>
  <div>
    <label
      for="cdromPath"
      class="form-label"
    >Optical drive
    </label>
    <div class="input-group">
      <input
        id="cdromPath"
        class="form-control"
        type="text"
        :value="cdromPath"
        readonly
      >
      <button
        class="btn btn-outline-primary"
        type="button"
        @click="requestCdromPath"
      >
        Select
      </button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'OpticalDrive',
    computed: {
        cdromPath() {
            return this.$store.state.vm.config.cdrom.path;
        }
    },
    methods: {
        async requestCdromPath() {
            const path = await electron.vmConfig.requestCdromPath(); // eslint-disable-line

            const patch = {
                cdrom: {
                    path: path.replaceAll('\\', '\\\\'),
                },
            };

            this.$store.commit('vm/patchConfig', patch);
        },
    }
};
</script>