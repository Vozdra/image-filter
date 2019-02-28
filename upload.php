<?php

$method = $_SERVER["REQUEST_METHOD"];
$fileSize = $_FILES["img"]["size"];
$types = ["image/png", "image/jpeg", "image/jpg"];
$maxFileSize = 400000;
$uploads_dir = "img-uploads/";
$uploadfile = $uploads_dir . basename($_FILES["img"]["name"]);
$json = [];

if (!file_exists("img-uploads")) {
  mkdir("img-uploads");
}

$dir = "img-uploads";
$files = new FilesystemIterator($dir);
$fileCount = iterator_count($files);

if ($fileCount > 10) {
  foreach ($files as $file) {      
    if (file_exists($file)) {
      unlink($file);
    }   
  }
  rmdir("img-uploads");

  $json["error"] = "Загруженно слишком много файлов.\nПерезагрузите страницу и продолжайте работу с приложением.";
  echo json_encode($json);
  return;
}

if ($method === "POST" && $fileSize != 0 && in_array($_FILES["img"]["type"], $types) && $fileSize < $maxFileSize) {

  if(move_uploaded_file($_FILES["img"]["tmp_name"], $uploadfile)) {
    $json["success"] = "Файл корректен и был успешно загружен.";
  } else {
    $json["warning"] = "Возможная атака с помощью файловой загрузки!\nХакер, что ли? O_o";
  }
  
}

echo json_encode($json);
