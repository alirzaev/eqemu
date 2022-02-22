<template>
  <div>
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
    <div />
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
                this.$store.commit('vm/config/patch', {
                    spiceAgent: {
                        enabled: value,
                    },
                });
            },
        },
    },
};
</script>