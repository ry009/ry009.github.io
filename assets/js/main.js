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
	let controller = new ScrollMagic.Controller();
	var twMatrixSets = $('.twMatrix');
	for (var i = 1; i <= twMatrixSets.length; i++) {
		var twMatrixName = 'twMatrix0' + i;
		TweenMax.set('.' + twMatrixName, {
			skewY: 0.7, skewX: 1.5, scaleX: 0, scaleY: 0, y: -50,
			rotation: 180,
			rotationX: 360,
			rotationY: 360,
		});

		new ScrollMagic.Scene({ triggerElement: '.' + twMatrixName, triggerHook: 'onEnter' })
			.setTween('.' + twMatrixName, 2, {
				scaleX: 1,
				skewY: 0,
				skewX: 0,
				scaleY: 1,
				y: 0,
				rotation: 0,
				rotationX: 0,
				rotationY: 0,
				ease: Back.easeOut,
			})
			.addTo(controller);
	}
});

// ページ読み込み中にローディング画面
$(function () {
	var h = $(window).height(); // ブラウザウィンドウの高さを取得
	var $divMain = $('.loading');
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
	$('.loading').addClass("over");
	$('.loading').delay(700).fadeOut(2500, function () {
		$('.loading').remove();
	});
});