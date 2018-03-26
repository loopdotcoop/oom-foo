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


$debug = isset($_SERVER['SERVER_NAME'])&&'localhost' == $_SERVER['SERVER_NAME'];
if ($debug) { error_reporting(E_ALL); ini_set('display_errors', 1); }

$classesPath = dirname(__FILE__) . '/../../dist/php/oom-foo.7.php';
include($classesPath);

echo '<pre>' . print_r($classes['Oom.Foo.Post']::$schema,1) . 'ok</pre>';


?>
