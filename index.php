<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Store locator demo</title>
    <link rel="stylesheet" href="styles/all.css">
</head>
<body>

<div class="main-container">

    <!-- STORE LOCATOR -->


    <!-- FILTER MARKERS -->
    <div class="filter-markers">
        <p class="btn-number-product btn btn-medium js-filter-markers bt-filter filter-all active" data-place-type="all">
            all markers
        </p>
        <p class="btn-number-product btn btn-medium js-filter-markers bt-filter filter-agences" data-place-type="1">
            Blue markers
        </p>
        <p class="btn-number-product btn btn-medium js-filter-markers bt-filter filter-showrooms" data-place-type="0">
            Red Markers
        </p>
    </div>


    <!-- coords from url -->
    <?php $lat = isset($_GET['lat']) ? $_GET['lat'] : ''; ?>
    <?php $lng = isset($_GET['lng']) ? $_GET['lng'] : ''; ?>

    <!-- MAP + SIDEBAR -->
    <div id="store-locator-container">
        <div id="sidebar">

            <!-- GEOCODER SEARCH -->
            <div class="locator-block-title find-store">
                <h1 class="txt-title-l-2 txt-title-dashed">
                    Search
                </h1>
                <div class="js-geocoder-search form-item" data-input-placeholder="Saisissez une ville, un CP..."></div>

                <button type="button" class="btn btn-medium js-locate-me">
                    locate me
                </button>

                <button type="button" class="btn btn-medium decli-reverse btn-back js-display-panel" data-display-panel="1">
                    clear
                </button>
            </div>

            <!-- STORES LIST -->
            <div class="gutter-left list-title">
                <h1 class="txt-title-l-2 txt-title-dashed">
                    Stores close to
                                <span class="city-nearby">
                                    &lt;CITY&gt;
                                </span>
                                <span class="list-count">
                                    (x)
                                </span>
                </h1>
            </div>

            <!-- template : list item -->
            <script type="text/template" id="tpl-list-item">
                <div class="infos">
                                <span class="txt title">
                                    {{title}}
                                    {{distance}}
                                </span>
                    {{address1}}
                    {{address2}}
                                <span class="txt city">
                                    {{zip}} {{city}}
                                </span>
                </div>
            </script>

            <div id="stores-list">
                <!-- tpl destination -->
            </div>
        </div>

        <!-- THE MAP -->
        <div id="map"
             data-json-url="json/stores.json"
             data-coord-lat="<?php echo $lat; ?>"
             data-coord-lng="<?php echo $lng; ?>">
        </div>

        <!-- TEMPLATE : POPUP MARKER -->
        <script type="text/template" id="marker-popup-content">
            <div class="js-toggle-list-map" data-type="list">
                <p class="txt title">
                    {{title}}
                </p>
                {{address1}}
                {{address2}}
                            <span class="txt city">
                                {{zip}} {{city}}
                            </span>
            </div>
        </script>
    </div>


</div>


<!-- SCRIPTS -->
<!-- Vendors scripts : copy those files in Gruntfile for production -->
<script type="text/javascript" src="js/vendors/jquery.js"></script>
<script type="text/javascript" src="js/vendors/mapbox.js"></script>
<script type="text/javascript" src="js/vendors/leaflet-geocoder-mapzen.js"></script>
<script type="text/javascript" src="js/vendors/leaflet.markercluster-src.js"></script>

<!-- + compiled -->
<script type="text/javascript" src="scripts/bundle.js"></script>
</body>
</html>
