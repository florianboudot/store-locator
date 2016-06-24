<?php include('inc/html.php'); ?>
<head>
    <?php include('inc/head.php'); ?>
</head>
<body>
<div class="main-container">

    <!-- STORE LOCATOR -->
    <div class="section section-small-m-full">
        <div class="section-inner">
            <div class="section-content">
                <div class="main-head ">
                    <div class="gutter-left">
                        <h1 class="txt-title-l-2 txt-title-dashed">
                            Professionnels,<br>
                            vos contacts en région
                        </h1>
                    </div>

                    <!-- FILTER MARKERS -->
                    <div class="filter-markers">
                        <p class="btn-number-product btn btn-medium js-filter-markers bt-filter filter-all active" data-place-type="all">
                            tous
                        </p>
                        <p class="btn-number-product btn btn-medium js-filter-markers bt-filter filter-agences" data-place-type="1">
                            Directions régionales
                        </p>
                        <p class="btn-number-product btn btn-medium js-filter-markers bt-filter filter-showrooms" data-place-type="0">
                            showrooms
                        </p>
                    </div>
                </div>

                <!-- MAP + SIDEBAR -->
                <?php
                $json_url = "json/agences-et-showrooms.json";
                $search_title = "Rechercher";
                $page = "showrooms";
                include('inc/modules/module-store-locator.php');
                ?>
            </div>
        </div>
    </div>


</div>



<!-- SCRIPTS -->
<?php include 'inc/scripts.php'; ?>
</body>
</html>
