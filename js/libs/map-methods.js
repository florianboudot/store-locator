var mapMethods = (function () {
    "use strict";

    var Mylib = function (map) {

        // set view to
        var setView2 = function (coords, zoom, options = {}) {
            map.setView(coords, zoom, options); // mapbox
        };

        // export
        this.setView2 = setView2;
    };

    return Mylib;
    // usage
    // var lol = new Mylib(map);
    // lol.panto();


    // switch lib
    /* var mapping = {
        google: {
            setView: 'setView'
        },
        lf: {
            setView: 'goTo'
        }
    };
    myMap = 'google';
    map[mapping[myMap].setView]();*/


})();
export default mapMethods;