import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./system";


// facilitates request for backend with future token...
export function requestBackend(config: AxiosRequestConfig) {
   return axios( {...config, baseURL: BASE_URL} ); 
}