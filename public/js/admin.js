(($) => {

	const $name = $('#oaName');
	const $password = $('#password');
	
	$('.J-btn').on('click', function() {
		const username = $($(this).parent().siblings('.J-name')[0]).text();
		const r = confirm(`通过${username}的注册？`);

		r && $.ajax({
			url: '/admin/user',
			type: 'POST',
			data: {
				oaName: username,
				
			}
		})
		.done((res) => {
			if(res.code === 0) {
				alert(res.detail);
			} else if(res.code === 1) {
				alert('已通过');
				location.reload();
			}
		})
	})

})($)
