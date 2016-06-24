var getTpl = require("./libs/get-tpl").default;
var device = require("./base/basics").getDevice;


var mStoreLocator = (function () {
    // SETTINGS
    var map_id = 'map';
    var $map = $('#' + map_id);
    var json_url = $map.data('json-url');
    var style_url = 'mapbox://styles/frontmodem/cinkehgzt0250d5m3t26y6q8u'; // account 'frontmodem' // todo change mapzen account to mine
    var init_coords = [$map.data('coord-lat'), $map.data('coord-lng')];
    var default_coords = [47.27177506640826, 2.724609375]; // france
    var is_init_coords = init_coords[0] && init_coords[0] != '';
    var coords = is_init_coords ? init_coords : default_coords; // france
    var mapzen_key = 'search-GmnWoUR'; // account 'frontmodem'
    L.mapbox.accessToken = 'pk.eyJ1IjoiZnJvbnRtb2RlbSIsImEiOiJjaW5rZWJhbG4wMDdid2RrbHpobXprMGU4In0.s1setfNbyr3j18SLFSa_kA'; // florian boudot // todo change mapbox account to mine

    // DOM elements
    var $filters = $('.js-filter-markers');
    var list_container = document.getElementById('stores-list');
    var $list_container = $(list_container);
    var $geocoder_divs = $('.js-geocoder-search');
    var $panel_container = $('#panel-container');
    var $sidebar = $('#sidebar');
    var $btn_locate_me = $('.js-locate-me');
    var $city = $('.city-nearby');
    var $store_container = $('#store-locator-container');

    // vars
    var addMarkers;
    var $list_count = $('.list-count');
    var is_page_showrooms = $store_container.hasClass('page-showrooms');
    var my_geocoder = []; // geocoder fields
    var first_result = []; // array of objects
    var geomarker;

    // CONSTANTS
    var MAX_RESULTS = 99;
    var CLUSTER_RADIUS = 55;
    var ZOOM_LOCATE_ME = 13;
    var ZOOM_DEFAULT = is_init_coords ? ZOOM_LOCATE_ME : 5;
    var ZOOM_TO_BUILD_LIST = 10;
    var ZOOM_DISABLE_CLUSTERS = is_page_showrooms ? ZOOM_DEFAULT : ZOOM_TO_BUILD_LIST;

    // custom icon
    var html_icon = function (c) {
        return L.divIcon({
            className: 'marker-default-icon ' + c,
            html: '<div class="inside"><span></span></div><div class="leaflet-marker-shadow"></div>'
        });
    };

    // vars
    var current_group = 'all'; // default
    var map = null; // map obj

    /**
     * handle ajax error
     * @param jqXHR
     * @param exception
     */
    var handleAjaxError = function (jqXHR, exception) {
        var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'json not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        alert(msg);
    };

    // map to my position
    var geolocateMe = function (e) {
        var successCallback = function (position) {

            // set view
            map.setView({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                ZOOM_LOCATE_ME, {
                    animate: true
                });
        };

        var errorCallback = function (error) {
            if (pm.debug)console.error('error', error);
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        $('.JS_toggler[data-toggler-group="header"]').trigger('close');
        e.preventDefault();
    };

    var locationHighlighted = function (obj) {
        map.setView(obj.latlng, ZOOM_LOCATE_ME - 2, {animate: true}); // zoom to
    };

    var locationSelected = function (obj) {
        if (obj.target) {
            geomarker = obj.target.marker;
            map.closePopup();
        }

        let $form;
        //if we have an input or the event containing an input
        if (this.tagName === 'INPUT') {
            $form = $(this);
        }
        else {
            $form = $(this._input).parents('form:first');
        }
        //if we have a form we submit it
        if ($form.length) {
            $form.submit();
        }
        //if we are on the storeloc
        if (list_container) {
            // zoom to selected result
            map.setView(obj.latlng, ZOOM_LOCATE_ME, {animate: /d/.test(device())});
            buildListItems();
            goToPanel(2);
        }
    };

    var clearMarker = function () {
        clearActiveMarker();
        map.closePopup();
        if (geomarker) {
            map.removeLayer(geomarker);
            geomarker = null;
        }
    };

    var resetGeoFields = function () {
        if (my_geocoder.length > 0) {
            for (var i = 0; i < my_geocoder.length; i++) {
                my_geocoder[i]._input.value = '';
                my_geocoder[i]._results.style.display = 'none';
                my_geocoder[i]._results.innerHTML = '';
                L.DomUtil.addClass(my_geocoder[i]._reset, 'leaflet-pelias-hidden');
            }
        }
    };

    /**
     * goToPanel (sidebar)
     * @param panel_num
     * usage : <button class="js-display-panel" data-display-panel="1"></button>
     */
    var goToPanel = function (panel_num) {
        let $button_clicked;
        if (typeof panel_num != "number") {
            $button_clicked = $(this);
            panel_num = $button_clicked.data('display-panel');
        }
        if (panel_num == 1) {
            if ($button_clicked) {
                clearMarker();
            }
        }
        else if (panel_num == 2) {
            if (!is_page_showrooms) {
                toggleMobileListMap('list');
            }

            $('body').animate({scrollTop: 0}, 500);
        }
        $panel_container.attr('class', 'display-panel-' + panel_num);

        // reset geocoder field
        resetGeoFields();
    };


    // get biggest city by counting occurences
    var getMainCity = function (items) {
        var citiesCount = {};
        items.forEach(function (store) {
            citiesCount[store.options.city] = (citiesCount[store.options.city] || 0) + 1;
        });
        var count = items.length;

        var main_city = Object.keys(citiesCount).sort(function (a, b) {
            return citiesCount[b] - citiesCount[a];
        })[0];

        // write result
        $city.html(main_city);
        var plus = count >= MAX_RESULTS ? '+' : '';
        $list_count.html('(' + count + plus + ')');
    };

    var clearActiveMarker = function () {
        $list_container.find('.item').removeClass('active');
        $('.selectedMarker').removeClass('selectedMarker');
    };

    var TIMEOUT = null;
    var TIMEOUT_ACTIVE_MARKER = null;
    var active_marker = null;

    // build html items and insert them
    var buildHtmlItem = function (marker) {
        var item = marker.options;
        var is_type = item.type != undefined;
        var elt = document.createElement('div');
        elt.id = 'item-' + item.id;
        var is_marker_active = $(marker._icon).hasClass('selectedMarker');

        elt.className = is_marker_active ? 'item active' : 'item';
        elt.className += is_type ? ' always-open' : '';
        active_marker = is_marker_active ? marker : active_marker;
        elt.setAttribute('data-distance', item.distance);
        item.distance = item.distance > 0 && !is_type ? `<span class="txt distance">(${item.distance} km)</span>` : '';
        item.type = is_type ? (item.type == '0' ? 'showroom' : 'agence') : undefined;

        // template html
        elt.innerHTML = getTpl(item, 'tpl-list-item');

        // on click pan to
        $(elt).on('click', function () {
            var is_open = !$(this).hasClass('active');
            clearActiveMarker();
            $(marker._icon).addClass('selectedMarker');
            active_marker = marker;

            // open / close item
            $(this).toggleClass('active', is_open);
            map.setView(marker.getLatLng(), ZOOM_LOCATE_ME, {animate: true});
        });

        $(elt).on('mouseenter', function () {
            clearTimeout(TIMEOUT);
            clearTimeout(TIMEOUT_ACTIVE_MARKER);
            TIMEOUT = setTimeout(function () {
                if (!marker.getPopup()._isOpen) {
                    marker.openPopup();
                }
            }, 150);
        });

        $(elt).on('mouseleave', function () {
            clearTimeout(TIMEOUT);
            if (marker.getPopup()._isOpen && !$(this).hasClass('active')) {
                marker.closePopup();
            }
            if (active_marker) {
                clearTimeout(TIMEOUT_ACTIVE_MARKER);
                TIMEOUT_ACTIVE_MARKER = setTimeout(function () {
                    active_marker.openPopup();
                }, 150)
            }
        });

        // insert this html element
        list_container.appendChild(elt);
    };

    var scrollListToActiveItem = function () {
        var $active = $list_container.find('.item.active');
        var is_active_item = $active.length > 0;
        var pos = is_active_item ? $active.offset().top - $list_container.offset().top + $list_container.scrollTop() : 0;
        $list_container.animate({scrollTop: pos}, 250);

        if (!is_active_item) {
            clearActiveMarker();
        }
    };

    /**
     *
     * @param {Object} params
     */
    var buildListItems = function (params) {
        var options = params || {};
        var action = options.action || null;
        list_container.innerHTML = '';
        active_marker = null; // reset
        var store_items = []; // empty
        var bounds = map.getBounds();
        var home = map.getCenter();
        var limit = 0;
        var getDataFromMarker = function (marker) {
            var marker_coords = marker.getLatLng();
            if (bounds.contains(marker_coords) && limit < MAX_RESULTS) {
                marker.options.distance = (home.distanceTo(marker_coords) / 1000).toFixed(1);
                store_items.push(marker);
                limit++;
            }
        };
        for (var layer in groups) {
            if (groups.hasOwnProperty(layer)) {
                if (layer == 'group-' + current_group || current_group == 'all') {
                    groups[layer].eachLayer(getDataFromMarker);
                }
            }
        }

        if (store_items.length > 0) {
            if (/d/.test(device()) && action === 'move') {
                goToPanel(2);
            }
            // sort items
            store_items.sort(function (a, b) {
                return a.options.distance - b.options.distance;
            });
            // insert items
            store_items.forEach(buildHtmlItem);
            // back to top
            scrollListToActiveItem();
        }
        else {
            /d/.test(device()) && goToPanel(1); // todo : check if markers in view first
        }
        // display main city
        getMainCity(store_items);
        // reset limit
        limit = 0;
    };
    /**
     * Markers cluster group for each type of place (agences, showrooms)
     * should look like :
     * {
     *     'group-0' : new L.MarkerClusterGroup(...), // agences
     *     'group-1' : new L.MarkerClusterGroup(...)  // showrooms
     * }
     */
    var groups = {};

    // list all visible markers
    var handleListLayout = function (param) {
        if (!list_container) {
            return;
        }
        if (map.getZoom() >= ZOOM_TO_BUILD_LIST || is_page_showrooms) {
            buildListItems(param);
        }
        else {
            list_container.innerHTML = 'vide';
            goToPanel(1);
        }
    };


    var makeGroup = function (classname) {
        return new L.MarkerClusterGroup({
            showCoverageOnHover: false, // show polygon
            disableClusteringAtZoom: ZOOM_DISABLE_CLUSTERS,
            maxClusterRadius: CLUSTER_RADIUS,
            iconCreateFunction: function (cluster) {
                var childCount = cluster.getChildCount();

                var c = ' marker-cluster-';
                if (childCount < 10) {
                    c += 'small';
                } else if (childCount < 100) {
                    c += 'medium';
                } else {
                    c += 'large';
                }
                c += ' ' + classname;

                return new L.DivIcon({
                    html: '<div class="inside"><span>' + childCount + '</span></div><div class="leaflet-marker-shadow"></div>',
                    className: 'marker-cluster' + c
                });
            },
            chunkedLoading: true
        }).addTo(map);
    };

    // add all markers in layer
    addMarkers = function (data) {
        var data_length = data.length;
        var array_of_markers = [];

        for (var i = 0; i < data_length; i++) {
            var a = data[i]; // {"company_name": "TRUC ELECTRIC", "long": 5.404651, "lat": 43.2750209}
            var type = a.place_type;  // "0" = showroom, "1" = agence
            var is_showroom_or_agence = type != undefined;
            var type_class = is_showroom_or_agence ? 'group-' + type : 'rien';  // "0" = showroom, "1" = agence
            var lat = a.lat.toString().replace(',', '.'); // todo cleanup json instead
            var lng = a.lng.toString().replace(',', '.');
            var tel = a.tel == "00 00 00 00 00" || a.tel == 0 ? '' : `<span class="txt tel">tél : ${a.tel}</span>`;
            var fax = a.fax == "00 00 00 00 00" || a.fax == 0 ? '' : `<span class="txt fax">fax : ${a.fax}</span>`;
            var web_url = a.web == 0 ? '' : a.web;
            var web = web_url == '' ? '' : `<a href="http://${web_url}" class="txt web" target="_blank">${web_url}</a>`;
            var address1_val = a.add_1 != 0 ? a.add_1.toString().toLowerCase() : '';
            var address1 = address1_val != '' ? `<span class="txt address address1">${address1_val}</span>` : '';
            var address2_val = a.add_2 != 0 ? a.add_2.toString().toLowerCase() : '';
            var address2 = address2_val != '' ? `<span class="txt address address2">${address2_val}</span>` : '';
            var title = a.name;
            var zip = a.cp;
            var city = a.city;
            var direction = [address1_val, address2_val, zip, city].join(', ');
            // var my_pos = localStorage && localStorage.my_pos ? localStorage.my_pos : '';
            var itinerary_url = 'https://www.google.fr/maps/dir//' + direction;
            var itinerary = is_showroom_or_agence ? '' : `<a href="${itinerary_url}" class="bt-itinerary" target="_blank"><i class="icon-directions icon"></i>Calcul de l'itinéraire</a>`;
            var more = is_showroom_or_agence && type == "0" && web_url != '' ? `<a href="http://${web_url}" class="bt-more btn btn-medium decli-reverse" target="_blank">En savoir +</a>` : '';
            var contact = is_showroom_or_agence ? '<a href="/contact" class="bt-contact btn btn-legrand" target="_blank">Contacter</a>' : '';
            var show_map = '<span class="bt-show-map js-toggle-list-map"><i class="icon-localisation icon"></i>Afficher la carte</span>';
            var dept = is_showroom_or_agence && type == "1" && a.dept != undefined && a.dept.length > 0 ? '<span class="dept">Départements : ' + a.dept.join(' - ') + '</span>' : '';

            var mk_options = {
                id: i,
                title: title, // "TRUC ELECTRIC"
                address1: address1,
                address2: address2,
                city: city,
                zip: zip,
                itinerary: itinerary,
                tel: tel,
                fax: fax,
                web: web,
                dept: dept,
                contact: contact,
                show_map: show_map,
                more: more,
                type: type, // "0" = agence, "1" = showroom
                icon: html_icon(type_class)
            };

            var marker = L.marker(L.latLng(lat, lng), mk_options);

            var popup_content = getTpl(mk_options, 'marker-popup-content');
            marker.bindPopup(popup_content);

            marker.on('click', function (marker) {
                clearActiveMarker();
                $(marker.target._icon).addClass('selectedMarker');
                marker.target.openPopup();

                var mk_id = marker.target.options.id;
                var $list_item = $('#item-' + mk_id);

                active_marker = marker.target;
                if (map.getZoom() < ZOOM_TO_BUILD_LIST) {
                    var mk_coords = this.getLatLng();
                    map.setView(mk_coords, ZOOM_TO_BUILD_LIST, {animate: true});
                }
                else if ($list_item.length == 0) {
                    buildListItems();
                }
                else {
                    $list_item.one('transitionend', scrollListToActiveItem);
                    $list_item.addClass('active');
                }
            });
            var index = a.place_type || '0';
            array_of_markers[index] = array_of_markers[index] || [];
            array_of_markers[index].push(marker);
        }

        // insert all markers into clustergroup
        var nb_groups = array_of_markers.length;
        for (var j = 0; j < nb_groups; j++) {
            var group_id = 'group-' + j;
            var classname = nb_groups == 1 ? 'no-class' : group_id;

            // create group if does no exists
            groups[group_id] = groups[group_id] || makeGroup(classname);

            // insert all markers into clustergroup
            groups[group_id].addLayers(array_of_markers[j]);
        }

        // first init
        handleListLayout({action:'move'});
    };


    var switchMarkers = function () {
        var $bt = $(this);
        var checked_type = $bt.data('place-type');

        if (!$bt.hasClass('active')) {
            current_group = checked_type;
            $filters.removeClass('active');
            $bt.addClass('active');

            var is_all = checked_type == 'all';

            for (var layer_name in groups) {
                if (groups.hasOwnProperty(layer_name)) {
                    var has_map_layer = map.hasLayer(groups[layer_name]);
                    if (has_map_layer && (layer_name !== 'group-' + checked_type) && checked_type !== 'all') {
                        map.removeLayer(groups[layer_name]);
                    }
                    else if (!has_map_layer) {
                        map.addLayer(groups[layer_name]);
                    }
                }
            }

            if(is_all && map.getZoom() > ZOOM_DEFAULT){
                map.setView(coords, ZOOM_DEFAULT, {
                    animate: true
                });
            }
            handleListLayout();
        }
    };

    var onMapMoveEnd = function () {
        handleListLayout({action:'move'});
    };

    var bindMapMove = function () {
        map.on('moveend', onMapMoveEnd); // 'zoomend' will trigger 'moveend'
    };
    var unbindMapMove = function () {
        map.off('moveend', onMapMoveEnd);
    };

    var toggleMobileListMapCtrl = function () {
        let list = $(this).data('type');
        toggleMobileListMap(list);
    };

    var toggleMobileListMap = function (force) {
        var is_list_open = !$sidebar.hasClass('active');
        if (typeof force === 'string' && force == 'list') {
            is_list_open = true;
        }
        else if (force === 'map') {
            is_list_open = false;
        }

        $map.toggleClass('mobile-show-map', !is_list_open);
        $sidebar.toggleClass('active', is_list_open);
        $list_container.toggleClass('active', is_list_open);

        $('.btn-see-list').toggleClass('hidden', is_list_open);
        $('.btn-see-card').toggleClass('hidden', !is_list_open);
    };

    var buildGeocoder = function (i, o) {// geocoder
        // mapzen documentation :  https://mapzen.com/documentation/search/search/
        var $geocoder_div = $(o);
        var $form = $geocoder_div.parents('form').first();
        var is_form = $form.length > 0;
        my_geocoder[i] = new L.control.geocoder(mapzen_key, {
            fullWidth: false,
            expanded: true,
            markers: L.icon({
                iconUrl: 'http://nur-antsan.equesto.fr/pm/legrand/html/img/skin/logo-legrand.png',
                iconRetinaUrl: 'http://nur-antsan.equesto.fr/pm/legrand/html/img/skin/logo-legrand.png',
                iconSize: [0, 0], // size of the icon
                shadowSize: [0, 0], // size of the shadow
                iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
                shadowAnchor: [0, 0], // the same for the shadow
                popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor

            }), // add marker for selected result
            country: 'FRA', // restrict results to FRANCE (added by flobou)
            querySize: 80, // number of results in the query (added by flobou)
            resultsSize: 10, // (added by flobou)
            allowSubmit: is_form,
            layers: 'locality,address', // 'locality,address'
            latlng: true,
            placeholder: $geocoder_div.data('input-placeholder'),
            autocomplete: false // if false will use '/search' service url instead of '/autocomplete'
        })
            .on('highlight', locationHighlighted)
            .on('select', locationSelected)
            .on('results', function (e) {
                first_result[i] = e.results.features[0];
            })
            .addTo(map);

        var input = my_geocoder[i]._input;
        var $input = $(input);
        if (is_form) {
            $form.on('submit', function (e) {
                if ($map.length > 0 && !is_page_showrooms) {
                    $('.JS_toggler[data-toggler-group="header"]').trigger('close');
                    e.preventDefault();
                    resetGeoFields();
                    clearMarker();

                }

                if (first_result[i]) {
                    var coordinates = first_result[i].geometry.coordinates; // array
                    $form.find('#lat').val(coordinates[1]);
                    $form.find('#lng').val(coordinates[0]);
                }
            });
        }

        $input.on('keydown', function (e) {
            //todo request results if not displayed (timeout 400ms)
            let _this = this;
            if (first_result[i] && e.keyCode == 13) {// 13 = enter
                var coordinates = first_result[i].geometry.coordinates; // array

                locationSelected.call(_this, {
                    'latlng': {
                        'lat': coordinates[1],
                        'lng': coordinates[0]
                    }
                });
            }
        });

        $input.attr('autocomplete', 'off');

        if ($geocoder_div.data('input-class')) {
            input.className = '';
            $input.addClass($geocoder_div.data('input-class'));
        }
        if ($geocoder_div.data('input-type')) {
            $input.attr('type', $geocoder_div.data('input-type'));
        }
        if ($geocoder_div.data('input-id')) {
            $input.attr('id', $geocoder_div.data('input-id'));
            $input.attr('name', $geocoder_div.data('input-id'));
        }

        $geocoder_div.append(my_geocoder[i]._container);

        // bind/unbind map to allow results list to display panel 2
        $input.on('focus', unbindMapMove).on('blur', bindMapMove);
    };


    var geolocationButtons = function () {
        if ("geolocation" in navigator) {
            $btn_locate_me.on('click', geolocateMe);
        }
        else {
            $btn_locate_me.hide();
        }
    };

    /**
     * init
     */
    var init = function () {
        if (document.querySelector('#' + map_id)) {
            // init map (mapbox is build on top of leaflet)
            map = L.mapbox.map(map_id);
            // window.mapp = map; //uncomment for debug
            // map style
            L.mapbox.styleLayer(style_url).addTo(map);

            // on map move end
            bindMapMove();
            map.setView(coords, ZOOM_DEFAULT);

            $list_container.on('mouseenter', unbindMapMove).on('mouseleave', bindMapMove);

            // load json
            $.ajax({
                url: json_url,
                dataType: "json",
                error: handleAjaxError
            }).done(addMarkers);

            // bind buttons display panel
            $('body').on('click', '.js-display-panel', goToPanel);

            // bind buttons (page agences et showrooms)
            $filters.on('click', switchMarkers);

            // handle geolocation buttons
            geolocationButtons();

            map.on('click', clearActiveMarker);

            // toggle list map
            $('body').on('click', '.js-toggle-list-map', toggleMobileListMapCtrl);
        }
        if ($geocoder_divs.length > 0) {
            map = map || L.mapbox.map('map-fake').setView(coords, ZOOM_DEFAULT);
            // insert geocoder in html (mapzen search)
            $geocoder_divs.each(buildGeocoder);
        }
        window._map = map;
    };

    return {
        init: init
    }
})();

export default mStoreLocator;