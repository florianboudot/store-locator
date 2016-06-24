<?php
// module for search suggest

?><div class="section mod-full section-small m-73 js-m-73">
    <div class="section-inner">
        <div class="section-content">
            <div class="section-grid section-grid-d-3 section-grid-m-1">
                <h2 class="completion-title">Suggestion</h2>
                <ul class="completion-suggest js-completion-suggest"></ul>
            </div>
            <?php if(isset($pro)){ ?>
                <div class="section-grid section-grid-d-3 section-grid-m-1">
                    <h2 class="completion-title">Produits professionnels</h2>
                    <ul class="completion-suggest-media js-completion-suggest-pro"></ul>
                </div>
                <div class="section-grid section-grid-d-3 section-grid-m-1">
                    <h2 class="completion-title">Produits tous publics</h2>
                    <ul class="completion-suggest-media js-completion-suggest-public"></ul>
                </div>
            <?php } else{ ?>
                <div class="section-grid section-grid-d-3 section-grid-m-1">
                    <h2 class="completion-title">Produits tous publics</h2>
                    <ul class="completion-suggest-media js-completion-suggest-public"></ul>
                </div>
                <div class="section-grid section-grid-d-3 section-grid-m-1">
                    <h2 class="completion-title">Produits professionnels</h2>
                    <ul class="completion-suggest-media js-completion-suggest-pro"></ul>
                </div>
            <?php } ?>
        </div>
    </div>
</div>
