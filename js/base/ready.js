var module_store_locator = require("../store-locator").default;

$(document).on('ready', function () {
    pm.debug && console.log('jquery:document ready');

    module_store_locator.init();

});
