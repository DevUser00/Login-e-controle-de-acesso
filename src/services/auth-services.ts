import { CredentialsDTO } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";

export function LoginRequest(LoginData: CredentialsDTO) {

   //headers postman refres
   const headers = {
      "Content-Type" : "application/x-www-form-urlencoded",
      Authorization : "Basic " + window.btoa(CLIENT_ID + CLIENT_SECRET)
   }

   console.log(headers)
}