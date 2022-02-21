<template>
  <div class="form-check">
    <input
      id="networkingEnabled"
      v-model="networkingEnabled"
      class="form-check-input"
      type="checkbox"
    >
    <label
      class="form-check-label"
      for="networkingEnabled"
    >
      Enable networking
    </label>
  </div>
</template>

<script>
export default {
    name: 'NetworkSettings',
    computed: {
        networkingEnabled: {
            get() {
                return this.$store.state.vm.config.networking.enabled;
            },
            set(value) {
                this.$store.commit('vm/patchConfig', {
                    networking: {
                        enabled: value,
                    },
                });
            },
        },
    },
};
</script>