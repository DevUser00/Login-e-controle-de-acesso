import { CART_KEY } from "../utils/system";
import { OrderDTO, OrderItemDTO } from "../models/order";

//Save cart local
export function save(cart: OrderDTO) {
   const str = JSON.stringify(cart);
   localStorage.setItem(CART_KEY, str);
}

//Get cart local
export function get(): OrderDTO {
   const str = localStorage.getItem(CART_KEY) || '{"items":[]}';
   const obj = JSON.parse(str) as OrderDTO;

   const cart = new OrderDTO();
   obj.items.forEach(x => {
      cart.items.push(new OrderItemDTO(x.productId, x.quantity, x.name, x.price, x.imgUrl))
   })

   return cart;
}

//Clear cart
export function clear() {
   localStorage.setItem(CART_KEY, '{"items":[]}');
}

