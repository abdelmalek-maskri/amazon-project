export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 3,
      deliveryOptionId: '1'
  },
  {
      productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity:1,
      deliveryOptionId: '2'
  }];

export function addToCart(productId){
  let matchingProduct;
  const inputElement = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = inputElement.value;
  cart.forEach((cartItem) => {
      if(cartItem.productId === productId){
          matchingProduct = cartItem;
      }
  });
  if(matchingProduct){
      matchingProduct.quantity += Number(quantity);
  }else{
      cart.push({productId: productId, quantity: Number(quantity), deliveryOptionId: '1'});
  }
  saveToStorage();
}

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId){
  let newCart = [];
  cart.forEach((cartItem) =>{
      if(cartItem.productId !== productId){
          newCart.push(cartItem);
      }
  });
  cart = newCart;
}

export function calculateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity){
  let matchingProduct;
  cart.forEach((cartItem) => {
      if(cartItem.productId === productId){
          matchingProduct = cartItem;
      }
  });
  matchingProduct.quantity = newQuantity;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) => {
      if(cartItem.productId === productId){
          matchingItem = cartItem;
      }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
  
}