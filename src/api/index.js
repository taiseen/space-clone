import axios from "axios";

const useAxios = axios.create({
  baseURL: 'https://space-api.makereal.click/api',
});

useAxios.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem("jwt"));

    if (token) {
      config = {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

useAxios.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = "/";
      }
    }

    return Promise.reject(error?.response?.data?.issue);
  }
);

export default useAxios;
