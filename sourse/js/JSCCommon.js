'use strict';
class JSCCommon {
	static modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';
		Fancybox.defaults = {
			autoFocus: false,
			placeFocusBack: false,
		};
		Fancybox.bind('[data-fancybox]', {
			autoFocus: false,
			placeFocusBack: false,
		});
		Fancybox.bind(link, {
			arrows: false,
			// // infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			// type: 'html',
			dragToClose: false,
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			showClass: "fancybox-throwOutUp",
			hideClass: "fancybox-throwOutDown",
			l10n: {
				CLOSE: "Закрыть",
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
				MODAL: "Вы можете закрыть это модальное окно с помощью клавиши ESC.",
				ERROR: "Что-то пошло не так. Пожалуйста, повторите попытку позже",
				IMAGE_ERROR: "Изображение не найдено",
				ELEMENT_NOT_FOUND: "HTML-элемент не найден",
				AJAX_NOT_FOUND: "Ошибка при загрузке AJAX: не найдено",
				AJAX_FORBIDDEN: "Ошибка при загрузке AJAX: запрещено",
				IFRAME_ERROR: "Ошибка загрузки iframe",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		
		document.addEventListener('click', (event) => {
			let element = event.target.closest(link)
			if (!element) return;
			let modal = document.querySelector(element.dataset.src);
			const data = element.dataset;

			function setValue(val, elem) {
				if (elem && val) {
					const el = modal.querySelector(elem)
					el.tagName == "INPUT"
						? el.value = val
						: el.innerHTML = val;
					// console.log(modal.querySelector(elem).tagName)
				}
			}
			setValue(data.title, '.ttu');
			setValue(data.text, '.after-headline');
			setValue(data.btn, '.btn');
			setValue(data.order, '.order');
		})
	}
	// /modalCall
	static toggleMenu() {
		const toggle = document.querySelectorAll('.toggle-menu-mobile--js');
		const menu = document.querySelector('.menu-mobile--js');
		toggle.forEach((el) => el.classList.toggle('on'));
		menu.classList.toggle('active');
		[document.body, document.querySelector('html')].forEach((el) => el.classList.toggle('fixed'));
	}
	static closeMenu() {
		const toggle = document.querySelectorAll('.toggle-menu-mobile--js');
		const menu = document.querySelector('.menu-mobile--js');
		toggle.forEach((element) => element.classList.remove('on'));
		if (menu) {
			menu.classList.remove('active');
			[document.body, document.querySelector('html')].forEach((el) => el.classList.remove('fixed'));
		}
	}
	static mobileMenu() {
		document.addEventListener('click', (event) => {
			let container = event.target.closest('.menu-mobile--js'); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js'); // (1)
			if (toggle) this.toggleMenu();
			if (!container && !toggle) this.closeMenu();
		},
			{ passive: true },
		);

		window.addEventListener('resize', () => {
			if (window.matchMedia('(min-width: 992px)').matches) this.closeMenu();
		},
			{ passive: true },
		);
	}

	// tabs  .
	static tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	}
	// /tabs

	static inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({ "mask": "+9(999)999-99-99", showMaskOnHover: false }).mask(InputTel);
	}
	// /inputMask
	static sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();

		const th = $('form');
		const formInpus = {}
		formInpus.name = th.find('[name="name"]').val() || '';
		formInpus.email = th.find('[name="email"]').val() || '';
		formInpus.tel = th.find('[name="tel"]').val() ;
		formInpus.organization = th.find('[name="organization"]').val() ;

		formInpus.utm_source = decodeURIComponent(gets['utm_source'] || '');
		formInpus.utm_term = decodeURIComponent(gets['utm_term'] || '');
		formInpus.utm_medium = decodeURIComponent(gets['utm_medium'] || '');
		formInpus.utm_campaign = decodeURIComponent(gets['utm_campaign'] || '');

		formInpus.file = th.find('[name="file"]').prop('files')[0]
		
		var data = new FormData($('form')[0]); 

		for (const key in formInpus) {
			if (Object.hasOwnProperty.call(object, key)) {
				const element = object[key];
				
				data.append(`${key}`, object[key]);
			}
		}

		console.log(formInpus)
		$("form").submit(function (e) {
			e.preventDefault();
	
			// data.append('email', email);
			// // if (tel ) {
	
			// // 	data.append('organization', organization);
			// // 	data.append('tel', tel);
			// // }
			// // else {
			// // 	var file = th.find('[name="file"]').prop('files')[0]
			// // 	data.append('file', file);
			// // }
			// data.append('utm_source', utm_source);
			// data.append('utm_term', utm_term);
			// data.append('utm_medium', utm_medium);
			// data.append('utm_campaign', utm_campaign); 
	
			$.ajax({
				url: 'action.php',
				dataType: 'text',  // what to expect back from the PHP script, if anything
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST',
				data: data,
			}).done(function (data) {
 
				// $.fancybox.open({
				// 	src: '#modal-thanks',
				// 	type: 'inline'
				// }); 
				console.log('ok')
	
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// $.fancybox.close();
	
				}, 4000);
			}).fail(function () { });
	
		}); 
	}
	static heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	}
	static animateScroll() {
		$(document).on('click', " .sContactBody__nav a", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	}
	static getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}

	static makeDDGroup() {
		$('.dd-head-js').on('click', function () {
			let clickedHead = this;
			$(this).parent().toggleClass('active');
			$(this)
				.next()
				.slideToggle(function () {
					$(this).toggleClass('active');
				});
		});
		// let parents = document.querySelectorAll('.dd-group-js');
		// for (let parent of parents) {
		// 	if (parent) {
		// 		// childHeads, kind of funny))
		// 		let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
		// 		$(ChildHeads).click(function () {
		// 			let clickedHead = this;

		// 			$(ChildHeads).each(function () {
		// 				if (this === clickedHead) {
		// 					//parent element gain toggle class, style head change via parent
		// 					$(this.parentElement).toggleClass('active');
		// 					$(this.parentElement).find('.dd-content-js').slideToggle(function () {
		// 						$(this).toggleClass('active');
		// 					});
		// 				}
		// 				else {
		// 					$(this.parentElement).removeClass('active');
		// 					$(this.parentElement).find('.dd-content-js').slideUp(function () {
		// 						$(this).removeClass('active');
		// 					});
		// 				}
		// 			});

		// 		});
		// 	}
		// }
	}

	static imgToSVG() {
		const convertImages = (query, callback) => {
			const images = document.querySelectorAll(query);

			images.forEach(image => {
				fetch(image.src)
					.then(res => res.text())
					.then(data => {
						const parser = new DOMParser();
						const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');

						if (image.id) svg.id = image.id;
						if (image.className) svg.classList = image.classList;

						image.parentNode.replaceChild(svg, image);
					})
					.then(callback)
					.catch(error => console.error(error))
			});
		};

		convertImages('.img-svg-js');
	}

	static disabledBtn(input = '.form-wrap__policy input', btn = ".form-wrap__btn", parent = ".form-wrap") {
		$(document).on("change", input, function () {
			let btnDisabled = $(this).parents(parent).find(btn)
			if (this.checked) {
				btnDisabled.removeAttr('disabled');
			}
			else {
				btnDisabled.attr('disabled', 'disabled');
			}
		})
	}

	static setScreen() {
		var x = window.location.host;
		let screenName;
		screenName = 'screen/' + document.body.dataset.bg;
		if (screenName && x.includes("localhost:30")) {
			document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(${screenName});"></div>`);
		}

	}

	static setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	static setActiveAnchor(navLiParam) {
    const navLi = document.querySelectorAll(navLiParam);
    
    const sections = document.querySelectorAll(`.hrefs-js [id]`);
    if (sections.length > 0 && navLi.length > 0) {
      document.addEventListener(
        'scroll',
        function () {
					console.log(1232);
          var current = '';

          sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 80) {
              current = section.getAttribute('id');
            }
          });
          navLi.forEach((li) => {
            li.classList.remove('active');
            if (li.getAttribute('href') == `#${current}` && li.getAttribute('href') != `#`) {
              li.classList.add('active');
            }
          });
        },
        { passive: true },
      );
    }
  }

	static init() {
		this.modalCall();
		// this.tabscostume('tabs');
		this.mobileMenu();
		this.inputMask();
		this.sendForm();
		this.heightwindow();
		this.makeDDGroup();
		this.disabledBtn();
		this.setScreen();
		// this.setActiveAnchor('.sContactBody__nav li a');
		// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
		// this.animateScroll();

		// JSCCommon.CustomInputFile(); 

	}
};