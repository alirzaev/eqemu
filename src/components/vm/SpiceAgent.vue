<template>
  <div class="form-check">
    <input
      id="spiceAgentEnabled"
      v-model="spiceAgentEnabled"
      class="form-check-input"
      type="checkbox"
    >
    <label
      class="form-check-label"
      for="spiceAgentEnabled"
    >
      Enable SPICE agent
    </label>
  </div>
</template>

<script>
export default {
    name: 'SpiceAgent',
    computed: {
        spiceAgentEnabled: {
            get() {
                return this.$store.state.vm.config.spiceAgent.enabled;
            },
            set(value) {
                this.$store.commit('vm/patchConfig', {
                    spiceAgent: {
                        enabled: value,
                    },
                });
            },
        },
    },
};
</script>