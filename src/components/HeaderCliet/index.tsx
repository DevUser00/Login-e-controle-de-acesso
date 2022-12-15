import './style.css';

import { Link, Outlet } from 'react-router-dom';
import CartIcon from '../CartIcon';
import HeaderAdmin from '../HeaderAdmin';


export default function HeaderClient() {

  return (
    <>
    <HeaderAdmin></HeaderAdmin>
    <Outlet></Outlet>
    </>
  );
}