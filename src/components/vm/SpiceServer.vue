<template>
  <div>
    <div class="form-check">
      <input
        id="spiceServerEnabled"
        v-model="spiceServerEnabled"
        class="form-check-input"
        type="checkbox"
      >
      <label
        class="form-check-label"
        for="spiceServerEnabled"
      >
        Enable SPICE server
      </label>
    </div>
    <div
      v-if="enabled"
      class="row justify-content-center"
    >
      <div class="col-6">
        <label
          for="spiceServerPort"
          class="form-label"
        >SPICE server port</label>
        <input
          id="spiceServerPort"
          v-model="spiceServerPort"
          class="form-control"
          type="number"
          min="0"
          max="65535"
        >
      </div>
      <div class="col-6">
        <label
          for="spiceServerPassword"
          class="form-label"
        >SPICE server password</label>
        <input
          id="spiceServerPassword"
          v-model="spiceServerPassword"
          class="form-control"
          type="text"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'SpiceServer',
    computed: {
        spiceServerEnabled: {
            get() {
                return this.$store.state.vm.config.spiceServer.enabled;
            },
            set(value) {
                this.$store.commit('vm/patchConfig', {
                    spiceServer: {
                        enabled: value,
                    },
                });
            },
        },
        spiceServerPort: {
            get() {
                return this.$store.state.vm.config.spiceServer.port;
            },
            set(value) {
                this.$store.commit('vm/patchConfig', {
                    spiceServer: {
                        port: value,
                    },
                });
            },
        },
        spiceServerPassword: {
            get() {
                return this.$store.state.vm.config.spiceServer.password;
            },
            set(value) {
                this.$store.commit('vm/patchConfig', {
                    spiceServer: {
                        password: value,
                    },
                });
            },
        },
    },
};
</script>