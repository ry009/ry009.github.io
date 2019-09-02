(function () {
	'use strict';

	var canvas = document.getElementById('mycanvas');
	var balls = [];
	var Stage;
	var stage;
	canvas.width = 700;
	canvas.height = 300;

	if (!canvas || !canvas.getContext) return false;
	var ctx = canvas.getContext('2d');

	function rand(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	}

	function adjustPosition(pos, r, max) {
		if (pos - r < 0) {
			return r;
		} else if (pos + r > max) {
			return max - r;
		} else {
			return pos;
		}
	}

	canvas.addEventListener('click', function (e) {
		var x, y, r;
		var rect;
		// x = rand(100, 400);
		// y = rand(100, 200);
		rect = e.target.getBoundingClientRect();
		x = e.clientX - rect.left;
		y = e.clientY - rect.top;
		r = rand(0, 100) < 20 ? rand(50, 80) : rand(10, 35);
		// if(x - r < 0) x = r;
		// if(y - r < 0) y = r;
		// if(x + r > canvas.width) x = canvas.width - r;
		// if(y + r > canvas.height) y = canvas.height - r;
		x = adjustPosition(x, r, canvas.width);
		y = adjustPosition(y, r, canvas.height);
		balls.push(new Ball(x, y, r));
	});

	var Ball = function (x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
		// x 方向の速度
		this.vx = rand(-10, 10);
		// y 方向の速度
		this.vy = rand(-10, 10);
		// this.color = 'hsla(120, 80%, 40%, 0.8)';
		this.color = 'hsla(' + rand(0, 360) + ', ' + rand(20, 60) + '%, ' + rand(30, 80) + '%, ' + rand(0.2, 0.8) + ')';
	};

	Ball.prototype.draw = function () {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.closePath();
		ctx.fill();
	}
	Ball.prototype.move = function () {
		if (this.x + this.r > canvas.width || this.x - this.r < 0) {
			this.vx *= -1;
		}
		if (this.y + this.r > canvas.height || this.y - this.r < 0) {
			this.vy *= -1;
		}
		this.x += this.vx;
		this.y += this.vy;
	}

	// var ball = new Ball(rand(100,200), rand(100, 200), rand(10,50));
	// ball.draw();

	// function update() {
	// 	ctx.fillStyle = '#ecf0f1';
	// 	ctx.fillRect(0,0,canvas.clientWidth,canvas.height);
	// 	for (var i = 0; i < balls.length; i ++) {
	// 		balls[i].draw();
	// 		balls[i].move();
	// 	}
	// 	// ball.draw();
	// 	// ball.move();
	// 	setTimeout(function() {
	// 		update();
	// 	}, 30);
	// }
	// update();

	Stage = function () {
		this.update = function () {
			ctx.fillStyle = '#ecf0f1';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			for (var i = 0; i < balls.length; i++) {
				balls[i].draw();
				balls[i].move();
			}
			setTimeout(function () {
				this.update();
			}.bind(this), 30);
		}
	}

	stage = new Stage();
	stage.update();
})();

(function () {
	'use strict';
	var canvas = document.getElementById('clock');
	if (typeof canvas.getContext === 'undefined') { return; }
	var ctx = canvas.getContext('2d');
	var cw = canvas.width;
	var ch = canvas.height;
	var angle;
	var r = 100;

	function radians(x) {
		return Math.PI / 180 * x;
	}

	function draw() {
		for (angle = 0; angle < 360; angle += 6) {
			ctx.save();
			ctx.translate(cw / 2, ch / 2);
			ctx.rotate(radians(angle));
			ctx.beginPath();
			ctx.moveTo(0, -r);
			if (angle % 30 === 0) {
				ctx.lineWidth = 2;
				ctx.lineTo(0, -r + 10);
				ctx.font = '12px Arial';
				ctx.textAlign = 'center';
				ctx.fillText(angle / 30 || 12, 0, -r + 25);
			} else {
				ctx.lineWidth = 1;
				ctx.lineTo(0, -r + 5);
			}
			ctx.stroke();
			ctx.restore();
		}

		var h = new Date().getHours();
		var m = new Date().getMinutes();
		var s = new Date().getSeconds();
		// h
		ctx.save();
		ctx.lineWidth = 5;
		ctx.translate(cw / 2, ch / 2);
		ctx.rotate(radians(h * 30 + m * 0.5));
		ctx.beginPath();
		ctx.moveTo(0, 10);
		ctx.lineTo(0, -r + 50);
		ctx.stroke();
		ctx.restore();

		// m
		ctx.save();
		ctx.lineWidth = 3;
		ctx.translate(cw / 2, ch / 2);
		ctx.rotate(radians(m * 6));
		ctx.beginPath();
		ctx.moveTo(0, 10);
		ctx.lineTo(0, -r + 30);
		ctx.stroke();
		ctx.restore();

		// s
		ctx.save();
		ctx.strokeStyle = '#f00';
		ctx.lineWidth = 1;
		ctx.translate(cw / 2, ch / 2);
		ctx.rotate(radians(s * 6));
		ctx.beginPath();
		ctx.moveTo(0, 15);
		ctx.lineTo(0, -r + 20);
		ctx.stroke();
		ctx.restore();
	}

	function update() {
		ctx.fillStyle = '#fff'
		ctx.fillRect(0, 0, cw, ch);
		draw();
		setTimeout(function () {
			update();
		}, 30);
	}
	update();
})();

$(function () {
	'use strict';
	var canvas = document.getElementById('pinpon');
	if (typeof canvas.getContext === 'undefined') { return; }
	var ctx = canvas.getContext('2d');
	var cw = canvas.width;
	var ch = canvas.height;
	var mouseX, score, scoreLabel, paddle, ball, isPlay = false, timeID;

	var Label = function (x, y) {
		this.x = x;
		this.y = y;
		this.draw = function (text) {
			ctx.font = '12px "Century Gothic"';
			ctx.fillStyle = '#00aaff';
			ctx.textAlign = 'left';
			ctx.fillText(text, this.x, this.y);
		}
	}

	var Paddle = function (w, h) {
		this.w = w;
		this.h = h;
		this.x = cw / 2;
		this.y = ch - 30;

		this.draw = function () {
			ctx.fillStyle = '#00aaff';
			ctx.fillRect(this.x - this.w / 2, this.y, this.w, this.h);
		}
		this.move = function () {
			this.x = mouseX - $('#pinpon').offset().left;
		}
	};

	var Ball = function (x, y, vx, vy, r) {
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.r = r;

		this.draw = function () {
			ctx.beginPath();
			ctx.fillStyle = '#ff0088';
			ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
			ctx.fill();
		}
		this.move = function () {
			if (this.x - this.r < 0 || this.x + this.r > cw) {
				this.vx *= -1;
			}
			if (this.y - this.r < 0) {
				this.vy *= -1;
			}
			if (this.y + this.r > ch) {
				isPlay = false;
				$('#pinponbtn').text('Replay?').fadeIn();
			}
			this.x += this.vx;
			this.y += this.vy;
		}
		this.checkCollision = function (paddle) {
			if (
				(this.y + this.r > paddle.y && this.y + this.r < paddle.y + paddle.h) &&
				(this.x > paddle.x - paddle.w / 2 && this.x < paddle.x + paddle.w / 2)
			) {
				this.vy *= -1;
				score++;
				if (score % 3 === 0) {
					this.vx *= 1.2;
					console.log(paddle.w);
					if (paddle.w > 60) {
						paddle.w *= 0.9;
					}
				}
			}
		}
	}

	function rand(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	}

	function init() {
		isPlay = true;
		score = 0;
		paddle = new Paddle(100, 10);
		ball = new Ball(rand(10, 200), rand(10, 50), rand(5, 8), rand(5, 8), 6);
		scoreLabel = new Label(10, 20);
		scoreLabel.draw('Score: ' + score);
	}

	function update() {
		ctx.clearRect(0, 0, cw, ch);
		paddle.draw();
		paddle.move();
		ball.draw();
		ball.move();
		ball.checkCollision(paddle);
		scoreLabel.draw('Score: ' + score);
		timeID = setTimeout(function () {
			update();
		}, 30);

		if (!isPlay) {
			clearTimeout(timeID);
		}
	}

	$('body').mousemove(function (e) {
		mouseX = e.pageX;
	});

	$('#pinponbtn').click(function () {
		// $(this).fadeOut();
		init();
		update();
	});
});



// (function () {
// 	'use strict';
// 	var canvas = document.getElementById('puzzle');
// 	if (typeof canvas.getContext === 'undefined') { return; }
// 	var ctx = canvas.getContext('2d');
// 	var imgSrc = './assets/images/15puzzle.png';
// 	var img = document.createElement('img');
// 	img.src = imgSrc;
// 	var tiles = [];
// 	var RC = 4;// row count
// 	var CC = 4;// col coun
// 	var tileW = 280 / RC;
// 	var tileH = 280 / CC;
// 	var UDLR = [
// 		[0, -1],
// 		[0, 1],
// 		[-1, 0],
// 		[1, 0],
// 	];
// 	var moveCount = 320;

// 	function initTiles() {
// 		for (var row = 0; row < RC; row++) {
// 			tiles[row] = [];
// 			for (var col = 0; col < CC; col++) {
// 				tiles[row][col] = row * CC + col;
// 			}
// 		}
// 		tiles[RC - 1][CC - 1] = -1;
// 	}

// 	function drawPuzzle() {
// 		for (var row = 0; row < RC; row++) {
// 			for (var col = 0; col < CC; col++) {
// 				var dx = col * tileW;
// 				var dy = row * tileH;

// 				if (tiles[row][col] === -1) {
// 					ctx.fillStyle = '#eee';
// 					ctx.fillRect(dx, dy, tileW, tileH);
// 				} else {
// 					var sx = (tiles[row][col] % CC) * tileW;
// 					var sy = Math.floor(tiles[row][col] / RC) * tileH;
// 					ctx.drawImage(img, sx, sy, tileW, tileH, dx, dy, tileW, tileH);
// 				}
// 			}
// 		}
// 	}

// 	function checkResult() {
// 		for (var row = 0; row < RC; row++) {
// 			for (var col = 0; col < CC; col++) {
// 				if (row === RC - 1 && col === CC - 1) {
// 					return true;
// 				}
// 				if (tiles[row][col] !== row * CC + col) {
// 					return false;
// 				}
// 			}
// 		}
// 	}

// 	function moveBlank(count) {
// 		var blankRow, blankCol;
// 		var targetRow, targetCol;
// 		var targetPos;
// 		blankRow = RC - 1;
// 		blankCol = CC - 1;

// 		while (true) {
// 			targetPos = Math.floor(Math.random() * UDLR.length);
// 			targetRow = blankRow + UDLR[targetPos][1];
// 			targetCol = blankCol + UDLR[targetPos][0];

// 			if (targetRow < 0 || targetRow >= RC) {
// 				continue;
// 			}
// 			if (targetCol < 0 || targetCol >= CC) {
// 				continue;
// 			}

// 			tiles[blankRow][blankCol] = tiles[targetRow][targetCol];
// 			tiles[targetRow][targetCol] = -1;

// 			blankRow = targetRow;
// 			blankCol = targetCol;
// 			if (!--count) {
// 				break;
// 			}
// 		}
// 	}

// 	img.addEventListener('load', function () {
// 		initTiles();
// 		moveBlank(moveCount);
// 		drawPuzzle();
// 	});

// 	canvas.addEventListener('click', function (e) {
// 		var targetRow, targetCol;
// 		var x, y;
// 		var rect = e.target.getBoundingClientRect();
// 		x = e.clientX - rect.left;
// 		y = e.clientY - rect.top;
// 		var row = Math.floor(y / tileH);
// 		var col = Math.floor(x / tileW);
// 		if (tiles[row][col] === -1) {
// 			return;
// 		}

// 		for (var i = 0; i < UDLR.length; i++) {
// 			targetRow = row + UDLR[i][1];
// 			targetCol = col + UDLR[i][0];
// 			if (targetRow < 0 || targetRow >= RC) {
// 				continue;
// 			}
// 			if (targetCol < 0 || targetCol >= CC) {
// 				continue;
// 			}
// 			if (tiles[targetRow][targetCol] === -1) {
// 				tiles[targetRow][targetCol] = tiles[row][col];
// 				tiles[row][col] = -1;
// 				drawPuzzle();
// 				if (checkResult()) {
// 					setTimeout(function () {
// 						alert('Game Clear');
// 					}, 1);
// 				}
// 				break;
// 			}
// 		}
// 	});
// })();