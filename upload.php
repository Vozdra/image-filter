<?php

$method = $_SERVER['REQUEST_METHOD'];
$fileSize = $_FILES['authorsfoto']['size'];
$types = ['image/png', 'image/jpeg', 'image/jpg'];
$maxSize = 400000;
$uploads_dir = '/img-uploads';

if ($method === 'POST' && $fileSize != 0 && in_array($_FILES['authorsfoto']['type'], $types) && $fileSize < $maxSize) {
  move_uploaded_file($_FILES['authorsfoto']['tmp_name'], $uploadfile);
  alert('Ok');
}
