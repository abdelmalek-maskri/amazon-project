import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
// import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";

async function loadPage(){
    try{
        await loadProductsFetch();
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    }catch(error){
        console.log('unexpected error');
    }
}
loadPage();

//     loadProductsFetch().then(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// });


