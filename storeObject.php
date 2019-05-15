<?php
/*
 * Store the object in the storage folder
 */
var_dump($_FILES);

if (isset($_FILES['files']))
{
	$errors = [];
	$path = '3dObjects/storage/';
	$file_name = 'object.glb';
	$file_tmp = $_FILES['files']['tmp_name'][0];

	$file = $path . $file_name;
	move_uploaded_file($file_tmp, $file);

	if ($errors)
	{
		var_dump($errors);
	}
}
