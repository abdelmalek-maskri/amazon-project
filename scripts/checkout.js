import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
// import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";

async function loadPage(){
    await loadProductsFetch();
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
    
}
loadPage();

//     loadProductsFetch().then(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// });


