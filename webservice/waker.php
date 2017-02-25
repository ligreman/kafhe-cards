<?php
date_default_timezone_set('Europe/Paris');
$date = date('d-m-Y_h-i-s_a', time());

$xmlData = file_get_contents('https://server-lovehinaesp.rhcloud.com/api/');

$str = $date . ' --> ' . $xmlData;

file_put_contents("./data-" . $date, $str);

echo "OK";
