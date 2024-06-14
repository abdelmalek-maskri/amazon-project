function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,
        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || 
              [{
                  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                  quantity: 2,
                  deliveryOptionId: '1' 
              }, {
                  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                  quantity: 1,
                  deliveryOptionId: '2'
              }];
        },
    
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
    
        addToCart(productId){
            let matchingItem;
        
            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            });
            // const quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
        
            // const quantity = quantityElement.value;
        
            if(matchingItem){
                matchingItem.quantity += 1;
            }else{
                this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: '1'
                });
            }
            
            this.saveToStorage();
            
        },
    
        removeFromCart(productId) {
            const newCart = [];
          
            this.cartItems.forEach((cartItem) => {
              if (cartItem.productId !== productId) {
                newCart.push(cartItem);
              }
            });
          
            this.cartItems = newCart;
          
            this.saveToStorage();
          },
    
          calculateCartQuantity(){
            let cartQuantity = 0;
            this.cartItems.forEach((cartItem) => {
              cartQuantity += cartItem.quantity;
            });
            
            return cartQuantity;
          },
    
          updateQuantity(productId, newQuantity){
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
              if(cartItem.productId === productId){
                matchingItem = cartItem;
              }
            });
            matchingItem.quantity = newQuantity;
            
            this.saveToStorage();
          },
    
          updateDeliveryOption(productId, newDeliveryOptionId){
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
              if(productId === cartItem.productId){
                matchingItem = cartItem;
              }
            });
            if(!matchingItem){
              return;
            }
            matchingItem.deliveryOptionId = newDeliveryOptionId;
          
            this.saveToStorage();
          }
    };
    
    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');



cart.loadFromStorage(); 
businessCart.loadFromStorage();


console.log(cart);
console.log(businessCart);













