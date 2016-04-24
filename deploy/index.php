<?php
    $output = '<h3>Upgrade on the way...</h3>';
    $output . exec('cd .. && git pull --rebase');
    $output . '<h1>Running latest Desvaloriza version.</h1>';
    echo $output;
?>
