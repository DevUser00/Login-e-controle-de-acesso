import { TOKEN_KEY } from "../utils/system";

//Save token global in localStorege
export function save(token: string) {
   localStorage.setItem(TOKEN_KEY, token);
}

//Get token 
export function get() : string | null {
   return localStorage.getItem(TOKEN_KEY)
}

//Remove token
export function remove() {
   localStorage.removeItem(TOKEN_KEY)
}