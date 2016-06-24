<?php
if(isset($m30_index)){
    $m30_index++;
}
else{
    $m30_index = 0;
}
?><div class="module m-03 m-08 m-30 js-m-30">
    <div class="content-block block-tab block-doc">
        <div class="block-advices accordion-wrapper JS_item_toggler active" data-toggler-itemid="1" data-toggler-group-no-close="true" data-toggler-group="doc-youtube<?php echo $m30_index; ?>">
            <span class="JS_toggler" data-toggler-id="1" data-toggler-group="doc-youtube<?php echo $m30_index; ?>"></span>
            <p class="block-thematic">tutoriel</p>
            <p class="block-title">Comment poser un interrupteur ?</p>
        </div>
        <div class="video-container accordion-wrapper JS_item_toggler active" data-toggler-itemid="1" data-toggler-group-no-close="true" data-toggler-group="doc-youtube<?php echo $m30_index; ?>" id="video1" style="background-image: url(http://img.youtube.com/vi/Ax3mULiX3SE/0.jpg);">
            <h3 class="accessibility">Titre vidéo 1</h3>
            <iframe class="ytb-iframe" src="<?php echo youtubedebug(); ?>https://www.youtube.com/embed/Ax3mULiX3SE?html5=1&autoplay=0" frameborder="0" allowfullscreen></iframe>
        </div>

        <div class="block-advices accordion-wrapper JS_item_toggler" data-toggler-itemid="2" data-toggler-group-no-close="true" data-toggler-group="doc-youtube<?php echo $m30_index; ?>">
            <span class="JS_toggler" data-toggler-id="2" data-toggler-group="doc-youtube<?php echo $m30_index; ?>"></span>
            <p class="block-thematic">tutoriel</p>
            <p class="block-title">Tester la tension d'une prise avec un multimètre</p>
        </div>
        <div class="video-container accordion-wrapper JS_item_toggler" data-toggler-itemid="2" data-toggler-group-no-close="true" data-toggler-group="doc-youtube<?php echo $m30_index; ?>" id="video2" style="background-image: url(http://img.youtube.com/vi/ws_kHAuPIHE/0.jpg);">
            <h3 class="accessibility">Titre vidéo 1</h3>
            <iframe class="ytb-iframe" src="<?php echo youtubedebug(); ?>https://www.youtube.com/embed/ws_kHAuPIHE?html5=1&autoplay=0" frameborder="0" allowfullscreen></iframe>
        </div>

        <div class="block-advices accordion-wrapper JS_item_toggler" data-toggler-itemid="3" data-toggler-group-no-close="true" data-toggler-group="doc-youtube<?php echo $m30_index; ?>">
            <span class="JS_toggler" data-toggler-id="3" data-toggler-group="doc-youtube<?php echo $m30_index; ?>"></span>
            <p class="block-thematic">tutoriel</p>
            <p class="block-title">Confort BBC et Domotique</p>
        </div>
        <div class="video-container accordion-wrapper JS_item_toggler" data-toggler-itemid="3" data-toggler-group-no-close="true" data-toggler-group="doc-youtube<?php echo $m30_index; ?>" id="video3" style="background-image: url(http://img.youtube.com/vi/8UrlniQ9GMM/0.jpg);">
            <h3 class="accessibility">Titre vidéo 1</h3>
            <iframe class="ytb-iframe" src="<?php echo youtubedebug(); ?>https://www.youtube.com/embed/8UrlniQ9GMM?html5=1&autoplay=0" frameborder="0" allowfullscreen></iframe>
        </div>

        <div class="block-advices accordion-wrapper JS_item_toggler" data-toggler-itemid="4" data-toggler-group-no-close="true" data-toggler-group="doc-youtube<?php echo $m30_index; ?>">
            <span class="JS_toggler" data-toggler-id="4" data-toggler-group="doc-youtube<?php echo $m30_index; ?>"></span>
            <p class="block-thematic">tutoriel</p>
            <p class="block-title">Au delà du tableau électrique</p>
        </div>
        <div class="video-container accordion-wrapper JS_item_toggler" data-toggler-itemid="4" data-toggler-group-no-close="true" data-toggler-group="doc-youtube<?php echo $m30_index; ?>" id="video4" style="background-image: url(http://img.youtube.com/vi/K38MKb_m_WY/0.jpg);">
            <h3 class="accessibility">Titre vidéo 1</h3>
            <iframe class="ytb-iframe" src="<?php echo youtubedebug(); ?>https://www.youtube.com/embed/K38MKb_m_WY?html5=1&autoplay=0" frameborder="0" allowfullscreen></iframe>
        </div>

        <div class="block-thumbnails">
            <p class="subtitle">à voir aussi</p>
            <div class="JS_toggler thumbnails active" data-toggler-id="1" data-toggler-group="doc-youtube<?php echo $m30_index; ?>">
                <img src="http://img.youtube.com/vi/Ax3mULiX3SE/0.jpg" width="110" alt="">
                <p class="text">Comment poser un interrupteur ?</p>
            </div>
            <div class="JS_toggler thumbnails" data-toggler-id="2" data-toggler-group="doc-youtube<?php echo $m30_index; ?>">
                <img src="http://img.youtube.com/vi/ws_kHAuPIHE/0.jpg" width="110" alt="">
                <p class="text">Tester la tension d'une prise avec un multimètre</p>
            </div>
            <div class="JS_toggler thumbnails" data-toggler-id="3" data-toggler-group="doc-youtube<?php echo $m30_index; ?>">
                <img src="http://img.youtube.com/vi/8UrlniQ9GMM/0.jpg" width="110" alt="">
                <p class="text">Confort BBC et Domotique</p>
            </div>
            <div class="JS_toggler thumbnails" data-toggler-id="4" data-toggler-group="doc-youtube<?php echo $m30_index; ?>">
                <img src="http://img.youtube.com/vi/K38MKb_m_WY/0.jpg" width="110" alt="">
                <p class="text">Au delà du tableau électrique</p>
            </div>
        </div>




        <div class="content-feature content-help">
            <a href="#" target="_blank"  class="block-inner">
                <i class="icon-regulation block-help block-feature"></i>
                <div class="block-text">
                    <p class="block-title">Notice du produit</p>
                    <p class="link-download">Télécharger <i class="icon-open-bracket thin-icon"></i></p>
                </div>

            </a><!-- enlève les marges de l'inline-block
        --><a href="#" target="_blank"  class="block-inner">
                <i class="icon-wiring block-help block-feature"></i>
                <div class="block-text">
                    <p class="block-title">Schéma de cablage</p>
                    <p class="link-download">Télécharger <i class="icon-open-bracket thin-icon"></i></p>
                </div>

            </a><!-- enlève les marges de l'inline-block
        --><a href="http://www.electriciencertifie.fr" target="_blank" class="block-inner">
                <i class="icon-certified block-help block-feature"></i>
                <div class="block-text">
                    <p class="block-title">Faites appel à un électricien certifié</p>
                    <p class="link-download">Trouver <i class="icon-open-bracket thin-icon"></i></p>
                </div>

            </a>
        </div>
        <?php include('inc/blocks/block-card-pro.php'); ?>
    </div>


</div>

