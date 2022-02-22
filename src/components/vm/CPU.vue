<template>
  <div>
    <label
      for="cpuCores"
      class="form-label"
    >CPU cores</label>
    <input
      id="cpuCores"
      v-model="cores"
      type="number"
      class="form-control"
      min="1"
      max="4"
    >
  </div>
</template>

<script>
export default {
    name: 'CPU',
    computed: {
        cores: {
            get() {
                return this.$store.state.vm.config.cpu.cores;
            },
            set(value) {
                this.$store.commit('vm/config/patch', {
                    cpu: {
                        cores: value,
                    },
                });
            },
        },
    },
};
</script>