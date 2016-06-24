<?php
$titles = array("Les \"déco\" ", "Les indispensables");
?>

<div class="module block-picture m-07 m-07-1 m-07-1B">
    <img src="img/skin/pixel-tansparent.png" alt="" class="px-transparent">
    <div class="content bg-white">
        <h2 class="block-title"><?php echo $titles[mt_rand(0,count($titles) - 1)]?></h2>
        <h3 class="text-r-2">Visitez les réalisations de nos clients <br> et trouvez des idées pour vos projets.</h3>
    </div>
</div>
