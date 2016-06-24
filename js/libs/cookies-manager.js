var cookies = (function () {
    'use strict';

    var get13month = function () {
        var z = new Date();
        var month = z.getMonth() + 1;
        var year = z.getFullYear() + 1;
        if (month > 11) {
            month = 0;
            year++;
        }
        return new Date(year, month, z.getDay(), z.getHours(), z.getMinutes(), z.getSeconds(), z.getMilliseconds());

    };
    // ugly functions to handle cookies taken from: http://www.w3schools.com/js/js_cookies.asp
    // with some improvements: escape/unescape functions changed to encodeURIComponent/decodeURIComponent
    function get(c_name) {
        var i, x, y, ARRcookies = document.cookie.split(';');
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1);
            x = x.replace(/^\s+|\s+$/g, '');
            if (x === c_name) {
                return decodeURIComponent(y);
            }
        }
    }

    function set(c_name, value, exdays) {
        let expire = exdays ? exdays : null;
        var c_value = encodeURIComponent(value) + ((expire === null) ? '' : '; expires=' + expire.toUTCString()) + '; path=/ ; domain =.' + document.location.host;
        document.cookie = c_name + '=' + c_value;
    }

    return {
        read: get,
        write: set
    }

})();

export default cookies;