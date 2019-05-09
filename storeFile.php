<?php
/*
 * Store the imported file in a temp folder to load it in the scene
 */
var_dump($_FILES);

if (isset($_FILES['files']))
{
	$errors = [];
	$path = '3dObjects/temp/' . $_POST['folder'] . '/';
	mkdir($path);
	chmod($path, 0777);

	$all_files = count($_FILES['files']['tmp_name']);

	for ($i = 0; $i < $all_files; $i++) {
		$file_name = $_FILES['files']['name'][$i];
		$file_tmp = $_FILES['files']['tmp_name'][$i];
		$a = explode('.', $file_name);
		$b = end($a);
		$file_ext = strtolower($b);

		$file = $path . $file_name;
		move_uploaded_file($file_tmp, $file);
	}

	if ($errors)
	{
		var_dump($errors);
	}
}
