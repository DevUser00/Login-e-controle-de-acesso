import { useEffect, useState } from 'react';
import { UserDTO } from '../../../models/user';
import './style.css'
import * as servicesUser from '../../../services/user-service'

function AdminHome() {

   const [user, setUser] = useState<UserDTO>();


   useEffect(() => {
      servicesUser.findMe().then(response => {
         setUser(response.data)
         console.log(response.data)
      }).catch(err => {
         console.log(err)
      })
   }, []);

   return (
      <main>
         <section id="admin-home-section" className="dsc-container">
            <h2 className="dsc-section-title dsc-mb20">Bem-vindo à àrea administrativa</h2> <span>{user?.name}</span>
         </section>
      </main>

   );
}

export default AdminHome;