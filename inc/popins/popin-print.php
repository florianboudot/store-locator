<script type="text/template" id="tplpopinprint">
    <div class="popin JS_item_toggler" data-toggler-itemid="2" data-toggler-group="popinprint">
        <div class="mask JS_toggler" data-toggler-id="2" data-toggler-group="popinprint" data-toggler-action="close"></div>
        <div class="content-scroll">
            <div class="content-wrapper">
                <div class="popin-content">
                    <div class="popin-ground">
                        <span class="popin-close JS_toggler" data-toggler-id="2" data-toggler-group="popinprint" data-toggler-action="close">
                            <i class="icon-close-menu"></i>
                        </span>
                        <form class="in-content m-20 js-wishlist-print" data-type="{{type}}" data-name="{{name}}">
                            <p class="title-text">Choisissez vos options d'impression</p>
                            <div class="form-item">
                                <input type="checkbox" id="f-1" name="rate" class="form-checkbox">
                                <label for="f-1" class="form-label">Inclure les tarifs</label>
                            </div>
                            <div class="form-item">
                                <input type="checkbox" id="f-2" name="picture" class="form-checkbox">
                                <label for="f-2" class="form-label">Inclure les images</label>
                            </div>
                            <div class="form-item form-item-print">
                                <input type="checkbox" id="f-3" name="sheet" class="form-checkbox">
                                <label for="f-3" class="form-label">Inclure une vue détaillée de chaque produit de la liste</label>
                            </div>
                            <button type="submit" class="btn btn-legrand">imprimer la liste</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>