import { Outlet } from "react-router-dom";
import HeaderClient from "../../components/HeaderCliet";

export default function ClientHome() {

   return (
      <>
         <HeaderClient/>
         <Outlet/>
      </>
   )

}