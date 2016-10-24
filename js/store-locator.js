var getTpl = require("./libs/get-tpl").default;

var mStoreLocator = (function () {

    // SETTINGS
    var $body = $('body');
    var map_id = 'map';
    var $map = $('#' + map_id);
    var json_url = $map.data('json-url');
    var style_url = 'mapbox://styles/mapbox/streets-v9'; // account 'frontmodem'

    var coords = [48.85997166258356, 2.3411178588867188]; // paris // [47.27177506640826, 2.724609375]; // france
    var mapzen_key = 'search-GmnWoUR'; // account 'frontmodem'
    L.mapbox.accessToken = 'pk.eyJ1IjoiZnJvbnRtb2RlbSIsImEiOiJjaW5rZWJhbG4wMDdid2RrbHpobXprMGU4In0.s1setfNbyr3j18SLFSa_kA'; // florian boudot


    var status = {
        markers_in_view: 0,
        markers: [],
        init_destination: $map.data('destination')
    };

    // DOM elements
    var $filters = $('.js-filter-markers');
    var list_container = document.getElementById('stores-list');
    var $list_container = $(list_container);
    var $geocoder_divs = $('.js-geocoder-search');
    var $sidebar = $('#sidebar');
    var $btn_locate_me = $('.js-locate-me');

    // vars
    var $list_count = $('.list-count');
    var my_geocoder = null; // geocoder field
    var first_result = []; // array of objects
    var geomarker;

    // CONSTANTS
    var MAX_RESULTS = 99;
    var CLUSTER_RADIUS = 55;
    var ZOOM_LOCATE_ME = 13;
    var ZOOM_DEFAULT = 12;
    var ZOOM_TO_BUILD_LIST = 5;
    var ZOOM_DISABLE_CLUSTERS = 10;

    // map
    var map = L.mapbox.map(map_id); // map object
    L.mapbox.styleLayer(style_url).addTo(map); // map style
    map.setView(coords, ZOOM_DEFAULT);// init map position

    window._map = map; // debug

    // custom icon
    var html_icon = function (c) {
        return L.divIcon({
            className: 'marker-default-icon ' + c,
            html: '<div class="inside"><span></span></div><div class="leaflet-marker-shadow"></div>'
        });
    };

    // vars
    var current_group = 'all'; // default



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

    // geolocation error callback
    var errorCallback = function (error) {
        if (pm.debug)console.error('error', error);
    };

    // map to my position
    var geolocateMe = function () {
        resetGeocoder();

        var successCallback = function (position) {
            map.setView({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }, ZOOM_LOCATE_ME, {
                animate: true
            });

            handleListLayout();
        };

        // get position
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    };

    var clearMarker = function () {
        clearActiveMarker();
        map.closePopup();
        if (geomarker) {
            map.removeLayer(geomarker);
            geomarker = null;
        }
    };

    var resetGeocoder = function () {
        my_geocoder.reset();
        clearMarker();
    };

    var clearActiveMarker = function () {
        $list_container.find('.item').removeClass('active');
        $('.selectedMarker').removeClass('selectedMarker');
    };

    var TIMEOUT_OPEN_POPUP = null;
    var TIMEOUT_ACTIVE_MARKER = null;
    var active_marker = null;

    // build html items and insert them
    var buildHtmlItem = function (marker) {
        var item = marker.options;
        var elt = document.createElement('div');
        elt.id = 'item-' + item.id;

        var is_marker_active = $(marker._icon).hasClass('selectedMarker');
        elt.className = is_marker_active ? 'item active' : 'item';
        active_marker = is_marker_active ? marker : active_marker;
        elt.setAttribute('data-distance', item.distance);
        item.distance = item.distance > 0 ? `<span class="txt distance">distance to center : ${item.distance} km</span>` : '';

        var markerOpenPopup = function () {
            clearTimeout(TIMEOUT_OPEN_POPUP);
            clearTimeout(TIMEOUT_ACTIVE_MARKER);
            TIMEOUT_OPEN_POPUP = setTimeout(function () {
                if (!marker.getPopup()._isOpen) {
                    marker.openPopup();
                }
            }, 150);
        };

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

            // map to marker
            map.setView(marker.getLatLng(), ZOOM_LOCATE_ME, {animate: true});
        });

        $(elt).on('mouseenter', markerOpenPopup);

        $(elt).on('mouseleave', function () {
            // show active marker popup
            clearTimeout(TIMEOUT_OPEN_POPUP);
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


    var countListItems = function (items) {
        var count = items.length || 'none';
        var plus = count >= MAX_RESULTS ? '+' : '';
        $list_count.html('(' + count + plus + ')');
    };

    /**
     * buildListFromMarkersInView
     */
    var buildListFromMarkersInView = function () {
        if (pm.debug)console.trace('buildListFromMarkersInView');

        // reset
        list_container.innerHTML = '';
        active_marker = null;

        var stores_in_view = getMarkersInView();
        var is_results = stores_in_view.length > 0;

        if (is_results) {
            if (pm.debug)console.log('buildListFromMarkersInView has results');

            // sort items by distance
            stores_in_view.sort(function (a, b) {
                return a.options.distance - b.options.distance;
            });

            // update list items
            stores_in_view.forEach(buildHtmlItem);
            scrollListToActiveItem();
        }

        countListItems(stores_in_view);

        return is_results;
    };

    // list all visible markers
    var handleListLayout = function (param) {
        if (pm.debug)console.trace('handleListLayout');

        if (map.getZoom() >= ZOOM_TO_BUILD_LIST) {
            buildListFromMarkersInView(param);
        }
        else {
            list_container.innerHTML = 'aucun résultat';
            countListItems([]);
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
        opt.lat = data.lat;
        opt.lng = data.lng;

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
        var data = d[0].items ? d[0].items : d;
        filters = null;

        for (var i = 0, data_length = data.length; i < data_length; i++) {
            // create marker
            var mk_options = convertMarkerOptions(data[i], i);
            var marker = L.marker(L.latLng(mk_options.lat, mk_options.lng), mk_options);

            // bind popup content
            var popup_content = getTpl(mk_options, 'marker-popup-content');
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
        handleListLayout();
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

        // zoom to selected result
        map.setView(obj.latlng, ZOOM_LOCATE_ME, {animate: true});
        buildListFromMarkersInView();
    };


    var buildGeocoder = function () {// geocoder
        // mapzen documentation :  https://mapzen.com/documentation/search/search/
        var $geocoder_div = $(this);
        my_geocoder = new L.control.geocoder(mapzen_key, {
            fullWidth: false,
            expanded: true, // width (css)
            params: {
                'boundary.country': 'FRA' // restricts results to FRANCE
            },
            allowSubmit: false,
            layers: 'locality', // 'locality,address'
            focus: true, // prioritizes results near the center of the current view (or another latlng you pass)
            placeholder: $geocoder_div.data('input-placeholder'),
            autocomplete: true
        })
        .on('highlight', locationHighlighted)
        .on('select', locationSelected)
        .on('results', function (e) {
            first_result = e.results.features[0];
        })
        .addTo(map);

        var input = my_geocoder._input;
        $geocoder_div.append(my_geocoder._container);

        $('.js-geocoder-reset').on('click', resetGeocoder);
    };

    /**
     * init
     */
    var init = function () {

        $list_container.on('mouseenter', unbindMapMove).on('mouseleave', bindMapMove);
        bindMapMove();

        // load json
        $.ajax({
                url: json_url,
                dataType: "json"
            }, false)
            .done(addMarkers)
            .then(function () {
                // bind buttons (page agences et showrooms)
                $filters.on('click', switchMarkers);
                map.on('click', clearActiveMarker);
                // toggle list map
                $body.on('click', '.js-toggle-list-map', toggleMobileListMapCtrl);

                handleListLayout();
            });

        $geocoder_divs.each(buildGeocoder);

        // handle geolocation buttons
        geolocationButtons();
    };

    return {
        init: init
    }
})();


export default mStoreLocator;