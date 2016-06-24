/**
 * init
 */
var select2manager = (function () {

    /*
     *  use data-min-width or data-max-width on .js-slider to active slider only for a breaking point
     *
     * */
    var buildCustomSelect = function () {
        var $select = $(this);
        var placeholder = $select.data('placeholder');
        placeholder = placeholder ? placeholder : 'Type de produit';

        var onChange = function(e) {
            let dataOnchange = $select.data('onchange');
            if(dataOnchange){
                let $input;
                if(dataOnchange == true){
                    $select.parents('form').submit();
                }
                else if($input = $('#' + dataOnchange)){
                    $input.val(this.value).trigger('change');
                }
            }
        };

        $select.select2({
            minimumResultsForSearch: Infinity,
            placeholder: placeholder
        }).on("change", onChange);
    };


    var init = function () {
        $('.js-select2').each(buildCustomSelect);
    };

    return {
        init: init
    }

})();

export default select2manager;