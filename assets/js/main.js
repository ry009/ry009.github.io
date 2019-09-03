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
	var controller = new ScrollMagic.Controller();
	var twMatrixSets = $('.twMatrix');
	for (var i = 1; i <= twMatrixSets.length; i++) {
		var twMatrixName;
		if (i < 10) {
			twMatrixName = 'twMatrix0' + i;
		} else {
			twMatrixName = 'twMatrix' + i;
		}
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

	var twUl01Sets = $('.twUl01 li');
	TweenMax.set('.twUl01 li', {
		y: "100%",
		opacity: 0,
	});
	for (var i = 1; i <= twUl01Sets.length; i++) {
		var twfade01 = 'twFade10' + i;

		new ScrollMagic.Scene({ triggerElement: '.' + twfade01, offset: -250, triggerHook: 'onEnter' })
			.setTween('.' + twfade01, 2, {
				y: "0%",
				opacity: 1,
				ease: Bounce.easeOut,
			}).setClassToggle('.' + twfade01, "active")
			.addTo(controller);
	}

	var twUl02Sets = $('.twUl02 li');
	TweenMax.set('.twUl02 li', {
		y: "100%",
		opacity: 0,
	});
	for (var i = 1; i <= twUl02Sets.length; i++) {
		var twfade02 = 'twFade20' + i;

		new ScrollMagic.Scene({ triggerElement: '.' + twfade02, offset: -250, triggerHook: 'onEnter' })
			.setTween('.' + twfade02, 2, {
				y: "0%",
				opacity: 1,
				ease: Bounce.easeOut,
			}).setClassToggle('.' + twfade02, "active")
			.addTo(controller);
	}

	var animationCompSets = $('.animationComp');
	for (var i = 1; i <= twUl02Sets.length; i++) {
		var animationComp = 'animationComp0' + i;

		var text = '.' + animationComp;
		var $textplit = $(text).text().split("");
		$(text).children().addBack().contents().each(function () {
			if (this.nodeType == 3) {
				$(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));
			}
		});
		TweenMax.set('.' + animationComp + ' span', {
			y: -200,
			opacity: 0,
		});
		var animationCompSpan = TweenMax.staggerTo('.' + animationComp + ' span', 2, {
			y: 0,
			opacity: 1,
			delay: 0.6,
			ease: Bounce.easeOut,
		}, 0.1);
		new ScrollMagic.Scene({ triggerElement: '.' + animationComp, offset: 0, triggerHook: 'onEnter' })
			.setTween(animationCompSpan)
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
	$('.loading').delay(700).fadeOut(function () {
		$('.loading').remove();
	});
});



$(function () {
	$('.pageTop').hide();
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 200) {
			$('.pageTop').fadeIn();
		} else {
			$('.pageTop').fadeOut();
		}
	}).trigger('scroll');

	// スクロールのオフセット値
	var offsetY = -80;
	// スクロールにかかる時間
	var time = 500;

	// ページ内リンクのみを取得
	$('a[href^="#"]').on('click', function () {
		// 移動先となる要素を取得
		var target = $(this.hash);
		if (!target.length) return;
		// 移動先となる値
		var targetY = target.offset().top + offsetY;
		// スクロールアニメーション
		$('html,body').animate({ scrollTop: targetY }, time, 'swing');
		// デフォルトの処理はキャンセル
		return false;
	});
});

//  Headroom
$(function () {
	$(window).on('scroll', function () {
		$('header').addClass(' scrollUp');
		$('header').headroom({
			"tolerance": 0,
			"offset": $('header').outerHeight(),
			"classes": {
				"initial": "animatedFix",
				"pinned": "scrollUp",
				"unpinned": "scrollDown",
				"top": "headroom--top",
				"notTop": "headroom--not-top-scroll"
			}
		});
	});
});

// ライトボックスJS
(function () {
	var initPhotoSwipeFromDOM = function (gallerySelector) {

		// parse slide data (url, title, size ...) from DOM elements
		// (children of gallerySelector)
		var parseThumbnailElements = function (el) {
			var thumbElements = el.childNodes,
				numNodes = thumbElements.length,
				items = [],
				figureEl,
				linkEl,
				size,
				item;

			for (var i = 0; i < numNodes; i++) {

				figureEl = thumbElements[i]; // <figure> element

				// include only element nodes
				if (figureEl.nodeType !== 1) {
					continue;
				}

				linkEl = figureEl.children[0]; // <a> element

				size = linkEl.getAttribute('data-size').split('x');

				// create slide object
				item = {
					src: linkEl.getAttribute('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10)
				};



				if (figureEl.children.length > 1) {
					// <figcaption> content
					item.title = figureEl.children[1].innerHTML;
				}

				if (linkEl.children.length > 0) {
					// <img> thumbnail element, retrieving thumbnail url
					item.msrc = linkEl.children[0].getAttribute('src');
				}

				item.el = figureEl; // save link to element for getThumbBoundsFn
				items.push(item);
			}

			return items;
		};

		// find nearest parent element
		var closest = function closest(el, fn) {
			return el && (fn(el) ? el : closest(el.parentNode, fn));
		};

		// triggers when user clicks on thumbnail
		var onThumbnailsClick = function (e) {
			e = e || window.event;
			e.preventDefault ? e.preventDefault() : e.returnValue = false;

			var eTarget = e.target || e.srcElement;

			// find root element of slide
			var clickedListItem = closest(eTarget, function (el) {
				return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
			});

			if (!clickedListItem) {
				return;
			}

			// find index of clicked item by looping through all child nodes
			// alternatively, you may define index via data- attribute
			var clickedGallery = clickedListItem.parentNode,
				childNodes = clickedListItem.parentNode.childNodes,
				numChildNodes = childNodes.length,
				nodeIndex = 0,
				index;

			for (var i = 0; i < numChildNodes; i++) {
				if (childNodes[i].nodeType !== 1) {
					continue;
				}

				if (childNodes[i] === clickedListItem) {
					index = nodeIndex;
					break;
				}
				nodeIndex++;
			}



			if (index >= 0) {
				// open PhotoSwipe if valid index found
				openPhotoSwipe(index, clickedGallery);
			}
			return false;
		};

		// parse picture index and gallery index from URL (#&pid=1&gid=2)
		var photoswipeParseHash = function () {
			var hash = window.location.hash.substring(1),
				params = {};

			if (hash.length < 5) {
				return params;
			}

			var vars = hash.split('&');
			for (var i = 0; i < vars.length; i++) {
				if (!vars[i]) {
					continue;
				}
				var pair = vars[i].split('=');
				if (pair.length < 2) {
					continue;
				}
				params[pair[0]] = pair[1];
			}

			if (params.gid) {
				params.gid = parseInt(params.gid, 10);
			}

			if (!params.hasOwnProperty('pid')) {
				return params;
			}
			params.pid = parseInt(params.pid, 10);
			return params;
		};

		var openPhotoSwipe = function (index, galleryElement, disableAnimation) {
			var pswpElement = document.querySelectorAll('.pswp')[0],
				gallery,
				options,
				items;

			items = parseThumbnailElements(galleryElement);

			// define options (if needed)
			options = {
				index: index,
				zoomEl: true,
				shareEl: false,

				// define gallery index (for URL)
				galleryUID: galleryElement.getAttribute('data-pswp-uid'),

				getThumbBoundsFn: function (index) {
					// See Options -> getThumbBoundsFn section of documentation for more info
					var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
						pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
						rect = thumbnail.getBoundingClientRect();

					return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
				}

			};

			if (disableAnimation) {
				options.showAnimationDuration = 0;
			}

			// Pass data to PhotoSwipe and initialize it
			gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
		};

		// loop through all gallery elements and bind events
		var galleryElements = document.querySelectorAll(gallerySelector);

		for (var i = 0, l = galleryElements.length; i < l; i++) {
			galleryElements[i].setAttribute('data-pswp-uid', i + 1);
			galleryElements[i].onclick = onThumbnailsClick;
		}

		// Parse URL and open gallery if it contains #&pid=3&gid=1
		var hashData = photoswipeParseHash();
		if (hashData.pid > 0 && hashData.gid > 0) {
			openPhotoSwipe(hashData.pid - 1, galleryElements[hashData.gid - 1], true);
		}
	};

	// execute above function

	window.onload = function () {
		initPhotoSwipeFromDOM(".my-gallery");
	}
})();