<template>
  <div>
    <label
      for="drivePath"
      class="form-label"
    >Hard drive
    </label>
    <div class="input-group">
      <input
        id="drivePath"
        class="form-control"
        type="text"
        :value="drivePath"
        readonly
      >
      <button
        class="btn btn-outline-primary"
        type="button"
        @click="requestDrivePath"
      >
        Select
      </button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HardDrive',
    computed: {
        drivePath() {
            return this.$store.state.vm.config.drive.path;
        }
    },
    methods: {
        async requestDrivePath() {
            const path = await electron.vmConfig.requestDrivePath(); // eslint-disable-line


            const patch = {
                drive: {
                    path: path.replaceAll('\\', '\\\\'),
                },
            };

            this.$store.commit('vm/patchConfig', patch);
        },
    }
};
</script>