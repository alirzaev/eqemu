<template>
  <div>
    <HorizontalLayout :even="true">
      <div>
        <div class="form-check mb-2">
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
      </div>
      <div>
        <div
          v-if="spiceServerEnabled"
          class="form-check mb-2"
        >
          <input
            id="spiceServerTicketing"
            v-model="spiceServerTicketing"
            class="form-check-input"
            type="checkbox"
          >
          <label
            class="form-check-label"
            for="spiceServerTicketing"
          >
            With ticketing
          </label>
        </div>
        <div
          v-if="spiceServerEnabled"
          class="form-check mb-2"
        >
          <input
            id="spiceServerUsbRedirection"
            v-model="spiceServerUsbRedirection"
            class="form-check-input"
            type="checkbox"
          >
          <label
            class="form-check-label"
            for="spiceServerUsbRedirection"
          >
            With USB redirection
          </label>
        </div>
      </div>
    </HorizontalLayout>
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
          :disabled="!spiceServerTicketing"
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
        spiceServerTicketing: {
            get() {
                return this.$store.state.vm.config.spiceServer.ticketing;
            },
            set(value) {
                this.$store.commit('vm/config/spiceServer/setTicketing', value);
            },
        },
        spiceServerUsbRedirection: {
            get() {
                return this.$store.state.vm.config.spiceServer.usbRedirection;
            },
            set(value) {
                this.$store.commit('vm/config/spiceServer/setUsbRedirection', value);
            },
        },
    },
};
</script>