$('#loginForm').submit(function (e) {
	e.preventDefault();
	var _this = $(this),
		action = _this.attr("action");
	$.post(action, _this.serialize(), function (data) {
		$('.ajaxMsg').html(data).show();
	});
});