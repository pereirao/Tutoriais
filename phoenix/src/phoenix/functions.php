<?php

function themebs_enqueue_styles() {
  wp_enqueue_style( 'bootstrap', get_template_directory_uri() . '/assets/css/bootstrap.min.css' );
  wp_enqueue_style( 'core', get_template_directory_uri() . '/style.css' );
  wp_enqueue_script( 'bootstrap', get_template_directory_uri() . '/assets/js/vendor/bootstrap.bundle.min.js', array( 'jquery' ) );

}
add_action( 'wp_enqueue_scripts', 'themebs_enqueue_styles');

