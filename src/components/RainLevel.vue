<template>
  <div class="rain-level">
    <div
      v-for="i in Object.keys(rainStore.rainLevels).sort((a, b) => b - a)"
      :key="i"
      :style="`background: ${rainStore.rainLevels[i].background}`"
      :class="i == rainStore.currentRainLevel ? 'active' : ''"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { useRainStore } from 'stores/rain';

const rainStore = useRainStore();
</script>

<style scoped lang="scss">
.rain-level {
  margin-left: 10px;
}

.rain-level div {
  width: 40px;
  height: 25px;
  opacity: 0.2;
  border-bottom: 1px solid rgba(0, 0, 0, 50%);
}

.active {
  opacity: 1 !important;
}
</style>
