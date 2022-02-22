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
    <HorizontalLayout
      v-if="spiceServerEnabled"
      :even="true"
    >
      <div>
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
      <div>
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
    </HorizontalLayout>
  </div>
</template>

<script>
import HorizontalLayout from '../HorizontalLayout.vue';

export default {
    name: 'SpiceServer',
    components: {
        HorizontalLayout,
    },
    computed: {
        spiceServer() {
            return this.$store.state.vm.config.spiceServer;
        },
        spiceServerEnabled: {
            get() {
                return this.$store.state.vm.config.spiceServer.enabled;
            },
            set(value) {
                this.$store.commit('vm/config/spiceServer/setEnabled', value);
            },
        },
        spiceServerPort: {
            get() {
                return this.$store.state.vm.config.spiceServer.port;
            },
            set(value) {
                this.$store.commit('vm/config/spiceServer/setPort', value);
            },
        },
        spiceServerPassword: {
            get() {
                return this.$store.state.vm.config.spiceServer.password;
            },
            set(value) {
                this.$store.commit('vm/config/spiceServer/setPassword', value);
            },
        },
    },
};
</script>