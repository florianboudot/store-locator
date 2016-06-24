<header class="header" id="header">
    <div class="mask JS_toggler" data-toggler-group="header" data-toggler-action="close-all"></div>
    <div class="inside-header">
        <div class="header-content">
            <div class="menu-main-line">
                <div class="menu-trigger JS_menu_trigger">
                <span class="js-menu-trigger-ico transformico-btn x">
                    <span class="transformico"></span>
                </span>
                </div>
                <h1 class="menu-logo"><a href="#"><img src="img/skin/logo-legrand.png" alt=""></a></h1>
                <label for="search" class="comp-item-search item-search-main JS_toggler search-active-icon" data-toggler-group="header" data-toggler-id="search">
                    <i class="icon-search-empty thin-icon"></i>
                </label>
            </div>
            <div class="menu-big-line">
                <ul class="menu-main">
                    <li class="menu-item current JS_toggler" data-toggler-group="header" data-toggler-id="products">
                        <a class="menu-item-link ">
                            <i class="icon-close-bracket thin-icon hidden-desktop"></i>
                            Produits
                        </a>
                    </li>

                    <li class="menu-item JS_toggler" data-toggler-group="header" data-toggler-id="project">
                        <a class="menu-item-link ">
                            <i class="icon-close-bracket thin-icon hidden-desktop"></i>
                            Mon projet
                        </a>
                    </li>

                    <li class="menu-item JS_toggler">
                        <a class="menu-item-link ">
                            <i class="icon-close-bracket thin-icon hidden-desktop"></i>
                            L'actu</a>
                    </li>

                    <li class="menu-item menu-item-pro">
                        <span class="menu-item-pro-label text-r">
                            Vous êtes professionnel ?
                        </span>
                        <a href="#" class="pro-acces btn btn-medium decli">Espace pro
                            <i class="icon-open-bracket thin-icon icon-item"></i>
                        </a>
                    </li>
                </ul>
                <ul class="menu-tools">
                    <li class="menu-item comp-item-search mod-current">
                        <label for="search" class="menu-item-link JS_toggler search-active-icon" data-toggler-group="header" data-toggler-id="search">
                            <span class="menu-tools-icon icon-item">
                                <i class="icon-search-empty thin-icon"></i>
                            </span>
                            <span class="menu-tools-label">Search</span>
                        </label>
                    </li>
                    <li class="menu-item JS_toggler" data-toggler-group="header" data-toggler-id="locate">
                        <a href="#" class="menu-item-link">
                            <i class="icon-close-bracket thin-icon hidden-desktop"></i>
                            <span class="menu-tools-icon icon-item">
                                <i class="icon-localisation-empty-thin thin-icon thin"></i>
                                <i class="icon-localisation-full-thin thin-icon full"></i>
                            </span>
                            <span class="menu-tools-label">Trouver un magasin</span>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="#" class="menu-item-link ">
                            <span class="menu-tools-icon icon-item">
                                <i class="icon-OuiDoo thin-icon"></i>
                            </span>
                            <span class="menu-tools-label">Ouidoo - comunauté pro</span>
                        </a>
                    </li>
                    <li class="menu-item JS_toggler js-wishlist-notification" data-toggler-group="header" data-toggler-id="whishlist">
                        <a class="menu-item-link js-wishlist-notification-link" href="17-page-wishlist-part.php">
                            <i class="icon-close-bracket thin-icon hidden-desktop"></i>
                            <span class="menu-tools-icon icon-item">
                                <i class="icon-add-list-empty-thin thin-icon thin"></i>
                                <i class="icon-add-list-full thin-icon full"></i>
                            </span>
                            <span class="menu-tools-label">Mes listes</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="header-second-line">
        <?php include('search-bar.php'); ?>

        <!-- search bar localisation -->
        <?php include('inc/modules/module-search-locate.php'); ?>
        <!--end search bar localisation -->

        <div class="header-navigation-content JS_item_toggler" data-toggler-group="header"
             data-toggler-itemid="products">
            <div class="header-navigation-content-line">
                <div class="line hncl-inside">
                    <div class="unit size1of4">
                        <div class="p-right">
                            <h2 class="hncl-title">
                                <span class="hncl-tactile-toggle JS_toggler" data-toggler-group="header-products-list-1" data-toggler-id="1">
                                    <i class="icon-bottom-bracket thin-icon icon-item"></i>
                                </span>
                                <a href="#" class="link-item">Interrupteurs <br> et prises</a>
                            </h2>

                            <ul class="hncl-list JS_item_toggler" data-toggler-group="header-products-list-1" data-toggler-itemid="1">
                                <li class="item"><a href="#">Interrupteur</a></li>
                                <li class="item"><a href="#">Prise</a></li>
                                <li class="item"><a href="#">Plaque de couleur</a></li>
                                <li class="item"><a href="#">Boîte d'encastrement</a></li>
                                <li class="item">
                                    <a href=""><img src="img/skin/menu-picture.jpg" alt=""></a>
                                </li>
                                <li class="item">
                                    <a class="item-gamme" href="#">EXPLORER PAR GAMME ></a>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div class="unit size1of4">
                        <div class="p-right">
                            <h2 class="hncl-title">
                                <span class="hncl-tactile-toggle JS_toggler"
                                      data-toggler-group="header-products-list-2" data-toggler-id="2">
                                    <i class="icon-bottom-bracket thin-icon icon-item"></i>
                                </span>
                                <a href="#" class="link-item">Tableaux électriques <br> et disjoncteurs</a>
                            </h2>
                            <ul class="hncl-list JS_item_toggler" data-toggler-group="header-products-list-2"
                                data-toggler-itemid="2">
                                <li class="item"><a href="#">Coffret électrique</a></li>
                                <li class="item"><a href="#">Coffret de communication</a></li>
                                <li class="item"><a href="#">Disjoncteur</a></li>
                                <li class="item"><a href="#">Contacteur, minuterie, parafoudre</a></li>
                                <li class="item"><a href="#">Signalisation et prise</a></li>
                                <li class="item"><a href="#">Interrupteur / disjoncteur différentiel</a></li>
                                <li class="item"><a href="#">Peigne et accessoires de raccordement</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="unit size1of4">
                        <div class="p-right">
                            <h2 class="hncl-title">
                                <span class="hncl-tactile-toggle JS_toggler"
                                      data-toggler-group="header-products-list-3" data-toggler-id="3">
                                    <i class="icon-bottom-bracket thin-icon  icon-item"></i>
                                </span>
                                <a href="#" class="link-item">Sonnettes, visiophones <br> et interphones</a>
                            </h2>
                            <ul class="hncl-list JS_item_toggler" data-toggler-group="header-products-list-3"
                                data-toggler-itemid="3">
                                <li class="item"><a href="#">Sonnette et carillon</a></li>
                                <li class="item"><a href="#">Kit portier</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="last-unit">
                        <div class="p-right">
                            <h2 class="hncl-title">
                                <span class="hncl-tactile-toggle JS_toggler"
                                      data-toggler-group="header-products-list-4" data-toggler-id="4">
                                    <i class="icon-bottom-bracket thin-icon icon-item"></i>
                                </span>
                                <a href="#" class="link-item">Rallonges, multiprises <br> et accessoires</a>
                            </h2>
                            <ul class="hncl-list JS_item_toggler" data-toggler-group="header-products-list-4"
                                data-toggler-itemid="4">
                                <li class="item"><a href="#">Rallonge, multiprise</a></li>
                                <li class="item"><a href="#">Adaptateur</a></li>
                                <li class="item"><a href="#">Fiche</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div class="menu-item menu-item-pro line hidden-mobile">
                <div class="header-navigation-content-line">
                    <span class="menu-item-pro-label text-r">
                    Vous êtes professionnel ?
                    </span>
                    <a class="pro-acces btn btn-medium">Consulter le catalogue pro</a>
                </div>
            </div>
        </div>
        <div class="menu-item menu-item-pro catalogue-pro line hidden-desktop">
            <div class="header-navigation-content-line">
                    <span class="menu-item-pro-label text-r">
                    Vous êtes professionnel ?
                    </span>
                <a class="pro-acces">Consulter le catalogue pro</a>
            </div>
        </div>
        <div class="header-navigation-content JS_item_toggler" data-toggler-group="header"
             data-toggler-itemid="project">
            <div class="header-navigation-content-line">
                <div class="hncl-inside project-stuff line">
                    <a class="block-stuff text-r">
                        <i class="icon-inspire big-icon icon-item"></i>
                        <span class="contenu">Je m'inspire</span>
                    </a>
                    <a class="block-stuff text-r">
                        <i class="icon-prepare big-icon icon-item"></i>
                        <span class="contenu">Je me prépare</span>
                    </a>
                    <a class="block-stuff text-r">
                        <i class="icon-realize big-icon icon-item"></i>
                        <span class="contenu">Je réalise</span>
                    </a>
                </div>
            </div>
        </div>

        <div class="header-navigation-content JS_item_toggler" data-toggler-group="header"
             data-toggler-itemid="news">
            <div class="header-navigation-content-line">
                <div class="hncl-inside">
                    ACTU
                </div>
            </div>
        </div>

        <div class="header-navigation-content JS_item_toggler" data-toggler-group="header"
             data-toggler-itemid="whishlist">
            <div class="header-navigation-content-line">
                <div class="hncl-inside smaller">
                    <p class="text-r">
                        Aucun produit dans votre liste
                    </p>
                </div>
            </div>
        </div>
    </div>
</header>
