import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import https from 'https';

const createApiConfig = () => {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: process.env.API_URL,
    headers: {
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': [
        'Origin, X-Requested-With, Content-Type, Accept',
      ],
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };
  return axiosConfig;
};

axios.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line
  (error) => console.log(error),
);

const httpService = axios.create(createApiConfig());

export default httpService;
