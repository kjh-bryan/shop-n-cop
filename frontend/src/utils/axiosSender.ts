import axios, { AxiosResponse, AxiosError } from 'axios';

export const axiosSender = async (
  endpoint: string,
  method: string,
  params?: string,
  payload?: any
): Promise<AxiosResponse<any, any> | undefined> => {
  try {
    const response = payload
      ? await axios({
          method: method,
          baseURL: 'http://localhost:9090/api', // for android, 'http://10.0.0.2:9090/api'
          url: `${endpoint}/${params}`,
          data: payload,
        })
      : await axios({
          method: method,
          baseURL: 'http://localhost:9090/api', // for android, 'http://10.0.0.2:9090/api'
          url: `${endpoint}/${params}`,
        });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('[axiosSender][Not 200][data]', error.response.data);
        console.error('[axiosSender][Not 200][status]', error.response.status);
        console.error(
          '[axiosSender][Not 200][headers]',
          error.response.headers
        );
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error('[axiosSender][No response][request]', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('[axiosSender][Request error][message]', error.message);
      }
      console.error('[axiosSender][config]', error.config);
    } else {
      console.error('[axiosSender][Error is not AxiosError]', error);
    }
  }
};
