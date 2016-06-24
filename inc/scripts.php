<?php if (isset($_GET['prod'])) : // used concatened and minified scripts ?>
    <script type="text/javascript" src="scripts/vendors.min.js"></script>
    <script type="text/javascript" src="scripts/bundle.min.js"></script>
<?php else : ?>
    <!-- polyfills first -->
    <!-- Vendors scripts : copy those files in Gruntfile for production -->
    <script type="text/javascript" src="js/vendors/jquery.js"></script>
    <script type="text/javascript" src="js/vendors/owl.carousel.js"></script>
    <script type="text/javascript" src="js/vendors/jquery.sticky.js"></script>
    <script type="text/javascript" src="js/vendors/select2.full.js"></script>
    <script type="text/javascript" src="js/vendors/noframework.waypoints.js"></script>
    <script type="text/javascript" src="js/vendors/mapbox.js"></script>
    <script type="text/javascript" src="js/vendors/leaflet-geocoder-mapzen.js"></script>
    <script type="text/javascript" src="js/vendors/leaflet.markercluster-src.js"></script>
    <script type="text/javascript" src="scripts/bundle.js"></script>
<?php endif ?>


