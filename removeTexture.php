<?php
/*
 * Remove all the user imported fonts
 */
$path = "fonts/";
$basefonts = ['helvetiker', 'optimer', 'gentilis', 'droid_sans', 'droid_serif'];
//Get all the files
$files = glob( $path . "/*"); 
$ok = FALSE;
//Check if file is base font
foreach($files as $file){
	foreach($basefonts as $font){
		if (stripos($file, $font) != FALSE){
			$ok = TRUE;
		}
	}
	if ($ok != TRUE){
		unlink($file);
		echo $file . " removed";
	}	
	$ok = FALSE;
}