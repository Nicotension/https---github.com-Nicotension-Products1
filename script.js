const product = [
    { name: "Live Parrots for sale", image: "image9.jpg", price: "240.99", likes: 0, qtty: 1 },
    { name: "Abstract Photos in discount(-20%)", image: "image11.jpg", price: "90.99", likes: 0, qtty: 1 },
    { name: "Abstract Photos", image: "image1.jpg", price: "49.99", likes: 0, qtty: 1 },
    { name: "Abstract Photos", image: "image4.jpg", price: "59.99", likes: 0, qtty: 1 },
    { name: "Live Portraits", image: "images55.jpg", price: "69.99", likes: 0, qtty: 1 },
    { name: "Live Portraits", image: "images66.jpg", price: "85.00", likes: 0, qtty: 1 },
    { name: "Latest Ipad in Stock", image: "image13.jpg", price: "499.99", likes: 0, qtty: 1 },
    { name: "Abstract Photos", image: "image001.png", price: "38.99", likes: 0, qtty: 1 },
    { name: "Illuminated Drawings", image: "image0.jpg", price: "329.00", likes: 0, qtty: 1 },
    { name: "A Glass Of Berry Cocktail", image: "image00.jpg", price: "4.99", likes: 0, qtty: 1 },
    { name: "Berry products for sale", image: "image12.jpg", price: "9.99", likes: 0, qtty: 100 },
    { name: "A Kitchen Photo", image: "image000.jpg", price: "249.99", likes: 0, qtty: 12 },
];

let cart = []; 

product.forEach((element) => {
    document.getElementById("product").innerHTML += `
        <div class="col mb-4">
            <div class="card">
                <img class="img" src="images/${element.image}" class="card-img-top" alt="${element.name}">
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">Price: $${element.price}</p>
                    <p class="likes">${element.likes}</p> 
                    <button class="btns">Increase</button>
                    <button class="btnsminus">Decrease</button><br><br>
                    <button class="butt">Add to cart</button>
                </div>
            </div>
        </div>
    `;
});
document.querySelectorAll(".btns").forEach((element, index) => {
    element.addEventListener("click", function () {
        product[index].likes++;
        document.querySelectorAll(".likes")[index].innerHTML = product[index].likes;
    });
});
document.querySelectorAll(".btnsminus").forEach((element, index) => {
    element.addEventListener("click", function () {
        product[index].likes--;
        document.querySelectorAll(".likes")[index].innerHTML = product[index].likes;
    });
});
document.addEventListener("DOMContentLoaded", function() {
    let butt = document.querySelectorAll(".butt");

    butt.forEach((element, i) => {
        element.addEventListener("click", function() {
            if (cart.find((x) => x.name == product[i].name)) {
                cart.find((x) => x.name == product[i].name).qtty++;
            } else {
                const newProduct = { ...product[i], qtty: 1 };
                cart.push(newProduct);
            }
            updateCartDisplay(); 
        });
    });

    document.getElementById("empty-cart").addEventListener("click", function() {
        cart = [];
        updateCartDisplay(); 
    });

    updateCartDisplay();
});
function updateCartDisplay() {
    document.getElementById("cart").innerHTML = '';
    cart.forEach(element => {
        document.getElementById("cart").innerHTML += `
            <p>${element.name} (Quantity: ${element.qtty})</p>
        `;
    });

    createCartInHTML();
    calculateTotal(); 
}
    createCartInHTML();
    function calculateTotal() {
        let total = 0;
        cart.forEach(element => {
            total += element.qtty * parseFloat(element.price);
        });
        document.getElementById("total").innerHTML = `Total: $${total.toFixed(2)}`;
    }
function createCartInHTML() {
    let cartHTML = ""; 

    cart.forEach((element, index) => {
        cartHTML += `
        <div class="item">
            <img class="pic" src="images/${element.image}" width="100">
            <div class="name">
                <p>${element.name}</p>
                <p>Price: $${element.price}</p>
            </div>
            <div class="num">
              <p class="sum">(Qtty: ${element.qtty})</p>
                <button class="increase" data-index="${index}">+</button>
                <button class="decrease" data-index="${index}">-</button>
                <button class="remove" data-index="${index}">x</button>
            </div>
        </div>`;
    });

    document.getElementById("cart").innerHTML = cartHTML; 

    addCartEventListeners();
}
function addCartEventListeners() {
    document.querySelectorAll(".increase").forEach(button => {
        button.addEventListener("click", function() {
            const index = button.getAttribute("data-index");
            cart[index].qtty++;
            updateCartDisplay();
        });
    });
    document.querySelectorAll(".decrease").forEach(button => {
        button.addEventListener("click", function() {
            const index = button.getAttribute("data-index");
            if (cart[index].qtty > 1) {
                cart[index].qtty--;
            } else {
                cart.splice(index, 1);
            }
            updateCartDisplay();
        });
    });
    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", function() {
            const index = button.getAttribute("data-index");
            cart.splice(index, 1); 
            updateCartDisplay();
        });
    });
}

