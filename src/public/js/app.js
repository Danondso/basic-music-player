function scrollPanelRight(element) {
    $(element).animate({
        scrollLeft: '+=600'
    }, 500);
};

function scrollPanelLeft(element) {
    $(element).animate({
        scrollLeft: '-=600'
    }, 500);
};

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}