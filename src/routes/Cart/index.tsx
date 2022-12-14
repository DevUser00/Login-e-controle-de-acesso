import './style.css'
import { useContext, useEffect, useState } from 'react';
import * as cartServices from '../../services/cart-services'
import * as orderService from '../../services/order-services'
import { OrderDTO } from '../../models/order';
import { Link, useNavigate } from 'react-router-dom';
import { ContextCartCount } from '../../utils/context-cart';


function Cart() {

   const navigate = useNavigate();

   //instacia o "carrinho que tiver no localstorege"
   const [cart, setCard] = useState<OrderDTO>(cartServices.getCart())

   const { setContextCartCount } = useContext(ContextCartCount);

   //limpa o carrinho e atualiza
   function handleClearClick() {
      cartServices.clearCart();
      updateCart();
   }

   //incrementa produtos no carrinho e atualiza
   function handleIncreaseItem(productId: number) {
      cartServices.increaseItem(productId)
      setCard(cartServices.getCart());
   }

   function handleDecreaseItem(productId: number) {
      cartServices.decreaseItem(productId);
      updateCart();
   }

   //Fazer a quantidade d item atualizar de forma global
   function updateCart() {
      const newCart = cartServices.getCart();
      setCard(newCart);
      setContextCartCount(newCart.items.length)
   }

   function handlePlaceOrderClick() {
      orderService.placeOrderRequest(cart).then(reponse => {
         cartServices.clearCart()
         setContextCartCount(0)
         navigate(`/confirmation/${reponse.data.id}`)
      })
   }

   return (
      <>
         <main>
            <section id="cart-container-section" className="dsc-container">
               {
                  cart.items.length === 0 ?
                     (<div className='dsc-section-title dsc-mb20'>
                        <h2> Seu carrinho está vazio</h2>
                     </div>
                     )
                     : (
                        <div className="dsc-card dsc-mb20">
                           {
                              cart.items.map(item => (
                                 <div key={item.productId} className="dsc-cart-item-container dsc-line-bottom">
                                    <div className="dsc-cart-item-left">
                                       <img src={item.imgUrl} alt={item.name} />
                                       <div className="dsc-cart-item-description">
                                          <h3>{item.name}</h3>
                                          <div className="dsc-cart-item-quantity-container">

                                             <div onClick={() => handleDecreaseItem(item.productId)} className="dsc-cart-item-quantity-btn">-</div>
                                             <p>{item.quantity}</p>
                                             <div onClick={() => handleIncreaseItem(item.productId)} className="dsc-cart-item-quantity-btn">+</div>

                                          </div>
                                       </div>
                                    </div>
                                    <div className="dsc-cart-item-right">
                                       R$ {item.subTotal.toFixed(2)}
                                    </div>
                                 </div>
                              ))
                           }
                           <div className="dsc-cart-total-container">
                              <h3>R$ {cart.total.toFixed(2)}</h3>
                           </div>
                        </div>
                     )
               }


               <div className="dsc-btn-page-container">
                  <div onClick={handlePlaceOrderClick} className="dsc-btn dsc-btn-blue">
                     Finalizar pedido
                  </div>

                  <Link to={'/catalog'}>
                     <div className="dsc-btn dsc-btn-white">
                        Continuar comprando
                     </div>
                  </Link>

                  <div onClick={handleClearClick} className="dsc-btn dsc-btn-white">
                     Limpar Carrinho
                  </div>
               </div>
            </section>
         </main>
      </>
   );
}

export default Cart;