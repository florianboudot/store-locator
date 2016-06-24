<div class="section-inner">
    <div class="section-content">
        <div class="title-wishlist">
            <script type="text/template" id="tplwishlistheadername">
                {{name}} <span class="number-list">({{count}})</span>
            </script>
            <p class="js-wishlist-header-name description-text">Salle de bain Galacinsky <span class="number-list">(3)</span></p>
            <div class="wishlist-pictos">
                <p class="picto-inner hidden-mobile open-popin JS_toggler" data-toggler-id="1" data-toggler-group="popinexport">
                    <i class="icon icon-export thin-icon"></i>
                    <span class="tooltip">Exporter</span>
                </p>

                <?php include('inc/popins/popin-export.php'); ?>

                <p class="picto-inner open-popin JS_toggler" data-toggler-id="2" data-toggler-group="popinprint">
                    <i class="icon icon-print thin-icon"></i>
                    <span class="tooltip">Imprimer</span>
                </p>

                <?php include('inc/popins/popin-print.php'); ?>

                <p class="picto-inner hidden-mobile open-popin JS_toggler" data-toggler-id="4" data-toggler-group="popinfiletech">
                    <i class="icon icon-import-list thin-icon"></i>
                    <span class="tooltip">Dossier technique</span>
                </p>

                <?php include('inc/popins/popin-file-tech.php'); ?>

                <p class="picto-inner open-popin JS_toggler" data-toggler-id="3" data-toggler-group="popinedit">
                    <i class="icon icon-edit thin-icon"></i>
                    <span class="tooltip">Editer</span>
                </p>

                <?php include('inc/popins/popin-edit.php'); ?>

                <a href="#" class="picto-inner js-delete-wishlist">
                    <i class="icon icon-delete thin-icon"></i>
                    <span class="tooltip">Supprimer</span>
                </a>

                <div id="popinWishlist"></div>
            </div>
        </div>
    </div>
</div>