import { defineStore } from 'pinia';

interface RainLevelState {
  background: string;
  color: string;
  icon: string;
}

interface RainState {
  rainLevels: Record<number, RainLevelState>;
  currentRainLevel: number;
  currentRmi: string;
}

export const useRainStore = defineStore('rain', {
  state: () =>
    ({
      rainLevels: {
        6: {
          background: 'var(--rain-6)',
          color: 'white',
          icon: 'qi-severe-storm-fill',
        },
        5: {
          background: 'var(--rain-5)',
          color: 'white',
          icon: 'qi-heavy-storm-fill',
        },
        4: {
          background: 'var(--rain-4)',
          color: 'black',
          icon: 'qi-heavy-rain-fill',
        },
        3: {
          background: 'var(--rain-3)',
          color: 'black',
          icon: 'qi-moderate-rain-fill',
        },
        2: {
          background: 'var(--rain-2)',
          color: 'white',
          icon: 'qi-light-rain-fill',
        },
        1: {
          background: 'var(--rain-1)',
          color: 'white',
          icon: 'qi-drizzle-rain-fill',
        },
        0: {
          background: 'default',
          color: 'white',
          icon: 'qi-overcast-fill',
        },
      },
      currentRainLevel: 0,
      currentRmi: '0.00',
    } as RainState),

  getters: {
    currentBg: (state) => {
      return state.rainLevels[state.currentRainLevel].background;
    },
    currentColor: (state) => {
      return state.rainLevels[state.currentRainLevel].color;
    },
    currentIcon: (state) => {
      return state.rainLevels[state.currentRainLevel].icon;
    },
  },

  actions: {
    setRmi(rmi: number) {
      if (rmi == 0) {
        this.currentRainLevel = 0;
      } else if (rmi > 0 && rmi < 0.43) {
        this.currentRainLevel = 1;
      } else if (rmi >= 0.43 && rmi < 1.29) {
        this.currentRainLevel = 2;
      } else if (rmi >= 1.29 && rmi < 2.6) {
        this.currentRainLevel = 3;
      } else if (rmi >= 2.6 && rmi < 6) {
        this.currentRainLevel = 4;
      } else if (rmi >= 6 && rmi < 9) {
        this.currentRainLevel = 5;
      } else if (rmi >= 9) {
        this.currentRainLevel = 6;
      }
      if (rmi < 100) {
        this.currentRmi = rmi.toFixed(2);
      } else {
        this.currentRmi = '???';
      }
    },
  },
});
