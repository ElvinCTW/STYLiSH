/* eslint-disable camelcase */
/* eslint-disable max-len */
const comeinToken = localStorage.getItem('stylish_token');
if (comeinToken) {
    // If stylish_token existed :
    // Send get profile request ajax to API
    $.ajax({
        url: '/api/V1.0/user/profile',
        type: 'get',
        headers: {
            Authorization: `Bearer ${comeinToken}`,
        },
        success: (sendbackJSON_Profile)=>{
            // Set a variable for render latter
            $('#profile-errorMessage').css('display', 'none');
            $('#clean-token-btn').click(()=>{
                // Clean token in localStorage
                localStorage.removeItem('stylish_token');
                // Set url location again
                window.location.assign('/profile.html');
            });

            // Build Profile Layout
            const user = sendbackJSON_Profile.data;
            const signinMessage = $('<h1></h1>').text('You have signed in');
            const id = $('<p></p>').text('User ID : ' + user.id);
            const provider = $('<p></p>').text('User Provider : ' + user.provider);
            const name = $('<p></p>').text('User Name : ' + user.name);
            const email = $('<p></p>').text('User Email : ' + user.email);

            // Insert
            $('#clean-token-btn').before(signinMessage, id, provider, name, email);
        },
        error: (err)=>{
            $('#profile-errorMessage').text('Can not get profile : ' + err.responseJSON.errorMessage);
            $('#clean-token-btn').click(()=>{
                // Clean token in localStorage
                localStorage.removeItem('stylish_token');
                // Set url location again
                window.location.assign('/profile.html');
            });
        },
    });
} else {
    // No token, kick user to sign.html
    window.location.assign('/user/sign.html');
};
