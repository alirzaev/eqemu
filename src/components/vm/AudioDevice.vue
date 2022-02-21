<template>
  <div class="form-check">
    <input
      id="audioEnabled"
      v-model="audioEnabled"
      class="form-check-input"
      type="checkbox"
    >
    <label
      class="form-check-label"
      for="audioEnabled"
    >
      Enable audio device
    </label>
  </div>
</template>

<script>
export default {
    name: 'AudioDevice',
    computed: {
        audioEnabled: {
            get() {
                return this.$store.state.vm.config.audio.enabled;
            },
            set(value) {
                this.$store.commit('vm/patchConfig', {
                    audio: {
                        enabled: value,
                    },
                });
            },
        },
    },
};
</script>