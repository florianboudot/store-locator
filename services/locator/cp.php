<?php

$json_data = file_get_contents('cp.json');
$cp = json_decode($json_data, true);
//include "data.php";

$result = array();
if (isset($cp) && count($cp)) {
    $result = array();
    for ($i = 0; count($cp[$_GET['cp']]) > $i; $i++) {
        $item = $cp[$_GET['cp']][$i];
        $array = array(
            "geometry" => array(
                "coordinates" => array($item[9], $item[8]),
                "type" => "Point"
            ),
            "properties" => array(
                "layer" => "locality",
                "postalcode" => $item[0],
                "locality" => $item[1],
                "label" => $item[1] . ", France"
            )
        );
        array_push($result, $array);
    }
}
$json = array("datas" => $result);
header('Content-Type: application/json; charset=utf8');
echo json_encode($json);
unset($json_data);
unset($cp);
?>