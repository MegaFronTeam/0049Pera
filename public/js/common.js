"use strict";

const $ = jQuery;


function eventHandler() {

	JSCCommon.init()


	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener('scroll', () => {
		JSCCommon.setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});


	let scroller = document.querySelector(".scroller");

	if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		Scrollbar.init(scroller, {
			damping: .1,
			thumbMinSize: 20,
			alwaysShowTracks: true,
		});
	};

	new Swiper('.sContact__swiper--js .swiper', {
		// slidesPerView: 'auto',
		spaceBetween: 40,
		loop: true,
		draggable: false,
		speed: 15000,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
		freemode: {
			enabled: true,
		},
	});

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }