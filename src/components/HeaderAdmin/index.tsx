import home from '../../assets/home.png'
import produtos from '../../assets/produtos.png'
import LoggedUser from '../LoggedUser';

import './style.css'



function HeaderAdmin() {
   return (
      <>
         <header className="dsc-header-admin">
            <nav className="dsc-container">
               <h1>DSC Admin</h1>
               <div className="dsc-navbar-right">
                  <div className="dsc-menu-items-container">
                     <div className="dsc-menu-item">
                        <img src={home} alt="Início" />
                        <p>Início</p>
                     </div>
                     <div className="dsc-menu-item">
                        <img src={produtos} alt="Cadastro de produtos" />
                        <p className="dsc-menu-item-active">Produtos</p>
                     </div>
                  </div>
                  <LoggedUser></LoggedUser>
               </div>
            </nav>
         </header>
      </>
   );
}

export default HeaderAdmin;