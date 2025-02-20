let data = [
    {
        id: 1,
        photoCard: '/photo/mouse.jfif',
        name: 'iOS Mouse',
        price: 249.99,
        stars: 5,
    },
    {
        id: 2,
        photoCard: '/photo/kolonka2.jfif',
        name: 'Black iPhone Speaker',
        price: 249.99,
        stars: 5,
    },
    {
        id: 3,
        photoCard: '/photo/keyboard1.jfif',
        name: 'iOS Keyboard',
        price: 349.99,
        stars: 4,
    },
    {
        id: 4,
        photoCard: '/photo/iOSLaptop.jfif',
        name: 'Mackbook Pro',
        price: 1599.99,
        stars: 4,
    },
    {
        id: 5,
        photoCard: '/photo/blackHeadphones.jfif',
        name: 'Black Headphones',
        price: 149.99,
        stars: 5,
    },
    {
        id: 6,
        photoCard: '/photo/redDrone.jfif',
        name: 'Red Motorola Speaker',
        price: 329.99,
        stars: 4,
    },
];

for (let el of data) {
    let stars = '';
    for (let i = 0; i < el.stars; i++) {
        stars += '★';
    }
    for (let i = el.stars; i < 5; i++) {
        stars += '☆';
    }

    $('.goodsContainer').append(`
        <div class='goods'>
            <div class="goodsImgContainer"><img src="${el.photoCard}" alt="${el.name}" class="goodsImg"></div>
            <h2>${el.name}</h2>
            <div>$ ${el.price} <del>$349.99</del></div>
            <div class="rating">
                <span class="stars">${stars}</span>
            </div>
            <button id='${el.id}' class='goodsBtn'>Add to cart</button> 
        </div>
    `);
}

let cart = [];
$(document).on('click', '.goodsBtn', (e) => {
    if (cart.length >= 10) {
        alert('You can only add up to 10 items to the cart.');
        return;
    }
    let id = e.target.id;
    let el = data.find(el => el.id == id);
    cart.push(el);

    console.table(cart);

    $('.cartCounter').text(cart.length);
    $('.shoppingCartList').append(`<li>${el.name} $ ${el.price}</li> `);
    
});

$('#sendOrder').click(() => {
    const username = $('#username').val();
    const phone = $('#phone').val();
    axios.post('/order', { data: cart, username, phone })
        .then(() => {
            console.log('Success');
            alert('Order sent!');
        })
        .catch((error) => {
            console.error('Error sending order:', error);
        });
});

$('.shoppingCart').hide();
$(document).on('click', '.cartContainer', () => {
    $('.shoppingCart').fadeToggle();
})