<?php $datajson = json_encode(
    array(
        "endpoints" => "suggest"
    )); ?>
<!-- search bar -->
<div class="search-line js-search-block<?php if(isset($navonload)) { ?> js-nav-onload<?php } ?> JS_item_toggler" data-toggler-group="header" data-toggler-itemid="search">
    <div class="search-bar">
        <span class="hidden-mobile">
            <i class="icon-search-empty thin-icontest icon-item"></i>
        </span>
        <form class="form-suggest" action="" method="get">
            <input type="search" name="s" id="search" class="js-suggest search-input txt-title-l-2 " placeholder="Que cherchez-vous ?"
                  data-bind-suggest="header" data-json="<?php echo htmlentities($datajson); ?>">
        </form>
    </div>
    <?php echo $twigm73->render(array("ispro" => (isset($pro) && $pro = true), "id" => "header")); ?>
</div>
<!--end search bar -->
