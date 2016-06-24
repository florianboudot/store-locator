<?php
$N4 = isset($_GET['N4']);
include "menu-pro-declaration.php";

?>
<div class="module m-20 m-55-dependency">
    <div class="block-category-products">
        <h2 class="category-selected JS_toggler" data-toggler-id="m-55-menu" data-toggler-group="m-55-menu">
            Naviguer dans le catalogue
            <i class="icon iconopen icon-top-bracket thin-icon"></i>
            <i class="icon iconclose icon-bottom-bracket thin-icon"></i>
        </h2>
    </div>
</div>
<div class="module m-55 js-m-55 <?php if ($N4){ ?>
                            <?php echo ('small') ?>
                            <?php }?>  JS_item_toggler" data-toggler-itemid="m-55-menu" data-toggler-group="m-55-menu" data-m55-timeout="300">
    <?php echo $twigm55->render($menuprodeclaration); ?>
</div>
