import axios, { AxiosResponse, AxiosError } from 'axios';

export const axiosSender = async (
  payload: any,
  endpoint: string
): Promise<AxiosResponse<any, any> | undefined> => {
  try {
    const response = await axios({
      method: 'POST',
      baseURL: 'http://localhost:9090/api', // for android, 'http://10.0.0.2:9090/api'
      url: endpoint,
      data: payload,
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('[axiosSender]', error.response.data);
        console.error('[axiosSender]', error.response.status);
        console.error('[axiosSender]', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error('[axiosSender]', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('[axiosSender]', 'Error', error.message);
      }
      console.error('[axiosSender]', error.config);
    } else {
      console.error('[axiosSender]', error);
    }
  }
};
