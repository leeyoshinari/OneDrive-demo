const server = '/mycloud';
localStorage.setItem('server', server);
function change_language(flag) {
    if (flag === 0){
        lang = $('#loginback>div>select')[0].value;
    } else {
        lang = $('#win-setting>.page>.appearance>.setting-list>.lang>select')[0].value;
    }
    localStorage.setItem('lang', lang);
    fetch(`language/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            i18next.addResourceBundle(lang, 'translation', data, true);
            i18next.changeLanguage(lang, function (){window.location.reload();})
    });
}
function get_status() {
    $.ajax({
        type: 'GET',
        async: false,
        url: server + '/user/status',
        success: function (data) {
            if (data['code'] === 0) {
                $('#loginback').css('opacity', '0');
                $('#loginback').css('display', 'none');
                $('#dock-box').css('display', 'flex');
                $('#desktop').css('display', 'flex');
                document.body.style.backgroundImage = 'url("img/pictures/' + document.cookie.split('u=')[1].split(';')[0] + '/background.jpg")';
            } else {
                $('#loginback').css('opacity', '0');
                $('#loginback').css('display', 'none');
                $('#dock-box').css('display', 'flex');
                $('#desktop').css('display', 'flex');
                document.body.style.backgroundImage = 'url("img/pictures/undefined/background.jpg")';
            }
        },
        error: function (xhr, status, msg) {
            console.error(msg);
            $('#loginback').css('opacity', '0');
            $('#loginback').css('display', 'none');
            $('#dock-box').css('display', 'flex');
            $('#desktop').css('display', 'flex');
            document.body.style.backgroundImage = 'url("img/pictures/undefined/background.jpg")';
        }
    })
}
