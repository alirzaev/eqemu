<template>
  <div>
    <label
      for="memory"
      class="form-label"
    >RAM</label>
    <div class="input-group">
      <input
        id="memory"
        v-model="memory"
        type="number"
        class="form-control"
        min="1"
        :max="maxMemory"
      >
      <span class="input-group-text">GiB</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'RAM',
    computed: {
        maxMemory() {
            return this.$store.state.system.memory;
        },
        memory: {
            get() {
                return this.$store.state.vm.config.memory;
            },
            set(value) {
                this.$store.commit('vm/config/patch', {
                    memory: value,
                });
            },
        },
    },
};
</script>