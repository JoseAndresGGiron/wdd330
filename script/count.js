const cart = document.querySelector("#cart");
let drinkCounter = Number(window.localStorage.getItem("drinks"));
if (drinkCounter !== 0) {
    cart.innerHTML = `Total number of Smoothies: <strong>${drinkCounter}</strong>`;
} else {
    cart.textContent = `No Smoothies yet!`;
}