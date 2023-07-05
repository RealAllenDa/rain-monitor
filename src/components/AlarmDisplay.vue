<template>
  <div class="alarm-display-container">
    <div>
      <span class="label-warning" v-if="weatherWarningStore.totalWarning !== 0">
        {{ $t('alarms-title', [weatherWarningStore.totalWarning]) }}
      </span>
      <span class="label-warning" v-else>
        {{ $t('no-alarms') }}
      </span>
    </div>
    <div class="alarm-list-container">
      <q-list dense v-for="warn in weatherWarningStore.warnings" :key="warn">
        <q-item
          v-for="i in warn"
          :key="i.name"
          :class="`warning-item warning-${i.level}`"
        >
          <q-item-section avatar>
            <q-icon :name="`qi:${weatherWarningStore.warningIcon[i.type]}`" />
          </q-item-section>
          <q-item-section>{{ tx(`alarms.${i.type}`, i.type) }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useWeatherWarningStore } from 'stores/weather-warning';
import { useI18n } from 'vue-i18n';

const weatherWarningStore = useWeatherWarningStore();

const { t, te } = useI18n();

function tx(str: string, fallbackStr: string) {
  return te(str) ? t(str) : fallbackStr;
}
</script>

<style scoped>
.alarm-display-container {
  width: 375px !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  box-sizing: border-box;
}

.label-warning {
  font-size: 25px;
}

.alarm-list-container {
  display: flex;
  justify-content: space-around;
}

/*noinspection CssUnusedSymbol*/
.warning-item {
  border-radius: 5%;
  margin: 2px;
}

/*noinspection CssUnusedSymbol*/
.warning-1 {
  color: white;
  background: var(--warn-1);
}

/*noinspection CssUnusedSymbol*/
.warning-2 {
  color: black;
  background: var(--warn-2);
}

/*noinspection CssUnusedSymbol*/
.warning-3 {
  color: black;
  background: var(--warn-3);
}

/*noinspection CssUnusedSymbol*/
.warning-4 {
  color: white;
  background: var(--warn-4);
}
</style>
