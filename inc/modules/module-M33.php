<div id="storeloc" class="m-06 m-34 m-42 m-42-1 js-m-30 m-33 block-picture block-animation-media ">
    <!-- leave the tag for img background css-->
    <div class="media-wrapper" style="background-image: url(img/data/bg-storelocator.jpg);"></div>

    <div class="block-content">
        <div class="block-title-wrapper">
            <h2 class="block-title ">Trouver ce produit en magasin</h2>
        </div>
        <div class="store-loc-inner">
            <div class="inner-top">
                <p class="locate-me">
                    <a href="#" class="btn btn-main-full-reverse js-locate-me">
                        <i class="icon-target"></i>
                        <span>me localiser</span>
                    </a>
                </p>

                <p class="store-loc-between">ou</p>

            </div>

            <div class="search-locate">
                <form action="15-store-locator-B2B.php" method="get">
                    <div id="map-fake"></div>
                    <input type="hidden" name="lat" id="lat"><!-- js -->
                    <input type="hidden" name="lng" id="lng"><!-- js -->
                    <div class="js-geocoder-search geocoder-search js-geocoder-no-map" data-input-placeholder="Par code postal ou viln..." data-input-class="locate-input txt-title-l-2" data-input-id="destination" data-input-type="search"></div>
                    <div class="btn-search btn btn-main-full-reverse">
                        rechercher
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
