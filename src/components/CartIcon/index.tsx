import './style.css'
import cartIcon from '../../assets/carrinho-compra.png'
import * as cartService from '../../services/cart-services'
import { useContext, useState } from 'react';
import { ContextCartCount } from '../../utils/context-cart';

function CartIcon() {

      const {contextCartCount} = useContext(ContextCartCount);

      return (
            <>
                  <img src={cartIcon} alt="Carrinho de compras" />
                  {
                        contextCartCount > 0 &&
                        <div className='dsc-cart-count'>{contextCartCount}</div>
                  }

            </>
      );
}

export default CartIcon;