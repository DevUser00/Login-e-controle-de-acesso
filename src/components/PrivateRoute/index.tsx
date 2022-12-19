import { Navigate } from 'react-router-dom';
import * as authService from '../../services/auth-services'

type Props = {
   children: JSX.Element;
}

//coloca um componete filho dentro d um componente
export function PrivateRoute({ children }: Props) {
   if (!authService.isAuthenticated()) {
      return <Navigate to="/login" />;
   }
   return children;
}