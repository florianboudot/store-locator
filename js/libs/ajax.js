var ajaxloader = require("./ajax-load").default;
/**
 * @param options {object}
 * @param [loader=true] {Boolean}
 */
var ajax = (function () {
    "use strict";

    var onAlways = function () {
    };
    var onFail = function (jqXHR, textStatus, errorThrown) {
        //NOT FOUND OR METHOD NOT ALLOWED
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