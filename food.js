const product = [
    {
        id: 0,
        image: 'pics/chapati.jpeg',
        title: 'Chapati Plain',
        price: 15,
    },
    {
        id: 1,
        image: 'pics/chips.jpeg',
        title: 'Chips Plain',
        price: 80,
    },
    {
        id: 2,
        image: 'pics/hotdog.jpg',
        title: 'Hotdogs',
        price: 60,
    },
    {
        id: 3,
        image: 'pics/byriani.jpeg',
        title: 'Byriani',
        price: 80,
    }
];

const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i=0;
document.getElementById('root').innerHTML = categories.map((item) =>
{
    var {image, title, price} = item;
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
            <div class='bottom'>
            <p>${title}</p>
            <h2>Ksh ${price}.00</h2>`+
            "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
            `</div>
            </div>`
    )
}).join('')

var cart = [];

function addtocart(a){
    cart.push({...categories[a]});
    displayCart();
}

function delElement(a){
    cart.splice(a, 1);
    displayCart();
}
function displayCart(a){
    let j = 0, total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length==0){
        document.getElementById('cartItem').innerHTML = 'Your cart is empty';
        document.getElementById("total").innerHTML = "Ksh "+0+".00";
    }
    else{
        document.getElementById("cartItem").innerHTML = cart.map((items) =>
        {
            var {image, title, price} = items;
            total=total+price;
            document.getElementById("total").innerHTML = "Ksh "+total+".00";
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:13px;'>${title}</p>
                <h2 style='font-size:15px;'>Ksh ${price}.00</h2>`+
                "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
            );
        }).join('')
    }
}
});

function addToCart(item) {
    // Retrieve the current cartitems from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the new item to the cart
    cart.push(item);

    // Store the updated cart back into the localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}
// Function to display the cart items
        function displayCartItems() {
            const cartItemsContainer = document.getElementById('cartItems');
            const totalPriceElement = document.getElementById('total');
            let total = 0;

            // Retrieve cart items from localStorage
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Clear any previous cart items
            cartItemsContainer.innerHTML = '';

            // If cart is empty, display a message
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>No items in your cart.</p>';
                totalPriceElement.textContent = '0.00';
                return;
            }

            // Loop through cart items and display them
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = <p>${item.name} - $${item.price.toFixed(2)}</p>;
                cartItemsContainer.appendChild(itemElement);
                total += item.price;
            });

            // Update the total price
            totalPriceElement.textContent = total.toFixed(2);
        }

        // Payment button click handler
        document.getElementById('payment-button').addEventListener('click', () => {
            alert('Redirecting to payment gateway...');
            // Redirect to a payment processing page
            window.location.href = "thank-you.html"; // Redirect to a thank you page after payment
        });

        // Initialize cart display
        displayCartItems();


        
