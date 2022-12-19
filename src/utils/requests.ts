import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./system";
import * as authService from './../services/auth-services'

// facilitates request for backend with future token...
export function requestBackend(config: AxiosRequestConfig) {

   //testando se for v ele acresenta o token
  const headers = config.withCredentials ? 
  {... config.headers,    
   Authorization : "Bearer " + authService.getAccessToken()
  }
  : config.headers;



   return axios( {...config, baseURL: BASE_URL, headers} ); 
}