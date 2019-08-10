{
	'use strict';
	
	const draw = document.getElementById('draw');
	var count = 1;
	draw.textContent = '?';
	
	draw.addEventListener('click', () => {
		const n2 = Math.random();
		count++;
		if (count % 2 === 0) {
			const n2 = Math.random();
			if(n2 > 0.75) {
				draw.textContent = '凶';
			} else if(n2 > 0.5) {
				draw.textContent = '小吉';
			} else if(n2 > 0.25) {
				draw.textContent = '吉';
			} else if(n2 > 0.05) {
				draw.textContent = '中吉';
			} else {
				draw.textContent = '大吉';
			}
		} else {
			draw.textContent = '?';
		}
	});
	draw.addEventListener('mousedown', () => {
		draw.classList.add('pressed');
	});
	draw.addEventListener('mouseup', () => {
		draw.classList.remove('pressed');
	});
	draw.addEventListener('mouseout', () => {
		draw.classList.remove('pressed');
	});

	var start = document.getElementById('start');
	var stop = document.getElementById('stop');
	var result = document.getElementById('result');
	var startTime;
	var isStarted = false;

	start.addEventListener('click', () => {
		if (isStarted === true) {
			return;
		}
		isStarted = true;
		startTime = Date.now();
		result.textContent = '0.000';
		result.classList.remove('standby');
		result.classList.remove('perfect');
	});
	stop.addEventListener('click', () => {
		var elapsedTime;
		var diff;
		if (isStarted === false) {
			return;
		}
		isStarted = false;
		elapsedTime = ((Date.now() - startTime) / 1000);
		result.textContent = elapsedTime.toFixed(3);
		result.classList.remove('standby');
		diff = elapsedTime - 5.0;
		if (Math.abs(diff) < 1.0) {
			result.classList.add('perfect');
		}
	});
	reset.addEventListener('click', () => {
		isStarted = false;
		result.classList.add('standby');
		result.classList.remove('perfect');
		result.textContent = '0.000';
	});

	start.addEventListener('mousedown', () => {
		start.classList.add('pushed');
	});
	start.addEventListener('mouseup', () => {
		start.classList.remove('pushed');
	});
	start.addEventListener('mouseout', () => {
		start.classList.remove('pushed');
	});
	stop.addEventListener('mousedown', () => {
		stop.classList.add('pushed');
	});
	stop.addEventListener('mouseup', () => {
		stop.classList.remove('pushed');
	});
	stop.addEventListener('mouseout', () => {
		stop.classList.remove('pushed');
	});
	reset.addEventListener('mousedown', () => {
		reset.classList.add('pushed');
	});
	reset.addEventListener('mouseup', () => {
		reset.classList.remove('pushed');
	});
	reset.addEventListener('mouseout', () => {
		reset.classList.remove('pushed');
	});
	
	(function(){
		var price = document.getElementById('price');
		var num = document.getElementById('num');
		var cashierBtn = document.getElementById('cashierBtn');
		var resultText = document.getElementById('resultText');
		var resetCashier = document.getElementById('resetCashier');
		function checkInput (){
			if(
				price.value.match(/^[1-9][0-9]*$/) !== null &&
				num.value.match(/^[1-9][0-9]*$/) !== null
			) {
				cashierBtn.classList.remove('disadled');
			} else {
				cashierBtn.classList.add('disadled');
			}
		};
		cashierBtn.addEventListener('click', () => {
			if(cashierBtn.classList.contains('disadled') === true) {
				return;
			}
			var str;
			var split = Math.floor(price.value / num.value);
			var remainder = Math.abs((split * num.value) - price.value);
			if(remainder === 0) {
				str =
					'1人' + split + '円ずつになります。'
				;
			} else {
				str =
					'1人' + split + '円になり、\n' + remainder + '円分を話し合ってください。'
				;
			}

			resultText.textContent = str;
		});
		price.addEventListener('keyup', checkInput);
		num.addEventListener('keyup', checkInput);

		resetCashier.addEventListener('click', () => {
			resultText.textContent = '';
			price.value = '';
			num.value = '';
			cashierBtn.classList.add('disadled');
			price.focus();
		});
	})();
	
	(function () {
		var range = document.getElementById('range');
		var resultPass = document.getElementById('resultPass');
		var btnPass = document.getElementsByClassName('btnPass')[0].children[0];
		var lengthLabel = document.getElementsByClassName('lengthLabel')[0];
		var numbers = document.getElementById('numbers');
		var symbols = document.getElementById('symbols');

		function getPassword() {
			var seed_letters = 'abcdefghijklmnopqrstuvwxyz';
			var seed_nums = '0123456789';
			var seed_symbols = '[]{}?!#$%()^~@&-_=+*/';
			var len = range.value;
			var seed;
			var pwd = '';
			seed = seed_letters + seed_letters.toUpperCase();
			if(numbers.checked === true) {
				seed += seed_nums;
			}
			if(symbols.checked) {
				seed += seed_symbols;
			}

			// for(var i = 0; i < len; i++) {
			// 	pwd += seed[Math.floor(Math.random() * seed.length)];
			// }
			while(len--) {
				pwd += seed[Math.floor(Math.random() * seed.length)];
			}

			resultPass.value = pwd;
		}

		lengthLabel.innerHTML = range.value;
		range.addEventListener('change', function() {
			lengthLabel.innerHTML = this.value;
		});

		btnPass.addEventListener('click', function() {
			getPassword();
		});

		resultPass.addEventListener('click', function() {
			this.select();
		});
		getPassword();
	})();
	
	(function () {
		var timer = document.getElementById('timer');
		var min = document.getElementById('min');
		var sec = document.getElementById('sec');
		var resetTimer = document.getElementById('resetTimer');
		var startTimer = document.getElementById('startTimer');
		var startTime;
		var timeLeft;
		var timeToCountDown = 0;
		var timeId;
		var isRunning = false;

		function upDateTimer(t) {
			var date = new Date(t);
			var m = date.getMinutes();
			var s = date.getSeconds();
			var ms = date.getMilliseconds();
			m = ('0' + m).slice(-2);
			s = ('0' + s).slice(-2);
			ms = ('00' + ms).slice(-3);
			timer.textContent = m + ':' + s + '.' + ms;
		};
		function countDown() {
			timeId = setTimeout(function() {
				timeLeft = timeToCountDown - (Date.now() - startTime);
				if(timeLeft < 0) {
					isRunning = false;
					startTimer.textContent = 'Start';
					startTimer.classList.remove('stopTimer');
					timer.classList.remove('remaining');
					clearTimeout(timeId);
					timeLeft = 0;
					timeToCountDown = 0;
					upDateTimer(timeLeft);
					return;
				}
				if(timeLeft <= 5 * 1000) {
					timer.classList.add('remaining');
				}

				upDateTimer(timeLeft);
				countDown();
			}, 10);
		};
		startTimer.addEventListener('click', function() {
			if(isRunning === false) {
				isRunning = true;
				this.textContent = 'Stop';
				this.classList.add('stopTimer');
				startTime= Date.now();
				countDown();
			} else {
				isRunning = false;
				this.textContent = 'Start';
				this.classList.remove('stopTimer');
				timeToCountDown = timeLeft;
				clearTimeout(timeId);
			}
		});
		min.addEventListener('click', function() {
			if(isRunning === true) {
				return;
			}
			timeToCountDown += 60 * 1000;
			if(timeToCountDown > 5 * 1000) {
				timer.classList.remove('remaining');
			}
			if(timeToCountDown >= 60 * 60 * 1000) {
				timeToCountDown = 0;
			}
			upDateTimer(timeToCountDown);
		});
		sec.addEventListener('click', function() {
			if(isRunning === true) {
				return;
			}
			timeToCountDown += 1000;
			if(timeToCountDown > 5 * 1000) {
				timer.classList.remove('remaining');
			}
			if(timeToCountDown >= 60 * 60 * 1000) {
				timeToCountDown = 0;
			}
			upDateTimer(timeToCountDown);
		});
		resetTimer.addEventListener('click', function() {
			timeToCountDown = 0;
			timer.classList.remove('remaining');
			upDateTimer(timeToCountDown);
		});

		startTimer.addEventListener('mousedown', function() {
			this.classList.add('pushed');
		});
		startTimer.addEventListener('mouseup', function() {
			this.classList.remove('pushed');
		});
		startTimer.addEventListener('mouseout', function() {
			this.classList.remove('pushed');
		});
		resetTimer.addEventListener('mousedown', function() {
			this.classList.add('pushed');
		});
		resetTimer.addEventListener('mouseup', function() {
			this.classList.remove('pushed');
		});
		resetTimer.addEventListener('mouseout', function() {
			this.classList.remove('pushed');
		});
		min.addEventListener('mousedown', function() {
			this.classList.add('pushed');
		});
		min.addEventListener('mouseup', function() {
			this.classList.remove('pushed');
		});
		min.addEventListener('mouseout', function() {
			this.classList.remove('pushed');
		});
		sec.addEventListener('mousedown', function() {
			this.classList.add('pushed');
		});
		sec.addEventListener('mouseup', function() {
			this.classList.remove('pushed');
		});
		sec.addEventListener('mouseout', function() {
			this.classList.remove('pushed');
		});
	})();
	
	(function() {
		var timerWatch = document.getElementById('timerWatch');
		var startWatch = document.getElementById('startWatch');
		var stopWatch = document.getElementById('stopWatch');
		var resetWatch = document.getElementById('resetWatch');
		var elapstime = 0;
		var startTime;
		var timeUp;
		var setTimeId;
		
		function upTimer(t) {
			var date = new Date(t);
			var min = String(date.getMinutes()).padStart(2, '0');
			var sec = String(date.getSeconds()).padStart(2, '0');
			var mills = String(date.getMilliseconds()).padStart(3, '0');
			timerWatch.textContent = min + ':' + sec + '.' + mills;
		}

	 function countUpTimer() {
			setTimeId = setTimeout(function() {
				timeUp = (Date.now() - startTime) + elapstime;
				if(timeUp >= 60 * 60 * 1000) {
					timeUp = 0;
					upTimer(timeUp);
					clearTimeout(setTimeId);
				}

				upTimer(timeUp);
				countUpTimer();
			}, 10);
		}

		function setSatrtTimer() {
			startWatch.disabled = false;
			stopWatch.disabled = true;
			resetWatch.disabled = true;
		}
		function setRunTimer() {
			startWatch.disabled = true;
			stopWatch.disabled = false;
			resetWatch.disabled = true;
		}
		function setStopTimer() {
			startWatch.disabled = false;
			stopWatch.disabled = true;
			resetWatch.disabled = false;
		}

		setSatrtTimer();
		startWatch.addEventListener('click', function() {
			setRunTimer();
			startTime = Date.now();
			countUpTimer();
		});
		stopWatch.addEventListener('click', function() {
			setStopTimer();
			elapstime += Date.now() - startTime;
			clearTimeout(setTimeId);
		});
		resetWatch.addEventListener('click', function() {
			setSatrtTimer();
			elapstime = 0;
			upTimer(elapstime);
		});

		startWatch.addEventListener('mousedown', function() {
			this.classList.add('pushed');
		});
		startWatch.addEventListener('mouseup', function() {
			this.classList.remove('pushed');
		});
		startWatch.addEventListener('mouseout', function() {
			this.classList.remove('pushed');
		});
		stopWatch.addEventListener('mousedown', function() {
			this.classList.add('pushed');
		});
		stopWatch.addEventListener('mouseup', function() {
			this.classList.remove('pushed');
		});
		stopWatch.addEventListener('mouseout', function() {
			this.classList.remove('pushed');
		});
		resetWatch.addEventListener('mousedown', function() {
			this.classList.add('pushed');
		});
		resetWatch.addEventListener('mouseup', function() {
			this.classList.remove('pushed');
		});
		resetWatch.addEventListener('mouseout', function() {
			this.classList.remove('pushed');
		});
	})();
	
	(function() {
		class Panels {
			constructor() {
				const section = document.createElement('section');
				section.classList.add('panel');
				this.img = document.createElement('img');
				this.imgSrc = './assets/images/slot/';
				this.images = [
					'seven.png',
					'bell.png',
					'cherry.png',
					'coin.png',
					'hand.png',
					'lion.png',
					'star.png',
				];
				this.alts = [
					'7',
					'ベル',
					'チェリー',
					'コイン',
					'腕',
					'ライオン',
					'星',
				];
				this.timeID = undefined;
				this.img.src = this.imgSrc + this.images[0];
				this.img.alt = this.alts[0];
				section.appendChild(this.img);

				this.stop = document.createElement('div');
				this.stop.classList.add('panelStop', 'disabled');
				this.stop.textContent = 'STOP';
				section.appendChild(this.stop);
				this.stop.addEventListener('click', () => {
					if(this.stop.className.indexOf('disabled') !== -1) {
						return;
					}
					this.stop.classList.add('disabled');
					clearTimeout(this.timeID);
					panelCount--;
					if(panelCount === 0) {
						unMatchSets();
						spin.classList.remove('disabled');
						panelCount = 3;
					}
				});

				const main = document.querySelector('.panelWrap');
				main.appendChild(section);
			}
			getRandomImages() {
				const ranNum = Math.floor(Math.random() * this.images.length);
				this.img.src = this.imgSrc + this.images[ranNum];
				this.img.alt = this.alts[ranNum];
			};
			spin() {
				this.getRandomImages();
				this.timeID = setTimeout(() => {
					this.spin();
				}, 70);
			};

			isRunning() {
				this.stop.classList.remove('disabled');
				this.img.classList.remove('unMatch');
			};

			isUnmatcheck(p1,p2) {
				return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
			}

			unMatch() {
				this.img.classList.add('unMatch');
			}
		}// class Panels

		var panelCount = 3;
		const panels = [
			new Panels(),
			new Panels(),
			new Panels(),
		];

		function unMatchSets() {
			if(panels[0].isUnmatcheck(panels[1],panels[2])) {
				panels[0].unMatch();
			}
			if(panels[1].isUnmatcheck(panels[0],panels[2])) {
				panels[1].unMatch();
			}
			if(panels[2].isUnmatcheck(panels[0],panels[1])) {
				panels[2].unMatch();
			}
		}

		const spin = document.querySelector('#spin');
		spin.addEventListener('click', function() {
			if(this.className.indexOf('disabled') !== -1) {
				return;
			}
			this.classList.add('disabled');
			panels.forEach(panel => {
				panel.spin();
				panel.isRunning();
			});
		});
	})();
	
	(function() {
		const main = document.querySelector('main');
		const thumbnails = document.querySelector('.thumbnails');
		const mainImg = document.createElement('img');
		const imgSrc = './assets/images/slider/';
		const imgItems = ['slider01.jpg','slider02.jpg','slider03.jpg','slider04.jpg',];
		var currentNum = 0;
		function setMainImage(setImg) {
			mainImg.src = imgSrc + setImg;
		}
		setMainImage(imgItems[currentNum]);
		main.appendChild(mainImg);

		function currentRemove(num) {
			document.querySelectorAll('.thumbnails li')[currentNum].classList.remove('current');
		}
		function currentAdd(num) {
			setMainImage(imgItems[currentNum]);
			document.querySelectorAll('.thumbnails li')[currentNum].classList.add('current');
		}

		imgItems.forEach((imgItem,index) => {
			const thumImg = document.createElement('img');
			const li = document.createElement('li');
			thumImg.src = imgSrc + imgItem;
			thumbnails.appendChild(li).appendChild(thumImg);
			if (currentNum === index) {
				li.classList.add('current');
			}
			li.addEventListener('click', function() {
				currentRemove(currentNum);
				currentNum = index;
				currentAdd(currentNum);
			});
		});

		var sliderID;
		function sliderPlay(setImg) {
			sliderID = setTimeout(function() {
				next.click();
				sliderPlay();
			}, 1000);
		}

		const play = document.getElementById('play');
		const prev = document.getElementById('prev');
		const next = document.getElementById('next');
		play.addEventListener('click', function() {
			if(this.textContent !== 'Pause') {
				this.textContent = 'Pause';
				sliderPlay();
			} else {
				this.textContent = 'Play';
				clearTimeout(sliderID);
			}
		});
		prev.addEventListener('click', function() {
			currentRemove(currentNum);
			currentNum--;
			if(currentNum < 0) {
				currentNum = imgItems.length - 1;
			}
			currentAdd(currentNum);
		});
		next.addEventListener('click', function() {
			currentRemove(currentNum);
			currentNum++;
			if(currentNum >= imgItems.length) {
				currentNum = 0;
			}
			currentAdd(currentNum);
		});
	})();
}
