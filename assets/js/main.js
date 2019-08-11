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

$(function () {
	var allImg = $("img");
	var $divMain = $('<div>', { class: 'loading lStart' });
	var $divBg = $('<div>', { class: 'loadingBg' });
	var $divLoading = $('<div>', { class: 'loadingNum' });
	var $widthW = $(window).width();
	var $heightW = $(window).height();
	var span = '';
	var randomNum = '';
	var current;

	var spanNum = 40;
	for (var i = 1; i <= spanNum; i++) {
		span = $('<span>', { class: 'loadingSpan' + i });
		// console.log(randomNum);
		$divBg.append(span);
	}
	$divMain.append($divLoading);
	$divMain.append($divBg);
	$('body').prepend($divMain);

	$('.loading').removeClass('lStart');
	$('#wrap').fadeIn("slow");
	$('.loading').fadeOut(2500).queue(function () {
		this.remove();
	});
});