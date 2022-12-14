import { useState } from 'react';
import { CredentialsDTO } from '../../../models/auth';
import { LoginRequest } from '../../../services/auth-services';
import './style.css'

function Login() {


   const [fromData, setFromData] = useState<CredentialsDTO>({
      username: '',
      password:  ''
   });

   function handleSubmit(event : any) {
      event.preventDefault()
      LoginRequest(fromData)
   }

   function handleInputChange(event : any) {
      //hook value of box
      const value  = event.target.value;
      //hook name of box
      const name =  event.target.name;

      //Atualizar o FromData 
      setFromData({...fromData, [name]: value});
   }


   return (
      <main>
         <section id="login-section" className="dsc-container">
            <div className="dsc-login-form-container">

               <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                  <h2>Login</h2>
                  <div className="dsc-form-controls-container">
                     <div>
                        <input name='username' 
                        value={fromData.username} onChange={handleInputChange}
                        className="dsc-form-control "  
                        type="text" placeholder="Email" />
                           <div className="dsc-form-error">Campo obrigatório</div>
                     </div>
                     <div>
                        <input name='password'
                        value={fromData.password} onChange={handleInputChange}
                        className="dsc-form-control" 
                        type="password" placeholder="Senha" />
                     </div>
                  </div>

                  <div className="dsc-login-form-buttons dsc-mt20">
                     <button type="submit" className="dsc-btn dsc-btn-blue">Entrar</button>
                  </div>
               </form>

            </div>
         </section>
      </main>
   );
}

export default Login;