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


	gsap.registerPlugin(ScrollTrigger);
	let scroller = document.querySelector(".scroller");
	let bodyScrollBar;
	if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		bodyScrollBar = Scrollbar.init(scroller, {
			damping: .1,
			thumbMinSize: 20,
			alwaysShowTracks: true,
		});
	};

	if (bodyScrollBar) {
		ScrollTrigger.scrollerProxy(scroller, {
			scrollTop(value) {
				if (arguments.length) {
					bodyScrollBar.scrollTop = value;
				}
				return bodyScrollBar.scrollTop;
			},
		});

		bodyScrollBar.addListener(ScrollTrigger.update);
	}


	gsap.utils.toArray("[data-aos]").forEach(aos => {


		const animate = aos.dataset.animate;
		function myfunction() {
			aos.classList.add(`aos-animate`);
			if (animate) {
				aos.classList.toggle(animate);
			}
		};
		const rect = aos.getBoundingClientRect();
		ScrollTrigger.create({
			scroller: scroller,
			trigger: aos,
			start: 'top bottom',
			end: 'bottom +100 top',

			// markers: true,
			toggleActions: "play none none none",
			onEnter: () => myfunction(),
			// onLeave: () => myfunction(),
			// onLeaveBack: () => myfunction(),
			// onEnterBack: () => myfunction(),
			invalidateOnRefresh: true,
		});
	})

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

	AOS.init();	

	document.addEventListener('aos:in', ({ detail }) => {
		console.log('animated in', detail);
	});

	function inputFile(){
		if (document.querySelector('.upload-field')){
			let uploadField = document.querySelectorAll('.upload-field');
			for (let i=0;i<uploadField.length;i++){
				let inputFile = uploadField[i].querySelector('.input-upload');
				inputFile.addEventListener('change',() => uploadField[i].querySelector('.upload-field__file-name').innerHTML = inputFile.files[0].name);
			}
		}
	}
	inputFile();

	let stickyElem = document.querySelector('.sticky-content');
	if (stickyElem) {
		let stickyNav = new hcSticky(stickyElem, {
			stickTo: $('.sticky-wrap'),
			top: 80,
			mobileFirst: true,
			disable: true,
			responsive: {
				992: {
					disable: false,
				}
			}
		});
	
		ScrollTrigger.create({
			scroller: scroller,
			// trigger: stickyNav,
			onUpdate: (self) => {
				stickyNav.update();
				if(stickyElem.classList.contains('sticky')) {
					stickyElem.style.transform = `translate3d(0px, ${bodyScrollBar.offset.y}px, 0px)`;
				} else {
					stickyElem.style.transform = `translate3d(0px,0px, 0px)`;
				}
			},
		})
	}

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