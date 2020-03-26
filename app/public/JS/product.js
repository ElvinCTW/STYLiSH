/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
let counter = 0;

document.getElementById('addProductForm').onkeypress = function (e) {
    const key = e.charCode || e.keyCode || 0;
    if (key == 13) {
        alert('no enter plz');
        e.preventDefault();
    }
};


$('#colors').on({
    keydown: function(e) {
        if (e.which === 32) {
            return false;
        }
    },
    change: function () {
        this.value = this.value.replace(/\s/g, "");
    },
});

$('#colorscode').on({
    keydown: function(e) {
        if (e.which === 32) {
            return false;
        }
    },
    change: function () {
        this.value = this.value.replace(/\s/g, "");
    },
});

$('#sizes').on({
    keydown: function(e) {
        if (e.which === 32) {
            return false;
        }
    },
    change: function () {
        this.value = this.value.replace(/\s/g, "");
    },
});

$('#sizesinfo').on({
    keydown: function(e) {
        if (e.which === 32) {
            return false;
        }
    },
    change: function () {
        this.value = this.value.replace(/\s/g, "");
    },
});

// eslint-disable-next-line no-unused-vars
function addVariants() {
    if ( $('#colors').val().split(',').length !== $('#colorscode').val().split(',').length ||
    $('#sizes').val().split(',').length !== $('#sizesinfo').val().split(',').length) {
        alert('plz make sure colors or sizes info in pair');
    } else {
        // Insert guide text
        const guideDiv = document.getElementById('variantsLabel');
        guideDiv.textContent = '請輸入庫存量';

        // const colorsInput = document.getElementById('colors');
        // const colorsText = colorsInput.value;
        // let colors = colorsText.split(',');

        // get color input
        const colorsInput = document.getElementById('colors');
        const colorsText = colorsInput.value;
        const colors = colorsText.split(',');

        // get colorcode input
        const colorscodeInput = document.getElementById('colorscode');
        const colorscodeText = colorscodeInput.value;
        const colorscode = colorscodeText.split(',');

        // get size input
        const sizesInput = document.getElementById('sizes');
        const sizesText = sizesInput.value;
        const sizes = sizesText.split(',');

        // add new varient
        // color
        for (let i = 0; i < colors.length; i++) {
            // size
            for (let j = 0; j < sizes.length; j++) {
                // create new variant div
                const totalvariants = document.getElementById('totalvariants');
                const div = document.createElement('div');
                divInnerHTML =
                    `<br>
                <div class="onevariants" id="onevariants${counter}">
                <label>Color : </label><input name="variants_color${counter}" class="variants_color" id="variants_color${counter}" value=""  readonly><br>
                <label>Colorcode : </label><input name="variants_colorcode${counter}" class="variants_colorcode" id="variants_colorcode${counter}" value=""  readonly><br>
                <label>Size : </label><input name="variants_size${counter}" id="variants_size${counter}" class="variants_size"  value="" readonly><br>
                <label>Stock : </label><input type="number" name="variants_stock${counter}" min="0" id="variants_stock${counter}" value="0" required><br></div>`;
                div.innerHTML = divInnerHTML;
                totalvariants.appendChild(div);

                // select variants_color array
                const variantsColor = document.querySelectorAll('.variants_color');
                const variantsColorcode = document.querySelectorAll('.variants_colorcode');
                const variantsSize = document.querySelectorAll('.variants_size');
                // clear color options
                variantsColor[counter].value = colors[i];
                variantsColorcode[counter].value = colorscode[i];
                variantsSize[counter].value = sizes[j];

                // prepare for next varient
                counter++;
            }
        }
        document.getElementById('addVariantsButton').style.display = 'none';
        document.getElementById('submitButton').style.display = '';
    }
};
