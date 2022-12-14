import QueryString from "qs";
import { CredentialsDTO } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";

export function LoginRequest(loginData: CredentialsDTO) {

   //headers postman refres
   const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + window.btoa(CLIENT_ID + CLIENT_SECRET)
   }

   //Body postman refres
   //transformer JSON para x-www-encode using libs QS 
   //yarn add qs@6.11.0 @types/qs@6.9.7
   const requestBody = QueryString.stringify({ ...loginData, grant_type: "password" })






   console.log(requestBody)
}