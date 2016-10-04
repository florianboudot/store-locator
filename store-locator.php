<?php include('inc/html.php'); ?>
<head>
<meta charset="UTF-8">
<title>Store locator demo</title>
<!--[if (gt IE 8) | (IEMobile)]><!-->
<link rel="stylesheet" href="styles/all.css" >
<!--<![endif]-->
</head>
<body>

<div class="main-container">

    <!-- STORE LOCATOR -->
    <div class="section section-small-m-full">
        <div class="section-inner">
            <div class="section-content">
                <?php
                $json_url = 'json/stores.json';
                $search_what = "distributeur";
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
