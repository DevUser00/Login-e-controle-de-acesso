import { createContext } from "react";
import { AccessTokenPayloadDTO } from "../models/auth";

//Criando contaxto para token global
export type ContextTokenType = {
   contextTokenPayload: AccessTokenPayloadDTO | undefined;
   setContextTokenPayload: (accessTokenPayload: AccessTokenPayloadDTO | undefined) => void;
}
export const ContextToken = createContext<ContextTokenType>({
   contextTokenPayload: undefined,
   setContextTokenPayload: () => { }
});