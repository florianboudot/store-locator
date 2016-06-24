var ajaxload = (function () {
    "use strict";

    var tpl = '<div id="ajaxloader" class="windows8"><div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_6"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_7"><div class="wInnerBall"></div></div></div>';
    var $ajaxloader;
    /*
     */

    var status = 0;

    var show = function () {
        status--;
        $ajaxloader.addClass('ajaxloader-show');
    };
    var hide = function () {
        status++;
        status === 0 && $ajaxloader.removeClass('ajaxloader-show');
    };
    var init = function () {
        document.body.insertAdjacentHTML('beforeend', tpl);
        $ajaxloader = $('#ajaxloader');
    };
    return {
        init: init,
        show: show,
        hide: hide
    }
})();

export default ajaxload;