<?php
/*
 * Store the imported file in a temp folder to load it in the scene
 */
var_dump($_FILES);

if (isset($_FILES['files']))
{
	$errors = [];
	$path = 'fonts/';
	$file_name = strtolower($_FILES['files']['name'][0]);
	//Add "typeface" in file name
	if (stripos($file_name, 'typeface') == FALSE){
		$file_name = substr($file_name, 0, stripos($file_name, '.'));
		$file_name = $file_name . '.typeface.json';
	}
	$file_tmp = $_FILES['files']['tmp_name'][0];

	$file = $path . $file_name;
	move_uploaded_file($file_tmp, $file);

	if ($errors)
	{
		var_dump($errors);
	}
}
