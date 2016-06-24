
<?php
//$catalogue = isset($catalogue) ? $catalogue : true;
$catalogue = isset($_GET['catalogue']);
?>

<?php
$colors = array(
    "color-1",
    "color-2",
    "color-3",
    "color-4",
    "color-5",
);
?>
<?php $custom_color = $catalogue ? $colors[mt_rand(0, count($colors) - 1)]: ''; ?>

<div class="m-12">
    <div class="section mod-full">
        <div class="tetiere <?php if ($catalogue){ ?>
                            <?php echo $custom_color ?>
                            <?php }?> ">

            <?php if (!($m12)) { ?>
                <?php echo breadcrumb('Accueil', 'Interrupteurs et prises', 'Interrupteurs'); ?>
            <?php } ?>


            <?php if (!$catalogue) { ?>
                <!-- leave the tag for img background css-->
                <div class="media-wrapper" style="background-image: url(img/data/bg-tetiere-1.jpg);"></div>
            <?php } ?>

            <!-- background in inline style to be administrable with back-office -->
            <h1 class="text-t-1 text-main">
                Allumer et éteindre <br>
                la lumière
            </h1>

            <?php if (($m12)) { ?>
                <?php include('inc/layout/search-bar-catalog.php'); ?>
            <?php } ?>
        </div>
    </div>
</div>
