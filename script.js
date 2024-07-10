$(document).ready(function () {
    $('#carouselExample').carousel({
        interval: 2500 // Cambia de slide cada 2.5 segundos
    });

    // Recuperar carrito de localStorage al cargar la página
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        updateCartUI();
        updateCartTotal();
    }
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');
const notification = document.getElementById('notification');

let cart = {};
function addToCart(id, price) {
    if (!cart[id]) {
        cart[id] = { quantity: 1, price: price };
    } else {
        cart[id].quantity++;
    }
    updateCart();
}
function updateCart() {
    let cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cartTotal = 0;
    for (let id in cart) {
      let item = cart[id];
      let listItem = document.createElement('li');
      listItem.textContent = `${item.quantity} x ${id} - $${item.price * item.quantity}`;
      cartList.appendChild(listItem);
      cartTotal += item.price * item.quantity;
    }
    document.getElementById('cart-total').textContent = `Total: $${cartTotal.toFixed(2)}`;
  }
addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        const id = event.target.dataset.id;
        const coche = {
            id,
            name: event.target.parentNode.querySelector('h3').textContent,
            price: parseFloat(event.target.parentNode.querySelector('p').textContent.replace('Precio: $', ''))
        };

        if (!cart[id]) {
            cart[id] = { ...coche, quantity: 1 };
            addItemToCartUI(cart[id]);
        } else {
            cart[id].quantity++;
            updateItemInCartUI(cart[id]);
        }

        showNotification('Artículo añadido al carrito', 'success');
        updateCartTotal();
        saveCartToLocalStorage();
    });
});

cartList.addEventListener('click', event => {
    if (event.target.classList.contains('remove-from-cart')) {
        const id = event.target.dataset.id;
        const li = cartList.querySelector(`li[data-id="${id}"]`);

        if (cart[id].quantity > 1) {
            cart[id].quantity--;
            updateItemInCartUI(cart[id]);
        } else {
            delete cart[id];
            li.remove();
        }

        showNotification('Artículo eliminado del carrito', 'error');
        updateCartTotal();
        saveCartToLocalStorage();
    }

    if (event.target.classList.contains('increase-quantity')) {
        const id = event.target.dataset.id;
        cart[id].quantity++;
        updateItemInCartUI(cart[id]);
        updateCartTotal();
        saveCartToLocalStorage();
    }

    if (event.target.classList.contains('decrease-quantity')) {
        const id = event.target.dataset.id;
        if (cart[id].quantity > 1) {
            cart[id].quantity--;
            updateItemInCartUI(cart[id]);
            updateCartTotal();
            saveCartToLocalStorage();
        }
    }
});

function addItemToCartUI(item) {
    const li = document.createElement('li');
    li.setAttribute('data-id', item.id);
    li.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
        <button class="btn btn-danger remove-from-cart" data-id="${item.id}">Eliminar</button>
        <button class="btn btn-secondary increase-quantity" data-id="${item.id}">+</button>
        <button class="btn btn-secondary decrease-quantity" data-id="${item.id}">-</button>
    `;
    cartList.appendChild(li);
}

function updateItemInCartUI(item) {
    const li = cartList.querySelector(`li[data-id="${item.id}"]`);
    li.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
        <button class="btn btn-danger remove-from-cart" data-id="${item.id}">Eliminar</button>
        <button class="btn btn-secondary increase-quantity" data-id="${item.id}">+</button>
        <button class="btn btn-secondary decrease-quantity" data-id="${item.id}">-</button>
    `;
}

function updateCartUI() {
    cartList.innerHTML = '';
    Object.values(cart).forEach(item => {
        addItemToCartUI(item);
    });
}

function updateCartTotal() {
    let total = 0;
    Object.values(cart).forEach(coche => {
        total += coche.price * coche.quantity;
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function showNotification(message, type) {
    notification.textContent = message;
    notification.className = `notification ${type === 'error' ? 'error' : ''}`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function addToCart(id, price) {
    if (!cart[id]) {
      cart[id] = { quantity: 1, price: price };
    } else {
      cart[id].quantity++;
    }
    updateCart();
  }
  document.querySelector('.checkout').addEventListener('click', function() {
    alert('Compra confirmada');
});
