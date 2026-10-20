// Dismiss loading overlay smoothly
function hideLoading() {
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
}
$(document).ready(hideLoading);
$(window).load(hideLoading);
setTimeout(hideLoading, 800);

// Spectacular Celebration with Rich Ribbon Streamers and Stars
function triggerCelebration() {
	var animationEnd = Date.now() + 6500;
	var colors = ["#FFD700", "#FF69B4", "#00CED1", "#FF4500", "#99C96A", "#8377E4", "#FF85A2", "#20CFB4"];

	if (typeof confetti === 'function') {
		// 1. Long, colorful fluttering ribbon streamers from bottom-left
		confetti({
			particleCount: 45,
			angle: 60,
			spread: 55,
			startVelocity: 65,
			decay: 0.91,
			scalar: 1.8,
			flat: true,
			origin: { x: 0.05, y: 0.8 },
			colors: ["#FF1493", "#FF4500", "#FFD700", "#00CED1", "#8377E4", "#32CD32"],
			zIndex: 100000
		});

		// Long, colorful fluttering ribbon streamers from bottom-right
		confetti({
			particleCount: 45,
			angle: 120,
			spread: 55,
			startVelocity: 65,
			decay: 0.91,
			scalar: 1.8,
			flat: true,
			origin: { x: 0.95, y: 0.8 },
			colors: ["#FF1493", "#FF4500", "#FFD700", "#00CED1", "#8377E4", "#32CD32"],
			zIndex: 100000
		});

		// Center waterfall ribbon streamers
		confetti({
			particleCount: 35,
			angle: 90,
			spread: 120,
			startVelocity: 42,
			decay: 0.92,
			scalar: 2.0,
			flat: true,
			origin: { x: 0.5, y: 0.05 },
			colors: ["#FF1493", "#FF4500", "#FFD700", "#00CED1", "#8377E4", "#32CD32"],
			zIndex: 100000
		});

		// 2. Golden Star bursts from both sides
		confetti({
			particleCount: 65,
			angle: 60,
			spread: 70,
			origin: { x: 0.08, y: 0.75 },
			shapes: ['star'],
			scalar: 1.35,
			colors: ["#FFD700", "#FFA500", "#FF69B4", "#FFF8DC", "#FF4500"],
			zIndex: 100000
		});
		confetti({
			particleCount: 65,
			angle: 120,
			spread: 70,
			origin: { x: 0.92, y: 0.75 },
			shapes: ['star'],
			scalar: 1.35,
			colors: ["#FFD700", "#FFA500", "#FF69B4", "#FFF8DC", "#FF4500"],
			zIndex: 100000
		});

		// 3. Flowing ribbons across the screen via tsParticles ribbons
		if (typeof ribbons === 'function') {
			try {
				ribbons({
					zIndex: 99999,
					count: 18,
					scalar: 2.2,
					disableForReducedMotion: false,
					colors: ["#FF0055", "#00D1FF", "#FFD23F", "#61FF7E", "#B284FF", "#FF4500", "#FF69B4"]
				});
				var ribbonsInterval = setInterval(function() {
					if (Date.now() >= animationEnd) {
						clearInterval(ribbonsInterval);
						return;
					}
					ribbons({
						zIndex: 99999,
						count: 12,
						scalar: 2.0,
						disableForReducedMotion: false,
						colors: ["#FF0055", "#00D1FF", "#FFD23F", "#61FF7E", "#B284FF", "#FF4500", "#FF69B4"]
					});
				}, 1800);
			} catch(e) {
				console.log('Ribbons:', e);
			}
		}

		// 4. Continuous colorful shower with golden stars and confetti falling from top
		var confettiInterval = setInterval(function() {
			if (Date.now() >= animationEnd) {
				clearInterval(confettiInterval);
				return;
			}
			confetti({
				particleCount: 9,
				angle: 90,
				spread: 85,
				origin: {
					x: Math.random(),
					y: 0
				},
				gravity: 1.15,
				ticks: 220,
				shapes: Math.random() > 0.4 ? ['star', 'circle'] : ['circle', 'square'],
				scalar: Math.random() > 0.5 ? 1.25 : 0.85,
				zIndex: 100000,
				colors: colors
			});
		}, 55);
	}
}
window.triggerCelebration = triggerCelebration;

$('document').ready(function(){
	function arrangeBalloons(isResize) {
		if ($('#b11').length === 0) return;

		var winW = $(window).width();
		var winH = $(window).height();
		var animDuration = isResize ? 250 : 600;

		$('#b11,#b22,#b33,#b44,#b55,#b66,#b77,#b88,#b99').stop();

		// Determine banner resting bottom position so balloons never overlap banner
		var bannerImg = document.querySelector('.bannar');
		var bannerBottom = 160;
		if (bannerImg) {
			var r = bannerImg.getBoundingClientRect();
			if (r.bottom > 40 && r.height > 20) {
				bannerBottom = r.bottom;
			}
		}

		if (winW >= 768 || (winW >= 560 && winH <= 500)) {
			// Single row layout: "H B D" + Cute Gap + "M A L K I N"
			// Position balloons clearly below banner, leaving plenty of vertical room for card below
			var targetTop = Math.max(bannerBottom + 4, winH <= 650 ? 138 : 155);
			var center = winW / 2;
			var scale = winW >= 1100 ? 1 : Math.max(0.68, (winW - 40) / 1100);
			var step = 70 * scale;
			var wordGap = 88 * scale; // Clean gap between "HBD" and "MALKIN"

			// Mathematically centered row:
			// B1..B3 are H B D, B4..B9 are M A L K I N
			var positions = [
				// H B D
				{ id: '#b11', left: center - 3.5 * step - (wordGap / 2), top: targetTop },
				{ id: '#b22', left: center - 2.5 * step - (wordGap / 2), top: targetTop },
				{ id: '#b33', left: center - 1.5 * step - (wordGap / 2), top: targetTop },
				// M A L K I N
				{ id: '#b44', left: center - 1.5 * step + (wordGap / 2), top: targetTop },
				{ id: '#b55', left: center - 0.5 * step + (wordGap / 2), top: targetTop },
				{ id: '#b66', left: center + 0.5 * step + (wordGap / 2), top: targetTop },
				{ id: '#b77', left: center + 1.5 * step + (wordGap / 2), top: targetTop },
				{ id: '#b88', left: center + 2.5 * step + (wordGap / 2), top: targetTop },
				{ id: '#b99', left: center + 3.5 * step + (wordGap / 2), top: targetTop }
			];

			$.each(positions, function(idx, item) {
				$(item.id).animate({ top: item.top, left: item.left }, animDuration);
			});
		} else {
			// Two rows for mobile / compact screens:
			// Row 1: "H B D"
			// Row 2: "M A L K I N"
			var isSmallMobile = winW <= 500;
			var balloonW = isSmallMobile ? Math.min(48, winW * 0.12) : 58;
			var targetTop1 = Math.max(bannerBottom + 8, isSmallMobile ? 155 : 175);
			var rowGap = isSmallMobile ? 65 : 82;
			var targetTop2 = targetTop1 + rowGap;
			var center = winW / 2;
			var step1 = Math.min(isSmallMobile ? 56 : 72, (winW - 30) / 3);
			var step2 = Math.min(isSmallMobile ? 42 : 50, (winW - 20) / 6);

			var positions = [
				// Row 1: H B D
				{ id: '#b11', left: center - step1 - (balloonW / 2), top: targetTop1 },
				{ id: '#b22', left: center - (balloonW / 2), top: targetTop1 },
				{ id: '#b33', left: center + step1 - (balloonW / 2), top: targetTop1 },
				// Row 2: M A L K I N
				{ id: '#b44', left: center - 2.5 * step2 - (balloonW / 2), top: targetTop2 },
				{ id: '#b55', left: center - 1.5 * step2 - (balloonW / 2), top: targetTop2 },
				{ id: '#b66', left: center - 0.5 * step2 - (balloonW / 2), top: targetTop2 },
				{ id: '#b77', left: center + 0.5 * step2 - (balloonW / 2), top: targetTop2 },
				{ id: '#b88', left: center + 1.5 * step2 - (balloonW / 2), top: targetTop2 },
				{ id: '#b99', left: center + 2.5 * step2 - (balloonW / 2), top: targetTop2 }
			];

			$.each(positions, function(idx, item) {
				$(item.id).animate({ top: item.top, left: item.left }, animDuration);
			});
		}
	}
	window.arrangeBalloons = arrangeBalloons;

	var lastW = $(window).width();
	var lastH = $(window).height();
	var resizeTimeout;
	$(window).resize(function(){
		var nw = $(window).width();
		var nh = $(window).height();
		if (Math.abs(nw - lastW) > 15 || Math.abs(nh - lastH) > 15) {
			lastW = nw;
			lastH = nh;
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function(){
				arrangeBalloons(true);
			}, 120);
		}
	});

	// =========================================================================
	// CUTE AUDIO POP SYNTHESIZER (Web Audio API - Low volume, respects mute)
	// =========================================================================
	function playCutePopSound() {
		var audioEl = $('.song')[0];
		if (audioEl && audioEl.muted) return; // Respect mute button!
		try {
			var AudioContext = window.AudioContext || window.webkitAudioContext;
			if (!AudioContext) return;
			if (!window._cuteAudioCtx) {
				window._cuteAudioCtx = new AudioContext();
			}
			if (window._cuteAudioCtx.state === 'suspended') {
				window._cuteAudioCtx.resume();
			}
			var ctx = window._cuteAudioCtx;
			var osc = ctx.createOscillator();
			var gain = ctx.createGain();

			osc.type = 'sine';
			var now = ctx.currentTime;
			osc.frequency.setValueAtTime(440, now);
			osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

			gain.gain.setValueAtTime(0.12, now);
			gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

			osc.connect(gain);
			gain.connect(ctx.destination);

			osc.start(now);
			osc.stop(now + 0.09);
		} catch(e) {}
	}

	// =========================================================================
	// BUTTON SPARKLE BURST & MASCOT CONTROLLER
	// =========================================================================
	function createButtonSparkleBurst(btn) {
		if (!btn) return;
		var rect = btn.getBoundingClientRect();
		var sparkles = ['✨', '💖', '🌸', '⭐', '💫', '🎉'];
		var $layer = $('#cursor_trail_layer');
		if (!$layer.length) return;

		for (var i = 0; i < 6; i++) {
			var $dot = $('<span class="cursor-sparkle-dot"></span>');
			$dot.text(sparkles[Math.floor(Math.random() * sparkles.length)]);
			var offsetX = (Math.random() - 0.5) * (rect.width * 0.9);
			var offsetY = (Math.random() - 0.5) * 20;
			$dot.css({
				left: (rect.left + rect.width / 2 + offsetX) + 'px',
				top: (rect.top + rect.height / 2 + offsetY) + 'px'
			});
			$layer.append($dot);
			(function($el) {
				setTimeout(function() { $el.remove(); }, 800);
			})($dot);
		}
	}

	function updateMascotMood(animClass, emoji) {
		var $mascot = $('#panel_cat_mascot');
		var $badge = $('#mascot_mood_badge');
		if ($mascot.length) {
			$mascot.removeClass('mascot-idle mascot-hop mascot-dance mascot-wave mascot-float mascot-clap mascot-starry mascot-celebrate mascot-blush');
			$mascot.addClass(animClass);
		}
		if ($badge.length && emoji) {
			$badge.text(emoji);
		}
	}

	// Interactive mascot tap
	$('#panel_cat_mascot').click(function() {
		playCutePopSound();
		createButtonSparkleBurst(this);
		updateMascotMood('mascot-hop', '😸');
		setTimeout(function() {
			updateMascotMood('mascot-idle', '😺');
		}, 1200);
	});

	// Sparkle / Heart Cursor & Touch Trail
	(function initCursorTrail() {
		if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}
		var lastTime = 0;
		var symbols = ['✨', '💖', '🌸', '⭐', '💕', '💫'];

		function spawnTrail(x, y) {
			var now = Date.now();
			if (now - lastTime < 55) return;
			lastTime = now;

			var $layer = $('#cursor_trail_layer');
			if (!$layer.length) return;

			var $dot = $('<span class="cursor-sparkle-dot"></span>');
			$dot.text(symbols[Math.floor(Math.random() * symbols.length)]);
			$dot.css({
				left: (x + (Math.random() * 12 - 6)) + 'px',
				top: (y + (Math.random() * 12 - 6)) + 'px'
			});
			$layer.append($dot);
			setTimeout(function() {
				$dot.remove();
			}, 750);
		}

		$(document).on('mousemove', function(e) {
			spawnTrail(e.clientX, e.clientY);
		});
		$(document).on('touchmove', function(e) {
			if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0]) {
				var t = e.originalEvent.touches[0];
				spawnTrail(t.clientX, t.clientY);
			}
		});
	})();

	$('#turn_on').click(function(){
		playCutePopSound();
		createButtonSparkleBurst(this);
		updateMascotMood('mascot-hop', '✨');
		$('#active_paw_indicator').fadeOut('fast');
		$('#guide_bubble_text').text('Ooh, glowing so warm! Setting the mood... 💡');
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#play').fadeIn('slow');
			updateMascotMood('mascot-dance', '🎵');
			$('#guide_bubble_text').text('Now some music to set the mood... 🎵');
			$('#active_paw_indicator').fadeIn('slow');
		});
	});

	// Set initial volume for main page song (40-45%) and keep looped
	var mainAudio = $('.song')[0];
	function updateFrontMuteUI(isMuted) {
		var $btn = $('#front_mute_btn');
		var $icon = $btn.find('.btn-icon');
		var $label = $btn.find('.btn-label');
		if (isMuted) {
			$icon.text('🔇');
			$label.text('Unmute');
			$btn.addClass('is-muted');
		} else {
			$icon.text('🔊');
			$label.text('Sound');
			$btn.removeClass('is-muted');
		}
	}

	if (mainAudio) {
		mainAudio.volume = 0.42;
		mainAudio.loop = true;

		// Restore saved mute preference
		try {
			var savedMute = localStorage.getItem('birthday_music_muted');
			if (savedMute === 'true') {
				mainAudio.muted = true;
				updateFrontMuteUI(true);
			}
		} catch(e) {}

		// Listen for volume/mute changes to sync across front and intro pages
		$(mainAudio).on('volumechange', function() {
			updateFrontMuteUI(this.muted);
			try {
				localStorage.setItem('birthday_music_muted', this.muted ? 'true' : 'false');
			} catch(e) {}
		});
	}

	// Top Controls Mute/Unmute Button for Main Page Music (Matching Intro Page Style)
	$('#front_mute_btn').click(function(){
		var audio = $('.song')[0];
		if (audio) {
			audio.muted = !audio.muted;
		}
	});

	$('#play').click(function(){
		playCutePopSound();
		createButtonSparkleBurst(this);
		updateMascotMood('mascot-dance', '🎶');
		$('#active_paw_indicator').fadeOut('fast');
		$('#guide_bubble_text').text('Dancing to the birthday beats! 🎵');
		var audio = $('.song')[0];
		if (audio) {
			audio.volume = 0.42;
			audio.loop = true;
			audio.play().catch(function(e) {
				console.log('Audio autoplay prevented:', e);
			});
		}
		$('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('background-color','#FFF');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
			updateMascotMood('mascot-wave', '🎀');
			$('#guide_bubble_text').text("Let's put up the colorful decorations! 🎀");
			$('#active_paw_indicator').fadeIn('slow');
		});
	});

	// Trigger ribbons and stars celebration when "Let's Decorate" is clicked!
	$('#bannar_coming').click(function(){
		playCutePopSound();
		createButtonSparkleBurst(this);
		updateMascotMood('mascot-wave', '🥳');
		$('#active_paw_indicator').fadeOut('fast');
		$('#guide_bubble_text').text('Look at that festive banner! 🎀');
		$('.bannar').addClass('bannar-come');
		triggerCelebration();
		setTimeout(function() {
			triggerCelebration();
		}, 1200);

		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');
			updateMascotMood('mascot-float', '🎈');
			$('#guide_bubble_text').text('Watch the happy balloons fly high! 🎈');
			$('#active_paw_indicator').fadeIn('slow');
		});
	});

	function getRandomBalloonPos() {
		var maxLeft = Math.max(80, $(window).width() - 110);
		var maxTop = Math.max(140, $(window).height() - 240);
		return {
			left: Math.floor(Math.random() * maxLeft),
			bottom: Math.floor(Math.random() * maxTop + 50)
		};
	}

	function loopOne() {
		var pos = getRandomBalloonPos();
		$('#b1').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopOne(); });
	}
	function loopTwo() {
		var pos = getRandomBalloonPos();
		$('#b2').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopTwo(); });
	}
	function loopThree() {
		var pos = getRandomBalloonPos();
		$('#b3').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopThree(); });
	}
	function loopFour() {
		var pos = getRandomBalloonPos();
		$('#b4').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopFour(); });
	}
	function loopFive() {
		var pos = getRandomBalloonPos();
		$('#b5').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopFive(); });
	}
	function loopSix() {
		var pos = getRandomBalloonPos();
		$('#b6').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopSix(); });
	}
	function loopSeven() {
		var pos = getRandomBalloonPos();
		$('#b7').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopSeven(); });
	}
	function loopEight() {
		var pos = getRandomBalloonPos();
		$('#b8').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopEight(); });
	}
	function loopNine() {
		var pos = getRandomBalloonPos();
		$('#b9').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopNine(); });
	}

	$('#balloons_flying').click(function(){
		playCutePopSound();
		createButtonSparkleBurst(this);
		updateMascotMood('mascot-float', '🎈');
		$('#active_paw_indicator').fadeOut('fast');
		$('#guide_bubble_text').text('Balloons floating across the sky! 🎈');
		var screenH = $(window).height();
		$('.balloon-border').animate({top: -screenH - 300}, 8000);
		$('#b1,#b4,#b5,#b7,#b8').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6,#b9').addClass('balloons-rotate-behaviour-two');
		loopOne();
		loopTwo();
		loopThree();
		loopFour();
		loopFive();
		loopSix();
		loopSeven();
		loopEight();
		loopNine();
		
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
			updateMascotMood('mascot-clap', '🎂');
			$('#guide_bubble_text').text('Look, the most delicious cake arrived! 🎂');
			$('#active_paw_indicator').fadeIn('slow');
		});
	});	

	$('#cake_fadein').click(function(){
		playCutePopSound();
		createButtonSparkleBurst(this);
		updateMascotMood('mascot-clap', '🍰');
		$('#active_paw_indicator').fadeOut('fast');
		$('#guide_bubble_text').text('Yummy birthday cake is here! 🎂');
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
			updateMascotMood('mascot-starry', '🕯️');
			$('#guide_bubble_text').text("Let's light the birthday candles! 🕯️");
			$('#active_paw_indicator').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		playCutePopSound();
		createButtonSparkleBurst(this);
		updateMascotMood('mascot-starry', '💫');
		$('#active_paw_indicator').fadeOut('fast');
		$('.fuego').fadeIn('slow');
		$('#cake_wish_bubble').stop(true, true).fadeIn('slow');
		// Softly auto-fade the wish bubble after 4 seconds so it doesn't linger
		setTimeout(function(){
			$('#cake_wish_bubble').fadeOut('slow');
		}, 4000);

		$(this).fadeOut('slow').promise().done(function(){
			$('#wish_message').fadeIn('slow');
			updateMascotMood('mascot-celebrate', '🎉');
			$('#guide_bubble_text').text('Make a wish, Malkin! Time to celebrate! 🎉');
			$('#active_paw_indicator').fadeIn('slow');
		});
	});

	$('#wish_message').click(function(){
		playCutePopSound();
		createButtonSparkleBurst(this);
		updateMascotMood('mascot-celebrate', '💖');
		$('#active_paw_indicator').fadeOut('fast');
		// Immediately fade out and hide the wish bubble completely so it never sits behind the balloons
		$('#cake_wish_bubble').stop(true, true).fadeOut('fast').hide();
		$('#guide_bubble_text').text('Happy Birthday Malkin! 🎉✨');
		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8,#b9').stop();
		$('#b1').attr('id','b11');
		$('#b2').attr('id','b22');
		$('#b3').attr('id','b33');
		$('#b4').attr('id','b44');
		$('#b5').attr('id','b55');
		$('#b6').attr('id','b66');
		$('#b7').attr('id','b77');
		$('#b8').attr('id','b88');
		$('#b9').attr('id','b99');

		arrangeBalloons(false);

		$('.balloons').css('opacity','0.9');
		$('.balloons h2').fadeIn(3000);
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#story').fadeIn('slow');
			updateMascotMood('mascot-blush', '💌');
			$('#guide_bubble_text').text('I have a special message for you... 💌');
			$('#active_paw_indicator').fadeIn('slow');
		});
	});

	function startTypewriter(onComplete) {
		var $sourceParas = $('#card_message_source p');
		var messages = [];
		$sourceParas.each(function() {
			var t = $(this).text().trim();
			if (t) messages.push(t);
		});

		if (messages.length === 0) {
			messages = [
				"Today is a very special day...",
				"It's the birthday of my favorite person.",
				"Out of everyone, you're the one I'm always happiest to see, talk to, and celebrate.",
				"I hope this year gives you back all the love you give to everyone around you.",
				"A very Happy Birthday Malkin! 🎉"
			];
		}

		var $container = $('#card_typed_text');
		$container.empty();

		var scrollArea = document.getElementById('card_scroll_area');
		var userIsReadingUp = false;

		if (scrollArea) {
			scrollArea.scrollTop = 0;

			// Detect if user scrolled up to read earlier lines
			$(scrollArea).on('wheel touchmove pointerdown', function() {
				var distFromBottom = scrollArea.scrollHeight - scrollArea.scrollTop - scrollArea.clientHeight;
				if (distFromBottom > 35) {
					userIsReadingUp = true;
				}
			});

			$(scrollArea).on('scroll', function() {
				var distFromBottom = scrollArea.scrollHeight - scrollArea.scrollTop - scrollArea.clientHeight;
				if (distFromBottom <= 15) {
					userIsReadingUp = false;
				}
			});
		}

		function autoScrollToBottom() {
			if (scrollArea && !userIsReadingUp) {
				scrollArea.scrollTop = scrollArea.scrollHeight;
			}
		}

		var cursor = $('<span class="typing-cursor"></span>');
		var lineIndex = 0;

		function typeLine() {
			if (lineIndex >= messages.length) {
				cursor.fadeOut(300, function() { $(this).remove(); });
				if (typeof onComplete === 'function') {
					onComplete();
				}
				return;
			}

			var fullText = messages[lineIndex];
			var $p = $('<p class="card-line"></p>').appendTo($container);
			$p.append(cursor);
			autoScrollToBottom();
			var charIndex = 0;

			function typeChar() {
				if (charIndex < fullText.length) {
					var ch = fullText.charAt(charIndex);
					cursor.before(ch);
					charIndex++;
					autoScrollToBottom();

					// Reduced, gentle typing speed with natural pauses for punctuation
					var delay = 62;
					if (ch === ',' || ch === ';') {
						delay = 200;
					} else if (ch === '.' || ch === '!' || ch === '?') {
						delay = 340;
					}

					setTimeout(typeChar, delay);
				} else {
					lineIndex++;
					autoScrollToBottom();
					// Calmer pause between paragraphs
					setTimeout(typeLine, 700);
				}
			}

			typeChar();
		}

		typeLine();
	}
	window.startTypewriter = startTypewriter;

	// Show permanent cute cat card screen, type out message, and trigger ribbons/stars!
	$('#story').click(function(){
		playCutePopSound();
		createButtonSparkleBurst(this);
		updateMascotMood('mascot-blush', '🌸');
		$('#active_paw_indicator').fadeOut('fast').hide();
		$('#cake_wish_bubble').fadeOut('fast').hide();
		$('#cat_guide_bubble').fadeOut('fast').hide();
		$('.front-control-card').fadeOut('fast').hide();
		$(this).fadeOut('fast').hide();
		$('#front_controls_wrapper').addClass('controls-hidden').fadeOut('fast').hide();
		$('.cake-cover, .cake').fadeOut('fast').promise().done(function(){
			$('#message_card').fadeIn('slow', function(){
				startTypewriter(function(){
					// 1. Trigger ribbons & stars cascading celebration as soon as typing completes!
					triggerCelebration();

					// Save completion in sessionStorage so progress is remembered
					setSessionState('malkin_page1_completed', 'true');
					setSessionState('malkin_max_view', 'intro');
					setSessionState('malkin_surprise_opened', 'false');
					setSessionState('malkin_intro_completed', 'false');

					// 2. Load the second page (intro/index.html) in the background directly below
					var iframe = document.getElementById('intro_iframe');
					if (iframe && (!iframe.src || iframe.src === 'about:blank' || iframe.src.endsWith('/'))) {
						iframe.src = iframe.getAttribute('data-src') || 'intro/index.html';
					}

					// 3. Exactly 3-4 seconds after ribbon/stars celebration ends (celebration is 6.5s)
					// Total delay: 6.5s + 3.5s = 10.0s
					setTimeout(function(){
						// Transition to intro view using History API
						navigateToView('intro', true);

						// After sliding down finishes (~1.8s), show the cute surprise popup modal!
						setTimeout(function(){
							$('#btn_start_surprise').prop('disabled', false);
							$('#surprise_popup_overlay').css('display', 'flex').removeClass('dismissing').addClass('active');
						}, 1800);
					}, 10000);
				});
			});
		});
	});

	// The second page starts reliably on the FIRST click of the cute surprise button
	$('#btn_start_surprise').off('click').on('click', function(){
		var $btn = $(this);
		$btn.prop('disabled', true); // Prevent duplicate triggers
		setSessionState('malkin_surprise_opened', 'true');
		var $overlay = $('#surprise_popup_overlay');
		$overlay.addClass('dismissing');
		setTimeout(function(){
			$overlay.removeClass('active dismissing').css('display', 'none');
		}, 380);

		// Ensure single continuous song plays without interruption
		var audio = $('.song')[0];
		if (audio) {
			audio.volume = 0.42;
			audio.loop = true;
			if (audio.paused) {
				audio.play().catch(function(e) {});
			}
		}

		window.__pendingStartIntro = true;
		function sendStartIntro() {
			var iframe = document.getElementById('intro_iframe');
			if (iframe && iframe.contentWindow) {
				iframe.contentWindow.postMessage({ action: 'startIntroAuto' }, '*');
			}
		}

		// Send immediately and also with brief delays to guarantee delivery across browsers
		sendStartIntro();
		setTimeout(sendStartIntro, 120);
		setTimeout(sendStartIntro, 350);
	});

	// Revisit button on page 1 top-controls to continue forward to unlocked views ("Click me ✨")
	$('#btn_revisit_surprise').off('click').on('click', function(){
		var maxView = getSessionState('malkin_max_view', 'gallery');
		$('#surprise_popup_overlay').removeClass('active dismissing').hide();
		navigateToView(maxView, true);
		var iframe = document.getElementById('intro_iframe');
		if (iframe && iframe.contentWindow) {
			if (maxView === 'gallery') {
				iframe.contentWindow.postMessage({ action: 'showGalleryView' }, '*');
			} else {
				iframe.contentWindow.postMessage({ action: 'startIntroAuto' }, '*');
			}
		}
	});

	// =========================================================================
	// VIEW ROUTING ENGINE & HISTORY API (3 Views: page1, intro, gallery)
	// =========================================================================
	// Progress persistence helpers with try/catch safeguards
	function getSessionState(key, fallback) {
		try {
			var val = sessionStorage.getItem(key);
			return val !== null ? val : fallback;
		} catch(e) {
			return fallback;
		}
	}

	function setSessionState(key, val) {
		try {
			sessionStorage.setItem(key, val);
		} catch(e) {}
	}

	function getHashView() {
		var hash = (window.location.hash || '').replace('#', '').toLowerCase();
		if (hash === 'intro' || hash === 'gallery') return hash;
		return 'page1';
	}

	// Completed state function: restores page 1 instantly to its final finished state
	function showPage1Final() {
		setSessionState('malkin_page1_completed', 'true');
		if (getSessionState('malkin_max_view', 'page1') === 'page1') {
			setSessionState('malkin_max_view', 'intro');
		}
		$('body').addClass('is-complete peach-after').css('background-color', '#FDF3E5');
		$('.loading').hide();
		$('.container').show();

		// 1. All lights turned on
		$('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');

		// 2. Banner up and floating
		$('.bannar').addClass('bannar-come').css('transform', 'translate(0px, 0px)');

		// 3. Balloons flying and positioned in layout
		for (var bi = 1; bi <= 9; bi++) {
			var $b = $('#b' + bi);
			if ($b.length > 0) {
				$b.attr('id', 'b' + bi + bi);
			}
		}
		$('.balloon-border').css({ top: -500 });
		$('.balloons').css({ opacity: '0.9', display: 'block' });
		$('.balloons h2').show();
		arrangeBalloons(true);

		// 4. Cake with lit candles
		$('.cake-cover, .cake').show().css('opacity', 1);
		$('.velas').show().css('opacity', 1);
		$('.fuego').show().css('opacity', 1);
		$('#cake_wish_bubble').hide();

		// 5. Message card with full text visible immediately (no typewriter delay)
		$('#message_card').show().css('opacity', 1);
		var $sourceParas = $('#card_message_source p');
		var $container = $('#card_typed_text');
		$container.empty();
		$sourceParas.each(function() {
			var t = $(this).text().trim();
			if (t) {
				$('<p class="card-line"></p>').text(t).appendTo($container);
			}
		});

		// 6. Hide interactive 8 buttons control card (she already finished them)
		$('#front_controls_wrapper').addClass('controls-hidden').hide();
		$('#cat_guide_bubble').hide();
		$('#active_paw_indicator').hide();

		// 7. Show on-page forward button in top-controls to continue to surprise
		$('#btn_revisit_surprise').show();

		// 8. Ensure music continues playing smoothly at 0.42 volume
		var audio = $('.song')[0];
		if (audio) {
			audio.volume = 0.42;
			audio.loop = true;
			if (audio.paused) {
				audio.play().catch(function(e) {});
			}
		}

		// 9. Ensure intro iframe is preloaded in background
		var iframe = document.getElementById('intro_iframe');
		if (iframe && (!iframe.src || iframe.src === 'about:blank' || iframe.src.endsWith('/'))) {
			iframe.src = 'intro/index.html';
		}
	}
	window.showPage1Final = showPage1Final;

	// View transition router
	function navigateToView(viewName, isPush) {
		var maxView = getSessionState('malkin_max_view', 'page1');
		var page1Completed = getSessionState('malkin_page1_completed', 'false') === 'true';

		// Guard: never allow jumping ahead past what she has already seen
		if (viewName === 'gallery' && maxView !== 'gallery') {
			viewName = (maxView === 'intro') ? 'intro' : 'page1';
		}
		if (viewName === 'intro' && !page1Completed) {
			viewName = 'page1';
		}

		setSessionState('malkin_current_view', viewName);

		var targetHash = viewName === 'page1' ? '' : ('#' + viewName);
		if (isPush) {
			if (window.location.hash !== targetHash) {
				history.pushState({ view: viewName }, '', targetHash || window.location.pathname);
			}
		}

		applyViewState(viewName);
	}
	window.navigateToView = navigateToView;
	window.applyViewState = applyViewState;

	function applyViewState(viewName) {
		// Strictly keep parent window and body at scroll (0,0)
		window.scrollTo(0, 0);
		if (document.body) document.body.scrollTop = 0;
		if (document.documentElement) document.documentElement.scrollTop = 0;

		var page1Completed = getSessionState('malkin_page1_completed', 'false') === 'true';
		var iframe = document.getElementById('intro_iframe');

		if (viewName === 'page1') {
			$('#main_slider').removeClass('slide-down');
			$('#surprise_popup_overlay').removeClass('active dismissing').css('display', 'none');
			if (page1Completed) {
				showPage1Final();
			}
			// Notify iframe to pause heavy animations
			if (iframe && iframe.contentWindow) {
				iframe.contentWindow.postMessage({ action: 'pauseView' }, '*');
			}
		} else if (viewName === 'intro') {
			var maxView = getSessionState('malkin_max_view', 'page1');
			if (maxView === 'gallery') {
				// Blank intro must never be shown once gallery is unlocked; redirect to page 1
				applyViewState('page1');
				return;
			}
			if (page1Completed) {
				showPage1Final();
			}
			if (iframe && (!iframe.src || iframe.src === 'about:blank' || iframe.src.endsWith('/'))) {
				iframe.src = iframe.getAttribute('data-src') || 'intro/index.html';
			}
			$('#main_slider').addClass('slide-down');
			var surpriseOpened = getSessionState('malkin_surprise_opened', 'false') === 'true';
			if (!surpriseOpened) {
				$('#btn_start_surprise').prop('disabled', false);
				$('#surprise_popup_overlay').css('display', 'flex').removeClass('dismissing').addClass('active');
			} else {
				$('#surprise_popup_overlay').removeClass('active dismissing').css('display', 'none');
			}
			if (iframe && iframe.contentWindow) {
				iframe.contentWindow.postMessage({ action: 'showIntroView' }, '*');
			}
		} else if (viewName === 'gallery') {
			if (page1Completed) {
				showPage1Final();
			}
			if (iframe && (!iframe.src || iframe.src === 'about:blank' || iframe.src.endsWith('/'))) {
				iframe.src = iframe.getAttribute('data-src') || 'intro/index.html';
			}
			$('#main_slider').addClass('slide-down');
			$('#surprise_popup_overlay').removeClass('active dismissing').css('display', 'none');
			if (iframe && iframe.contentWindow) {
				iframe.contentWindow.postMessage({ action: 'showGalleryView' }, '*');
			}
		}
	}

	// Listen for browser Back/Forward buttons and mobile swipe navigation
	window.addEventListener('popstate', function(event) {
		var targetView = (event.state && event.state.view) || getHashView();
		if (targetView === 'intro') {
			// Intro is a one-time sequence and must NEVER be shown on back navigation.
			// Go straight to page 1!
			history.replaceState({ view: 'page1' }, '', window.location.pathname);
			applyViewState('page1');
			return;
		}
		applyViewState(targetView);
	});

	// Handle Back-Forward Cache (bfcache)
	window.addEventListener('pageshow', function(event) {
		var current = getHashView();
		applyViewState(current);
	});

	// Lock parent window scroll strictly
	window.addEventListener('scroll', function() {
		if (window.scrollY !== 0 || (document.body && document.body.scrollTop !== 0) || (document.documentElement && document.documentElement.scrollTop !== 0)) {
			window.scrollTo(0, 0);
			if (document.body) document.body.scrollTop = 0;
			if (document.documentElement) document.documentElement.scrollTop = 0;
		}
	}, { passive: false });

	// Helper to navigate directly back to page 1 cleanly in one step
	function goToPage1() {
		if (window.location.hash === '#gallery' || window.location.hash === '#intro') {
			try {
				window.history.back();
			} catch(e) {}
			setTimeout(function() {
				if (window.location.hash) {
					history.replaceState({ view: 'page1' }, '', window.location.pathname);
					applyViewState('page1');
				}
			}, 60);
		} else {
			applyViewState('page1');
		}
	}

	// Listen for events from the intro iframe (unlocking gallery, on-page back clicks, ready, and restart)
	window.addEventListener('message', function(e) {
		if (!e.data) return;
		if (e.data.action === 'viewUnlocked') {
			if (e.data.view === 'gallery') {
				setSessionState('malkin_max_view', 'gallery');
				setSessionState('malkin_current_view', 'gallery');
				// Replace state so #intro does not exist as an intermediate history step!
				history.replaceState({ view: 'gallery' }, '', '#gallery');
			}
		} else if (e.data.action === 'goToPage1' || e.data.action === 'navigateBack') {
			goToPage1();
		} else if (e.data.action === 'restartExperience') {
			restartEntireExperience();
		} else if (e.data.action === 'introReady') {
			window.__introIframeReady = true;
			if (window.__pendingStartIntro) {
				window.__pendingStartIntro = false;
				var iframe = document.getElementById('intro_iframe');
				if (iframe && iframe.contentWindow) {
					iframe.contentWindow.postMessage({ action: 'startIntroAuto' }, '*');
				}
			}
		}
	});

	// Restarts the entire experience from stage 0, preserving audio mute preference
	function restartEntireExperience() {
		try {
			var savedMute = localStorage.getItem('birthday_music_muted');
			sessionStorage.clear();
			localStorage.removeItem('malkin_page1_completed');
			localStorage.removeItem('malkin_current_view');
			localStorage.removeItem('malkin_max_view');
			localStorage.removeItem('malkin_surprise_opened');
			localStorage.removeItem('page1Completed');
			if (savedMute !== null) {
				localStorage.setItem('birthday_music_muted', savedMute);
			}
		} catch(e) {}

		// Reset audio
		var audio = $('.song')[0];
		if (audio) {
			audio.pause();
			audio.currentTime = 0;
		}

		// Clear URL hash and reload cleanly to root stage 0
		if (window.history && window.history.replaceState) {
			window.history.replaceState(null, '', window.location.pathname);
		}
		window.location.href = window.location.pathname;
	}
	window.restartEntireExperience = restartEntireExperience;

	// Initial route initialization on page load
	var isPage1Done = getSessionState('malkin_page1_completed', 'false') === 'true';
	var initHash = getHashView();
	if (isPage1Done) {
		showPage1Final();
		if (initHash === 'gallery' && getSessionState('malkin_max_view', 'page1') === 'gallery') {
			navigateToView('gallery', false);
		} else {
			history.replaceState({ view: 'page1' }, '', window.location.pathname);
			applyViewState('page1');
		}
	} else {
		// First-time flow: start page 1 from the beginning as normal
		history.replaceState({ view: 'page1' }, '', window.location.pathname);
	}
});