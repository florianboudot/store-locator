/**
 * header-manager
 */

var headermanager = (function () {

    var $header;
    var $trigger;
    var $triggerIcon;
    var $body;
    var $blockSearch;
    var $triggerSearch;

    var openState = true;

    const CLASSNAME_OPEN = 'header-open';
    const CLASSNAME_BODY_OPEN = 'header-body-open';
    const CLASSNAME_SUBMENU_BODY_OPEN = 'sub-header-body-open';
    const CLASSNAME_SUBMENU_OPEN = 'sub-header-open';

    var open = function () {
        $header.addClass(CLASSNAME_OPEN);
        $body.addClass(CLASSNAME_BODY_OPEN);
        $triggerIcon.addClass('close');
        openState = true;
        if ($blockSearch.hasClass("active")) {
            $triggerSearch.trigger("click");
        }
    };

    var close = function () {
        $header.removeClass(CLASSNAME_OPEN);
        $body.removeClass(CLASSNAME_BODY_OPEN);
        $triggerIcon.removeClass('close');

        $trigger.trigger('focus');
        openState = false;
        $header.find('.JS_toggler.active').trigger('close');
    };

    var toggle = function () {
        if (openState) {
            close();
        }
        else {
            open();
        }
    };

    var init = function () {
        $body = $('body');
        $header = $('#header');
        $trigger = $header.find('.JS_menu_trigger');
        $triggerIcon = $trigger.find('.js-menu-trigger-ico');
        $triggerSearch = $header.find('.item-search-main');
        $blockSearch = $header.find('.js-search-block');
        openState = $header.hasClass(CLASSNAME_OPEN);
        $trigger.on('click', toggle);

        //todo to refactor: manage the CSSCLASS when sub header is open or not
        var $root = $header.find('.JS_item_toggler[data-toggler-group="header"]');

        // ferme les menus et sous menus au resize
        var TIMEOUTresize = 0;
        let width = $(window).width();
        if (CLASSNAME_SUBMENU_BODY_OPEN) {
            $(window).resize(function () {
                clearTimeout(TIMEOUTresize);
                if (width !== $(window).width()) {
                    width = $(window).width();
                    TIMEOUTresize = setTimeout(close, 100);
                }
            });
        }


        $root.on('open.content close.content', function (e) {
            var isElement = e.currentTarget === e.target;
            isElement && $body.toggleClass(CLASSNAME_SUBMENU_BODY_OPEN, e.type === 'open');
            isElement && $header.toggleClass(CLASSNAME_SUBMENU_OPEN, e.type === 'open');
        })
    };

    return {
        init: init
    }

})();

export default headermanager;