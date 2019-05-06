<?php
/*
 * Remove the temp folder
 */
if(!empty($_POST['folder'])){
	$path = "3dObjects/temp/" . $_POST['folder'];
	// get all file names and remove them
	$files = glob( $path . "/*"); 
	foreach($files as $file){
		if(is_file($file))
			unlink($file);
		//Remove the folder
		rmdir($path);
		echo "All files and folder removed";
	}
}