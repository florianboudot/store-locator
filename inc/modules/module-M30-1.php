<?php
if(isset($m30_index)){
    $m30_index++;
}
else{
    $m30_index = 0;
}
?><div class="module m-03 m-08 m-30 js-m-30 m-30-1">
    <div class="content-block block-tab block-doc">
        <div class="block-advices accordion-wrapper JS_item_toggler active" data-toggler-itemid="1" data-toggler-group-no-close="true" data-toggler-group="doc-youtube<?php echo $m30_index; ?>">
            <span class="JS_toggler" data-toggler-id="1" data-toggler-group="doc-youtube<?php echo $m30_index; ?>"></span>
            <p class="block-thematic">Vidéo</p>
            <p class="block-title">Université Science-Po Le Havre</p>
        </div>
        <div class="video-container accordion-wrapper JS_item_toggler active" data-toggler-itemid="1" data-toggler-group-no-close="true" data-toggler-group="doc-youtube<?php echo $m30_index; ?>" id="video1" style="background-image: url(http://img.youtube.com/vi/Ax3mULiX3SE/0.jpg);">
            <h3 class="accessibility">Titre vidéo 1</h3>
            <iframe class="ytb-iframe" src="<?php echo youtubedebug(); ?>https://www.youtube.com/embed/Ax3mULiX3SE?html5=1&autoplay=0" frameborder="0" allowfullscreen></iframe>
        </div>

        <div class="block-advices accordion-wrapper JS_item_toggler" data-toggler-itemid="2" data-toggler-group-no-close="true" data-toggler-group="doc-youtube<?php echo $m30_index; ?>">
            <span class="JS_toggler" data-toggler-id="2" data-toggler-group="doc-youtube<?php echo $m30_index; ?>"></span>
            <p class="block-thematic">Vidéo</p>
            <p class="block-title">Le cinéma Pathé de Chambéry</p>
        </div>
        <div class="video-container accordion-wrapper JS_item_toggler" data-toggler-itemid="2" data-toggler-group-no-close="true" data-toggler-group="doc-youtube<?php echo $m30_index; ?>" id="video2" style="background-image: url(http://img.youtube.com/vi/ws_kHAuPIHE/0.jpg);">
            <h3 class="accessibility">Titre vidéo 1</h3>
            <iframe class="ytb-iframe" src="<?php echo youtubedebug(); ?>https://www.youtube.com/embed/ws_kHAuPIHE?html5=1&autoplay=0" frameborder="0" allowfullscreen></iframe>
        </div>

        <div class="block-advices accordion-wrapper JS_item_toggler" data-toggler-itemid="3" data-toggler-group-no-close="true" data-toggler-group="doc-youtube<?php echo $m30_index; ?>">
            <span class="JS_toggler" data-toggler-id="3" data-toggler-group="doc-youtube<?php echo $m30_index; ?>"></span>
            <p class="block-thematic">Vidéo</p>
            <p class="block-title">La gestion automatisée en son jardin</p>
        </div>
        <div class="video-container accordion-wrapper JS_item_toggler" data-toggler-itemid="3" data-toggler-group-no-close="true" data-toggler-group="doc-youtube<?php echo $m30_index; ?>" id="video3" style="background-image: url(http://img.youtube.com/vi/8UrlniQ9GMM/0.jpg);">
            <h3 class="accessibility">Titre vidéo 1</h3>
            <iframe class="ytb-iframe" src="<?php echo youtubedebug(); ?>https://www.youtube.com/embed/8UrlniQ9GMM?html5=1&autoplay=0" frameborder="0" allowfullscreen></iframe>
        </div>


        <div class="block-thumbnails m-11">
            <p class="subtitle">à voir aussi</p>
            <div class="JS_toggler thumbnails active" data-toggler-id="1" data-toggler-group="doc-youtube<?php echo $m30_index; ?>">
                <div class="block-pic">
                    <img src="http://img.youtube.com/vi/Ax3mULiX3SE/0.jpg" width="110" alt="">
                    <i class="icon-play-big play"></i>
                </div>

                <p class="text">Université Science-Po Le Havre</p>
            </div>
            <div  class="JS_toggler thumbnails" data-toggler-id="2" data-toggler-group="doc-youtube<?php echo $m30_index; ?>">
                <div class="block-pic">
                    <img src="http://img.youtube.com/vi/ws_kHAuPIHE/0.jpg" width="110" alt="">
                    <i class="icon-play-big play"></i>
                </div>

                <p class="text">Le cinéma Pathé de Chambéry</p>
            </div>
            <div class="JS_toggler thumbnails" data-toggler-id="3" data-toggler-group="doc-youtube<?php echo $m30_index; ?>">
                <div class="block-pic">
                    <img src="http://img.youtube.com/vi/8UrlniQ9GMM/0.jpg" width="110" alt="">
                    <i class="icon-play-big play"></i>
                </div>

                <p class="text">La gestion automatisée en son jardin</p>
            </div>
            <div class="JS_toggler thumbnails" data-toggler-id="4" data-toggler-group="doc-youtube<?php echo $m30_index; ?>">
                <div class="block-pic">
                    <img src="http://img.youtube.com/vi/K38MKb_m_WY/0.jpg" width="110" alt="">
                    <i class="icon-play-big play"></i>
                </div>

                <p class="text">Au delà du tableau électrique</p>
            </div>
        </div>




        <div class="content-feature content-help">
            <div class="block-inner">
                <i class="icon-catalog block-help block-feature"></i>
                <div class="block-text">
                    <p class="block-title">Pages catalogue &amp; annexes</p>
                    <a href="#" class="link-download">Page commerciale <br>(P.260) </a><a href="#"><i class="icon icon-download thin-icon"></i></a>
                    <a href="#" class="link-download">Page Technique <br>(P.260) </a><a href="#"><i class="icon icon-download thin-icon"></i></a>
                </div>

            </div><!-- enlève les marges de l'inline-block
        --><div class="block-inner">
                <i class="icon-regulation block-help block-feature"></i>
                <div class="block-text">
                    <p class="block-title">Fiches techniques /Guides métier</p>
                    <a href="#" class="link-download">fiche N°F01188FR/03 </a><a href="#"><i class="icon icon-download thin-icon"></i></a>
                    <a href="#" class="link-download">fiche N°F01188EN/03 </a><a href="#"><i class="icon icon-download thin-icon"></i></a>

                </div>

            </div><!-- enlève les marges de l'inline-block
        --><div target="_blank" class="block-inner">
                <i class="icon-regulation block-help block-feature"></i>
                <div class="block-text">
                    <p class="block-title">Notices / Guides mise en œuvre</p>
                    <a href="#" class="link-download">Notice n°LE07398AA_01 </a><a href="#"><i class="icon icon-download thin-icon"></i></a>
                </div>

            </div><!-- enlève les marges de l'inline-block
        --><div target="_blank" class="block-inner">
                <i class="icon-documentation block-help block-feature"></i>
                <div class="block-text">
                    <p class="block-title">Documents &amp; argumentaires commerciaux</p>
                    <a href="#" class="link-download">XL3 - 125 extractible sans outil </a><a href="#"><i class="icon icon-download thin-icon"></i></a>
                </div>

            </div>

        </div>

    </div>


</div>

