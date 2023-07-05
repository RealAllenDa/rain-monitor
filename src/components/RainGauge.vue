<template>
  <div class="rain-gauge-container">
    <div class="rain-brief">
      <span class="label-rmi">
        {{ $t('rmi-title') }}
      </span>
      <i :class="`${rainStore.currentIcon} rmi-font`"></i>
    </div>
    <div class="rain-gauge">
      <rain-level></rain-level>
      <span
        class="rain-amount"
        :style="`background: ${rainStore.currentBg}; color: ${rainStore.currentColor}`"
        >{{ rainStore.currentRmi }}</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import RainLevel from 'components/RainLevel.vue';
import { useRainStore } from 'stores/rain';

const rainStore = useRainStore();
</script>

<style scoped lang="scss">
.rain-gauge-container {
  width: 375px !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
  box-sizing: border-box;
}

body.body--dark .rain-gauge-container {
  border-right: 2px solid white;
}

body.body--light .rain-gauge-container {
  //noinspection SassScssResolvedByNameOnly
  border-right: 2px solid $border-color;
}

.rain-gauge {
  height: 100%;
  display: flex;
  align-items: center;
}

.label-rmi {
  font-size: 25px;
}

.rain-amount {
  display: block;
  width: 100%;
  text-align: center;
  overflow: hidden;
  font-weight: bold;
  font-size: 100px;
  margin: 10px;
  border-radius: 5%;
}

.rmi-font {
  font-size: 30px;
}

.rain-brief {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
