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
Version: 1.3.4 */ // OOMBUMPABLE


$debug = // show debug info on localhost when this PHP file is run directly.
    isset($_SERVER['SERVER_NAME']) && 'localhost' === $_SERVER['SERVER_NAME']
 && basename($_SERVER['REQUEST_URI']) === basename(__FILE__);
if ($debug) { error_reporting(E_ALL); ini_set('display_errors', 1); }

$oomClassesPath = dirname(__FILE__) . '/../../../dist/php/oom-foo.7.php';
include($oomClassesPath);

if ($debug)
    echo '<pre>' . print_r($oomClasses['Oom.Foo.Post']::$schema,1) . 'ok</pre>';


?>
