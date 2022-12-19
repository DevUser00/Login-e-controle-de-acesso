import { useEffect, useState } from 'react';
import { UserDTO } from '../../../models/user';
import './style.css'
import * as userServices from '../../../services/user-services';

function AdminHome() {

   const [user, setUser] = useState<UserDTO>();

   useEffect(() => {
      userServices.findMe()
      .then(reponse => {
         setUser(reponse.data)
         console.log(reponse.data)
      })
      .catch(err => {
         console.log(err)
      })   
   }, []); 
   
   return (

      <main>
         <section id="admin-home-section" className="dsc-container">
            <h2 className="dsc-section-title dsc-mb20">Bem-vindo à àrea administrativa {user?.name}</h2>
         </section>
      </main>

   );
}

export default AdminHome;