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

	// const textLsider = new Swiper('.sContact__swiper--js .swiper', {
	// 	// slidesPerView: 'auto',
	// 	spaceBetween: 40,
	// 	loop: true,
	// 	draggable: false,
	// 	// speed: 15000,
	// 	loopedSlides: 13,
	// 	// autoplay: {
	// 	// 	delay: 0,
	// 	// 	disableOnInteraction: false,
	// 	// },
	// 	freemode: {
	// 		enabled: true,
	// 	},
	// });

	let el = document.querySelector('.sContact__swiper--js .splide');
	if (el) {

		const splide = new Splide(el, {
			type: 'loop',
			drag: 'free',
			// focus  : 'center',
			autoWidth: true,
			autoScroll: {
				speed: 1,
				autoStart: false,
				pauseOnHover: false,
				pauseOnFocus: false,
			},
		});
		if (splide) {

			splide.mount(window.splide.Extensions);
			const { AutoScroll } = splide.Components;

			splide.autoScroll
			$(document).on("mouseover", ".sContact__swiper--js", function () {
				AutoScroll.play();
			})
			$(document).on("mouseleave", ".sContact__swiper--js", function () {
				AutoScroll.pause();
			})
		}
	}
	AOS.init({
		mirror: true,
		offset: 50,
		duration: 1200, // values from 0 to 3000, with step 50ms
		easing: 'easeOutQuart',
	});

	document.addEventListener('aos:in', ({ detail }) => {
		console.log('animated in', detail);
	});

	function inputFile() {
		if (document.querySelector('.upload-field')) {
			let uploadField = document.querySelectorAll('.upload-field');
			for (let i = 0; i < uploadField.length; i++) {
				let inputFile = uploadField[i].querySelector('.input-upload');
				inputFile.addEventListener('change', () => uploadField[i].querySelector('.upload-field__file-name').innerHTML = inputFile.files[0].name);
			}
		}
	}
	inputFile();

	const offsetTopSection = 114;
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
				if (stickyElem.classList.contains('sticky')) {
					stickyElem.style.transform = `translate3d(0px, ${bodyScrollBar.offset.y}px, 0px)`;
				} else {
					stickyElem.style.transform = `translate3d(0px,0px, 0px)`;
				}
			},
		})
	}

	const navLi = document.querySelectorAll('.sContactBody__nav li a');

	const sections = document.querySelectorAll(`.hrefs-js [id]`);

	// if(navLi.length > 0 && sections.length > 0) {
	// 	bodyScrollBar.addListener(() => {
	// 		navLi.forEach((item) => item.classList.remove('active'));


	// 		for (let i = 0; i < sections.length; i++) {
	// 			if (i + 1 < sections.length) {
	// 				if (bodyScrollBar.isVisible(sections[i]) && !bodyScrollBar.isVisible(sections[i + 1])) {
	// 					navLi[i].classList.add('active');
	// 				} 
	// 			}
	// 			if (bodyScrollBar.isVisible(sections[sections.length - 1])) {
	// 				navLi[navLi.length - 1].classList.add('active');
	// 			}
	// 		}
	// 	}) 
	// }

	if ( document.querySelector(".hrefs-js")) {

		const sectionParentTop = document.querySelector(".hrefs-js").offsetTop - offsetTopSection;
		
		bodyScrollBar.addListener((status) => {
			if (status.offset.y >= sectionParentTop) {
				for (const section of sections) {
				if (
					status.offset.y >= (section.offsetTop - offsetTopSection) &&
					status.offset.y < (section.offsetTop + section.offsetHeight - offsetTopSection)
					) {
						document.querySelector(".sContactBody__nav a.active").classList.remove("active")
						document.querySelector(`[href="#${section.id}"]`).classList.add("active")
					}
					
				}
			}
			if (status.offset.y == bodyScrollBar.limit.y) {
				document.querySelector(".sContactBody__nav a.active").classList.remove("active")
				document.querySelector(`.sContactBody__nav li:last-child a`).classList.add("active")
			}
		})
		
		document.addEventListener('click', (e) => {
			const targetEl = e.target.closest('.sContactBody__nav a')
			if (!targetEl) return;
			const id = targetEl.hash;
			bodyScrollBar.scrollIntoView(document.querySelector(id), {
				offsetTop: offsetTopSection,
			})
		})
	};

	function solution(number) {
		if (number <= 0) return 'Not the natural number'; 
		let neededNum = number - 1;
		let numberList = [];
		let result = 0;
		while (neededNum > 0) {
			if (neededNum % 3 == 0 || neededNum % 5 == 0) {
				numberList.push(neededNum);
			}
			neededNum--;
		}
		console.log(numberList);
		numberList.forEach((num) => {
			result += num;
			console.log(result);
		});
		return result;
	}

	console.log(solution(10));
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