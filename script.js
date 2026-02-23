
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    const item = cart.find(p => p.name === name);
    if(item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity:1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

function renderCart() {
    const container = document.getElementById("cartItems");
    const totalDisplay = document.getElementById("total");
    if(!container) return;

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        container.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>R${item.price * item.quantity}</span>
            </div>
        `;
    });

    totalDisplay.innerHTML = "Total: R" + total;
}

document.addEventListener("DOMContentLoaded", function() {
    renderCart();

    const form = document.getElementById("checkoutForm");
    if(form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            let name = document.getElementById("name").value;
            let phone = document.getElementById("phone").value;
            let address = document.getElementById("address").value;

            let message = "New Order:%0A%0AItems:%0A";
            let total = 0;

            cart.forEach(item => {
                message += `${item.quantity}x ${item.name} - R${item.price * item.quantity}%0A`;
                total += item.price * item.quantity;
            });

            message += `%0ATotal: R${total}%0A%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}`;

            window.location.href = "https://wa.me/27792102215?text=" + message;

            localStorage.removeItem("cart");
        });
    }
});
