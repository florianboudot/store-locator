<div class="popin popin-add-list JS_item_toggler" data-toggler-itemid="5" data-toggler-group="popinaddlist">
	<div class="mask JS_toggler" data-toggler-id="5" data-toggler-group="popinaddlist" data-toggler-action="close"></div>
	<div class="content-scroll">
		<div class="content-wrapper">
			<div class="popin-content">
				<div class="popin-ground">
					<span class="popin-close JS_toggler" data-toggler-id="5" data-toggler-group="popinaddlist" data-toggler-action="close">
						<i class="icon-close-menu"></i>
					</span>
					<div class="in-content js-wishlist-wrapper" data-product-id="<?php echo mt_rand(5435, 32432); ?>">
						<div class="inner-text">
							<p class="title-text">Ajouter à mes listes</p>
							<div class="add-list-inner">
								<div class="open-add-list">
									<ul class="list-deploy js-wishlists-list-drop wishlist-context-pro">
										<li class="list-item">Cuisine (3 articles)</li>
										<li class="list-item">Cuisine (3 articles)</li>
										<li class="list-item">Cuisine (3 articles)</li>
										<li class="list-item list-item-pro">Cuisine (3 articles)<span class="item-pro-btn">pro</span></li>
										<li class="list-item list-item-pro">Cuisine (3 articles)<span class="item-pro-btn">pro</span></li>

									</ul>

								</div>
							</div>
						</div>
						<form action="#" class="js-validateform m-20 js-create-wishlist" novalidate>
							<div class="list-inner-add">
								<label for="name-list<?php echo $m22_index; ?>">
									<input maxlength="40" class="js-only-alphanum block-input" type="text"
										   id="name-list<?php echo $m22_index; ?>" name="wishlistname" placeholder="Nom de la liste" required value="" data-wishlist-type="pro">
								</label>
								<button type="submit" class="btn btn-medium" id="formtestsubmit">Créer</button>

							</div>

						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>