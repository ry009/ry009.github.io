'use strict';
function maskSet(canvas) {
	var canvas = canvas;
	var boxWidth = $('.canvasBlock').width();

	canvas.width = boxWidth;
	canvas.height = boxWidth;
	const img = canvas.children[0];
	// console.log(img);
	let imgSrc = img.src;
	var ctx = canvas.getContext('2d');
	var bgImg = new Image();
	bgImg.src = imgSrc;
	// ctx.scale(0.7, 0.7);

	bgImg.onload = function frameSets() {
		ctx.globalCompositeOperation = 'source-over';
		ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
		drawMask();
		requestAnimationFrame(frameSets);
	}


	function elastic(max, min) {
		var _max = max || 100;
		var _min = min || _max - 10;
		var isReverse = false;
		var amount = 0.1;

		return {
			count: function (num) {
				return function () {
					if (num > _max) {
						isReverse = true;
					} else if (num <= _min) {
						isReverse = false;
					}
					if (isReverse) {
						num -= amount;
					} else {
						num += amount;
					}
					return num.toFixed(1);
				};
			}
		};
	}

	var DATA = {
		// ここのx, yの値は、d.x, d.yと揃える
		x: elastic(canvas.width * 0.95, canvas.height * 0.95).count(canvas.width * 0.95),
		y: elastic(canvas.height * 0.5, canvas.height * 0.5).count(canvas.width * 0.5),
		a: {
			cp1x: elastic(canvas.width * 0.95, canvas.height * 0.95).count(canvas.width * 0.95),
			cp1y: elastic(canvas.width * 0.25, canvas.height * 0.225).count(canvas.width * 0.225),
			cp2x: elastic(canvas.width * 0.75, canvas.height * 0.75).count(canvas.width * 0.75),
			cp2y: elastic(canvas.width * 0.025, 1).count(canvas.width * 0.025),
			x: elastic(canvas.width * 0.5, canvas.height * 0.5).count(canvas.width * 0.5),
			y: elastic(canvas.width * 0.025, 1).count(canvas.width * 0.025)
		},
		b: {
			cp1x: elastic(canvas.width * 0.25, canvas.height * 0.25).count(canvas.width * 0.25),
			cp1y: elastic(canvas.width * 0.025, canvas.width * 0.025).count(canvas.width * 0.025),
			cp2x: elastic(canvas.width * 0.025, canvas.height * 0.025).count(canvas.width * 0.025),
			cp2y: elastic(canvas.width * 0.25, canvas.height * 0.25).count(canvas.width * 0.25),
			x: elastic(canvas.width * 0.025, 1).count(canvas.width * 0.025),
			y: elastic(canvas.width * 0.5, canvas.height * 0.5).count(canvas.width * 0.5)
		},
		c: {
			cp1x: elastic(canvas.width * 0.025, 1).count(canvas.width * 0.025),
			cp1y: elastic(canvas.width * 0.75, canvas.height * 0.75).count(canvas.width * 0.75),
			cp2x: elastic(canvas.width * 0.25, canvas.height * 0.225).count(canvas.width * 0.225),
			cp2y: elastic(canvas.width * 0.95, canvas.height * 0.91).count(canvas.width * 0.95),
			x: elastic(canvas.width * 0.5, canvas.height * 0.5).count(canvas.width * 0.5),
			y: elastic(canvas.width * 0.95, canvas.height * 0.91).count(canvas.width * 0.95)
		},
		d: {
			cp1x: elastic(canvas.width * 0.75, canvas.height * 0.75).count(canvas.width * 0.75),
			cp1y: elastic(canvas.width * 0.95, canvas.height * 0.95).count(canvas.width * 0.95),
			cp2x: elastic(canvas.width * 0.95, canvas.height * 0.95).count(canvas.width * 0.95),
			cp2y: elastic(canvas.width * 0.75, canvas.height * 0.75).count(canvas.width * 0.75),
			x: elastic(canvas.width * 0.95, canvas.height * 0.95).count(canvas.width * 0.95),
			y: elastic(canvas.width * 0.5, canvas.height * 0.5).count(canvas.width * 0.5)
		}
	};

	var drawMask = function () {
		ctx.beginPath();
		ctx.moveTo(DATA.x(), DATA.y());
		ctx.globalCompositeOperation = 'destination-in';
		ctx.bezierCurveTo(DATA.a.cp1x(), DATA.a.cp1y(), DATA.a.cp2x(), DATA.a.cp2y(), DATA.a.x(), DATA.a.y());
		ctx.bezierCurveTo(DATA.b.cp1x(), DATA.b.cp1y(), DATA.b.cp2x(), DATA.b.cp2y(), DATA.b.x(), DATA.b.y());
		ctx.bezierCurveTo(DATA.c.cp1x(), DATA.c.cp1y(), DATA.c.cp2x(), DATA.c.cp2y(), DATA.c.x(), DATA.c.y());
		ctx.bezierCurveTo(DATA.d.cp1x(), DATA.d.cp1y(), DATA.d.cp2x(), DATA.d.cp2y(), DATA.d.x(), DATA.d.y());
		ctx.fill();
		ctx.closePath();
	}
}
function mask(canvas) {
	maskSet(canvas);
}
// function mask02(canvas) {
// 	maskSet(canvas);
// }
// function mask03(canvas) {
// 	maskSet(canvas);
// }
// function mask04(canvas) {
// 	maskSet(canvas);
// }
// function mask05(canvas) {
// 	maskSet(canvas);
// }
$(window).on('load resize', function () {
	mask(document.getElementById('canvasMask01'));
	// mask02(document.getElementById('canvasMask02'));
	// mask03(document.getElementById('canvasMask03'));
	// mask04(document.getElementById('canvasMask04'));
	// mask05(document.getElementById('canvasMask05'));
});