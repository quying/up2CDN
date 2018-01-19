(($) => {
	const $form = $('#form'),
		$project = $('#project'),
		$fileInput = $('#file');
	
	$fileInput.on('change', (e) => {
		$form.submit();
	})
})($)
