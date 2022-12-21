import './style.css';

import { Link } from 'react-router-dom';
import CartIcon from '../CartIcon';
import iconAdmin from '../../assets/admin.svg'
import * as authServices from '../../services/auth-services'
import { useContext } from 'react';
import { ContextToken } from '../../utils/context-token';
import LoggedUser from '../LoggedUser';

export default function HeaderClient() {

  //Observar o estado do token da aplicação
  const {contextTokenPayload} = useContext(ContextToken)

  return (
    <>
      <header className="dsc-header-client">
        <nav className="dsc-container">
          <Link to={`/`}>
            <h1>DSCommerce</h1>
          </Link>
          <div className="dsc-navbar-right">
            <div className="dsc-menu-items-container">

              {
                contextTokenPayload &&
                authServices.hasAnyRoles(['ROLE_ADMIN']) &&
                <Link to="/admin">
                  <div className="dsc-menu-item">
                    <img src={iconAdmin} alt="Admin" />
                  </div>
                </Link>
              }
              <Link to={`/cart`}>
                <div className="dsc-menu-item">
                  <CartIcon />
                </div>
              </Link>
            </div>
            <LoggedUser></LoggedUser>
          </div>
        </nav>
      </header>
    </>
  );
}