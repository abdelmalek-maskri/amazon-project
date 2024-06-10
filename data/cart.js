export let cart = JSON.parse(localStorage.getItem('cart')) || 
    [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
        quantity: 2
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1
    }];


function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });
    const quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);

    const quantity = quantityElement.value;

    if(matchingItem){
        matchingItem.quantity += Number(quantity);
    }else{
        cart.push({
            productId: productId,
            quantity: Number(quantity)
        });
    }
    saveToStorage();
    
}

export function removeFromCart(productId) {
    const newCart = cart.filter(cartItem => cartItem.productId !== productId);
    cart = newCart;
    saveToStorage();
}




// Function to validate product IDs
// function isValidProductId(productId) {
//     return typeof productId === 'string' && productId.length === 36; // Assuming UUID format
// }

// // Load cart from localStorage or initialize it with default values
// let storedCart = JSON.parse(localStorage.getItem('cart'));

// // Check if storedCart is valid
// if (!Array.isArray(storedCart)) {
//     storedCart = null;
// }

// // Validate and clean the stored cart data if it exists
// if (storedCart) {
//     storedCart = storedCart.filter(item =>
//         isValidProductId(item.productId) && Number.isInteger(item.quantity) && item.quantity > 0
//     );
// }

// // If the stored cart is invalid or empty, initialize with default values
// export let cart = storedCart && storedCart.length > 0 ? storedCart : [
//     {
//         productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//         quantity: 2,
//     },
//     {
//         productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//         quantity: 1
//     }
// ];
 