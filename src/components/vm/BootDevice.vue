<template>
  <div>
    <label
      for="bootDevice"
      class="form-label"
    >Boot device</label>
    <select
      id="bootDevice"
      v-model="bootDevice"
      class="form-select"
    >
      <option
        v-for="option in bootDeviceOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
import { BOOT_OPTIONS } from '@/enums';

export default {
    name: 'BootDevice',
    data() {
        return {
            bootDeviceOptions: BOOT_OPTIONS,
        };
    },
    computed: {
        bootDevice: {
            get() {
                return this.$store.state.vm.config.bootDevice;
            },
            set(value) {
                this.$store.commit('vm/config/patch', {
                    bootDevice: value,
                });
            },
        },
    },
};
</script>