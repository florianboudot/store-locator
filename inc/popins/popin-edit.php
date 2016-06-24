<script type="text/template" id="tplpopinedit">
	<div class="popin popin-edit JS_item_toggler" data-toggler-itemid="3" data-toggler-group="popinedit">
        <div class="mask JS_toggler" data-toggler-id="3" data-toggler-group="popinedit" data-toggler-action="close"></div>
        <div class="content-scroll">
            <div class="content-wrapper">
                <div class="popin-content">
                    <div class="popin-ground">
                        <span class="popin-close JS_toggler" data-toggler-id="3" data-toggler-group="popinedit" data-toggler-action="close">
                            <i class="icon-close-menu"></i>
                        </span>
                        <div class="in-content m-20">
                            <p class="title-text">Libellé de la liste</p>
                            <form class="list-inner js-rename-list" data-type="{{type}}">
                                <label for="add-list">
                                    <input maxlength="40" class="js-only-alphanum block-input" type="text"
                                           id="add-list" name="{{name}}" placeholder="{{name}}" value="{{name}}" required>
                                </label>
                                <label for="formtestsubmit" class="btn btn-list-valid">
                                    <input value="valider" type="submit" id="formtestsubmit">
                                    <span class="js-form-text-label form-label-error"></span>
                                </label>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>