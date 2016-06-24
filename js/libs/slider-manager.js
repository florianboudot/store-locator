/**
 * init
 */
var slidermanager = (function () {

    /*
     *  use data-min-width or data-max-width on .js-slider to active slider only for a breaking point
     *
     * */

    var init = function () {
        var documentWidth = $(document).width();
        $('.js-slider')/*.not('.owl-carousel')*/.each(function (i, o) {
            let $slider = $(o);
            var $sliderItems = $slider.find('.item');
            if ($sliderItems.length > 1) {
                let maxWidth = $slider.data('max-width') || Infinity;
                let minWidth = $slider.data('min-width') || 0;
                if (documentWidth < maxWidth && documentWidth > minWidth) {
                    let sliderWidth = $slider.innerWidth();
                    let itemWidth = $slider.data('slider-itemwidth') || false;
                    let itemCount = $slider.data('slider-items') || 4;
                    if (itemWidth !== false) {
                        $sliderItems.width(Math.ceil(sliderWidth * itemWidth / 100));
                    }
                    let dots = $slider.data('slider-dots');
                    let nav = $slider.data('slider-nav');
                    let autoWidth = $slider.data('slider-autowidth');
                    //addClass only if we init the slider, otherwise, styles are applied and we don't need them
                    $slider.addClass('owl-carousel owl-theme');
                    $slider.owlCarousel({
                        loop: false,
                        margin: 0,
                        nav: nav,
                        dots: dots,
                        dotsEach: 1,
                        navClass: ['pagination prev', 'pagination next'],
                        navElement: 'span',
                        navText: ['<i class="icon-arrow-left thin-icon icon-item"></i><span class="nav-text">précédent</span>', '<span class="nav-text">suivant</span><i class="icon-arrow-right thin-icon icon-item"></i>'],
                        autoWidth: autoWidth,
                        responsive: {
                            0: {
                                items: Math.floor(itemCount / 2)
                            },
                            960: {
                                items: itemCount
                            }
                        }
                    });
                }
            }
        });
    };

    return {
        init: init
    }

})();

export default slidermanager;