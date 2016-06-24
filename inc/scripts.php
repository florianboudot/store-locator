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

<script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      "url": "http://www.legrand.fr/",
      "logo": "http://www.legrand.fr/logo.jpg"
    }
</script>
<script type="application/ld+json">
{ "@context" : "http://schema.org",
  "@type" : "Organization",
  "url" : "http://www.legrand.Fr/",
  "contactPoint" : [
    { "@type" : "ContactPoint",
      "telephone" : "0825 360 360",
      "contactType" : "Service client"
    } ] }
</script>
<script type="application/ld+json">
{
   "@context": "http://schema.org",
   "@type": "WebSite",
   "url": "http://www.legrand.fr/",
   "potentialAction": {
     "@type": "SearchAction",
     "target": "http://www.legrand.fr/?search={search_term_string}",
     "query-input": "required name=search_term_string"
   }
}
</script>
<script>
    // only for debug
    $.get('inc/debug.last-modified.php').promise().done(function (r) {
        var buildTime = r * 1000;
        var now = new Date().getTime();
        console.info('last build', (now - buildTime)/1000, 'seconds ago');
    })
</script>

