<?php
/**
 * @package ${{title}}
 */
/*
Plugin Name: ${{title}}
Plugin URI: ${{repo}}/tree/master/wp/
Description: ${{description}}
Author: Rich Plastow for Loop.Coop
Author URI: https://richplastow.com/
License: MIT
Text Domain: ${{projectLC}}
Version: ${{version}} */ // OOMBUMPABLE


$debug = // show debug info on localhost when this PHP file is run directly.
    isset($_SERVER['SERVER_NAME']) && 'localhost' === $_SERVER['SERVER_NAME']
 && basename($_SERVER['REQUEST_URI']) === basename(__FILE__);
if ($debug) { error_reporting(E_ALL); ini_set('display_errors', 1); }

$oomClassesPath = dirname(__FILE__) . '/../../../dist/php/oom-foo.7.php';
include($oomClassesPath);

if ($debug)
    echo '<pre>' . print_r($oomClasses['Oom.Foo.Post']::$schema,1) . 'ok</pre>';


?>
