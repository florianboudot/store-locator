var ajaxloader = require("./ajax-load").default;
var getTpl = require("./get-tpl").default;
/**
 * @param options {object}
 * @param [loader=true] {Boolean}
 */
var ajax = (function () {
    "use strict";

    let onClosePopin = function () {
        $(this).remove();
    };
    var onAlways = function () {
    };
    var onFail = function (jqXHR, textStatus, errorThrown) {
        //NOT FOUND OR METHOD NOT ALLOWED
        let statusCode = jqXHR.status;
        if (!/200|301|400/.test(statusCode)) { //Feature #53538
            let HTMLpopin = getTpl({}, 'tplpopinerror');
            document.body.insertAdjacentHTML('beforeend', HTMLpopin);
            $('#popinerror').one('close.content', onClosePopin)
        }
    };

    return function (options, loader) {
        var _loader = typeof loader === 'undefined' ? true : loader;
        if (_loader) {
            ajaxloader.show();
        }
        return $.ajax(options).always(_loader ? ajaxloader.hide : onAlways).fail(onFail);
    };

})();

export default ajax;