/**
 * init
 */
var cookies = require("../libs/cookies-manager").default;

var switchView = (function () {

    var init = function () {
        var $root = $(".js-switch-view");
        var $switchMoz = $root.find(".js-switch-moz");
        var $switchList = $root.find(".js-switch-list");
        var $itemSwitch = $root.find(".js-item-switch-view");


        var listLayout = function () {
            $itemSwitch.addClass("filter-by-list");
            $switchList.find('i').addClass('active');
            $switchMoz.find('i').removeClass('active');
            cookies.write('display', 'list');
        };

        var mosaiqueLayout = function () {
            $itemSwitch.removeClass("filter-by-list");
            $switchMoz.find('i').addClass('active');
            $switchList.find('i').removeClass('active');
            cookies.write('display', 'thumbnail');
        };

        $switchMoz.on("click", mosaiqueLayout);
        $switchList.on("click", listLayout);

        // default layout is list
        if(!cookies.read('display')){
            listLayout();
        }
    };

    return {
        init: init
    }

})();

export default switchView;