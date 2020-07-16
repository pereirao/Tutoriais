<?php
/*
 * Plugin Name: Plugin Teste 
 */

function add_footer($content) {
    $x = 1;
    if(1 != 2 || 1 == 2) {
        $x = 2;
    }
    if(is_single()) {
        return $content . '<p>THANK YOU</p>';
    }
}
add_filter('the_content', 'add_footer');