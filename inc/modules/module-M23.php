<div class="mask-product-popup JS_toggler" data-toggler-group="popup-show-M23" data-toggler-id="<?php echo $m22_index ?>" data-toggler-action="close"></div>
<div class="block-product-overlay <?php echo ($product_overlay_no_roll == true) ? "m-23-noroll": ""?>"> <!--m-23-noroll-->
    <div class="option-product">
        <div class="inner-option-product">
            <a href="#" class="link-option-product text-b-3" data-toggler-group="popup-show-M23" data-toggler-id="<?php echo $m22_index ?>" data-toggler-action="close"><i class="icon icon-file medium-icon option-produit-picto"></i><br><p class="link-option-text"><span class="option-text">Voir le produit</span><i class="icon-open-bracket thin-icon icon"></i></p></a>
        </div>
    </div>
    <div class="option-product">
        <div class="inner-option-product">
            <div class="link-option-product text-b-3 JS_toggler" data-toggler-id="5" data-toggler-group="popinaddlist"><i class="icon icon-add-list medium-icon option-produit-picto"></i><br><p class="link-option-text"><span class="option-text">Ajouter à ma liste</span><i class="icon-open-bracket thin-icon icon"></i></p></div>
            <?php include('inc/popins/popin-add-list.php'); ?>
        </div>
    </div>
</div>