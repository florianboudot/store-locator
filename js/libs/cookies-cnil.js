/**
 * init
 */
var CookieBanner = require("./cnilkies").default;

var initcookiescnil = (function () {

    var $cookie_bar;
    var $closed_bar;

    var init = function () {
        $cookie_bar = $('#cookie-banner');
        $closed_bar = $('.JS_closed');

        $closed_bar.on('click', function(){
            $cookie_bar.removeClass('show');
        });

        if ($cookie_bar.length > 0) {

            var cookieBanner = new CookieBanner({
                $element: $cookie_bar,
                analytics: true,
                activation: {
                    scroll: false,
                    document_click: false,
                    button: true
                },
                buttonAcceptClass: 'JS_accept_cookies',
                onCookieNotSet: function () {
                    $cookie_bar.addClass('show');
                },
                onAccept: function () {
                    $cookie_bar.removeClass('show');
                }
            });
        }



    };

    return {
        init: init
    };

    //todo CookieBanner is not defined
})();

export default initcookiescnil;