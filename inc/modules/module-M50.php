<?php
$new    = '<div class="block-new-flag"><p class="flag-new">NOUVEAUTÉ</p></div>';
$titles = array("La mairie de Paris s’automatise", "Le Data Center fullsave sécurise ses données");
$texts = array("Toulouse - Sécurité", "Paris - Domotique");
?>

<div class="module m-50 m-21">
    <div class="block-filter-title">
        <h2 class="filter-product">
            <span class="filter-number">87</span> reportages chantiers
        </h2>
        <div class="filter-select JS_toggler"  data-toggler-group="products-filtersBIS" data-toggler-id="filtersBIS">
            <span class="btn btn-medium">filtrer</span>
        </div>
    </div>
    <ul class="block-list-result">
        <?php for ($i = 1; $i <= 2; $i++) { ?>
            <li class="block-product-list-item-result">
                <a href="#">
                    <div class="block-visuel">
                        <?php
                            if ($i % 2 != 0) {
                                echo $new;
                            } else{
                                echo "";
                            }
                        ?>
                        <img src="img/data/M50.jpg" alt="">
                    </div>
                    <p class="text-r-4"><?php echo $titles[mt_rand(0, count($titles) - 1)] ?></p>
                    <p class="color-text-grey text-r-1"><?php echo $texts[mt_rand(0, count($titles) - 1)] ?></p>
                </a>
            </li>
        <?php } ?>
    </ul>
    <ul class="line tac block-pagination">
        <li class="pagination">
            <a href="#prev" class="pagination inactive">
                <i class="icon-arrow-left thin-icon icon-item"></i>
            </a>
        </li>
        <li class="pagination pages"><a href="#" class="active">1</a></li>
        <li class="pagination pages"><a href="#">2</a></li>
        <li class="pagination pages"><a href="#">3</a></li>
        <li class="pagination pages"><a href="#">...</a></li>
        <li class="pagination pages"><a href="#">6</a></li>
        <li class="pagination">
            <a href="#next" class="pagination">
                <i class="icon-arrow-right thin-icon icon-item"></i>
            </a>
        </li>
    </ul>
</div>

