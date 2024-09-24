const products = [
    {
        name: "Cactus Jack T-Shirt",
        price: 49.99,
        image: "https://github.com/Royce-Tinofara/Royce-s-Drip-Mecrh-Website/raw/main/Merch/cactus%20Jack.jpg"
    },
    {
        name: "Travis Scott T-Shirt",
        price: 39.99,
        image: "https://github.com/Royce-Tinofara/Royce-s-Drip-Mecrh-Website/raw/main/Merch/Travis%20scott.jpg"
    },
    {

name: "OFF-White Sweater",

price: 69.99,

image: "https://github.com/Royce-Tinofara/Royce-s-Drip-Mecrh-Website/raw/main/Merch/Off%20white%20Sweater.jpg"

},

{

name: "Givenchy Sweater",

price: 59.99,

image: "https://github.com/Royce-Tinofara/Royce-s-Drip-Mecrh-Website/raw/main/Merch/Givenchy%20Sweater.jpg"

},

{

name: "Spongebob Bottle",

price: 3.99,

image: "https://github.com/Royce-Tinofara/Royce-s-Drip-Mecrh-Website/raw/main/Merch/Spongebob%20bottle.jpg"

},

{

name: "Rick n Morty Bottle",

price: 4.99,

image: "https://github.com/Royce-Tinofara/Royce-s-Drip-Mecrh-Website/raw/main/Merch/Rick%20n%20morty%20Bottle.jpg"

},

{

name: "Travis Scott Phone Case",

price: 5.99,

image: "https://github.com/Royce-Tinofara/Royce-s-Drip-Mecrh-Website/raw/main/Merch/Travis%20Scott%20phone%20case.jpg"

},

{

name: "Tupac Phone Case",

price: 5.99,

image: "https://github.com/Royce-Tinofara/Royce-s-Drip-Mecrh-Website/raw/main/Merch/Tupac%20phone%20case.jpg"

},
    // Add the rest of your product data here
];

let cart = [];

const productList = document.getElementById('product-list');
const cartButton = document.getElementById('cart-button');
const cartContainer = document.getElementById('cart-container');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>Price: $${product.price.toFixed(2)}</p>
        <input type="number" id="qty-${product.name.replace(/\s/g, '-').toLowerCase()}" value="1" min="1" style="width: 50px;">
        <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
});

function addToCart(productName, price) {
    const qtyInput = document.getElementById(`qty-${productName.replace(/\s/g, '-').toLowerCase()}`);
    const quantity = parseInt(qtyInput.value);

    const existingProduct = cart.find(item => item.productName === productName);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ productName, price, quantity });
    }

    updateCart();
    alert(`${productName} (x${quantity}) has been added to your cart.`);
}

function updateCart() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartButton.innerText = `View Cart (${cartCount})`;

    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.productName} - $${item.price.toFixed(2)} x ${item.quantity}`;
        cartItemsList.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = total.toFixed(2);
}

cartButton.onclick = () => {
    cartContainer.style.display = 'block';
};

document.getElementById('close-cart-button').onclick = () => {
    cartContainer.style.display = 'none';
};

document.getElementById('checkout-button').onclick = () => {
    alert('Checkout successful! Your total is $' + totalPriceElement.textContent);
    cart = [];
    updateCart();
    cartContainer.style.display = 'none';
};
function removeItemFromCart(productName) {
    cart = cart.filter(item => item.productName !== productName);
    updateCart();
}

document.getElementById('cart-items').addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const productName = event.target.textContent.split(' - ')[0];
        removeItemFromCart(productName);
    }
});

const centerCartButton = document.getElementById('cart-button');
centerCartButton.style.display = 'block';
centerCartButton.style.margin = '0 auto';