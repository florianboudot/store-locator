<?php $json_url = isset($json_url) ? $json_url : ''; ?>
<?php $lat = isset($_GET['lat']) ? $_GET['lat'] : ''; ?>
<?php $lng = isset($_GET['lng']) ? $_GET['lng'] : ''; ?>
<?php $search_what = isset($search_what) ? $search_what : 'store'; ?>
<?php $page = isset($page) ? $page : ''; ?>



<div id="store-locator-container" class="page-<?php echo $page; ?>">
    <div id="sidebar" class="<?php echo ($page == 'showrooms') ? 'active' : ''; ?>">
        <div id="panel-container">
            <div class="panel panel-1">
                <!-- GEOCODER SEARCH -->
                <div class="locator-block-title find-store">
                    <h1 class="txt-title-l-2 txt-title-dashed">
                        Rechercher
                    </h1>
                    <div class="js-geocoder-search form-item" data-input-placeholder="Saisissez une ville, un CP..."></div>
                </div>

                <!-- LOCATE ME -->
                <div class="locator-block-title locate-me">
                    <h1 class="txt-title-l-2 txt-title-dashed">
                        Autour de moi
                    </h1>
                    <button type="button" class="btn btn-main btn-locate-me js-locate-me">
                        <i class="icon icon-target thin-icon"></i>
                        me localiser
                    </button>
                </div>
            </div>

            <div class="panel panel-2">
                <!-- STORES LIST -->
                <div class="gutter-left list-title">
                    <?php if($page != 'showrooms'){ ?>
                        <h1 class="txt-title-l-2 txt-title-dashed">
                            Vos <?php echo $search_what; ?>s près de
                            <span class="city-nearby">
                                &lt;VILLE&gt;
                            </span>
                            <span class="list-count color-orange">
                                (x)
                            </span>
                        </h1>
                    <?php } ?>
                    <div class="buttons">
                        <button type="button" class="btn btn-medium decli-reverse btn-locate-me js-locate-me">
                            <i class="icon icon-target"></i>
                            me localiser
                        </button>
                        <button type="button" class="btn btn-medium decli-reverse btn-back js-display-panel" data-display-panel="1">
                            effacer
                        </button>

                        <button type="button" class="btn btn-medium decli-reverse btn-see-list js-toggle-list-map <?php echo $page == 'showrooms' ? 'hidden' : ''; ?>" data-type="list">
                            voir la liste
                        </button>
                        <button type="button" class="btn btn-medium decli-reverse btn-see-card js-toggle-list-map <?php echo $page == 'showrooms' ? '' : 'hidden'; ?>" data-type="map">
                            voir la carte
                        </button>
                    </div>
                </div>

                <!-- template : list item -->
                <script type="text/template" id="tpl-list-item">
                    <div class="logo">
                        <img src="http://dummyimage.com/100x30" alt="{{title}}">
                    </div>
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

                        <div class="more-infos">
                            {{tel}}
                            {{fax}}
                            {{web}}
                            {{dept}}
                            <div class="actions">
                                {{itinerary}}
                                {{more}}
                                {{contact}}
                                {{show_map}}
                            </div>
                        </div>
                    </div>
                </script>

                <div id="stores-list" class="<?php echo ($page == 'showrooms') ? 'active' : ''; ?>">
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