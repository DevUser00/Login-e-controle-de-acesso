import './style.css';
import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ProductDTO } from '../../../models/product';

import * as productServices from '../../../services/product-services'
import * as cartServices from '../../../services/cart-services'
import { ContextCartCount } from '../../../utils/context-cart';

export default function ProductDetails() {

   const navigate = useNavigate();

   const params = useParams();

   const {setContextCartCount} = useContext(ContextCartCount);

   const [product, setProduct] = useState<ProductDTO>();

   useEffect(() => {
      productServices.findById(Number(params.productId)).then(reponse => {
         console.log(reponse)
         setProduct(reponse.data)
      })
      .catch( () => {
         navigate("/");
      });
   }, []);

   function handleBuyClick() {
      if (product) {
         cartServices.addProduct(product);
         setContextCartCount(cartServices.getCart().items.length)
         navigate('/cart');
      }
   }

   return ( 
      <>
         <main>
            <section id="product-details-section" className="dsc-container">

               {
                  product 
                  && <ProductDetailsCard product={product} />
                  
               }

               <div className="dsc-btn-page-container">
                  <div onClick={handleBuyClick}>
                  <ButtonPrimary text="Comprar" />
                  </div>
                  
                  <Link to={`/`}>
                     <ButtonInverse text="Inicio" />
                  </Link>
               </div>
            </section>
         </main>
      </>
   );
}