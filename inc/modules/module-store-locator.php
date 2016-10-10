<?php $json_url = isset($json_url) ? $json_url : ''; ?>

<?php $lat = isset($_GET['lat']) ? $_GET['lat'] : ''; ?>
<?php $lng = isset($_GET['lng']) ? $_GET['lng'] : ''; ?>



<div id="store-locator-container">
    <div id="sidebar">
        <div id="panel-container">
            <div class="panel panel-1">
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
            </div>

            <div class="panel panel-2">
                <!-- STORES LIST -->
                <div class="gutter-left list-title">
                    <h1 class="txt-title-l-2 txt-title-dashed">
                        Stores close to
                        <span class="city-nearby">
                            &lt;CITY&gt;
                        </span>
                        <span class="list-count color-orange">
                            (x)
                        </span>
                    </h1>
                    <div class="buttons">

                        <button type="button" class="btn btn-medium decli-reverse btn-see-list js-toggle-list-map" data-type="list">
                            show list
                        </button>
                        <button type="button" class="btn btn-medium decli-reverse btn-see-card js-toggle-list-map" data-type="map">
                            show map
                        </button>
                    </div>
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
                    <!-- tpl -->
                </div>
            </div>
        </div>
    </div>

    <!-- template : marker popup -->
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

    <!-- MAP -->
    <div id="map" data-json-url="<?php echo $json_url; ?>" data-coord-lat="<?php echo $lat; ?>" data-coord-lng="<?php echo $lng; ?>"></div>
</div>