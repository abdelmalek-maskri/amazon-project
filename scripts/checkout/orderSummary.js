import { cart , removeFromCart, saveToStorage, calculateCartQuantity, updateQuantity,updateDeliveryOption} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";

import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary(){
    let cartSummaryHTML = '';
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        let matchingProduct = getProduct(productId);
    

        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption = getDeliveryOption(deliveryOptionId);

        const dateString = calculateDeliveryDate(deliveryOption);

        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image"
            src="${matchingProduct.image}">

        <div class="cart-item-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-price">
            ${(matchingProduct.priceCents/100).toFixed(2)}
            </div>
            <div class="product-quantity">
            <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
            </span>
            <input class="quantity-input js-quantity-input">
            <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
            </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
        </div>
    </div>
        `;
    });
    function deliveryOptionsHTML(matchingProduct, cartItem){
        let html = '';
        deliveryOptions.forEach((deliveryOption) => {
            const dateString = calculateDeliveryDate(deliveryOption);
            const priceString = deliveryOption.priceCents === 0 ? 'FREE': `$${(deliveryOption.priceCents/100).toFixed(2)} -`;
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            html += `
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}"x>
            <input type="radio"
                ${isChecked ? 'checked': ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                ${dateString}
                </div>
                <div class="delivery-option-price">
                ${priceString} Shipping
                </div>
            </div>
            </div>
            `
        });
        return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            // const container = document.querySelector(`.js-cart-item-container-${productId}`);
            // container.remove();
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
            
        });
    });

    document.querySelectorAll('.js-update-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity');

        
        });
    });

    document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.remove('is-editing-quantity');

            const newQuantity = Number(document.querySelector('.js-quantity-input').value);
            if(newQuantity > 0 && newQuantity < 1000){
                updateQuantity(productId, newQuantity);
                const quantityLabel = document.querySelector(
                    `.js-quantity-label-${productId}`
                );
                quantityLabel.innerHTML = newQuantity;
                
                renderCheckoutHeader();
                renderPaymentSummary();
            }
            else if (newQuantity === 0){
                removeFromCart(productId);
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.remove();
                renderCheckoutHeader();
                renderPaymentSummary();
                
            }
            else{
                alert("Quantity should be more than 0 and less than 1000");
                return;
            }
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

}

