(($) => {

	const $name = $('#oaName');
	const $password = $('#password');
	const $repassword = $('#confirmPassword');

	$('#submit').on('click', ()=> {
		const name = $name.val().trim();
		const pwd = $password.val();
		const repwd = $repassword.val();

		if(!name || !pwd || !repwd) {
			alert('请输入注册信息');
			return;
		}
		if(pwd !== repwd) {
			alert('密码不一致，请重新输入');
			return;
		}
		$.ajax({
			url: '/register/submit',
			type: 'POST',
			data: {
				oaName: name,
				password: pwd
			}
		})
		.done((res) => {
			if(res.code === 1) {
				alert('申请已提交，请联系管理员通过注册申请');
				location.href = '/login';
			} else {
				alert(res.detail);
			}
		})
	})

})($)
