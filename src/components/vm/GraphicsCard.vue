<template>
  <div>
    <label
      for="graphicsCard"
      class="form-label"
    >Graphics card</label>
    <select
      id="graphicsCard"
      v-model="graphicsCard"
      class="form-select"
    >
      <option
        v-for="option in graphicsCardOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
import { GRAPHICS_CARDS } from '@/enums';

export default {
    name: 'GraphicsCard',
    data() {
        return {
            graphicsCardOptions: GRAPHICS_CARDS,
        };
    },
    computed: {
        graphicsCard: {
            get() {
                return this.$store.state.vm.config.graphics.card;
            },
            set(value) {
                this.$store.commit('vm/config/patch', {
                    graphics: {
                        card: value,
                    },
                });
            },
        },
    },
};
</script>

<style>

</style>