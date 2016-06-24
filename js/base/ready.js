//var Utilst = require("../libs/utils6");
// var accordion = require("./../libs/accordions").default;
// var header_manager = require("../libs/header-manager").default;
// var search_manager = require("../libs/search-manager").default;
// var slider_manager = require("../libs/slider-manager").default;
// var select2_manager = require("../libs/select2-manager").default;
// var form_validation = require("../libs/form-validation").default;
// var switch_view = require("../libs/switch-view").default;
// var cookies_cnil = require("../libs/cookies-cnil").default;
// var scrollto = require("../libs/scrollto").default;
// var module_newsletter = require("../modules/m-02").default;
// var module_tuto = require("../modules/m-30").default;
// var module_bump = require("../modules/m-11").default;
// var module_texture = require("../modules/m-24").default;
// var module_select_active_btn = require("../modules/m-43").default;
// var module45_chapter_change = require("../modules/m-45").default;
// var module55_rollo_click = require("../modules/m-55").default;
// var module73_suggest = require("../modules/m-73").default;
var module_store_locator = require("../modules/m-store-locator").default;
// var module69_increment = require("../modules/m-69-increment").default;
// var module69_percent = require("../modules/m-69-percent").default;
// var module_last_view = require("../modules/m-last-view-product").default;
// var module_wishlist = require("../modules/m-wishlist-manager").default;
// var filter_navigation = require("../modules/filter-navigation").default;
// var rescroll_input = require("../modules/rescroll-input").default;
// var rescroll_tab = require("../modules/rescroll-tabs").default;
// var device = require("../base/basics");

$(document).on('ready', function () {
    pm.debug && console.log('jquery:document ready');

    // header_manager.init();
    // search_manager.init();
    // slider_manager.init();
    // select2_manager.init();
    // accordion();
    // form_validation.init();
    // switch_view.init();
    // cookies_cnil.init();

/*    var $link = $('[data-scrollto]');
    $link.on('click scrollto', scrollto);*/


    // add data if href and id exist together
   /* var $linkrte = $('.module-rte a.JS_Scrollto');
    $linkrte.each(function () {
        var hrefvalue = this.href.split("#");
        if (hrefvalue[0] == document.location.href && document.getElementById(hrefvalue[1])) {
            $(this).attr('data-scrollto', hrefvalue[1]);
        }
    });
    $linkrte.on('click scrollto', scrollto);*/

    //module
    // module_newsletter.init();
    // module_tuto.init();
    // module_bump.init();
    // module_texture.init();
    // module_select_active_btn.init();
    // module45_chapter_change.init();
    // module55_rollo_click.init();
    // module73_suggest.init();

    module_store_locator.init();

    // module69_increment.init();
    // module69_percent.init();
    // module_last_view.init();
    // module_wishlist.init();
    // filter_navigation.init();
    // rescroll_input.init();
    // rescroll_tab.init();
    // device.init();


});
