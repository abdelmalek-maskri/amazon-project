export const cart = [];

export function addToCart(productId){
    let matchingItem;
  
    const productQuantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
  
    const productQuantity = productQuantityElement.value;
    
    cart.forEach((cartItem) =>{
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
    });
  
    if(matchingItem){
      matchingItem.quantity +=Number(productQuantity);
    }
    else{
      cart.push({
        productId: productId,
        quantity: Number(productQuantity) 
      });
    }
}