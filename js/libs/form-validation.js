/**
 * formmanager
 */
var formmanager = (function () {

    var $form;

    /**
     * todo @simmar document HTML template mandatory
     * manage form input file
     * @private
     */
    var _manageFormInputFile = function (e) {

        var $inputFile = $(this),
            val = $inputFile.val(),
            valArray = val.split('\\'),
            newVal = valArray[valArray.length - 1],
            $fakeFile = $inputFile.siblings('.file-holder');


        if ($fakeFile.html() == '') {
            $fakeFile.text(newVal);
        }
        else {
            //if click again for the new new val etc..
            $fakeFile.text(newVal);
        }

        if($fakeFile.html() !== ''){
            $(this).parent().addClass('active');
            $(this).parents('.file-wrapper:first').addClass('active');
        }
    };

    var _clearInputFile = function () {

        var $fakeInputFile = $('#fakeInputFile');
        var $wrapperInput = $(this).parent();

        $fakeInputFile.html('');
        $('#inputFileValue').val('');

        if ($wrapperInput.hasClass('active')) {
            $wrapperInput.removeClass('active');
            $(this).parents('.file-wrapper:first').removeClass('active');
        }
    };


    var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var alphaOnlyRegex = /^[-_'àèìòùáéíóúýâêîôûãñõäëïöüŸ¡¿çœßøåæÞþÐða-z\u00E0-\u00FC ]+$/i;
    var alphaNumOnlyRegex = /^[àèìòùáéíóúýâêîôûãñõäëïöüŸ¡¿çœßøåæÞþÐða-z\u00E0-\u00FC0-9 ]+$/i;
    var numberOnlyRegex = /^[0-9]*$/i;
    var phoneFormat = /^0\d{9}$/i; // /^0\d{9}$/i.test('0234567890')
    var phoneFormatMonaco = /^[0-9]*$/i;
    var dateFormat = /^\d\d\/\d\d\/\d\d\d\d$/i;

    var checkEmailValid = function (val) {
        return emailRegex.test(val);
    };
    var checkAlphaOnly = function (val) {
        return alphaOnlyRegex.test(val);
    };
    var checkNumberOnly = function (val) {
        return numberOnlyRegex.test(val);
    };
    var checkAlphaNumberOnly = function (val) {
        return alphaNumOnlyRegex.test(val);
    };
    var checkPhoneFormat = function (val) {
        return phoneFormat.test(val.replace(/\s/g, ''));// oblige de parcourir la chaîne de caracteres jusqa'au bout
    };
    var checkPhoneFormatMonaco = function (val) {
        return phoneFormatMonaco.test(val.replace(/\s/g, ''));// oblige de parcourir la chaîne de caracteres jusqa'au bout
    };
    var checkDateFormat = function (val) {
        return dateFormat.test(val);
    };

    var checkforms = function (e) {
        var error = false;
        var $form = $(this);
        var firstError = false;
        var $formElements = $($form.prop('elements'));
        $formElements.each((i, o) => {
            var $element = $(o); //
            var $formItemParent = $element.parents('.form-item-wrapper:first');
            var $label = $('label[for="' + $element.attr('id') + '"]');
            var elemError = false;
            var errorMessage = '';
            var isRequired = !!$element.attr('required');
            var isEmail = $element.hasClass('js-valid-email');
            var isAlpha = $element.hasClass('js-only-alpha');
            var isAlphaNum = $element.hasClass('js-only-alphanum');
            var isNumber = $element.hasClass('js-only-number');
            var isDateFormat = $element.hasClass('js-only-date');
            var isPhoneFormat = $element.hasClass('js-input-phone');
            var isPhoneFormatMonaco = $element.hasClass('js-input-phone-monaco');
            var value = o.value;
            var isEmpty = value === '';


            if (isAlpha) {
                if (!checkAlphaOnly(value)) {
                    elemError = error = true;
                    errorMessage = $form.data('error-alpha')
                }
            }
            if (isAlphaNum) {
                if (!checkAlphaNumberOnly(value)) {
                    elemError = error = true;
                    errorMessage = $form.data('error-alphanum')
                }
            }
            if (isNumber) {
                if (!checkNumberOnly(value)) {
                    elemError = error = true;
                    errorMessage = $form.data('error-number')
                }
            }
            if (isPhoneFormat) {
                if (!checkPhoneFormat(value)) {
                    elemError = error = true;
                    errorMessage = $form.data('error-phone-format')
                }
            }
            if (isPhoneFormatMonaco) {
                if (!checkPhoneFormatMonaco(value)) {
                    elemError = error = true;
                    errorMessage = $form.data('error-phone-format-monaco')
                }
            }
            if (isDateFormat) {
                if (!checkDateFormat(value)) {
                    elemError = error = true;
                    errorMessage = $form.data('error-date-format')
                }
            }

            if (isRequired) {
                if (isEmpty) {
                    elemError = error = true;
                    errorMessage = $form.data('error-required')
                }
                if (/radio|checkbox/i.test($element[0].type)) {
                    let name = $element.prop('name');
                    let isChecked = $formElements.filter('[name=' + name + ']:checked').length;
                    if (!isChecked) {
                        elemError = error = true;
                        errorMessage = $form.data('error-required')
                    }
                }
            }
            if (isEmail && !isEmpty) {
                var isValidEmail = checkEmailValid(value);
                if (!isValidEmail) {
                    elemError = error = true;
                    errorMessage = $form.data('error-email')
                }
            }
            if (elemError && firstError === false) {
                firstError = true;
                $element.trigger('focus').get(0).scrollIntoView();
                $(window).scrollTop($(window).scrollTop() - $('#header').height());
            }

            $formItemParent.find('.js-form-text-label').html(elemError ? errorMessage : '');
            $label.toggleClass('form-item-error', elemError);

        });

        if (error) {
            $form.find('[type="submit"]').each((i, o) => {
                $('label[for="' + o.id + '"]').toggleClass('form-item-error', error);
            });
            $form.find('.msg-invalid').toggleClass('active');

            e.stopImmediatePropagation(); // kill any other event binding
            return false
        }
    };

    (function ($) {
        $.fn.extend({
            limiter: function (limit, elem) {
                function setCount(src, elem) {
                    var chars = src.value.length;
                    if (chars > limit) {
                        src.value = src.value.substr(0, limit);
                        chars = limit;
                    }
                    elem.html(limit - chars);
                }

                setCount($(this)[0], elem);
            }
        });
    })(jQuery);

    var _limitCharacteres = function () {

        var $textarea = $(this);
        var $maxResult = $($textarea.data('max-result'));
        if ($textarea.length > 0 && $maxResult.length > 0) {
            $textarea.limiter($textarea.data('max-length'), $maxResult);
        }
    };

    var _managePhoneNumber = function (e) {
        var $inputPhone = $(this);
        var phoneValue = $inputPhone.val();
        // add spaces
        phoneValue = phoneValue.replace(/(\d{0,2}(\.\d{1,2})?)/g, "$1 ").trim().replace(/ +/g, ' ');
        // test number
        $inputPhone.val(phoneValue);
        // var $inputPhoneSociete = $('.input-phone-societe');
        // var phoneValueSociete = $inputPhoneSociete.val() || '';
        // phoneValueSociete = phoneValueSociete.replace(/(\d{0,2}(\.\d{1,2})?)/g, "$1 ").trim().replace(/ +/g, ' ');
        // $inputPhoneSociete.val(phoneValueSociete);
        // rules for input monaco
        // var $inputPhoneMonaco = $('.input-phone-monaco');
        // var phoneValueMonaco = $inputPhoneMonaco.val() || '';
        // phoneValueMonaco = phoneValueMonaco.replace(/(\d{0,2}(\.\d{1,2})?)/g, "$1 ").trim().replace(/ +/g, ' ');
        // $inputPhoneMonaco.val(phoneValueMonaco);
    };
    // first letter capitalize
    var _manageCapitalize = function (e) {
        var $this = $(e.currentTarget);
        var inputValue = $this.val();
        var capitalize = inputValue.slice(0, 1).toUpperCase();
        var newInputValue = capitalize + inputValue.slice(1);

        $this.val(newInputValue);
    };


    /**
     * Main init function
     */
    var init = function () {
        $form = $('.js-validateform');
        $form.find('.file-wrapper input').bind('change focus click', _manageFormInputFile);
        $form.find('.JS_reset').bind('click', _clearInputFile);
        $form.find('.js-input-phone').on('input', _managePhoneNumber);
        $form.find('.js-input-phone-monaco').on('input', _managePhoneNumber);
        $form.find('.js-capitalize').on('input', _manageCapitalize);
        $form.find('.js-max-textarea').on('input', _limitCharacteres);
        $form.on('submit', checkforms);

    };
    return {
        init: init
    }

})();

export default formmanager;