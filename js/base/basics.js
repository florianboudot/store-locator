//until


var bp = {
    mobile: 768,
    tablet: 1024,
    max: 1440
};
let device;

var onresize = function () {
    let width = this.innerWidth;
    if (width <= bp.mobile) {
        device = 'm';
    }
    else if (width <= bp.tablet) {
        device = 't';
    }
    else {
        device = 'd';
    }
};

var getDevice = function () {
    return device;
};

var init = function () {
    let TIMEOUT;
    $(window).on('resize resizeforce', function () {
        clearTimeout(TIMEOUT);
        TIMEOUT = setTimeout(onresize.bind(this), 125);
    }).trigger('resizeforce')

};


export {getDevice, init};

