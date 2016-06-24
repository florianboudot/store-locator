<header class="header header-pro" id="header">
    <div class="mask JS_toggler" data-toggler-group="header" data-toggler-action="close-all"></div>
    <div class="inside-header">
        <div class="header-content">
            <div class="menu-main-line">
                <div class="menu-trigger JS_menu_trigger">
                <span class="js-menu-trigger-ico transformico-btn x">
                    <span class="transformico"></span>
                </span>
                </div>
                <h1 class="menu-logo">
                    <a href="#">
                        <img src="img/skin/logo-legrand.png" alt="">
                        <span class="pro-title-logo-mobile">pro</span>
                    </a>
                </h1>
                <a href="#" class="pro-title-logo-desktop">professionnels</a>

                <label for="search" class="comp-item-search item-search-main JS_toggler search-active-icon" data-toggler-group="header" data-toggler-id="search">
                    <i class="icon-search-empty thin-icon"></i>
                </label>
            </div>
            <div class="menu-big-line">
                <ul class="menu-main">
                    <li class="menu-item current JS_toggler" data-toggler-group="header" data-toggler-id="catalogue">
                        <a href="#" class="menu-item-link ">
                            <i class="icon-close-bracket thin-icon hidden-desktop"></i>
                            catalogue
                        </a>
                    </li>

                    <li class="menu-item JS_toggler" data-toggler-group="header" data-toggler-id="projets">
                        <a href="#" class="menu-item-link ">
                            <i class="icon-close-bracket thin-icon hidden-desktop"></i>
                            solutions projets
                        </a>
                    </li>

                    <li class="menu-item JS_toggler" data-toggler-group="header" data-toggler-id="services">
                        <a href="#" class="menu-item-link ">
                            <i class="icon-close-bracket thin-icon hidden-desktop"></i>
                            services pro
                        </a>
                    </li>
                    <li class="menu-item JS_toggler" data-toggler-group="header" data-toggler-id="outils">
                        <a href="#" class="menu-item-link ">
                            <i class="icon-close-bracket thin-icon hidden-desktop"></i>
                            outils
                        </a>
                    </li>
                    <li class="menu-item JS_toggler" data-toggler-group="header" data-toggler-id="normes">
                        <a href="#" class="menu-item-link ">
                            <i class="icon-close-bracket thin-icon hidden-desktop"></i>
                            normes
                        </a>
                    </li>
                    <li class="menu-item JS_toggler" data-toggler-group="header" data-toggler-id="formations">
                        <a href="#" class="menu-item-link ">
                            <i class="icon-close-bracket thin-icon hidden-desktop"></i>
                            formations
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="#" class="menu-item-link ">
                            <i class="icon-close-bracket thin-icon hidden-desktop"></i>
                            l'actu pro
                        </a>
                    </li>
                </ul>
                <ul class="menu-tools">
                    <li class="menu-item menu-item-pro">
                        <span class="menu-item-pro-label text-r">
                            Vous êtes particulier ?
                        </span>
                        <a href="#" class="pro-acces btn btn-medium decli">
                            espace grand public<i class="icon-open-bracket thin-icon icon-item"></i>
                        </a>
                    </li>
                    <li class="menu-item comp-item-search mod-current">
                        <label for="search" class="menu-item-link JS_toggler search-active-icon" data-toggler-group="header" data-toggler-id="search">
                            <span class="menu-tools-icon icon-item">
                                <i class="icon-search-empty thin-icon"></i>
                            </span>
                            <span class="menu-tools-label">Search</span>
                        </label>
                    </li>
                    <li class="menu-item JS_toggler" data-toggler-group="header" data-toggler-id="locate">
                        <a class="menu-item-link ">
                            <i class="icon-close-bracket thin-icon hidden-desktop"></i>
                            <span class="menu-tools-icon icon-item">
                                <i class="icon-localisation-empty-thin thin-icon thin"></i>
                                <i class="icon-localisation-full-thin thin-icon full"></i>
                            </span>
                            <span class="menu-tools-label">Trouver un magasin</span>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="#" class="menu-item-link">
                            <span class="menu-tools-icon icon-item">
                                <i class="icon-OuiDoo thin-icon"></i>
                            </span>
                            <span class="menu-tools-label">Ouidoo - comunauté pro</span>
                        </a>
                    </li>
                    <li class="menu-item JS_toggler js-wishlist-notification" data-toggler-group="header" data-toggler-id="whishlist">
                        <a class="menu-item-link js-wishlist-notification-link" href="18-page-wishlist-pro.php">
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


        <?php $nb_items = isset($_GET['nb-items']) ? $_GET['nb-items'] : '2'; ?>
        <?php $is_double_items = ($nb_items == "2"); ?>
        <!-- sous menu parties catalogue -->
        <div class="header-navigation-content JS_item_toggler" data-toggler-group="header"
             data-toggler-itemid="catalogue">
            <div class="header-navigation-content-line">

                <div class="hncl-inside project-stuff <?php echo($is_double_items ? 'choices' : ''); ?> line">
                    <a class="block-stuff text-r">
                        <i class="icon-catalog big-icon icon-item"></i>
                        <span class="contenu">Consulter le catalogue en ligne</span>
                    </a>
                    <a class="block-stuff text-r">
                        <i class="icon-download big-icon icon-item"></i>
                        <span class="contenu">Télécharger le catalogue</span>
                    </a>
                    <?php if (!$is_double_items) { ?>
                        <a class="block-stuff text-r">
                            <i class="icon-promotion big-icon icon-item"></i>
                            <span class="contenu">Promotions en cours</span>
                        </a>
                    <?php } ?>
                </div>
            </div>
        </div>
        <!-- sous menu parties catalogue -->

        <!-- sous menu parties solutions projets -->
        <div class="header-navigation-content JS_item_toggler" data-toggler-group="header"
             data-toggler-itemid="projets">
            <div class="header-navigation-content-line">
                <div class="line hncl-inside">
                    <div class="hncl-list active JS_item_toggler line sous-menu-item">
                        <ul class="block-item">
                            <li class="item">
                                <a href="#" class="item-desc">Habitation</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Bureaux, tertiaire</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Bâtiments publics</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                        </ul>
                        <ul class="block-item">
                            <li class="item">
                                <a href="#" class="item-desc">Commerces et sports</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Etablissements de santé</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Data Center</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                        </ul>
                        <ul class="block-item">
                            <li class="item">
                                <a href="#" class="item-desc">Hôtellerie</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Industrie</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Agriculture, artisanat</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
        <!-- end sous menu parties solutions projets -->

        <!-- sous menu parties services pro -->
        <div class="header-navigation-content JS_item_toggler" data-toggler-group="header"
             data-toggler-itemid="services">
            <div class="header-navigation-content-line">
                <div class="hncl-inside project-stuff line">
                    <a class="block-stuff text-r">
                        <i class="icon-help big-icon icon-item"></i>
                        <span class="contenu">Obtenir de l'aide</span>
                    </a>
                    <a class="block-stuff text-r">
                        <i class="icon-agency big-icon icon-item"></i>
                        <span class="contenu">Nos agences régionales</span>
                    </a>
                    <a class="block-stuff text-r">
                        <i class="icon-showroom big-icon icon-item"></i>
                        <span class="contenu">Nos showrooms</span>
                    </a>
                </div>
            </div>
        </div>
        <!-- end sous menu parties services pro -->

        <!-- sous menu parties outils -->
        <div class="header-navigation-content JS_item_toggler" data-toggler-group="header"
             data-toggler-itemid="outils">
            <div class="header-navigation-content-line">
                <div class="hncl-inside project-stuff choices line">
                    <a class="block-stuff text-r">
                        <i class="icon-documentation big-icon icon-item"></i>
                        <span class="contenu">Applis, logiciels et configurateurs</span>
                    </a>
                    <a class="block-stuff text-r">
                        <i class="icon-application big-icon icon-item"></i>
                        <span class="contenu">Documentation et guides</span>
                    </a>
                </div>
            </div>
        </div>
        <!-- end sous menu parties outils -->

        <!-- sous menu parties normes -->
        <div class="header-navigation-content JS_item_toggler" data-toggler-group="header" data-toggler-itemid="normes">
            <div class="header-navigation-content-line">
                <div class="line hncl-inside">
                    <div class="hncl-list active JS_item_toggler line sous-menu-item">
                        <ul class="block-item">
                            <li class="item">
                                <a href="#" class="item-desc">Norme NF C 15-100</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Eclairage de sécurité</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Sécurité incendie</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>

                        </ul>
                        <ul class="block-item">
                            <li class="item">
                                <a href="#" class="item-desc">Affichage DPE</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i></li>
                            <li class="item">
                                <a href="#" class="item-desc">Recyclage DEEE Pro</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Profils Environnementaux Produits (PEP)</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>

                        </ul>
                        <ul class="block-item">
                            <li class="item">
                                <a href="#" class="item-desc">Marquages CE/NF</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i></li>
                            <li class="item">
                                <a href="#" class="item-desc">Réglementation Accessibilité</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">UTE 15-722</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- end sous menu parties normes -->

        <!-- sous menu parties formations -->
        <div class="header-navigation-content JS_item_toggler" data-toggler-group="header"

             data-toggler-itemid="formations">
            <div class="header-navigation-content-line">
                <div class="line hncl-inside">
                    <div class="hncl-list active JS_item_toggler line sous-menu-item project-stuff">
                        <ul class="block-item">
                            <li class="item">
                                <a href="#" class="item-desc">VDI</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Aide à la vente et logiciels métier</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Domotique</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Efficacité énergétique</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Eclairage et supervision du bâtiment</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                        </ul>
                        <ul class="block-item">
                            <li class="item">
                                <a href="#" class="item-desc">Habilitation énergétique</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Cheminement de câbles</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Sécurité du bâtiment</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Protection des installations électriques</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                            <li class="item">
                                <a href="#" class="item-desc">Santé et assistance à l'autonomie</a>
                                <i class="icon-open-bracket thin-icon icon-item"></i>
                            </li>
                        </ul>
                        <div class="line block-item">
                            <a class="block-stuff text-r">
                                <i class="icon-calendar big-icon icon-item"></i>
                                <span class="contenu">Toutes les dates de formations</span>
                            </a>

                            <a class="block-stuff text-r">
                                <i class="icon-download big-icon icon-item"></i>
                                <span class="contenu">Télécharger
                                le catalogue
                                des formations</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end sous menu parties formations -->

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
