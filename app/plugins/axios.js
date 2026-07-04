import axios from "axios";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const axiosInstance = axios.create({
    baseURL: runtimeConfig.public.API_ENDPOINT,
  });

  return {
    provide: { axios: axiosInstance },
  };
});
