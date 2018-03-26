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
Version: 1.0.0 */ // OOMBUMPABLE


$debug = isset($_SERVER['SERVER_NAME'])&&'localhost' == $_SERVER['SERVER_NAME'];
if ($debug) { error_reporting(E_ALL); ini_set('display_errors', 1); }

$classesPath = dirname(__FILE__) . '/../../dist/php/oom-foo.7.php';
include($classesPath);

echo '<pre>' . print_r($classes['Oom.Foo.Post']::$schema,1) . 'ok</pre>';


?>
