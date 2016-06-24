<?php include('inc/html.php'); ?>
<head>
    <?php include('inc/head.php'); ?>
</head>
<body>
<?php include('inc/layout/header.php'); ?>
<div class="main-container">

    <!-- STORE LOCATOR -->
    <div class="section section-small-m-full">
        <div class="section-inner">
            <div class="section-content">
                <?php
                $json_url = 'json/legrand-stores-B2C.json';
                $search_what = "magasin";
                include('inc/modules/module-store-locator.php');
                ?>
            </div>
        </div>
    </div>

    <!-- MODULE M03 -->
    <div class="section section-medium section-spacing-medium section-bg section-large mod-full">
        <div class="section-inner">
            <div class="section-content">
                <div class="section-large-small">
                    <?php include 'inc/modules/module-M03.php'; ?>
                </div>
            </div>
        </div>
        <?php include 'inc/layout/footer.php'; ?>
    </div>
</div>


<?php include('inc/debug.inc.php'); ?>

<!-- SCRIPTS -->
<?php include 'inc/scripts.php'; ?>
</body>
</html>
