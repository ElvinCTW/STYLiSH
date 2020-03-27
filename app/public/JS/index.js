/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
/* eslint-disable max-len */
let productAPI_URL = '/api/V1.0/products/';

// Set query SQL
if (location.search.split('=')[0] === '?type') {
    const type = location.search.split('=')[1] || 'all';
    if (type === 'women') {
        productAPI_URL += 'women';
    } else if (type === 'men') {
        productAPI_URL += 'men';
    } else if (type === 'accessories') {
        productAPI_URL += 'accessories';
    } else {
        productAPI_URL += 'all';
    }
} else {
    productAPI_URL += 'all';
}
let page = 0;
// ajax

createMoreItems();

$(window).scroll(function() {
    // 判斷整體網頁的高度
    const $BodyHeight = $(document).height();
    // 判斷所見範圍的高度
    const $ViewportHeight=$(window).height();
    // 偵測目前捲軸頂點
    $ScrollTop=$(this).scrollTop();

    if ($BodyHeight - ($ViewportHeight+$ScrollTop) < 30) {
        createMoreItems();
    };
});

function createMoreItems() {
    getMoreSQL = productAPI_URL + `?page=${page}`;

    if ((typeof page) === 'number') {
        const getMoreRequest = new XMLHttpRequest();
        getMoreRequest.open('GET', getMoreSQL, true);
        getMoreRequest.onload = (sendbackMore) => {
            const sendbackMoreJSON = JSON.parse(sendbackMore.target.response);

            // create new boxes
            for (let i = 6*page; i < (6*page + sendbackMoreJSON.data.length); i++) {
                // Create new product box
                const newBox = $('<div></div>').attr({
                    'id': `product${i}`,
                    'class': 'product',
                });

                // Add new box into products-div
                $('#products-div').append(newBox);

                // Pic part
                const newPicDiv = $('<div></div>').attr({
                    'id': `product-pic-div${i}`,
                    'class': 'product-pic',
                });
                const newPicA = $('<a></a>').attr({
                    'href': `/product.html?id=${sendbackMoreJSON.data[i-6*page].id}`,
                    'id': `product-link-${i}`,
                });
                const newPic = $('<img></img>').attr({
                    'src': sendbackMoreJSON.data[i-6*page].main_image,
                    'id': `product-pic${i}`,
                });
                $(`#product${i}`).append(newPicDiv);
                $(`#product-pic-div${i}`).append(newPicA);
                $(`#product-link-${i}`).append(newPic);

                // Color part
                const newColorDiv = $('<div></div>').attr({
                    'id': `color-${i}`,
                    'class': 'color-parent',
                });
                $(`#product${i}`).append(newColorDiv);
                for (let j = 0; j < sendbackMoreJSON.data[i-6*page].colors.length; j++) {
                    const newColorNode = document.createElement('div');
                    newColorNode.className = 'color';
                    newColorNode.style.backgroundColor = `${sendbackMoreJSON.data[i-6*page].colors[j].code}`;
                    $(`color-${i}`).append(newColorNode);
                }

                // Text part
                const newTextDiv = $('<div></div>').attr('id', `product-text${i}`);
                $(`#product${i}`).append(newTextDiv);
                // Title
                const textNode = document.createElement('p');
                const textContent = document.createTextNode(`${sendbackMoreJSON.data[i-6*page].title}`);
                textNode.appendChild(textContent);
                $(`#product-text${i}`).append(textNode);
                // Price
                const priceNode = document.createElement('p');
                const priceContent = document.createTextNode(`TWD. ${sendbackMoreJSON.data[i-6*page].price}`);
                priceNode.appendChild(priceContent);
                $(`#product-text${i}`).append(priceNode);
            };
            page = sendbackMoreJSON.next_paging;

            if ((typeof page) === 'undefined') {
                // Hide button
                if ($('#no-more').length === 0) {
                    const nomoreMessage = $('<h3 />')
                        .attr('id', 'no-more')
                        .text('No more products');
                    $('#main').append(nomoreMessage);
                }
            }
        };
        getMoreRequest.send();
    }
};
