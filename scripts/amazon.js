import {products} from '../data/products.js';
import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = '';
updateCartQuantity();

products.forEach((productItem) =>{
    productsHTML +=`
    <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${productItem.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${productItem.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="${productItem.getStarsUrl()}">
      <div class="product-rating-count link-primary">
        ${productItem.rating.count}
      </div>
    </div>

    <div class="product-price">
      ${productItem.getPrice()}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${productItem.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    ${productItem.extraInfoHTML()}

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${productItem.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${productItem.id}">
      Add to Cart
    </button>
  </div>`;

});

document.querySelector('.products-grid')
    .innerHTML= productsHTML;



function updateCartQuantity(){
    const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

}

function applyCSS(productId, addedMessageTimeouts){
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

    addedMessage.classList.add('added-to-cart-apply');

    const previousTimeoutId = addedMessageTimeouts[productId];

    if(previousTimeoutId){
        clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-apply');
    }, 2000);

    // Save the timeoutId so we can stop it later.
    addedMessageTimeouts[productId] = timeoutId;
}

document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;

            const addedMessageTimeouts = {};

            addToCart(productId);

            updateCartQuantity();

            applyCSS(productId, addedMessageTimeouts);
      });
});

