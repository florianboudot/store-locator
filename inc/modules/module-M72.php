<?php
$picture = array(   "img/data/productc-categorie/M72-1.jpg",
                    "img/data/productc-categorie/M72-2.jpg",
                    "img/data/productc-categorie/M72-3.jpg",
                    "img/data/productc-categorie/M72-4.jpg"
);
$texts =  array( "Interrupteurs et prises",
                "Tableaux électriques et disjoncteurs",
                "Sonnettes, visiophones et interphones",
                "Rallonges, multiprises et accessoires"
                );
$new    = array( "m-06-3C");
?>

<div class="m-72 m-25">
    <div class="content">
        <h2 class="block-title">Explorez nos catégories de produit</h2>
    </div>
    <div class="line">
        <?php for ($i = 0; $i <=3; $i++) { ?>
            <div class="section-grid-d-2 section-grid-m-1 line">
                <div class="m-06 m-06-3 block-picture block-animation-media <?php
                if ($i >=3) {
                    echo 'm-06-3C';
                } else{
                    echo "";
                }
                ?>">
                    <a href="#">
                        <img class="block-opacity" src="<?php echo $picture[$i] ?>" alt="">
                    </a>
                    <div class="content">
                        <h3 class="intro"><?php echo $texts[$i] ?></h3>
                        <p class="block-desc">
                            Des couleurs et des matières pour
                            toutes les harmonies, des univers enfantins
                            et des signatures d’artistes.
                        </p>
                    </div>
                </div>
            </div>
        <?php } ?>
    </div>
    <div class=" m-06 m-42 m-42-1 block-picture">
        <!-- leave the tag for img background css-->
        <div class="media-wrapper" style="background-image: url('img/data/m-42-3.jpg');"></div>

        <div class="content priority">
            <div class="block-title-wrapper">
                <h2 class="title-help">Vous êtes professionnel ?</h2>
                <a class="btn btn-main-full-reverse" href="#" target="_blank">
                    consulter le
                    <span class="desktop">cat.</span>
                    <span class="mobile">catalogue</span>
                    pro
                </a>
            </div>
        </div>
    </div>
</div>
