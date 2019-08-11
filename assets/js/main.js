'use strict';
$(function () {
	$(window).scroll(function () {
		var scrollTop = $(this).scrollTop();
		var target = $('.actionText');

		target.each(function () {
			var startAction = $(this).offset().top - $(window).height();
			if (scrollTop >= startAction) {
				$(this).addClass('action');
			}

		});
	});
});
$(function () {
	if ($('.actionText').length) {
		$('.actionText').each(function () {
			var text = $(this).text().split('');
			var layout = '';
			for (var i = 0; i < text.length; i++) {
				layout += '<span>' + text[i] + '</span>';
			}
			$(this).empty().html(layout);
		});
	}
});
