<script type="text/template" id="tplpopinexport">
    <div class="popin JS_item_toggler" data-toggler-itemid="1" data-toggler-group="popinexport">
        <div class="mask JS_toggler" data-toggler-id="1" data-toggler-group="popinexport" data-toggler-action="close"></div>
        <div class="content-scroll">
            <div class="content-wrapper">
                <div class="popin-content">
                    <div class="popin-ground">
                        <span class="popin-close JS_toggler" data-toggler-id="1" data-toggler-group="popinexport" data-toggler-action="close">
                            <i class="icon-close-menu"></i>
                        </span>
                        <div class="in-content">
                            <p class="title-text">Exporter la liste</p>
                            <p class="text">Obtenir pour transférer dans un logiciel Legrand</p>
                            <a class="btn btn-legrand js-wishlist-export" data-name="{{name}}" data-type="{{type}}" data-format="ecat" href="#">Exporter au format legrand (ecat)</a>
                            <p class="text text-export">Obtenir sous forme d’un tableau Excel</p>
                            <a class="btn btn-legrand js-wishlist-export" data-name="{{name}}" data-type="{{type}}" data-format="csv" href="#">Exporter au format CSV</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>