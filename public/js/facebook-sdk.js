const appId = '329786057958561';
let accessTokenFB = '';
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        console.log(response);
        accessTokenFB = response.authResponse.accessToken;
        statusChangeCallback(response)
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      ,
        cookie     : true,
        xfbml      : true,
        version    : 'v3.3'
    });

    // FB.AppEvents.logPageView();
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        getUser();
        setElement(true);
        console.log('Login and authenticated');
    } else {
        setElement(false);
        console.log('Not authenticated')
    }
}
$('#logout').click(function () {
    FB.logout(function (response) {
        setElement(false);
    });
});

function setElement(isLogin) {
    if (isLogin) {
        $('#login').css({ display: 'none' });
        // $('#profile').css({ display: 'block' });
        $('#logout').css({ display: 'block' });
    } else {
        $('#login').css({ display: 'block' });
        // $('#profile').css({ display: 'none' });
        $('#logout').css({ display: 'none' });
    }
}

function getUser() {
    FB.api('me?fields=id,name,birthday,email', function(data){
        console.log('api fb',response);
    });
}
