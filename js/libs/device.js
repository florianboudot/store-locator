//until


var bp = {
    mobile: 768,
    tablet: 1024,
    max: 1440
};
let device;

var setDevice = function () {
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
    setDevice.bind(window)();

    let TIMEOUT;
    $(window).on('resize', function () {
        clearTimeout(TIMEOUT);
        TIMEOUT = setTimeout(setDevice.bind(this), 125);
    })

};


export {
    getDevice, 
    init
};

