(($) => {

	const $name = $('#oaName');
	const $password = $('#password');
	

	$('#submit').on('click', ()=> {
		const name = $name.val().trim();
		const pwd = $password.val();
		
		if(!name || !pwd ) {
			alert('请输入登陆信息');
			return;
		}
		
		$.ajax({
			url: '/login/submit',
			type: 'POST',
			data: {
				oaName: name,
				password: pwd
			}
		})
		.done((res) => {
			if(res.code === 0) {
				alert(res.detail);
			} else if(res.code === 1) {
				location.href = '/';
			}
		})
	})

})($)
