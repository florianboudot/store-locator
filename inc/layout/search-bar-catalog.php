<!-- search bar -->
<?php $datajson = json_encode(
    array(
        "endpoints" => "suggest"
    )); ?>
<div class="search-line active">
    <div class="search-bar-wrapper">
        <div class="search-bar">
            <span class="hidden-mobile">
                <i class="icon-search-empty thin-icontest icon-item"></i>
            </span>
            <form action="" method="get" class="form-suggest">
                <input type="search" id="search-bar-catalog" class="js-suggest js-rescroll-input search-input txt-title-l-2 " placeholder="Que cherchez-vous ?" data-bind-suggest="embedded" data-json="<?php echo htmlentities($datajson); ?>">
            </form>
        </div>
    </div>
    <?php echo $twigm73->render(array("ispro" => true, "id" => "embedded")); ?>
</div>
<!--end search bar -->