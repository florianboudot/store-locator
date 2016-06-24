<div class="debug">
    <div class="text desktop">
        desktop
    </div>
    <div class="text tablet">
        tablet
    </div>
    <div class="text mobile">
        mobile
    </div>
    <div class="debug-nav">
        <ul>
            <li><a href="00-composants.php">Composants</a></li>
            <li><a href="00-modules.php">Modules</a></li>
            <li><a href="00-structure.php">Structure</a></li>
        </ul>
    </div>
</div>
<div class="grid-debug">
    <div></div><div></div><div></div><div></div>
    <div></div><div></div><div></div><div></div>
    <div></div><div></div><div></div><div></div>
</div>
<style>
    .debug {
        z-index: 901;
    }

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
        .grid-debug {
            display: none;

        }
    }

    .grid-debug {
        background: rgba(0, 0, 0, .3);
        box-sizing: border-box;
        bottom: 0;
        display: flex;
        /*display: -ms-flexbox;*/
        justify-content: space-between;
        left: 0;
        margin: auto;
        max-width: 1440px;
        opacity: 0;
        padding: 0 14px;
        pointer-events: none;
        position: fixed;
        right: 0;
        top: 0;
        transform: translateZ(0);
        transition: 300ms ease-out 3s;
        visibility: hidden;
        width: 100%;
        z-index: 900;
    }

    .grid-debug div {
        background-color: red;
        margin: 0 10px;
        width: 100%;
    }

    .debug:hover + .grid-debug {
        transition: 300ms ease-out;
        opacity: .3;
        visibility: visible;
    }

    .debug-nav {
        height: 0;
        opacity: 0;
        position: absolute;
        transition: 300ms ease-out 5s;
        visibility: hidden;
    }

    .debug-nav ul {
        bottom: 0;
        position: absolute;
        background-color: #FFF;
        padding: 5px;
    }

    .debug:active .debug-nav {
        opacity: 1;
        transition: 120ms ease-out;
        visibility: visible;
    }

</style>