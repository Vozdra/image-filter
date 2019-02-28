<?php

if (!file_exists("img-uploads")) return;

$dir = "img-uploads";
$files = new FilesystemIterator($dir);

foreach ($files as $file) {      
  if (file_exists($file)) {
    unlink($file);
  }   
}
rmdir("img-uploads");
