<?php

/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * Este archivo redirige todas las peticiones a public/index.php
 */

define('LARAVEL_START', microtime(true));

// Determinar si la petición es para un archivo estático en public
$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? ''
);

// Si el archivo existe en public, servirlo directamente
if ($uri !== '/' && file_exists(__DIR__.'/public'.$uri)) {
    return false;
}

// Requerir el index.php de Laravel que está en public
require_once __DIR__.'/public/index.php';