import { AxiosRequestConfig } from "axios";
import QueryString from "qs";
import { CredentialsDTO } from "../models/auth";
import { requestBackend } from "../utils/requests";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import * as accessTokenRepository from '../localstorege/access-token-repository'
 
//Send a request for back-end assemble according to the rule
export function loginRequest(loginData: CredentialsDTO) {

   //headers postman refres
   const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
   };

   //Body postman refres
   //transformer JSON para x-www-encode using libs QS 
   //yarn add qs@6.11.0 @types/qs@6.9.7
   const data = QueryString.stringify({
      ...loginData,
      grant_type: "password",
   });

   //config of requst login
   const config: AxiosRequestConfig = {
      method: "POST",
      url: "/oauth/token",
      data,
      headers,
   };
   console.log(config)
   return requestBackend(config);
}

//logout > delete token at localstorege
export function logout() {
   accessTokenRepository.remove();
}

//Save token
export function saveAccessToken(token: string) {
   accessTokenRepository.save(token)
}

//Get token of access
export function getAccessToken() {
   accessTokenRepository.get();
}