<?php

const CP = 1;

$response = [];

if (($handle = fopen("cp.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, "\t")) !== FALSE) {
        $test_cedex = trim(strstr($data[CP], 'CEDEX', true));
        $cp = ($test_cedex) ? $test_cedex : $data[CP];

        $response[$cp][] = array_slice($data, CP);
    }
    fclose($handle);
}

// Option 1 : Un fichier php avec le tableau
file_put_contents('data.php', '<?php $arr = ' . var_export($response, true) . ';');

//Option 2 : le fichier json.
$fp = fopen('cp.json', 'w');
fwrite($fp, json_encode($response));
fclose($fp);

$data = json_decode(file_get_contents('cp.json'), true);