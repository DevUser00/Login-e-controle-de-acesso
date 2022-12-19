import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./system";
import * as authService from './../services/auth-services'
import { history } from "./history";


// facilitates request for backend with future token...
export function requestBackend(config: AxiosRequestConfig) {

   //testando se for v ele acresenta o token
   const headers = config.withCredentials ?
      {
         ...config.headers,
         Authorization: "Bearer " + authService.getAccessToken()
      }
      : config.headers;



   return axios({ ...config, baseURL: BASE_URL, headers });
}

//REQUST INTECEPTOS (tratamento de errors em forma global)
axios.interceptors.request.use(

   // DO SOMETHING BEFORE REQUEST IS SENT
   function (config) {
      return config;
   },
   // DO SOMETHING WITH REQUEST ERROR
   function (error) {
      return Promise.reject(error);
   }
)

// RESPONSE INTERCEPTOR
axios.interceptors.response.use(

   function (response) {
      return response;
   },

   function (error) {
      if (error.response.status === 401) {
        history.push('/login');  
      }
      if (error.response.status === 403) {
         history.push('/catalog')
      }

      return Promise.reject(error);
   }
);


