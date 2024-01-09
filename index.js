const toggleLike = document.querySelectorAll(".fa-regular");
const cartContainer = document.querySelector(".cart-container");
const cartItems = document.querySelector(".cart-items");
const clearCart = document.querySelector(".remove_item");
const deleteItem = document.querySelectorAll(".delete");
const hrlLine = document.querySelector("hr");

let isliked = false;

toggleLike.forEach((icon) => {
  icon.addEventListener("click", () => {
    isliked = !isliked;
    let className;
    if (isliked === true) {
      className = "fa-solid fa-heart";
    } else {
      className = "fa-regular fa-heart";
    }

    icon.setAttribute("class", className);
  });
});

const clearcartItems = () => {
  cartContainer.style.height = "700px";
  cartItems.remove();
  const newDiv = document.createElement("div");
  const newH1 = document.createElement("h1");
  newH1.textContent = "your items are empty";
  newDiv.appendChild(newH1);
  newDiv.classList.add("no_items");
  cartContainer.appendChild(newDiv);
  clearCart.remove();
};

clearCart.addEventListener("click", clearcartItems);

deleteItem.forEach(function (button) {
  button.addEventListener("click", function () {
    button.closest(".item").remove();
    hrlLine.remove();
    if (document.querySelector(".delete") === null) {
      clearcartItems();
    }
  });
});

// INREMENTS and decrements
const incrementButtons = document.querySelectorAll(".increment");
const decrementButtons = document.querySelectorAll(".decrement");

let pricesArray = [];

// Function to increment each item quantity
const increaseEachItemQuantity = (incrementBtn) => {
  var sibling = incrementBtn.nextElementSibling;
  var quantity = parseInt(sibling.textContent);
  quantity = quantity + 1;
  sibling.textContent = quantity.toString();
  return quantity;
};

const decreaseEachItemQuantity = (decrementBtn) => {
  var sibling = decrementBtn.previousElementSibling;
  var quantity = parseInt(sibling.textContent);
  if (quantity > 1) {
    quantity = quantity - 1;
    sibling.textContent = quantity.toString();
  }
  return quantity;
};

// Function to get original prices
const getOriginalPrices = (btn) => {
  const priceDiv = btn.parentElement.nextElementSibling;
  const priceElement = priceDiv.querySelector("p");
  const individualPrices = priceElement.textContent;
  const individualPricesInt = parseInt(individualPrices.slice(1));
  pricesArray.push(individualPricesInt);
  return pricesArray;
};

const updateEachItemPrice = (quantity, pricesArray, index, btn) => {
  const itemPrice = quantity * pricesArray[index];
  const itemPriceString = "$" + itemPrice.toFixed(2);

  const priceDiv = btn.parentElement.nextElementSibling;
  const priceElement = priceDiv.querySelector("p");
  priceElement.textContent = itemPriceString;
};

for (let i = 0; i < incrementButtons.length; i++) {
  const returnedPricesArray = getOriginalPrices(incrementButtons[i]);

  incrementButtons[i].addEventListener("click", function () {
    const quantity = increaseEachItemQuantity(incrementButtons[i]);

    updateEachItemPrice(quantity, returnedPricesArray, i, incrementButtons[i]);
  });
}

decrementButtons.forEach(function (decrementBtn, i) {
  const returnedPricesArray = getOriginalPrices(decrementBtn);

  decrementBtn.addEventListener("click", function () {
    const quantity = decreaseEachItemQuantity(decrementBtn);
    updateEachItemPrice(quantity, returnedPricesArray, i, decrementBtn);
  });
});

const updateSubtotal = () => {
  const itemPrices = document.querySelectorAll(".item-price");
  const quantities = document.querySelectorAll(".quantity p:nth-child(2)");
  let subtotal = 0;

  itemPrices.forEach((price, index) => {
    const priceValue = parseFloat(price.textContent.slice(1));
    const quantity = parseInt(quantities[index].textContent);
    subtotal += priceValue * quantity;
  });

  document.getElementById("subtotalAmount").textContent =
    "$" + subtotal.toFixed(2);
};

// Add event listeners for quantity changes
const quantityChangeButtons = document.querySelectorAll(".quantity-btn");
quantityChangeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateSubtotal();
  });
});
