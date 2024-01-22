import { defineStore } from 'pinia';

interface WeatherWarningState {
  warning?: WeatherWarningList;
  selectedDistrict: string;
  warningIcon: { [warningType: string]: number };
}

export const useWeatherWarningStore = defineStore('weather-warning', {
  state: () =>
    ({
      warning: undefined,
      selectedDistrict: '上海市',
      warningIcon: {
        暴雪: 1004,
        暴雨: 1003,
        高温: 1009,
        冰雹: 1015,
        雷电: 1014,
        霾: 1019,
        大雾: 1017,
        霜冻: 1016,
        大风: 1006,
        寒潮: 1005,
        低温: 1056,
        台风: 1001,
        道路结冰: 1021,
      },
    } as WeatherWarningState),

  getters: {
    warnings: (state) => {
      if (state.warning === undefined) {
        console.error('Warning is undefined!');
        return;
      }
      if (state.selectedDistrict in state.warning.districts) {
        const warningB = state.warning.districts[state.selectedDistrict].slice(
          6,
          12
        );
        const warningA = state.warning.districts[state.selectedDistrict].slice(
          0,
          6
        );
        if (warningB.length !== 0) {
          return [warningA, warningB];
        } else {
          return [warningA];
        }
      } else {
        return [];
      }
    },
    totalWarning: (state) => {
      if (state.warning === undefined) {
        console.error('Warning is undefined!');
        return;
      }
      if (state.selectedDistrict in state.warning.districts) {
        return state.warning.districts[state.selectedDistrict].length;
      } else {
        return 0;
      }
    },
  },

  actions: {},
});
