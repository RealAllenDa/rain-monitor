import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $hnapi: AxiosInstance;
  }
}

const hnApi = axios.create({ baseURL: 'https://api.daziannetwork.com' });
export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$hnapi = hnApi;
});

export { hnApi };
