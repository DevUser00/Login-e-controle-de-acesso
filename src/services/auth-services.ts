import { AxiosRequestConfig } from "axios";
import QueryString from "qs";
import { AccessTokenPayloadDTO, CredentialsDTO, RoleEnum } from "../models/auth";
import { requestBackend } from "../utils/requests";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import * as accessTokenRepository from '../localstorege/access-token-repository'
import jwtDecode from "jwt-decode";

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
   return accessTokenRepository.get();
}

//Pega o obj dentro do token
export function getAccessTokenPayload(): AccessTokenPayloadDTO | undefined {
   try {
      const token = accessTokenRepository.get();
      return token == null ? undefined : (jwtDecode(token) as AccessTokenPayloadDTO);
   } catch (error) {
      return undefined;
   }
}

//Verificar se esta authenticado
export function isAuthenticated(): boolean {
   let tokenPayload = getAccessTokenPayload();
   //verificar ser exp do user é maior que Date.now
   return tokenPayload && tokenPayload.exp * 1000 > Date.now() ? true : false;
}

//Teste: usuário possui algum dos perfis informados
export function hasAnyRoles(roles: RoleEnum[]): boolean {
   if (roles.length === 0) {
      return true;
   }
   const tokenPayload = getAccessTokenPayload();
   if (tokenPayload !== undefined) {
      for (var i = 0; i < roles.length; i++) {
         if (tokenPayload.authorities.includes(roles[i])) {
            return true;
         }
      }
      //return roles.some(role => tokenData.authorities.includes(role));
   }
   return false;
}