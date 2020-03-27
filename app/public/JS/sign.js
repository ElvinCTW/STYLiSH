/* eslint-disable max-len */
/* eslint-disable no-var */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable one-var */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
if (!localStorage.getItem('stylish_token')) {
    // // No token, call userSign API
    // window.fbAsyncInit = function () {
    //     FB.init({
    //         appId: 1195236887352902, // 填入 FB APP ID
    //         cookie: true,
    //         xfbml: true,
    //         version: 'v5.0',
    //     });

    //     FB.getLoginStatus(function (response) {
    //         statusChangeCallback(response);
    //     });
    // };

    // // 處理各種登入身份
    // function statusChangeCallback(response) {
    //     console.log(response);
    //     var target = document.getElementById('FB_STATUS_1'),
    //         html = '';

    //     // Send data to express
    //     const FB_token_input_DOM = document.getElementById('FB_token');
    //     FB_token_input_DOM.value = response.authResponse.accessToken;
    //     document.forms['FB_form'].submit();

    //     // 登入 FB 且已加入會員
    //     if (response.status === 'connected') {
    //         html = '已登入 FB';
    //     }
    // }
    // function checkLoginState() {
    //     FB.getLoginStatus(function (response) {
    //         statusChangeCallback(response);
    //     });
    // }

    // // 載入 FB SDK
    // (function (d, s, id) {
    //     var js, fjs = d.getElementsByTagName(s)[0];
    //     if (d.getElementById(id)) return;
    //     js = d.createElement(s);
    //     js.id = id;
    //     js.src = 'https://connect.facebook.net/zh_TW/sdk.js';
    //     fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));

    // Switch function components
    const switchBtn = document.getElementById('switchBtn');
    const signupBtn = document.getElementById('signup-btn');
    const signinBtn = document.getElementById('signin-btn');
    const signupDiv = document.getElementById('div-for-signup');
    const header = document.getElementsByTagName('h1')[0];
    let signInstate = true;

    // Switch sign-in / sign-up function
    function signSwitch() {
        if (signInstate === true) {
            signupDiv.style.display = '';
            signupBtn.style.display = '';
            signinBtn.style.display = 'none';
            signInstate = false;
            switchBtn.textContent = '登入點這裡';
            header.textContent = '你是不是想註冊';
        } else {
            signupDiv.style.display = 'none';
            signupBtn.style.display = 'none';
            signinBtn.style.display = '';
            signInstate = true;
            switchBtn.textContent = '註冊點這裡';
            header.textContent = '你是不是想登入';
        }
    }

    // Set Sign-up and Sign-in function
    // jQuery ajax get user profile json
    $('#signin-btn').click(function() {
        // Set post object
        let signObject = {
            provider: 'native',
            email: $('#email').val(),
            password: $('#password').val(),
        };

        // Get signin sendback data from API
        $.ajax({
            url: '/api/V1.0/user/signin',
            type: 'post',
            data: JSON.stringify(signObject),
            headers: {
                'Content-Type': 'application/json',
            },
            dataType: 'json',
            success: function(sendbackJSON) {
                console.log(sendbackJSON);
                localStorage.setItem('stylish_token', sendbackJSON.data.access_token);
                console.log(localStorage.getItem('stylish_token'));
                // Change to profile page
                window.location.assign('/profile.html');
            },
            error: (err)=>{
                header.textContent = err.responseJSON.errorMessage;
            },
        });
    });

    $('#signup-btn').click(function() {
        // Set post object
        let signObject = {
            name: $('#name').val(),
            email: $('#email').val(),
            password: $('#password').val(),
        };

        // Get signup sendback data from API
        $.ajax({
            url: '/api/V1.0/user/signup',
            type: 'post',
            data: JSON.stringify(signObject),
            headers: {
                'Content-Type': 'application/json',
            },
            dataType: 'json',
            success: function(sendbackJSON) {
                localStorage.setItem('stylish_token', sendbackJSON.data.access_token);
                // Change to profile page
                window.location.assign('/profile.html');
            },
            error: (err)=>{
                header.textContent = err.responseJSON.errorMessage;
            },
        });
    });
} else {
    // Already have token, kick user to profile.html
    window.location.assign('/profile.html');
}
