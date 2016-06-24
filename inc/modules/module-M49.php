<div class="module m-49 m-22 m-40">
    <div class="block-product-list-item block-product-inner">
        <div class="block-visual-product product-img product-item-view wrapper-block-product-overlay JS_toggler" data-toggler-group="popup-show-M23-A" data-toggler-id="<?php echo $m22_index ?>">
            <div class="block-new-flag">
                <p class="flag-new">Nouveauté</p>
            </div>
            <img src="img/data/m-49.jpg" alt="">

            <!--overlay product-->
            <?php include('inc/modules/module-M23.a.php');?>
        </div>
        <?php
        $m49title  = array('Illipro', 'Legrand', 'logiciel à nom long');
        $m49content  = array(
            'Éditez vos listes de matériel &amp; devis client',
            'Plus de 2 000 personnes travaillent dans les bureaux d\'étude et de design de Legrand pour mettre au point des solutions nouvelles.',
            'L’histoire de Legrand est ainsi jalonnée d’innovations produits dont les plus récentes sont');

        ?>
        <div class="product-item-info product-block">
            <a href="#" class="description-text link"><?php echo $m49title[mt_rand(0, count($m49title)-1)]; ?></a>
            <a href="#" class="product-item-text link"><?php echo $m49content[mt_rand(0, count($m49content)-1)]; ?></a>
            <a href="#" class="product-item-brand">
                <p class="platform-text platform-text-moz">Disponible sur :</p>
                <i class="icon-grey icon-windows thin-icon"></i>
                <i class="icon-grey icon-apple thin-icon"></i>
            </a>
        </div>
        <div class="clear"></div>
    </div>

</div>