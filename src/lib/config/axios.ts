// axiosConfig.ts
import axios from 'axios';
import  Cookies  from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || '/api', // substitua pela URL da sua API
  timeout: 10000, // tempo limite da requisição (em ms)
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor de requisição (opcional, para tokens por exemplo)
axiosInstance.interceptors.request.use(
  (config) => {
      const token = Cookies.get("token");
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta (opcional, para tratamento global de erros)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erros com resposta da API
      console.error('Erro da API:', error.response.data);
    } else if (error.request) {
      // Erros sem resposta (ex: timeout)
      console.error('Erro de conexão:', error.request);
    } else {
      console.error('Erro desconhecido:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
