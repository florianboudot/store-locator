<?php
foreach (new DirectoryIterator('../scripts/') as $fileInfo) {
    if ($fileInfo->getFileName() == "bundle.js") {
        echo $fileInfo->getMTime();
    }
}
