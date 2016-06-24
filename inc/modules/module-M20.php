<div class="module m-20">
    <div class="block-category-products">
        <p class="category-selected JS_toggler" data-toggler-id="category-products" data-toggler-group="category-products-group">
            Interrupteurs
            <i class="icon icon-pointer-vertical thin-icon"></i>
        </p>

        <ul class="category-list JS_item_toggler" data-toggler-group="category-products-group" data-toggler-itemid="category-products">
            <li>
                <a href="#" class="category-list-item">prises</a>
            </li>
            <li>
                <a href="#" class="category-list-item"> plaque de couleur</a>
            </li>
            <li>
                <a href="#" class="category-list-item">boite d’encastrement</a>
            </li>
        </ul>
    </div>

    <div class="list-filter JS_item_toggler" data-toggler-group="products-filters" data-toggler-itemid="filters">
        <p class="head-filter">Filtrer par</p>

        <form action="#" class="js-filter-navigation">
            <input type="hidden" name="sort-by" value="value" id="filterNavigation">
            <fieldset class="form-fieldset">
                <legend class="title-filter JS_toggler active" data-toggler-id="1" data-toggler-group="filter-1">
                    Catégorie
                    <i class="icon thin-icon"></i>
                </legend>

                <div class="block-filters JS_item_toggler active" data-toggler-group="filter-1" data-toggler-itemid="1">
                    <?php echo $twigformitemfilter->render(array("name" => "va-et-vient", 'request' => $_GET)); ?>
                    <?php echo $twigformitemfilter->render(array("name" => "Interrupteur simple", 'request' => $_GET)); ?>
                    <?php echo $twigformitemfilter->render(array("name" => "Poussoir", 'request' => $_GET)); ?>
                    <?php echo $twigformitemfilter->render(array("name" => "Interrupteur variateur", 'request' => $_GET)); ?>
                    <?php echo $twigformitemfilter->render(array("name" => "Interrupteur automatique", 'request' => $_GET)); ?>
                    <?php echo $twigformitemfilter->render(array("name" => "Commande de volets roulants", 'request' => $_GET)); ?>
                </div>
            </fieldset>

            <fieldset class="form-fieldset">
                <legend class="title-filter JS_toggler active" data-toggler-id="2" data-toggler-group="filter-2">
                    Couleur
                    <i class="icon thin-icon"></i>
                </legend>

                <div class="block-filters JS_item_toggler active" data-toggler-group="filter-2" data-toggler-itemid="2">
                    <?php echo $twigformitemfilter->render(array("name" => "blanc", 'request' => $_GET)); ?>
                    <?php echo $twigformitemfilter->render(array("name" => "titane", 'request' => $_GET)); ?>
                    <?php echo $twigformitemfilter->render(array("name" => "graphite", 'request' => $_GET)); ?>
                </div>
            </fieldset>

            <fieldset class="form-fieldset">
                <legend class="title-filter JS_toggler active" data-toggler-id="3" data-toggler-group="filter-3">
                    Format
                    <i class="icon thin-icon"></i>
                </legend>

                <div class="block-filters JS_item_toggler active" data-toggler-group="filter-3" data-toggler-itemid="3">
                    <?php echo $twigformitemfilter->render(array("name" => "Filtre 10", 'request' => $_GET)); ?>
                    <?php echo $twigformitemfilter->render(array("name" => "Filtre 11 (disabled)", 'request' => $_GET, 'disabled' => true)); ?>
                </div>
            </fieldset>

            <fieldset class="form-fieldset">
                <legend class="title-filter JS_toggler active" data-toggler-id="4" data-toggler-group="filter-4">
                    Bloc
                    <i class="icon thin-icon"></i>
                </legend>

                <div class="block-filters JS_item_toggler active" data-toggler-group="filter-4" data-toggler-itemid="4">
                    <?php echo $twigformitemfilter->render(array("name" => "Filtre 12", 'request' => $_GET)); ?>
                    <?php echo $twigformitemfilter->render(array("name" => "Filtre 13", 'request' => $_GET)); ?>
                </div>
            </fieldset>

            <fieldset class="form-fieldset">
                <legend class="title-filter JS_toggler active" data-toggler-id="5" data-toggler-group="filter-5">
                    Vos critères
                    <i class="icon thin-icon"></i>
                </legend>

                <div class="block-filters JS_item_toggler active" data-toggler-group="filter-5" data-toggler-itemid="5">
                    <?php echo $twigformitemfilter->render(array("name" => "Silencieux", 'request' => $_GET)); ?>
                    <?php echo $twigformitemfilter->render(array("name" => "Avec voyant", 'request' => $_GET)); ?>
                    <?php echo $twigformitemfilter->render(array("name" => "Kit complet", 'request' => $_GET)); ?>
                    <?php echo $twigformitemfilter->render(array("name" => "Lot", 'request' => $_GET)); ?>
                    <?php echo $twigformitemfilter->render(array("name" => "Etanche", 'request' => $_GET)); ?>
                </div>
            </fieldset>
            <p class="block-action">
                <input type="submit" class="btn btn-medium JS_toggler validate-form js-force-change" title="#" data-toggler-group="products-filters" data-toggler-itemid="filters" value="ok">
            </p>
        </form>
    </div>
</div>