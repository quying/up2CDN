(($) => {
	const $form = $('#form'),
		$project = $('#project'),
		$fileInput = $('#file');
	
	$fileInput.on('change', (e) => {
		const data = new FormData($form[0]);
		
		$.ajax({
			url: '/upload',
			type: 'POST',
			data: data,
			processData: false,
    		contentType: false
		})
		.done((res) => {
			if(res.code === 0) {
				alert(res.detail);
			} else if(res.code === 1) {
				location.reload();
			}
		})
		.fail((err) => {
			alert('network error.');
		})
	})
})($)
