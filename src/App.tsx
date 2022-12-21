import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './routes/ClientHome/Login/login';
import Cart from './routes/Cart';
import ClientHome from './routes/ClientHome';
import Catalog from './routes/ClientHome/Catalog';
import ProductDetails from './routes/ClientHome/ProductDetails';
import Admin from './routes/Admin';
import AdminHome from './routes/Admin/AdminHome';

//Variavel global
import { ContextCartCount } from './utils/context-cart';
//Redirecionamento fora do componente
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history';
import { PrivateRoute } from './components/PrivateRoute';
import { AccessTokenPayloadDTO } from './models/auth';
import { ContextToken } from './utils/context-token';
import * as authService from './services/auth-services'
import * as cartService from './services/cart-services'
import Confirmation from './routes/ClientHome/Confirmation';

function App() {

  const [contextCartCount, setContextCartCount] = useState<number>(0);

  const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayloadDTO>();

  //buscar o token e o cart que esta pesistido no localstorege
  useEffect(() => {
    setContextCartCount(cartService.getCart().items.length)

    if (authService.isAuthenticated()) {
      const payload = authService.getAccessTokenPayload();
      setContextTokenPayload(payload);
    }
  }, [])


  return (
    <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>
      <ContextCartCount.Provider value={{ contextCartCount, setContextCartCount }}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/" element={<ClientHome />}>
              <Route index element={<Catalog />} />
              <Route path="catalog" element={<Catalog />} />  
              <Route path="product-details/:productId" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
              <Route path="confirmation/:orderId" element={<PrivateRoute> <Confirmation></Confirmation> </PrivateRoute> } />
            </Route>
            <Route path='/admin/' element={
              <PrivateRoute roles={['ROLE_ADMIN']} >
                <Admin />
              </PrivateRoute>
            }>
              <Route index element={<AdminHome />} />

            </Route>
            <Route path="*" element={<Navigate to={"/"} />} />

          </Routes>
        </HistoryRouter >
      </ContextCartCount.Provider>
    </ContextToken.Provider>
  );
}

export default App
