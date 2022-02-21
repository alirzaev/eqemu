<template>
  <div>
    <label
      for="acceleration"
      class="form-label"
    >Acceleration</label>
    <select
      id="acceleration"
      v-model="acceleration"
      class="form-select"
    >
      <option
        v-for="option in accelerationOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
import { ACCELERATORS } from '../../enums';

export default {
    name: 'AccelerationSettings',
    data() {
        return {
            accelerationOptions: ACCELERATORS,
        };
    },
    computed: {
        acceleration: {
            get() {
                return this.$store.state.vm.config.acceleration;
            },
            set(value) {
                this.$store.commit('vm/patchConfig', {
                    acceleration: value,
                });
            },
        },
    },
};
</script>
