/* eslint-disable max-len */
// Get params of id from url
const productIDfromURL = location.search.match(/\d+/)[0];

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
    console.log(sendbackJSON);

    if (sendbackJSON.emptyProductMessage) {
        alert(sendbackJSON.emptyProductMessage);
    }

    // Set DOM values
    document.getElementById('main-content-title-info').textContent = sendbackJSON.data.title;
    document.getElementById('main-content-id-info').textContent = `ID : ${sendbackJSON.data.id}`;
    document.getElementById('main-content-price-info').textContent = `TWD. ${sendbackJSON.data.price}`;

    // Set Color and Sizes
    // Colors
    const colorParentNode = document.getElementById('main-content-color-block-parent');
    for (let i=0; i < sendbackJSON.data.colors.length; i++) {
        // Make color child nodes
        const newColorChildNode = document.createElement('div');
        newColorChildNode.className = 'main-content-color-block-child';
        newColorChildNode.style.backgroundColor = sendbackJSON.data.colors[i].code;
        colorParentNode.appendChild(newColorChildNode);
    }
    // Sizes
    const sizeParentNode = document.getElementById('main-content-size-block-parent');
    for (let j=0; j < sendbackJSON.data.sizes.length; j++) {
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

    const imageArray = document.getElementsByClassName('product-pic-info');
    for (let k=0; k < sendbackJSON.data.images.length; k++) {
        const newPic = document.createElement('img');
        newPic.src = sendbackJSON.data.images[k];
        imageArray[k].appendChild(newPic);
    }
};
productDetailRequest.send();
