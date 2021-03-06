/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
/* eslint-disable max-len */
// Get params of id from url
const productIDfromURL = location.search.match(/\d+/)[0];

let sendbackJSON_Outside;

// Use ajax to send get request to product/detail?id=[id] API
const productDetailRequest = new XMLHttpRequest();
productDetailRequest.open(
    'GET',
    `/api/V1.0/products/details?id=${productIDfromURL}`,
    true,
);
productDetailRequest.onload = function(sendback) {
    // Get data from prrduct API and put info into pug file
    const sendbackJSON = JSON.parse(sendback.target.response);
    sendbackJSON_Outside = sendbackJSON;

    // Set DOM values
    document.getElementById('main-content-title-info').textContent = sendbackJSON.data.title || '查無此商品';
    document.getElementById('main-content-id-info').textContent = `ID : ${sendbackJSON.data.id || '查無此商品'}`;
    document.getElementById('main-content-price-info').textContent = `TWD. ${sendbackJSON.data.price || 0}`;

    // Set Color and Sizes
    // Colors
    const colorParentNode = document.getElementById('main-content-color-block-parent');
    for (let i = 0; i < sendbackJSON.data.colors.length; i++) {
        // Make color child nodes
        const newColorChildNode = document.createElement('div');
        newColorChildNode.className = 'main-content-color-block-child';
        newColorChildNode.style.background = '#'+sendbackJSON.data.colors[i].code;
        colorParentNode.appendChild(newColorChildNode);
    }
    // Sizes
    const sizeParentNode = document.getElementById('main-content-size-block-parent');
    for (let j = 0; j < sendbackJSON.data.sizes.length; j++) {
        // Make size child nodes
        const newSizeChildNode = document.createElement('div');
        newSizeChildNode.className = 'main-content-size-block-child';
        // Make size text span node
        const newSizeChildTextNode = document.createElement('span');
        newSizeChildTextNode.textContent = sendbackJSON.data.sizes[j];

        // Assemble Node
        newSizeChildNode.appendChild(newSizeChildTextNode);
        sizeParentNode.appendChild(newSizeChildNode);
    }

    // Set other DOM values
    document.getElementById('main-content-note').textContent = `附註 : ${sendbackJSON.data.note}`;
    document.getElementById('main-content-texture-info').textContent = `材質 : ${sendbackJSON.data.texture}`;
    document.getElementById('main-content-wash-info').textContent = `清洗 : ${sendbackJSON.data.wash}`;
    document.getElementById('main-content-description-info').textContent = `商品描述 : ${sendbackJSON.data.description}`;
    document.getElementById('main-content-place-info').textContent = `產地 : ${sendbackJSON.data.place}`;
    // Set Images and Stories
    const mainImageDiv = document.getElementById('main-image-info');
    const mainImage = document.createElement('img');
    mainImage.src = sendbackJSON.data.main_image;
    mainImageDiv.appendChild(mainImage);
    // Set story
    const storyDiv = document.getElementById('product-0-text');
    const storyText = document.createElement('p');
    storyText.textContent = sendbackJSON.data.story;
    storyDiv.appendChild(storyText);

    const imageArray = document.getElementsByClassName('product-pic-info');
    for (let k = 0; k < sendbackJSON.data.images.length; k++) {
        const newPic = document.createElement('img');
        newPic.src = sendbackJSON.data.images[k];
        imageArray[k].appendChild(newPic);
    }
};

productDetailRequest.send();

// Set Tappay box
TPDirect.setupSDK(12348, 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF', 'sandbox');
TPDirect.card.setup('#cardview-container');
const submitButton = document.querySelector('#submit-button');

function onClick() {
    // 讓 button click 之後觸發 getPrime 方法
    TPDirect.card.getPrime(function(result) {
        if (result.status !== 0) {
            alert('資料有誤');
            return;
        }

        // eslint-disable-next-line camelcase
        const sendAPI_Object = {
            prime: result.card.prime,
            order: {
                shipping: 'delivery',
                payment: 'credit_card',
                subtotal: 3321,
                freight: 11,
                total: 3222,
            },
            list: [{
                id: sendbackJSON_Outside.data.id,
                name: sendbackJSON_Outside.data.title,
                price: sendbackJSON_Outside.data.price,
                color: {
                    code: sendbackJSON_Outside.data.colors[0].code,
                    name: sendbackJSON_Outside.data.colors[0].name,
                },
                size: sendbackJSON_Outside.data.sizes[0],
                qty: 2,
            }],
        };

        // Put info into order object
        sendAPI_Object.order.recipient = {
            name: '用戶一',
            phone: '0912345678',
            email: 'test2@test.com',
            address: '台北',
            time: '晚上',
        };

        // Make checkout request
        const checkoutRequest = new XMLHttpRequest();
        checkoutRequest.open('POST', '/api/V1.0/order/checkout', true);

        // Set request header
        checkoutRequest.setRequestHeader('Content-Type', 'application/json');
        if (localStorage.getItem('stylish_token')) {
            checkoutRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('stylish_token'));
        }

        checkoutRequest.onload = function(sendback) {
            const sendbackJSON_fromCheckout = JSON.parse(sendback.target.response);

            if (sendbackJSON_fromCheckout.msg) {
                alert(`payment error, error code : ${sendbackJSON_fromCheckout.status}, error message : ${sendbackJSON_fromCheckout.msg}`);
            } else {
                alert(`你的訂單編號為： ${sendbackJSON_fromCheckout.data.number}`);
                window.location.pathname = '/thankyou.html';
            }
        };
        checkoutRequest.send(JSON.stringify(sendAPI_Object));
    });
}
