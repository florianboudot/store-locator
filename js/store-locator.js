var getTpl = require("./libs/get-tpl").default;
var device = require("./libs/device").getDevice;
var ajax = require("./libs/ajax").default;

var mStoreLocator = (function () {
    // SETTINGS
    var $body = $('body');
    var map_id = 'map';
    var isMapPage = false;
    var $map = $('#' + map_id);
    var is_desktop = null;
    var json_url = $map.data('json-url');
    var style_url = 'mapbox://styles/mapbox/streets-v9'; // account 'frontmodem'
    var init_coords = [$map.data('coord-lat'), $map.data('coord-lng')];

    var default_coords = [47.27177506640826, 2.724609375]; // france
    var is_init_coords = init_coords[0] && init_coords[0] != '';
    var coords = is_init_coords ? init_coords : default_coords; // france
    var mapzen_key = 'search-GmnWoUR'; // account 'frontmodem'
    L.mapbox.accessToken = 'pk.eyJ1IjoiZnJvbnRtb2RlbSIsImEiOiJjaW5rZWJhbG4wMDdid2RrbHpobXprMGU4In0.s1setfNbyr3j18SLFSa_kA'; // florian boudot
    var status = {
        markers_in_view: 0,
        markers: [],
        searched_locality: '',
        init_destination: $map.data('destination')
    };

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


    var errorCallback = function (error) {
        if (pm.debug)console.error('error', error);
    };

    // map to my position
    var geolocateMe = function (e) {
        let $btn = $(this);

        var successCallback = function (position) {
            //Bug #53268 add condition to redirect or just setView: HTML must be changed
            if (isMapPage) {
                map.setView({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                ZOOM_LOCATE_ME, {
                    animate: true
                });
                handleListLayout();
            }
            else {
                let $form = $btn.parents('form:first');
                if ($form.length) {
                    $form.find('#lat').val(position.coords.latitude);
                    $form.find('#lng').val(position.coords.longitude);
                    $form.trigger('submit')
                }
                else {
                    console.error('No form found to geolocate');
                }

            }
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        $('.JS_toggler[data-toggler-group="header"]').trigger('close');
        e.preventDefault();
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
        if (pm.debug)console.trace('goToPanel', panel_num, this);
        let $button_clicked;

        if (typeof panel_num != "number") {
            $button_clicked = $(this);
            panel_num = $button_clicked.data('display-panel'); // button "effacer"
        }

        if (panel_num == 1) {
            if ($button_clicked) {
                clearMarker();
            }
            if (!is_desktop) {
                toggleMobileListMap('list');  // on mobile, go to panel 1 remove map #52679
            }
        }
        else if (panel_num == 2) {
            toggleMobileListMap(status.markers_in_view > 0 ? 'list' : 'map');

            $('body').animate({scrollTop: 0}, 500);
        }

        // show panel
        $panel_container.attr('class', 'display-panel-' + panel_num);

        // reset geocoder field
        resetGeoFields();
    };


    // get biggest city by counting occurences
    var getMainCity = function (items) {
        if (pm.debug)console.log('getMainCity');

        var main_city = '';
        var count = 0;
        if (!items) {
            if (status.searched_locality != '') {
                main_city = status.searched_locality;
            }
            else if (status.init_destination != '') {
                main_city = status.init_destination;
            }
        }
        else {
            var citiesCount = {};
            items.forEach(function (store) {
                citiesCount[store.options.city] = (citiesCount[store.options.city] || 0) + 1;
            });
            count = items.length;

            main_city = Object.keys(citiesCount).sort(function (a, b) {
                return citiesCount[b] - citiesCount[a];
            })[0];
        }
        var plus = count >= MAX_RESULTS ? '+' : '';
        $list_count.html('(' + count + plus + ')');

        // write result
        $city.html(main_city);
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
            is_open && $(this).trigger('open');

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
     * Markers cluster group for each type of place (agences, showrooms)
     * should look like :
     * {
     *     'group-0' : new L.MarkerClusterGroup(...), // agences
     *     'group-1' : new L.MarkerClusterGroup(...)  // showrooms
     * }
     */
    var groups = {};


    var getMarkersInView = function () {
        if (pm.debug)console.info('getMarkersInView');
        var markers = []; // empty
        var limit = 0;
        var home = map.getCenter();
        var bounds = map.getBounds();

        var getDataFromMarker = function (marker) {
            var marker_coords = marker.getLatLng();
            if (bounds.contains(marker_coords) && limit < MAX_RESULTS) {
                marker.options.distance = (home.distanceTo(marker_coords) / 1000).toFixed(1);
                markers.push(marker);
                limit++;
            }
        };

        // todo : time = 1800ms on mobile (380ms on desktop)
        status.markers.forEach(function (markers, index, array) {
            if (index == current_group || current_group == 'all') {
                markers.forEach(getDataFromMarker);
            }
        });

        status.markers_in_view = markers.length;

        // reset limit
        limit = 0;
        return markers;
    };


    /**
     * buildListItems
     * @param {Object} params
     */
    var buildListFromMarkersInView = function (params = {}) {
        if (pm.debug)console.trace('buildListFromMarkersInView', params, is_desktop);

        var action = params.action || null;

        // reset
        list_container.innerHTML = '';
        active_marker = null;

        var stores_in_view = getMarkersInView();
        var is_results = stores_in_view.length > 0;

        if (is_results) {
            if (pm.debug)console.log('buildListFromMarkersInView has results');

            if (is_desktop && action === 'move' || !is_desktop && action !== 'move') {
                goToPanel(2);
            }

            // sort items
            stores_in_view.sort(function (a, b) {
                return a.options.distance - b.options.distance;
            });

            // update list items
            stores_in_view.forEach(buildHtmlItem);
            scrollListToActiveItem();
            getMainCity(stores_in_view);
        }
        else {
            if (pm.debug)console.log('buildListFromMarkersInView has no results');

            is_desktop ? goToPanel(1) : goToPanel(2);
            getMainCity();
        }

        return is_results;
    };

    // list all visible markers
    var handleListLayout = function (param) {
        if (pm.debug)console.trace('handleListLayout');

        if (!list_container) {
            return;
        }
        if (map.getZoom() >= ZOOM_TO_BUILD_LIST || is_page_showrooms) {
            buildListFromMarkersInView(param);
        }
        else if (is_desktop) {
            list_container.innerHTML = 'aucun résultat';
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

    var markerClick = function (marker) {
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
            buildListFromMarkersInView();
        }
        else {
            $list_item.one('transitionend', scrollListToActiveItem);
            $list_item.addClass('active');
            $list_item.trigger('open');
        }
    };


    var filters = null;
    var convertMarkerOptions = function (data, id) {
        var opt = {};

        opt.id = id;
        opt.lat = data.lat.toString().replace(',', '.'); // todo cleanup json instead
        opt.lng = data.lng.toString().replace(',', '.');

        opt.title = data.name;
        opt.zip = data.cp;
        opt.city = data.city;

        var address1_val = data.add_1 != 0 && data.add_1 != undefined ? data.add_1.toString() : '';
        opt.address1 = address1_val != '' ? `<span class="txt address address1">${address1_val}</span>` : '';
        var address2_val = data.add_2 != 0 && data.add_1 != undefined ? data.add_2.toString() : '';
        opt.address2 = address2_val != '' ? `<span class="txt address address2">${address2_val}</span>` : '';

        var type = data.place_type;  // "0" = showroom, "1" = agence
        var is_showroom_or_agence = type != undefined;
        var type_class = is_showroom_or_agence ? 'group-' + type : 'rien';  // "0" = showroom, "1" = agence
        opt.icon = html_icon(type_class);

        opt.type = type;

        return opt;
    };


    // add all markers in layer (only once)
    var addMarkers = function (d) {
        if (pm.debug)console.log('addMarkers');
        var is_chantiers_clients = d[0].items !== undefined; // page je m'inspire
        var data = d[0].items ? d[0].items : d;
        filters = is_chantiers_clients ? d[0].index.filters : null;

        for (var i = 0, data_length = data.length; i < data_length; i++) {
            // create marker
            var mk_options = convertMarkerOptions(data[i], i);
            var marker = L.marker(L.latLng(mk_options.lat, mk_options.lng), mk_options);

            // bind popup content
            var popup_content = getTpl(mk_options, is_chantiers_clients ? 'marker-chantiers-clients-popup-content' : 'marker-popup-content');
            marker.bindPopup(popup_content);

            // bind click on marker
            marker.on('click', markerClick);

            // store markers by group
            var index = mk_options.type || '0';
            status.markers[index] = status.markers[index] || [];
            status.markers[index].push(marker);
        }

        // insert markers into clustergroups
        for (var j = 0, nb_groups = status.markers.length; j < nb_groups; j++) {
            var group_id = 'group-' + j;
            var classname = nb_groups == 1 ? 'no-class' : group_id;

            // create group if does no exists
            groups[group_id] = groups[group_id] || makeGroup(classname);

            // insert all markers into clustergroup
            groups[group_id].addLayers(status.markers[j]);
        }
    };


    var switchMarkers = function () {
        if (pm.debug)console.log('switchMarkers');
        var $bt = $(this);
        var checked_type = $bt.data('place-type');

        if (!$bt.hasClass('active')) {
            current_group = checked_type;
            $filters.removeClass('active');
            $bt.addClass('active');

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
            handleListLayout();
        }
    };

    var onMapMoveEnd = function () {
        if (pm.debug)console.log('MapMoveEnd');
        handleListLayout({action: 'move'});
    };

    var bindMapMove = function () {
        if (pm.debug)console.log('bindMapMove');
        map.on('moveend', onMapMoveEnd); // 'zoomend' will trigger 'moveend'
    };
    var unbindMapMove = function () {
        if (pm.debug)console.log('unbindMapMove');
        map.off('moveend', onMapMoveEnd);
    };

    var toggleMobileListMapCtrl = function () {
        let list = $(this).data('type');
        toggleMobileListMap(list);
    };

    var toggleMobileListMap = function (force) {
        if (pm.debug)console.log('toggleMobileListMap', force);

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

    var locationHighlighted = function (obj) {
        map.setView(obj.latlng, ZOOM_LOCATE_ME - 2, {animate: true}); // zoom to
    };

    var locationSelected = function (obj) {
        if (pm.debug)console.log('locationSelected', obj);
        if (obj.target) {
            geomarker = obj.target.marker;
            map.closePopup();
        }

        if (obj.feature) { // if selected in autocomplete list
            status.searched_locality = obj.feature.properties.name;
        }

        //if we have an input or the event containing an input
        let $form = this.tagName === 'INPUT' ? $(this) : $(this._input).parents('form:first');

        //if we have a form we submit it
        if ($form.length) {
            $form.submit();
        }

        //if we already are on the storeloc page
        if (list_container) {
            // zoom to selected result
            map.setView(obj.latlng, ZOOM_LOCATE_ME, {animate: is_desktop});
            buildListFromMarkersInView();
            goToPanel(2);
        }
    };

    var buildGeocoder = function (i, o) {// geocoder
        // mapzen documentation :  https://mapzen.com/documentation/search/search/
        var $geocoder_div = $(o);
        var $form = $geocoder_div.parents('form').first();//todo proper way to target form
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
            layers: 'locality', // 'locality,address'
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
                    $('#header .JS_menu_trigger').trigger('close.menu');
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
            var is_list_item_highlighted = $('.leaflet-pelias-selected').length;
            var is_enter_key = e.keyCode == 13;

            if (first_result[i] && is_enter_key && !is_list_item_highlighted) {// 13 = enter
                var coordinates = first_result[i].geometry.coordinates; // array
                status.searched_locality = first_result[i].properties.name; // city name to display if no results

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
        if ($btn_locate_me.length > 0) {
            if ("geolocation" in navigator) {
                $btn_locate_me.on('click', geolocateMe);
            }
            else {
                $btn_locate_me.hide();
            }
        }
    };

    /**
     * init
     */
    var init = function () {
        is_desktop = /d/.test(device());
        if (document.querySelector('#' + map_id)) {
            isMapPage = true;

            // init map (mapbox is build on top of leaflet)
            map = L.mapbox.map(map_id);


            // set max zoom
            var max_zoom = $('#' + map_id).data('max-zoom');
            if (max_zoom) {
                map.options.maxZoom = max_zoom;
            }

            // map style
            L.mapbox.styleLayer(style_url).addTo(map);

            // on map move end
            map.setView(coords, ZOOM_DEFAULT);

            $list_container.on('mouseenter', unbindMapMove).on('mouseleave', bindMapMove);
            bindMapMove();

            // load json
            ajax({
                url: json_url,
                dataType: "json",
                error: handleAjaxError
            }, false)
                .done(addMarkers)
                .then(function () {
                    // bind buttons display panel
                    $body.on('click', '.js-display-panel', goToPanel);

                    // bind buttons (page agences et showrooms)
                    $filters.on('click', switchMarkers);

                    map.on('click', clearActiveMarker);

                    // toggle list map
                    $body.on('click', '.js-toggle-list-map', toggleMobileListMapCtrl);

                    // page showrooms and agences (or DR:directions regionales)
                    let DOMBtnactive = $filters.filter('[data-default-marker]')[0];

                    // first init
                    DOMBtnactive ? switchMarkers.apply(DOMBtnactive) : handleListLayout();
                });
        }
        if ($geocoder_divs.length > 0) {
            map = map || L.mapbox.map('map-fake').setView(coords, ZOOM_DEFAULT);
            // insert geocoder in html (mapzen search)
            $geocoder_divs.each(buildGeocoder);
        }

        // handle geolocation buttons
        geolocationButtons();

        window._map = map;
    };

    return {
        init: init
    }
})();

export default mStoreLocator;