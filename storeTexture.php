<?php
/*
 * Store the imported texture in a temp folder to load it in the scene
 */
var_dump($_FILES);

if (isset($_FILES['files']))
{
	$errors = [];
	$path = '3dObjects/temp/';
	$file_name = $_FILES['files']['name'][0];
	$file_tmp = $_FILES['files']['tmp_name'][0];

	$file = $path . $file_name;
	move_uploaded_file($file_tmp, $file);

	if ($errors)
	{
		var_dump($errors);
	}
}
