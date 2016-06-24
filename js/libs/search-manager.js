/**
 * init
 */
var m73 = require("../modules/m-73").default;

var searchmanager = (function () {

    let $searchInput;
    let $searchBlock;
    let $menuItemLink;
    let $header;
    let $homePart;
    let $searchLine;
    let $mask;
    let isOpen = false;

    const CLASSNAME_ACTIVE = 'active';
    const CLASSNAME_AUTOLOAD = 'js-nav-onload';
    const CLASSNAME_SUBHEADER_OPEN = 'sub-header-open';

    var init = function () {
        $searchInput = $('#search');
        $searchBlock = $('.js-search-block');
        $menuItemLink = $('.search-active-icon');
        $header = $('#header');
        $homePart = $('.home-part');

        $searchLine = $('#search-bar-catalog');
        $mask = $header.find('.mask');
        let isHeaderAutoShow = $searchBlock.hasClass(CLASSNAME_AUTOLOAD);
        if (isHeaderAutoShow) {
            setTimeout(open, 1000);
        }
        $searchInput.on('blur', close);
        $searchBlock.on('open.content close.content', function (e) {
            isOpen = e.type === 'open';
            if (isOpen) {
                bindCloseScroll();
            }
            else {
                setTimeout(function () {
                    $searchInput.trigger('blur');
                }, 0);
            }
        });

        if ($homePart.length) {
            $(window).on('load', function () {
                bindCloseScroll();
                bindScrollTop();
            });
        }
    };

    // we don't use the trigger('open') because that will open the mask
    // we detect that there's
    var open = function () {
        if (!$header.hasClass(CLASSNAME_SUBHEADER_OPEN)) {
            bindCloseScroll();
            $searchBlock.addClass(CLASSNAME_ACTIVE);
            $menuItemLink.addClass(CLASSNAME_ACTIVE);
            isOpen = true;
        }
    };

    var close = function () {
        if (!m73.isopen() && $header.find('input:focus').length === 0) {
            if (isOpen) {
                $mask.trigger('click');
            }
            isOpen = false;
        }
    };
    var closeSearchTimed = function () {
        setTimeout(close, 200);
    };

    var bindCloseScroll = function () {
        unbindCloseScroll();
        $(window).one('scroll', closeSearchTimed);
    };

    var unbindCloseScroll = function () {
        $(window).off('scroll', closeSearchTimed);
    };

    var bindScrollTop = function () {
        var onScrollDetect = function () {
            if ($(this).scrollTop() == 0) {
                open();
            }
        };
        $(window).on('scroll', onScrollDetect);
    };


    return {
        init: init
    }

})();

export default searchmanager;