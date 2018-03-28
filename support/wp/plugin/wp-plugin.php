<?php
/**
 * @package Oom.Foo
 */
/*
Plugin Name: Oom.Foo
Plugin URI: https://github.com/loopdotcoop/oom-foo/tree/master/wp/
Description: Initial test of the oom-hub architecture
Author: Rich Plastow for Loop.Coop
Author URI: https://richplastow.com/
License: MIT
Text Domain: oom-foo
Version: 1.3.5
*/




$debug = // show debug info on localhost when this PHP file is run directly.
    isset($_SERVER['SERVER_NAME']) && 'localhost' === $_SERVER['SERVER_NAME']
 && basename($_SERVER['REQUEST_URI']) === basename(__FILE__);
if ($debug) { error_reporting(E_ALL); ini_set('display_errors', 1); }

$oomClassesPath = dirname(__FILE__) . '/../../../dist/php/oom-foo.7.php';
include($oomClassesPath);

if ($debug) {
    foreach ($oomClasses as $classname => $class) {
        $schema = $class::$schema;
        $nameUCD = $schema['stat']['NAME']['default']; // uppercase dotted
        $nameLCU = strtolower( str_replace('.','_',$nameUCD) ); // lowercase underscored
        echo $nameUCD . ' ' . $nameLCU . "\n";
    }
}

if (! $debug) {

    //// Flush CPT rewrite rules when the plugin is activated or deactivated.
    //// https://codex.wordpress.org/Function_Reference/flush_rewrite_rules
    register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );
    register_activation_hook( __FILE__, 'oom_foo_on_activation' );
    function oom_foo_flush_rewrites() {
    	oom_foo_register_cpts();
    	flush_rewrite_rules();
    }

    //// Add some custom CMB2 field types.
    //// https://github.com/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Adding-your-own-field-types
    add_action( 'cmb2_render_text_number', 'oom_foo_cmb2_render_text_number', 10, 5 );
    function oom_foo_cmb2_render_text_number($fa, $ev, $oi, $ot, $field_type_object) {
    	echo $field_type_object->input( array('type' => 'number', 'step' => 'any') );
    }
    add_filter( 'cmb2_validate_text_number', 'oom_foo_cmb2_validate_text_number', 10, 2 );
    function oom_foo_cmb2_validate_text_number($override_value, $value) {
    	if (! is_numeric($value) ) $value = ''; // not a number? empty the value
    	return $value;
    }
    add_action( 'cmb2_render_text_nnint', 'oom_foo_cmb2_render_text_nnint', 10, 5 );
    function oom_foo_cmb2_render_text_nnint($fa, $ev, $oi, $ot, $field_type_object) {
    	echo $field_type_object->input( array('type' => 'number', 'min' => '0') );
    }
    add_filter( 'cmb2_validate_text_nnint', 'oom_foo_cmb2_validate_text_nnint', 10, 2 );
    function oom_foo_cmb2_validate_text_nnint($override_value, $value) {
    	if (! ctype_digit(strval($value)) ) $value = ''; // not a non-negative int? empty the value
    	return $value;
    }


    //// Initialise CPTs when CMB2 is ready.
    add_action('cmb2_init', 'oom_foo_register_cpts');

    //// Define CPTs and CMB2s.
    function oom_foo_register_cpts () {
        global $oomClasses;

        //// Step through each Oom class.
        foreach ($oomClasses as $classname => $class) {

            //// Get info about the class.
            $schema = $class::$schema;
            $nameUCD = $schema['stat']['NAME']['default']; // uppercase dotted
            $nameLCU = strtolower( str_replace('.', '_', $nameUCD) ); // lowercase underscored

            //// Define the class’s CPT (custom post type).
            register_post_type($nameLCU, array(
                'public'      => true
              , 'has_archive' => false
              , 'labels'      => array( 'name' => $nameUCD )
              , 'supports'    => array('title', 'author') //@TODO only if defined in `inst`
            ) );

            //// Define the class’s CMB2s (custom meta boxes).
            $box = new_cmb2_box( array(
                'id'           => $nameLCU . '_my_group'
              , 'title'        => __('My Group')
              , 'object_types' => array($nameLCU)
              , 'context'      => 'normal'
              , 'priority'     => 'high'
              , 'show_names'   => true // Show field names on the left
            ) );

            foreach ($schema['attr'] as $attrname => $desc) {
                $attrnameLCU = strtolower($attrname); // lowercase - and will already be underscored
                $box->add_field( array(
                    'id'   => $nameLCU . '_' . $attrnameLCU
                  , 'name' => $attrname . ' (' . $desc['typeStr'] . ')'
                  , 'desc' => $desc['remarks']
                  , 'type' => schemaTypeToCmb2Type( $desc['typeStr'] )
                ) );
            }


        }//foreach
    }

}//if (! $debug)



//// UTILITY

function schemaTypeToCmb2Type ($schemaType) {
    $lut = array(
        'array'     => 'textarea' //@TODO make a proper custom CMB2 for a plain array
      , 'boolean'   => 'checkbox'
      , 'function'  => 'textarea' //@TODO make a proper custom CMB2 for a function
      , 'number'    => 'text_number'
      , 'object'    => 'textarea' //@TODO make a proper custom CMB2 for a plain object
      , 'string'    => 'text_medium'
      , 'symbol'    => 'text_small' //@TODO look in to this
      , 'undefined' => 'hidden'
      , 'color'     => 'colorpicker'
      , 'nnint'     => 'text_nnint'
      , 'null'      => 'hidden'
    );
    $schemaType = strtolower($schemaType);
    if ( isset($lut[$schemaType]) )
        return $lut[$schemaType];
    return 'text';
}




?>
