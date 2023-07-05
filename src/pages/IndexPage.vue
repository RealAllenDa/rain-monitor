<template>
  <div>
    <rain-gauge></rain-gauge>
    <alarm-display v-if="ready"></alarm-display>
  </div>
</template>

<script setup lang="ts">
import RainGauge from 'components/RainGauge.vue';
import AlarmDisplay from 'components/AlarmDisplay.vue';
import {hnApi} from 'boot/axios';
import {useWeatherWarningStore} from 'stores/weather-warning';
import {useMeta, useQuasar} from 'quasar';
import {onUnmounted, ref} from 'vue';
import jsonp from 'jsonp';
import {useRainStore} from 'stores/rain';
import {useI18n} from 'vue-i18n';

const ready = ref(false);
const weatherWarningStore = useWeatherWarningStore();
const timer = ref<ReturnType<typeof setInterval>>();

function getWeatherWarning() {
  hnApi
    .get('/warning/weather_warning')
    .then((response) => {
      weatherWarningStore.warning = response.data;
      ready.value = true;
    })
    .catch(() => {
      useQuasar().notify({
        color: 'negative',
        position: 'top',
        message: 'Failed to fetch weather warning',
        icon: 'report_problem',
      });
    });
}

function mapNumber(
  num: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
) {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

function getNmi() {
  jsonp(
    `https://api.caiyunapp.com/v2.5/96Ly7wgKGq6FhllM/121.461,31.1787/weather.jsonp?hourlysteps=120&random=${Math.random()}&unit=metric:v2`,
    {
      timeout: 3000,
    },
    (error, data: CaiYunAPI) => {
      if (error) {
        console.error(error);
        return;
      }
      if (data.status !== 'ok') {
        console.error('api failed', data);
        return;
      }
      const totalRain = data.result['realtime']['precipitation']['local']['intensity'] * 12;
      const rmi = mapNumber(totalRain, 0, 140, 0, 12);
      console.log('rain:', totalRain, 'RMI:', rmi);
      useRainStore().setRmi(rmi);
    }
  );
}

function fetchApi() {
  getWeatherWarning();
  getNmi();
}

onUnmounted(() => {
  window.clearInterval(timer.value);
});

const {t} = useI18n();
useMeta({
  title: t('title'),
});

timer.value = setInterval(fetchApi, 1500);
fetchApi();
</script>

<style scoped lang="scss">
div {
  width: 750px;
  height: 250px;
  box-sizing: border-box;
  display: flex;
  user-select: none;
}

body.body--dark div {
  border: 1px solid white;
}

body.body--light div {
  //noinspection SassScssResolvedByNameOnly
  border: 1px solid $border-color;
}
</style>
