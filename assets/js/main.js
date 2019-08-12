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
// ページ読み込み中にローディング画面
$(function () {
	var h = $(window).height(); // ブラウザウィンドウの高さを取得
	var $divMain = $('<div>', { class: 'loading lStart' });
	var $divBg = $('<div>', { class: 'loadingBg' });
	var $divLoading = $('<div>', { class: 'loadingNum' });
	// $('.loader').height(h); // ウィンドウの高さに合わせでローディング画面を表示
	var span = '';
	var spanNum = 40;
	for (var i = 1; i <= spanNum; i++) {
		span = $('<span>', { class: 'loadingSpan' + i });
		// console.log(randomNum);
		$divBg.append(span);
	}
	$divMain.append($divLoading);
	$divMain.append($divBg);
	$('body').removeClass('bgNone').prepend($divMain);

});
$(window).on('load', function () {
	$('#wrap').fadeIn("slow");
	$divMain.delay(700).fadeOut(2500, function () {
		$divMain.remove();
	});
});
