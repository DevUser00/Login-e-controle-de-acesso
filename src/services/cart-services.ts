import { OrderDTO, OrderItemDTO } from "../models/order";
import * as cartRepository from '../localstorege/cart-repository'
import { ProductDTO } from "../models/product";

export function saveCart(cart: OrderDTO) {
   cartRepository.save(cart)
}

export function getCart(): OrderDTO {
   return cartRepository.get();
}

export function addProduct(product: ProductDTO) {
   //acesar o carrinho
   const cart = cartRepository.get();

   //para não repetir item no carrinho
   const item = cart.items.find(x => x.productId === product.id);

   if (!item) {
      const newItem = new OrderItemDTO(product.id, 1, product.name, product.price, product.imgUrl)
      cart.items.push(newItem);

      cartRepository.save(cart);
   }
}

export function clearCart() {
   cartRepository.clear();
}

// A função increaseItem aumenta a quantidade de um item específico em um carrinho de compras
export function increaseItem(productId: number) {
   // Obtém o carrinho de compras atual a partir do repositório de carrinhos de compras
   const cart = cartRepository.get();

   // Procura o item com o ID de produto especificado na lista de itens do carrinho
   const item = cart.items.find(x => x.productId === productId);

   // Se o item for encontrado, sua quantidade é aumentada em 1 e o carrinho atualizado é salvo
   if (item) {
      item.quantity++;
      cartRepository.save(cart);
   }
}

export function decreaseItem(productId: number) {
   const cart = cartRepository.get();
   const item = cart.items.find(x => x.productId === productId);

   if (item) {
      item.quantity--;
      if (item.quantity < 1) {
         cart.items = cart.items.filter(x => x.productId !== productId)
      }
      cartRepository.save(cart);
   }
}