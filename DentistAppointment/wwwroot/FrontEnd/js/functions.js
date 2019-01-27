var $ = jQuery.noConflict();

function debounce(a, i, o) {
	var s, n, r, l, d;
	return function () {
		r = this, n = arguments, l = new Date;
		var t = function () {
			var e = new Date - l;
			e < i ? s = setTimeout(t, i - e) : (s = null, o || (d = a.apply(r, n)))
		},
			e = o && !s;
		return s || (s = setTimeout(t, i)), e && (d = a.apply(r, n)), d
	}
}
$.fn.inlineStyle = function (e) {
	return this.prop("style")[$.camelCase(e)]
}, $.fn.doOnce = function (e) {
	return this.length && e.apply(this), this
},
	function () {
		for (var s = 0, e = ["ms", "moz", "webkit", "o"], t = 0; t < e.length && !window.requestAnimationFrame; ++t) window.requestAnimationFrame = window[e[t] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[t] + "CancelAnimationFrame"] || window[e[t] + "CancelRequestAnimationFrame"];
		window.requestAnimationFrame || (window.requestAnimationFrame = function (e, t) {
			var a = (new Date).getTime(),
				i = Math.max(0, 16 - (a - s)),
				o = window.setTimeout(function () {
					e(a + i)
				}, i);
			return s = a + i, o
		}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
			clearTimeout(e)
		})
	}();
var requesting = !1,
	killRequesting = debounce(function () {
		requesting = !1
	}, 100);

function onScrollSliderParallax() {
	requesting || (requesting = !0, requestAnimationFrame(function () {
		SEMICOLON.slider.sliderParallax(), SEMICOLON.slider.sliderElementsFade()
	})), killRequesting()
}
var SEMICOLON = SEMICOLON || {};
! function ($) {
	"use strict";
	SEMICOLON.initialize = {
		init: function () {
			SEMICOLON.initialize.responsiveClasses(), SEMICOLON.initialize.stickyElements(), SEMICOLON.initialize.goToTop(), SEMICOLON.initialize.lazyLoad(), SEMICOLON.initialize.fullScreen(), SEMICOLON.initialize.verticalMiddle(), SEMICOLON.initialize.lightbox(), SEMICOLON.initialize.resizeVideos(), SEMICOLON.initialize.imageFade(), SEMICOLON.initialize.pageTransition(), SEMICOLON.initialize.dataResponsiveClasses(), SEMICOLON.initialize.dataResponsiveHeights(), SEMICOLON.initialize.stickFooterOnSmall(), SEMICOLON.initialize.stickyFooter(), $(".fslider").addClass("preloader2")
		},
		responsiveClasses: function () {
			if ("undefined" == typeof jRespond) return console.log("responsiveClasses: jRespond not Defined."), !0;
			jRespond([{
				label: "smallest",
				enter: 0,
				exit: 575
			}, {
				label: "handheld",
				enter: 576,
				exit: 767
			}, {
				label: "tablet",
				enter: 768,
				exit: 991
			}, {
				label: "laptop",
				enter: 992,
				exit: 1199
			}, {
				label: "desktop",
				enter: 1200,
				exit: 1e4
			}]).addFunc([{
				breakpoint: "desktop",
				enter: function () {
					$body.addClass("device-xl")
				},
				exit: function () {
					$body.removeClass("device-xl")
				}
			}, {
				breakpoint: "laptop",
				enter: function () {
					$body.addClass("device-lg")
				},
				exit: function () {
					$body.removeClass("device-lg")
				}
			}, {
				breakpoint: "tablet",
				enter: function () {
					$body.addClass("device-md")
				},
				exit: function () {
					$body.removeClass("device-md")
				}
			}, {
				breakpoint: "handheld",
				enter: function () {
					$body.addClass("device-sm")
				},
				exit: function () {
					$body.removeClass("device-sm")
				}
			}, {
				breakpoint: "smallest",
				enter: function () {
					$body.addClass("device-xs")
				},
				exit: function () {
					$body.removeClass("device-xs")
				}
			}])
		},
		verticalMiddle: function () {
			0 < $verticalMiddleEl.length && $verticalMiddleEl.each(function () {
				var e = $(this),
					t = e.outerHeight(),
					a = $header.outerHeight();
				0 < e.parents("#slider").length && !e.hasClass("ignore-header") && $header.hasClass("transparent-header") && ($body.hasClass("device-xl") || $body.hasClass("device-lg")) && (t -= 70, 0 < $slider.next("#header").length && (t += a)), ($body.hasClass("device-sm") || $body.hasClass("device-xs")) && e.parents(".full-screen").length && !e.parents(".force-full-screen").length ? 0 < e.children(".col-padding").length ? e.css({
					position: "relative",
					top: "0",
					width: "auto",
					marginTop: "0"
				}).addClass("clearfix") : e.css({
					position: "relative",
					top: "0",
					width: "auto",
					marginTop: "0",
					paddingTop: "60px",
					paddingBottom: "60px"
				}).addClass("clearfix") : e.css({
					position: "absolute",
					top: "50%",
					width: "100%",
					paddingTop: "0",
					paddingBottom: "0",
					marginTop: -t / 2 + "px"
				})
			})
		},
		stickyElements: function () {
			if (0 < $siStickyEl.length) {
				var e = $siStickyEl.outerHeight();
				$siStickyEl.css({
					marginTop: -e / 2 + "px"
				})
			}
			if (0 < $dotsMenuEl.length) {
				var t = $dotsMenuEl.outerHeight();
				$dotsMenuEl.css({
					marginTop: -t / 2 + "px"
				})
			}
		},
		goToTop: function () {
			var e = $goToTopEl.attr("data-speed"),
				t = $goToTopEl.attr("data-easing");
			e || (e = 700), t || (t = "easeOutQuad"), $goToTopEl.click(function () {
				return $("body,html").stop(!0).animate({
					scrollTop: 0
				}, Number(e), t), !1
			})
		},
		goToTopScroll: function () {
			var e = $goToTopEl.attr("data-mobile"),
				t = $goToTopEl.attr("data-offset");
			if (t || (t = 450), "true" != e && ($body.hasClass("device-sm") || $body.hasClass("device-xs"))) return !0;
			$window.scrollTop() > Number(t) ? ($goToTopEl.fadeIn(), $body.addClass("gototop-active")) : ($goToTopEl.fadeOut(), $body.removeClass("gototop-active"))
		},
		fullScreen: function () {
			0 < $fullScreenEl.length && $fullScreenEl.each(function () {
				var e = $(this),
					t = window.innerHeight ? window.innerHeight : $window.height(),
					a = e.attr("data-negative-height");
				if ("slider" == e.attr("id")) {
					var i = $slider.offset().top;
					if (t -= i, 0 < e.find(".slider-parallax-inner").length) {
						var o = e.find(".slider-parallax-inner").css("transform").match(/-?[\d\.]+/g);
						if (o) s = o[5];
						else var s = 0;
						t = (window.innerHeight ? window.innerHeight : $window.height()) + Number(s) - i
					}
					if (0 < $("#slider.with-header").next("#header:not(.transparent-header)").length && ($body.hasClass("device-xl") || $body.hasClass("device-lg"))) t -= $header.outerHeight()
				}
				0 < e.parents(".full-screen").length && (t = e.parents(".full-screen").height()), ($body.hasClass("device-sm") || $body.hasClass("device-xs")) && (e.hasClass("force-full-screen") || (t = "auto")), a && (t -= Number(a)), e.css("height", t), "slider" != e.attr("id") || e.hasClass("canvas-slider-grid") || e.has(".swiper-slide") && e.find(".swiper-slide").css("height", t)
			})
		},
		maxHeight: function () {
			if (0 < $commonHeightEl.length) {
				if ($commonHeightEl.hasClass("customjs")) return !0;
				$commonHeightEl.each(function () {
					var e = $(this);
					0 < e.find(".common-height").length && SEMICOLON.initialize.commonHeight(e.find(".common-height:not(.customjs)")), SEMICOLON.initialize.commonHeight(e)
				})
			}
		},
		commonHeight: function (e) {
			var t = 0;
			e.children("[class*=col-]").each(function () {
				var e = $(this).children();
				e.hasClass("max-height") ? t = e.outerHeight() : e.outerHeight() > t && (t = e.outerHeight())
			}), e.children("[class*=col-]").each(function () {
				$(this).height(t)
			})
		},
		testimonialsGrid: function () {
			if (0 < $testimonialsGridEl.length)
				if ($body.hasClass("device-md") || $body.hasClass("device-lg") || $body.hasClass("device-xl")) {
					var e = 0;
					$testimonialsGridEl.each(function () {
						$(this).find("li > .testimonial").each(function () {
							$(this).height() > e && (e = $(this).height())
						}), $(this).find("li").height(e), e = 0
					})
				} else $testimonialsGridEl.find("li").css({
					height: "auto"
				})
		},
		lightbox: function () {
			if (!$().magnificPopup) return console.log("lightbox: Magnific Popup not Defined."), !0;
			var e = $('[data-lightbox="image"]'),
				t = $('[data-lightbox="gallery"]'),
				a = $('[data-lightbox="iframe"]'),
				i = $('[data-lightbox="inline"]'),
				o = $('[data-lightbox="ajax"]'),
				s = $('[data-lightbox="ajax-gallery"]');
			0 < e.length && e.magnificPopup({
				type: "image",
				closeOnContentClick: !0,
				closeBtnInside: !1,
				fixedContentPos: !0,
				mainClass: "mfp-no-margins mfp-fade",
				image: {
					verticalFit: !0
				}
			}), 0 < t.length && t.each(function () {
				var e = $(this);
				e.find('a[data-lightbox="gallery-item"]').parent(".clone").hasClass("clone") && e.find('a[data-lightbox="gallery-item"]').parent(".clone").find('a[data-lightbox="gallery-item"]').attr("data-lightbox", ""), e.find('a[data-lightbox="gallery-item"]').parents(".cloned").hasClass("cloned") && e.find('a[data-lightbox="gallery-item"]').parents(".cloned").find('a[data-lightbox="gallery-item"]').attr("data-lightbox", ""), e.magnificPopup({
					delegate: 'a[data-lightbox="gallery-item"]',
					type: "image",
					closeOnContentClick: !0,
					closeBtnInside: !1,
					fixedContentPos: !0,
					mainClass: "mfp-no-margins mfp-fade",
					image: {
						verticalFit: !0
					},
					gallery: {
						enabled: !0,
						navigateByImgClick: !0,
						preload: [0, 1]
					}
				})
			}), 0 < a.length && a.magnificPopup({
				disableOn: 600,
				type: "iframe",
				removalDelay: 160,
				preloader: !1,
				fixedContentPos: !1
			}), 0 < i.length && i.magnificPopup({
				type: "inline",
				mainClass: "mfp-no-margins mfp-fade",
				closeBtnInside: !1,
				fixedContentPos: !0,
				overflowY: "scroll"
			}), 0 < o.length && o.magnificPopup({
				type: "ajax",
				closeBtnInside: !1,
				callbacks: {
					ajaxContentAdded: function (e) {
						SEMICOLON.widget.loadFlexSlider(), SEMICOLON.initialize.resizeVideos(), SEMICOLON.widget.masonryThumbs()
					},
					open: function () {
						$body.addClass("ohidden")
					},
					close: function () {
						$body.removeClass("ohidden")
					}
				}
			}), 0 < s.length && s.magnificPopup({
				delegate: 'a[data-lightbox="ajax-gallery-item"]',
				type: "ajax",
				closeBtnInside: !1,
				gallery: {
					enabled: !0,
					preload: 0,
					navigateByImgClick: !1
				},
				callbacks: {
					ajaxContentAdded: function (e) {
						SEMICOLON.widget.loadFlexSlider(), SEMICOLON.initialize.resizeVideos(), SEMICOLON.widget.masonryThumbs()
					},
					open: function () {
						$body.addClass("ohidden")
					},
					close: function () {
						$body.removeClass("ohidden")
					}
				}
			})
		},
		modal: function () {
			if (!$().magnificPopup) return console.log("modal: Magnific Popup not Defined."), !0;
			var e = $(".modal-on-load:not(.customjs)");
			0 < e.length && e.each(function () {
				var e = $(this),
					t = e.attr("data-target"),
					a = t.split("#")[1],
					i = e.attr("data-delay"),
					o = e.attr("data-timeout"),
					s = e.attr("data-animate-in"),
					n = e.attr("data-animate-out");
				if (e.hasClass("enable-cookie") || Cookies.remove(a), e.hasClass("enable-cookie")) {
					var r = Cookies.set(a);
					if (void 0 !== r && "0" == r) return !0
				}
				i = i ? Number(i) + 1500 : 1500;
				setTimeout(function () {
					$.magnificPopup.open({
						items: {
							src: t
						},
						type: "inline",
						mainClass: "mfp-no-margins mfp-fade",
						closeBtnInside: !0,
						fixedContentPos: !0,
						removalDelay: 500,
						callbacks: {
							open: function () {
								"" != s && $(t).addClass(s + " animated")
							},
							beforeClose: function () {
								"" != n && $(t).removeClass(s).addClass(n)
							},
							afterClose: function () {
								"" == s && "" == n || $(t).removeClass(s + " " + n + " animated"), e.hasClass("enable-cookie") && Cookies.set(a, "0")
							}
						}
					}, 0)
				}, Number(i));
				if ("" != o) setTimeout(function () {
					$.magnificPopup.close()
				}, Number(i) + Number(o))
			})
		},
		resizeVideos: function () {
			if (!$().fitVids) return console.log("resizeVideos: FitVids not Defined."), !0;
			$("#content,#footer,.slider-element:not(.revslider-wrap),.landing-offer-media,.portfolio-ajax-modal,.mega-menu-column").fitVids({
				customSelector: "iframe[src^='//www.dailymotion.com/embed'], iframe[src*='maps.google.com'], iframe[src*='google.com/maps'], iframe[src*='facebook.com/plugins/video']",
				ignore: ".no-fv"
			})
		},
		imageFade: function () {
			$(".image_fade").hover(function () {
				$(this).filter(":not(:animated)").animate({
					opacity: .8
				}, 400)
			}, function () {
				$(this).animate({
					opacity: 1
				}, 400)
			})
		},
		blogTimelineEntries: function () {
			$(".post-timeline.grid-2").find(".entry").each(function () {
				"0px" == $(this).inlineStyle("left") ? $(this).removeClass("alt") : $(this).addClass("alt"), $(this).find(".entry-timeline").fadeIn()
			}), $(".entry.entry-date-section").next().next().find(".entry-timeline").css({
				top: "70px"
			})
		},
		pageTransition: function () {
			if ($body.hasClass("no-transition")) return !0;
			if (!$().animsition) return $body.addClass("no-transition"), console.log("pageTransition: Animsition not Defined."), !0;
			window.onpageshow = function (e) {
				e.persisted && window.location.reload()
			};
			var e = $body.attr("data-animation-in"),
				t = $body.attr("data-animation-out"),
				a = $body.attr("data-speed-in"),
				i = $body.attr("data-speed-out"),
				o = !1,
				s = $body.attr("data-loader-timeout"),
				n = $body.attr("data-loader"),
				r = $body.attr("data-loader-color"),
				l = $body.attr("data-loader-html"),
				d = "",
				c = "",
				u = "",
				f = "",
				h = "";
			t || (t = "fadeOut"), i || (i = 800), l || (l = '<div class="css3-spinner-bounce1"></div><div class="css3-spinner-bounce2"></div><div class="css3-spinner-bounce3"></div>'), s ? (o = !0, s = Number(s)) : s = o = !1, r && ("theme" == r ? (u = " bgcolor", " border-color", f = ' class="bgcolor"', h = ' class="border-color"') : (d = ' style="background-color:' + r + ';"', c = ' style="border-color:' + r + ';"'), l = '<div class="css3-spinner-bounce1' + u + '"' + d + '></div><div class="css3-spinner-bounce2' + u + '"' + d + '></div><div class="css3-spinner-bounce3' + u + '"' + d + "></div>"), "2" == n ? l = '<div class="css3-spinner-flipper' + u + '"' + d + "></div>" : "3" == n ? l = '<div class="css3-spinner-double-bounce1' + u + '"' + d + '></div><div class="css3-spinner-double-bounce2' + u + '"' + d + "></div>" : "4" == n ? l = '<div class="css3-spinner-rect1' + u + '"' + d + '></div><div class="css3-spinner-rect2' + u + '"' + d + '></div><div class="css3-spinner-rect3' + u + '"' + d + '></div><div class="css3-spinner-rect4' + u + '"' + d + '></div><div class="css3-spinner-rect5' + u + '"' + d + "></div>" : "5" == n ? l = '<div class="css3-spinner-cube1' + u + '"' + d + '></div><div class="css3-spinner-cube2' + u + '"' + d + "></div>" : "6" == n ? l = '<div class="css3-spinner-scaler' + u + '"' + d + "></div>" : "7" == n ? l = '<div class="css3-spinner-grid-pulse"><div' + f + d + "></div><div" + f + d + "></div><div" + f + d + "></div><div" + f + d + "></div><div" + f + d + "></div><div" + f + d + "></div><div" + f + d + "></div><div" + f + d + "></div><div" + f + d + "></div></div>" : "8" == n ? l = '<div class="css3-spinner-clip-rotate"><div' + h + c + "></div></div>" : "9" == n ? l = '<div class="css3-spinner-ball-rotate"><div' + f + d + "></div><div" + f + d + "></div><div" + f + d + "></div></div>" : "10" == n ? l = '<div class="css3-spinner-zig-zag"><div' + f + d + "></div><div" + f + d + "></div></div>" : "11" == n ? l = '<div class="css3-spinner-triangle-path"><div' + f + d + "></div><div" + f + d + "></div><div" + f + d + "></div></div>" : "12" == n ? l = '<div class="css3-spinner-ball-scale-multiple"><div' + f + d + "></div><div" + f + d + "></div><div" + f + d + "></div></div>" : "13" == n ? l = '<div class="css3-spinner-ball-pulse-sync"><div' + f + d + "></div><div" + f + d + "></div><div" + f + d + "></div></div>" : "14" == n && (l = '<div class="css3-spinner-scale-ripple"><div' + h + c + "></div><div" + h + c + "></div><div" + h + c + "></div></div>"), $wrapper.css({
				opacity: 1
			}), $wrapper.animsition({
				inClass: e,
				outClass: t,
				inDuration: Number(a),
				outDuration: Number(i),
				linkElement: '#primary-menu:not(.on-click) ul li a:not([target="_blank"]):not([href*="#"]):not([data-lightbox]):not([href^="mailto"]):not([href^="tel"]):not([href^="sms"]):not([href^="call"])',
				loading: !0,
				loadingParentElement: "body",
				loadingClass: "css3-spinner",
				loadingInner: l,
				timeout: o,
				timeoutCountdown: s,
				onLoadEvent: !0,
				browser: ["animation-duration", "-webkit-animation-duration"],
				overlay: !1,
				overlayClass: "animsition-overlay-slide",
				overlayParentElement: "body"
			})
		},
		lazyLoad: function () {
			var e = $("[data-lazyload]");
			if (!$().appear) return console.log("lazyLoad: Appear not Defined."), !0;
			0 < e.length && e.each(function () {
				var e = $(this),
					t = e.attr("data-lazyload");
				e.attr("src", "images/blank.svg").css({
					background: "url(images/preloader.gif) no-repeat center center #FFF"
				}), e.appear(function () {
					e.css({
						background: "none"
					}).removeAttr("width").removeAttr("height").attr("src", t)
				}, {
						accX: 0,
						accY: 120
					}, "easeInCubic")
			})
		},
		topScrollOffset: function () {
			var e = 0;
			return !$body.hasClass("device-xl") && !$body.hasClass("device-lg") || SEMICOLON.isMobile.any() ? e = 40 : (e = $header.hasClass("sticky-header") ? $pagemenu.hasClass("dots-menu") ? 100 : 144 : $pagemenu.hasClass("dots-menu") ? 140 : 184, $pagemenu.length || (e = $header.hasClass("sticky-header") ? 100 : 140)), e
		},
		defineColumns: function (e) {
			var t = 4,
				a = e.attr("data-xl-col"),
				i = e.attr("data-lg-col"),
				o = e.attr("data-md-col"),
				s = e.attr("data-sm-col"),
				n = e.attr("data-xs-col");
			return e.hasClass("portfolio-full") ? (t = e.hasClass("portfolio-3") ? 3 : e.hasClass("portfolio-5") ? 5 : e.hasClass("portfolio-6") ? 6 : 4, !$body.hasClass("device-md") || 4 != t && 5 != t && 6 != t ? !$body.hasClass("device-sm") || 3 != t && 4 != t && 5 != t && 6 != t ? $body.hasClass("device-xs") && (t = 1) : t = 2 : t = 3) : e.hasClass("masonry-thumbs") && (t = e.hasClass("grid-2") ? 2 : e.hasClass("grid-3") ? 3 : e.hasClass("grid-5") ? 5 : e.hasClass("grid-6") ? 6 : 4), $body.hasClass("device-xl") ? a && (t = Number(a)) : $body.hasClass("device-lg") ? i && (t = Number(i)) : $body.hasClass("device-md") ? o && (t = Number(o)) : $body.hasClass("device-sm") ? s && (t = Number(s)) : $body.hasClass("device-xs") && n && (t = Number(n)), t
		},
		setFullColumnWidth: function (e) {
			if (!$().isotope) return console.log("setFullColumnWidth: Isotope not Defined."), !0;
			if (e.css({
				width: ""
			}), e.hasClass("portfolio-full")) {
				var t = SEMICOLON.initialize.defineColumns(e),
					a = e.width(),
					i = Math.floor(a / t);
				if ($body.hasClass("device-xs")) var o = 1;
				else o = 0;
				e.find(".portfolio-item").each(function (e) {
					if (0 == o && $(this).hasClass("wide")) var t = 2 * i;
					else t = i;
					$(this).css({
						width: t + "px"
					})
				})
			} else if (e.hasClass("masonry-thumbs")) {
				t = SEMICOLON.initialize.defineColumns(e);
				(a = e.innerWidth()) == windowWidth && (a = 1.005 * windowWidth, e.css({
					width: a + "px"
				}));
				i = a / t;
				a <= (i = Math.floor(i)) * t && e.css({
					"margin-right": "-1px"
				}), e.children("a").css({
					width: i + "px"
				});
				var s = e.find("a:eq(0)").outerWidth();
				e.isotope({
					masonry: {
						columnWidth: s
					}
				});
				var n = e.attr("data-big");
				if (n) {
					n = n.split(",");
					var r = "",
						l = "";
					for (l = 0; l < n.length; l++) r = Number(n[l]) - 1, e.find("a:eq(" + r + ")").css({
						width: 2 * s + "px"
					});
					setTimeout(function () {
						e.isotope("layout")
					}, 1e3)
				}
			}
		},
		aspectResizer: function () {
			var e = $(".aspect-resizer");
			0 < e.length && e.each(function () {
				var e = $(this);
				e.inlineStyle("width"), e.inlineStyle("height"), e.parent().innerWidth()
			})
		},
		dataResponsiveClasses: function () {
			var e = $("[data-class-xs]"),
				t = $("[data-class-sm]"),
				a = $("[data-class-md]"),
				i = $("[data-class-lg]"),
				o = $("[data-class-xl]");
			0 < e.length && e.each(function () {
				var e = $(this),
					t = e.attr("data-class-xs"),
					a = e.attr("data-class-sm") + " " + e.attr("data-class-md") + " " + e.attr("data-class-lg") + " " + e.attr("data-class-xl");
				$body.hasClass("device-xs") && (e.removeClass(a), e.addClass(t))
			}), 0 < t.length && t.each(function () {
				var e = $(this),
					t = e.attr("data-class-sm"),
					a = e.attr("data-class-xs") + " " + e.attr("data-class-md") + " " + e.attr("data-class-lg") + " " + e.attr("data-class-xl");
				$body.hasClass("device-sm") && (e.removeClass(a), e.addClass(t))
			}), 0 < a.length && a.each(function () {
				var e = $(this),
					t = e.attr("data-class-md"),
					a = e.attr("data-class-xs") + " " + e.attr("data-class-sm") + " " + e.attr("data-class-lg") + " " + e.attr("data-class-xl");
				$body.hasClass("device-md") && (e.removeClass(a), e.addClass(t))
			}), 0 < i.length && i.each(function () {
				var e = $(this),
					t = e.attr("data-class-lg"),
					a = e.attr("data-class-xs") + " " + e.attr("data-class-sm") + " " + e.attr("data-class-md") + " " + e.attr("data-class-xl");
				$body.hasClass("device-lg") && (e.removeClass(a), e.addClass(t))
			}), 0 < o.length && o.each(function () {
				var e = $(this),
					t = e.attr("data-class-xl"),
					a = e.attr("data-class-xs") + " " + e.attr("data-class-sm") + " " + e.attr("data-class-md") + " " + e.attr("data-class-lg");
				$body.hasClass("device-xl") && (e.removeClass(a), e.addClass(t))
			})
		},
		dataResponsiveHeights: function () {
			var e = $("[data-height-xs]"),
				t = $("[data-height-sm]"),
				a = $("[data-height-md]"),
				i = $("[data-height-lg]"),
				o = $("[data-height-xl]");
			0 < e.length && e.each(function () {
				var e = $(this),
					t = e.attr("data-height-xs");
				$body.hasClass("device-xs") && "" != t && e.css("height", t)
			}), 0 < t.length && t.each(function () {
				var e = $(this),
					t = e.attr("data-height-sm");
				$body.hasClass("device-sm") && "" != t && e.css("height", t)
			}), 0 < a.length && a.each(function () {
				var e = $(this),
					t = e.attr("data-height-md");
				$body.hasClass("device-md") && "" != t && e.css("height", t)
			}), 0 < i.length && i.each(function () {
				var e = $(this),
					t = e.attr("data-height-lg");
				$body.hasClass("device-lg") && "" != t && e.css("height", t)
			}), 0 < o.length && o.each(function () {
				var e = $(this),
					t = e.attr("data-height-xl");
				$body.hasClass("device-xl") && "" != t && e.css("height", t)
			})
		},
		stickFooterOnSmall: function () {
			$footer.css({
				"margin-top": ""
			});
			var e = $window.height(),
				t = $wrapper.height();
			!$body.hasClass("sticky-footer") && 0 < $footer.length && $wrapper.has("#footer") && t < e && $footer.css({
				"margin-top": e - t
			})
		},
		stickyFooter: function () {
			if ($body.hasClass("sticky-footer") && 0 < $footer.length && ($body.hasClass("device-xl") || $body.hasClass("device-lg"))) {
				var e = $footer.outerHeight();
				$content.css({
					"margin-bottom": e
				})
			} else $content.css({
				"margin-bottom": 0
			})
		}
	}, SEMICOLON.header = {
		init: function () {
			SEMICOLON.header.superfish(), SEMICOLON.header.menufunctions(), SEMICOLON.header.fullWidthMenu(), SEMICOLON.header.overlayMenu(), SEMICOLON.header.stickyMenu(), SEMICOLON.header.stickyPageMenu(), SEMICOLON.header.sideHeader(), SEMICOLON.header.sidePanel(), SEMICOLON.header.onePageScroll(), SEMICOLON.header.onepageScroller(), SEMICOLON.header.logo(), SEMICOLON.header.topsearch(), SEMICOLON.header.topcart()
		},
		superfish: function () {
			if (($body.hasClass("device-xl") || $body.hasClass("device-lg")) && ($("#primary-menu ul ul, #primary-menu ul .mega-menu-content").css("display", "block"), SEMICOLON.header.menuInvert(), $("#primary-menu ul ul, #primary-menu ul .mega-menu-content").css("display", "")), !$().superfish) return $body.addClass("no-superfish"), console.log("superfish: Superfish not Defined."), !0;
			$("body:not(.side-header) #primary-menu:not(.on-click) > ul, body:not(.side-header) #primary-menu:not(.on-click) > div > ul:not(.dropdown-menu), .top-links:not(.on-click) > ul").superfish({
				popUpSelector: "ul,.mega-menu-content,.top-link-section",
				delay: 250,
				speed: 350,
				animation: {
					opacity: "show"
				},
				animationOut: {
					opacity: "hide"
				},
				cssArrows: !1,
				onShow: function () {
					var e = $(this);
					0 < e.find(".owl-carousel.customjs").length && (e.find(".owl-carousel").removeClass("customjs"), SEMICOLON.widget.carousel()), e.hasClass("mega-menu-content") && 0 < e.find(".widget").length && ($body.hasClass("device-xl") || $body.hasClass("device-lg") ? setTimeout(function () {
						SEMICOLON.initialize.commonHeight(e)
					}, 200) : e.children().height(""))
				}
			}), $("body.side-header #primary-menu:not(.on-click) > ul").superfish({
				popUpSelector: "ul",
				delay: 250,
				speed: 350,
				animation: {
					opacity: "show",
					height: "show"
				},
				animationOut: {
					opacity: "hide",
					height: "hide"
				},
				cssArrows: !1
			})
		},
		menuInvert: function () {
			$("#primary-menu .mega-menu-content, #primary-menu ul ul").each(function (e, t) {
				var a = $(t),
					i = a.offset(),
					o = a.width(),
					s = i.left;
				windowWidth - (o + s) < 0 && a.addClass("menu-pos-invert")
			})
		},
		menufunctions: function () {
			$("#primary-menu ul li:has(ul)").addClass("sub-menu"), $(".top-links ul li:has(ul) > a, #primary-menu.with-arrows > ul > li:has(ul) > a > div, #primary-menu.with-arrows > div > ul > li:has(ul) > a > div, #page-menu nav ul li:has(ul) > a > div").append('<i class="icon-angle-down"></i>'), $(".top-links > ul").addClass("clearfix"), ($body.hasClass("device-xl") || $body.hasClass("device-lg")) && ($("#primary-menu.sub-title > ul > li").hover(function () {
				$(this).prev().css({
					backgroundImage: "none"
				})
			}, function () {
				$(this).prev().css({
					backgroundImage: 'url("images/icons/menu-divider.png")'
				})
			}), $("#primary-menu.sub-title").children("ul").children(".current").prev().css({
				backgroundImage: "none"
			})), $("#primary-menu.on-click li:has(ul) > a").on("click", function (e) {
				$(this).parents(".sub-menu").siblings().find("ul,.mega-menu-content").removeClass("d-block"), $(this).parent("li").children("ul,.mega-menu-content").toggleClass("d-block"), e.preventDefault()
			}), SEMICOLON.isMobile.Android() && $("#primary-menu ul li.sub-menu").children("a").on("touchstart", function (e) {
				$(this).parent("li.sub-menu").hasClass("sfHover") || e.preventDefault()
			}), SEMICOLON.isMobile.Windows() && ($().superfish ? $("#primary-menu > ul, #primary-menu > div > ul,.top-links > ul").superfish("destroy").addClass("windows-mobile-menu") : ($("#primary-menu > ul, #primary-menu > div > ul,.top-links > ul").addClass("windows-mobile-menu"), console.log("menufunctions: Superfish not defined.")), $("#primary-menu ul li:has(ul)").append('<a href="#" class="wn-submenu-trigger"><i class="icon-angle-down"></i></a>'), $("#primary-menu ul li.sub-menu").children("a.wn-submenu-trigger").click(function (e) {
				return $(this).parent().toggleClass("open"), $(this).parent().find("> ul, > .mega-menu-content").stop(!0, !0).toggle(), !1
			}))
		},
		fullWidthMenu: function () {
			$body.hasClass("stretched") ? (0 < $header.find(".container-fullwidth").length && $(".mega-menu .mega-menu-content").css({
				width: $wrapper.width() - 120
			}), $header.hasClass("full-header") && $(".mega-menu .mega-menu-content").css({
				width: $wrapper.width() - 60
			})) : (0 < $header.find(".container-fullwidth").length && $(".mega-menu .mega-menu-content").css({
				width: $wrapper.width() - 120
			}), $header.hasClass("full-header") && $(".mega-menu .mega-menu-content").css({
				width: $wrapper.width() - 80
			}))
		},
		overlayMenu: function () {
			if ($body.hasClass("overlay-menu")) {
				var e = $("#primary-menu").children("ul").children("li"),
					t = e.outerHeight(),
					a = e.length * t,
					i = ($window.height() - a) / 2;
				$("#primary-menu").children("ul").children("li:first-child").css({
					"margin-top": i + "px"
				})
			}
		},
		stickyMenu: function (e) {
			$window.scrollTop() > e ? $body.hasClass("device-xl") || $body.hasClass("device-lg") ? ($("body:not(.side-header) #header:not(.no-sticky)").addClass("sticky-header"), $headerWrap.hasClass("force-not-dark") || $headerWrap.removeClass("not-dark"), SEMICOLON.header.stickyMenuClass()) : ($body.hasClass("device-sm") || $body.hasClass("device-xs") || $body.hasClass("device-md")) && $body.hasClass("sticky-responsive-menu") && ($("#header:not(.no-sticky)").addClass("responsive-sticky-header"), SEMICOLON.header.stickyMenuClass()) : SEMICOLON.header.removeStickyness()
		},
		stickyPageMenu: function (e) {
			$window.scrollTop() > e ? $body.hasClass("device-xl") || $body.hasClass("device-lg") ? $("#page-menu:not(.dots-menu,.no-sticky)").addClass("sticky-page-menu") : ($body.hasClass("device-sm") || $body.hasClass("device-xs") || $body.hasClass("device-md")) && $body.hasClass("sticky-responsive-pagemenu") && $("#page-menu:not(.dots-menu,.no-sticky)").addClass("sticky-page-menu") : $("#page-menu:not(.dots-menu,.no-sticky)").removeClass("sticky-page-menu")
		},
		removeStickyness: function () {
			$header.hasClass("sticky-header") && ($("body:not(.side-header) #header:not(.no-sticky)").removeClass("sticky-header"), $header.removeClass().addClass(oldHeaderClasses), $headerWrap.removeClass().addClass(oldHeaderWrapClasses), $headerWrap.hasClass("force-not-dark") || $headerWrap.removeClass("not-dark"), SEMICOLON.slider.swiperSliderMenu(), SEMICOLON.slider.revolutionSliderMenu()), $header.hasClass("responsive-sticky-header") && $("body.sticky-responsive-menu #header").removeClass("responsive-sticky-header"), ($body.hasClass("device-sm") || $body.hasClass("device-xs") || $body.hasClass("device-md")) && void 0 === responsiveMenuClasses && ($header.removeClass().addClass(oldHeaderClasses), $headerWrap.removeClass().addClass(oldHeaderWrapClasses), $headerWrap.hasClass("force-not-dark") || $headerWrap.removeClass("not-dark"))
		},
		sideHeader: function () {
			$("#header-trigger").click(function () {
				return $("body.open-header").toggleClass("side-header-open"), !1
			})
		},
		sidePanel: function () {
			$(".side-panel-trigger").click(function () {
				return $body.toggleClass("side-panel-open"), $body.hasClass("device-touch") && $body.hasClass("side-push-panel") && $body.toggleClass("ohidden"), !1
			})
		},
		onePageScroll: function () {
			if (0 < $onePageMenuEl.length) {
				var n = $onePageMenuEl.attr("data-speed"),
					r = $onePageMenuEl.attr("data-offset"),
					l = $onePageMenuEl.attr("data-easing");
				n || (n = 1e3), l || (l = "easeOutQuad"), $onePageMenuEl.find("a[data-href]").click(function () {
					var e = $(this),
						t = e.attr("data-href"),
						a = e.attr("data-speed"),
						i = e.attr("data-offset"),
						o = e.attr("data-easing");
					if (0 < $(t).length) {
						if (r) s = r;
						else var s = SEMICOLON.initialize.topScrollOffset();
						a || (a = n), i || (i = s), o || (o = l), $onePageMenuEl.hasClass("no-offset") && (i = 0), onePageGlobalOffset = Number(i), $onePageMenuEl.find("li").removeClass("current"), $onePageMenuEl.find('a[data-href="' + t + '"]').parent("li").addClass("current"), (windowWidth < 768 || $body.hasClass("overlay-menu")) && (0 < $("#primary-menu").find("ul.mobile-primary-menu").length ? $("#primary-menu > ul.mobile-primary-menu, #primary-menu > div > ul.mobile-primary-menu").toggleClass("d-block", !1) : $("#primary-menu > ul, #primary-menu > div > ul").toggleClass("d-block", !1), $pagemenu.toggleClass("pagemenu-active", !1), $body.toggleClass("primary-menu-open", !1)), $("html,body").stop(!0).animate({
							scrollTop: $(t).offset().top - Number(i)
						}, Number(a), o), onePageGlobalOffset = Number(i)
					}
					return !1
				})
			}
		},
		onepageScroller: function () {
			$onePageMenuEl.find("li").removeClass("current"), $onePageMenuEl.find('a[data-href="#' + SEMICOLON.header.onePageCurrentSection() + '"]').parent("li").addClass("current")
		},
		onePageCurrentSection: function () {
			var i = "home",
				o = $headerWrap.outerHeight();
			return $body.hasClass("side-header") && (o = 0), $pageSectionEl.each(function (e) {
				var t = $(this).offset().top,
					a = $window.scrollTop();
				t <= a + (o + onePageGlobalOffset) && a < t + $(this).height() && $(this).attr("id") != i && (i = $(this).attr("id"))
			}), i
		},
		logo: function () {
			!$header.hasClass("dark") && !$body.hasClass("dark") || $headerWrap.hasClass("not-dark") ? (defaultLogoImg && defaultLogo.find("img").attr("src", defaultLogoImg), retinaLogoImg && retinaLogo.find("img").attr("src", retinaLogoImg)) : (defaultDarkLogo && defaultLogo.find("img").attr("src", defaultDarkLogo), retinaDarkLogo && retinaLogo.find("img").attr("src", retinaDarkLogo)), $header.hasClass("sticky-header") && (defaultStickyLogo && defaultLogo.find("img").attr("src", defaultStickyLogo), retinaStickyLogo && retinaLogo.find("img").attr("src", retinaStickyLogo)), ($body.hasClass("device-sm") || $body.hasClass("device-xs")) && (defaultMobileLogo && defaultLogo.find("img").attr("src", defaultMobileLogo), retinaMobileLogo && retinaLogo.find("img").attr("src", retinaMobileLogo))
		},
		stickyMenuClass: function () {
			if (stickyMenuClasses) var e = stickyMenuClasses.split(/ +/);
			else e = "";
			var t = e.length;
			if (0 < t) {
				var a = 0;
				for (a = 0; a < t; a++) "not-dark" == e[a] ? ($header.removeClass("dark"), $headerWrap.addClass("not-dark")) : ("dark" == e[a] && $headerWrap.removeClass("not-dark force-not-dark"), $header.hasClass(e[a]) || $header.addClass(e[a]))
			}
		},
		responsiveMenuClass: function () {
			if ($body.hasClass("device-sm") || $body.hasClass("device-xs") || $body.hasClass("device-md")) {
				if (responsiveMenuClasses) var e = responsiveMenuClasses.split(/ +/);
				else e = "";
				var t = e.length;
				if (0 < t) {
					var a = 0;
					for (a = 0; a < t; a++) "not-dark" == e[a] ? ($header.removeClass("dark"), $headerWrap.addClass("not-dark")) : ("dark" == e[a] && $headerWrap.removeClass("not-dark force-not-dark"), $header.hasClass(e[a]) || $header.addClass(e[a]))
				}
				SEMICOLON.header.logo()
			}
		},
		topsocial: function () {
			0 < $topSocialEl.length && ($body.hasClass("device-lg") || $body.hasClass("device-xl") ? ($topSocialEl.show(), $topSocialEl.find("a").css({
				width: 40
			}), $topSocialEl.find(".ts-text").each(function () {
				var e = $(this).clone().css({
					visibility: "hidden",
					display: "inline-block",
					"font-size": "13px",
					"font-weight": "bold"
				}).appendTo($body),
					t = e.innerWidth() + 52;
				$(this).parent("a").attr("data-hover-width", t), e.remove()
			}), $topSocialEl.find("a").hover(function () {
				0 < $(this).find(".ts-text").length && $(this).css({
					width: $(this).attr("data-hover-width")
				})
			}, function () {
				$(this).css({
					width: 40
				})
			})) : ($topSocialEl.show(), $topSocialEl.find("a").css({
				width: 40
			}), $topSocialEl.find("a").each(function () {
				var e = $(this).find(".ts-text").text();
				$(this).attr("title", e)
			}), $topSocialEl.find("a").hover(function () {
				$(this).css({
					width: 40
				})
			}, function () {
				$(this).css({
					width: 40
				})
			}), $body.hasClass("device-xs") && ($topSocialEl.hide(), $topSocialEl.slice(0, 8).show())))
		},
		topsearch: function () {
			$(document).on("click", function (e) {
				$(e.target).closest("#top-search").length || $body.toggleClass("top-search-open", !1), $(e.target).closest("#top-cart").length || $topCart.toggleClass("top-cart-open", !1), $(e.target).closest("#page-menu").length || $pagemenu.toggleClass("pagemenu-active", !1), $(e.target).closest("#side-panel").length || $body.toggleClass("side-panel-open", !1), $(e.target).closest("#primary-menu").length || $("#primary-menu.on-click > ul").find(".d-block").removeClass("d-block"), $(e.target).closest("#primary-menu.mobile-menu-off-canvas > ul").length || $("#primary-menu.mobile-menu-off-canvas > ul").toggleClass("d-block", !1), $(e.target).closest("#primary-menu.mobile-menu-off-canvas > div > ul").length || $("#primary-menu.mobile-menu-off-canvas > div > ul").toggleClass("d-block", !1)
			}), $("#top-search-trigger").click(function (e) {
				$body.toggleClass("top-search-open"), $topCart.toggleClass("top-cart-open", !1), $("#primary-menu > ul, #primary-menu > div > ul").toggleClass("d-block", !1), $pagemenu.toggleClass("pagemenu-active", !1), $body.hasClass("top-search-open") && $topSearch.find("input").focus(), e.stopPropagation(), e.preventDefault()
			})
		},
		topcart: function () {
			$("#top-cart-trigger").click(function (e) {
				$pagemenu.toggleClass("pagemenu-active", !1), $topCart.toggleClass("top-cart-open"), e.stopPropagation(), e.preventDefault()
			})
		}
	}, SEMICOLON.slider = {
		init: function () {
			SEMICOLON.slider.sliderParallaxDimensions(), SEMICOLON.slider.sliderRun(), SEMICOLON.slider.sliderParallax(), SEMICOLON.slider.sliderElementsFade(), SEMICOLON.slider.captionPosition()
		},
		sliderParallaxDimensions: function () {
			if ($sliderParallaxEl.find(".slider-parallax-inner").length < 1) return !0;
			if ($body.hasClass("device-xl") || $body.hasClass("device-lg") || $body.hasClass("device-md")) {
				var e = $sliderParallaxEl.outerHeight(),
					t = $sliderParallaxEl.outerWidth();
				($sliderParallaxEl.hasClass("revslider-wrap") || 0 < $sliderParallaxEl.find(".carousel-widget").length) && (e = $sliderParallaxEl.find(".slider-parallax-inner").children().first().outerHeight(), $sliderParallaxEl.height(e)), $sliderParallaxEl.find(".slider-parallax-inner").height(e), $body.hasClass("side-header") && $sliderParallaxEl.find(".slider-parallax-inner").width(t), $body.hasClass("stretched") || (t = $wrapper.outerWidth(), $sliderParallaxEl.find(".slider-parallax-inner").width(t))
			} else $sliderParallaxEl.find(".slider-parallax-inner").css({
				width: "",
				height: ""
			});
			swiperSlider && swiperSlider.update()
		},
		sliderRun: function () {
			if ("undefined" == typeof Swiper) return console.log("sliderRun: Swiper not Defined."), !0;
			var $sliderEl = $sliderElement.filter(":not(.customjs)");
			$sliderEl.each(function () {
				if ($(this).hasClass("swiper_wrapper")) {
					var element = $(this).filter(".swiper_wrapper"),
						elementDirection = element.attr("data-direction"),
						elementSpeed = element.attr("data-speed"),
						elementAutoPlay = element.attr("data-autoplay"),
						elementLoop = element.attr("data-loop"),
						elementEffect = element.attr("data-effect"),
						elementGrabCursor = element.attr("data-grab"),
						slideNumberTotal = element.find(".slide-number-total"),
						slideNumberCurrent = element.find(".slide-number-current"),
						sliderVideoAutoPlay = element.attr("data-video-autoplay"),
						sliderSettings = element.attr("data-settings");
					if (elementSpeed || (elementSpeed = 300), elementDirection || (elementDirection = "horizontal"), elementAutoPlay = elementAutoPlay ? Number(elementAutoPlay) : 999999999, elementLoop = "true" == elementLoop, elementEffect || (elementEffect = "slide"), elementGrabCursor = "false" != elementGrabCursor, sliderVideoAutoPlay = "false" != sliderVideoAutoPlay, 0 < element.find(".swiper-pagination").length) var elementPagination = element.find(".swiper-pagination"),
						elementPaginationClickable = !0;
					else var elementPagination = "",
						elementPaginationClickable = !1;
					var elementNavNext = element.find(".slider-arrow-right"),
						elementNavPrev = element.find(".slider-arrow-left");
					if (swiperSlider = new Swiper(element.find(".swiper-parent"), {
						direction: elementDirection,
						speed: Number(elementSpeed),
						autoplay: {
							delay: elementAutoPlay
						},
						loop: elementLoop,
						effect: elementEffect,
						slidesPerView: 1,
						grabCursor: elementGrabCursor,
						pagination: {
							el: elementPagination,
							clickable: elementPaginationClickable
						},
						navigation: {
							prevEl: elementNavPrev,
							nextEl: elementNavNext
						},
						on: {
							init: function (e) {
								SEMICOLON.slider.sliderParallaxDimensions(), element.find(".yt-bg-player").attr("data-autoplay", "false").removeClass("customjs"), SEMICOLON.widget.youtubeBgVideo(), $(".swiper-slide-active [data-animate]").each(function () {
									var e = $(this),
										t = e.attr("data-delay"),
										a = 0;
									if (a = t ? Number(t) + 750 : 750, !e.hasClass("animated")) {
										e.addClass("not-animated");
										var i = e.attr("data-animate");
										setTimeout(function () {
											e.removeClass("not-animated").addClass(i + " animated")
										}, a)
									}
								}), element.find("[data-animate]").each(function () {
									var e = $(this),
										t = e.attr("data-animate");
									if (e.parents(".swiper-slide").hasClass("swiper-slide-active")) return !0;
									e.removeClass("animated").removeClass(t).addClass("not-animated")
								}), SEMICOLON.slider.swiperSliderMenu()
							},
							transitionStart: function (e) {
								0 < slideNumberCurrent.length && (1 == elementLoop ? slideNumberCurrent.html(Number(element.find(".swiper-slide.swiper-slide-active").attr("data-swiper-slide-index")) + 1) : slideNumberCurrent.html(swiperSlider.activeIndex + 1)), element.find("[data-animate]").each(function () {
									var e = $(this),
										t = e.attr("data-animate");
									if (e.parents(".swiper-slide").hasClass("swiper-slide-active")) return !0;
									e.removeClass("animated").removeClass(t).addClass("not-animated")
								}), SEMICOLON.slider.swiperSliderMenu()
							},
							transitionEnd: function (e) {
								element.find(".swiper-slide").each(function () {
									var e = $(this);
									0 < e.find("video").length && 1 == sliderVideoAutoPlay && e.find("video").get(0).pause(), 0 < e.find(".yt-bg-player.mb_YTPlayer:not(.customjs)").length && e.find(".yt-bg-player.mb_YTPlayer:not(.customjs)").YTPPause()
								}), element.find('.swiper-slide:not(".swiper-slide-active")').each(function () {
									var e = $(this);
									0 < e.find("video").length && 0 != e.find("video").get(0).currentTime && (e.find("video").get(0).currentTime = 0), 0 < e.find(".yt-bg-player.mb_YTPlayer:not(.customjs)").length && e.find(".yt-bg-player.mb_YTPlayer:not(.customjs)").YTPSeekTo(e.find(".yt-bg-player.mb_YTPlayer:not(.customjs)").attr("data-start"))
								}), 0 < element.find(".swiper-slide.swiper-slide-active").find("video").length && 1 == sliderVideoAutoPlay && element.find(".swiper-slide.swiper-slide-active").find("video").get(0).play(), 0 < element.find(".swiper-slide.swiper-slide-active").find(".yt-bg-player.mb_YTPlayer:not(.customjs)").length && 1 == sliderVideoAutoPlay && element.find(".swiper-slide.swiper-slide-active").find(".yt-bg-player.mb_YTPlayer:not(.customjs)").YTPPlay(), element.find(".swiper-slide.swiper-slide-active [data-animate]").each(function () {
									var e = $(this),
										t = e.attr("data-delay"),
										a = 0;
									if (a = t ? Number(t) + 300 : 300, !e.hasClass("animated")) {
										e.addClass("not-animated");
										var i = e.attr("data-animate");
										setTimeout(function () {
											e.removeClass("not-animated").addClass(i + " animated")
										}, a)
									}
								})
							}
						}
					}), 0 < slideNumberCurrent.length && (1 == elementLoop ? slideNumberCurrent.html(swiperSlider.realIndex + 1) : slideNumberCurrent.html(swiperSlider.activeIndex + 1)), 0 < slideNumberTotal.length && slideNumberTotal.html(element.find(".swiper-slide:not(.swiper-slide-duplicate)").length), sliderSettings)
						for (var prop in sliderSettings = eval("(" + sliderSettings + ")"), sliderSettings) swiperSlider.params[prop] = sliderSettings[prop], swiperSlider.update()
				}
			})
		},
		sliderParallaxOffset: function () {
			var e = 0,
				t = $header.outerHeight();
			(($body.hasClass("side-header") || $header.hasClass("transparent-header")) && (t = 0), 0 < $pageTitle.length) ? e = $pageTitle.outerHeight() + t : e = t;
			return 0 < $slider.next("#header").length && (e = 0), e
		},
		sliderParallax: function () {
			if ($sliderParallaxEl.length < 1) return !0;
			var e = SEMICOLON.slider.sliderParallaxOffset(),
				t = $sliderParallaxEl.outerHeight();
			if (!$body.hasClass("device-xl") && !$body.hasClass("device-lg") || SEMICOLON.isMobile.any()) 0 < $sliderParallaxEl.find(".slider-parallax-inner").length ? $(".slider-parallax-inner,.slider-parallax .slider-caption,.ei-title").css({
				transform: "translateY(0px)"
			}) : $(".slider-parallax,.slider-parallax .slider-caption,.ei-title").css({
				transform: "translateY(0px)"
			});
			else {
				if (t + e + 50 > $window.scrollTop())
					if ($sliderParallaxEl.addClass("slider-parallax-visible").removeClass("slider-parallax-invisible"), $window.scrollTop() > e)
						if (0 < $sliderParallaxEl.find(".slider-parallax-inner").length) {
							var a = (-.4 * ($window.scrollTop() - e)).toFixed(0),
								i = (-.15 * ($window.scrollTop() - e)).toFixed(0);
							$sliderParallaxEl.find(".slider-parallax-inner").css({
								transform: "translateY(" + a + "px)"
							}), $(".slider-parallax .slider-caption,.ei-title").css({
								transform: "translateY(" + i + "px)"
							})
						} else {
							a = (($window.scrollTop() - e) / 1.5).toFixed(0), i = (($window.scrollTop() - e) / 7).toFixed(0);
							$sliderParallaxEl.css({
								transform: "translateY(" + a + "px)"
							}), $(".slider-parallax .slider-caption,.ei-title").css({
								transform: "translateY(" + -i + "px)"
							})
						} else 0 < $sliderParallaxEl.find(".slider-parallax-inner").length ? $(".slider-parallax-inner,.slider-parallax .slider-caption,.ei-title").css({
							transform: "translateY(0px)"
						}) : $(".slider-parallax,.slider-parallax .slider-caption,.ei-title").css({
							transform: "translateY(0px)"
						});
				else $sliderParallaxEl.addClass("slider-parallax-invisible").removeClass("slider-parallax-visible");
				requesting && requestAnimationFrame(function () {
					SEMICOLON.slider.sliderParallax(), SEMICOLON.slider.sliderElementsFade()
				})
			}
		},
		sliderElementsFade: function () {
			if (0 < $sliderParallaxEl.length)
				if (!$body.hasClass("device-xl") && !$body.hasClass("device-lg") || SEMICOLON.isMobile.any()) $sliderParallaxEl.find(".slider-arrow-left,.slider-arrow-right,.vertical-middle:not(.no-fade),.slider-caption,.ei-title,.camera_prev,.camera_next").css({
					opacity: 1
				});
				else {
					SEMICOLON.slider.sliderParallaxOffset();
					var e = $sliderParallaxEl.outerHeight();
					if (0 < $slider.length) {
						if ($header.hasClass("transparent-header") || $("body").hasClass("side-header")) var t = 100;
						else t = 0;
						$sliderParallaxEl.find(".slider-arrow-left,.slider-arrow-right,.vertical-middle:not(.no-fade),.slider-caption,.ei-title,.camera_prev,.camera_next").css({
							opacity: 1 - 1.85 * ($window.scrollTop() - t) / e
						})
					}
				}
		},
		captionPosition: function () {
			$sliderElement.find(".slider-caption:not(.custom-caption-pos)").each(function () {
				var e = $(this).outerHeight(),
					t = $sliderElement.outerHeight();
				$(this).parents("#slider").prev("#header").hasClass("transparent-header") && ($body.hasClass("device-xl") || $body.hasClass("device-lg")) ? $(this).parents("#slider").prev("#header").hasClass("floating-header") ? $(this).css({
					top: (t + 160 - e) / 2 + "px"
				}) : $(this).css({
					top: (t + 100 - e) / 2 + "px"
				}) : $(this).css({
					top: (t - e) / 2 + "px"
				})
			})
		},
		swiperSliderMenu: function (e) {
			if (e = void 0 !== e && e, $body.hasClass("device-xl") || $body.hasClass("device-lg")) {
				var t = $slider.find(".swiper-slide.swiper-slide-active");
				SEMICOLON.slider.headerSchemeChanger(t, e)
			}
		},
		revolutionSliderMenu: function (e) {
			if (e = void 0 !== e && e, $body.hasClass("device-xl") || $body.hasClass("device-lg")) {
				var t = $slider.find(".active-revslide");
				SEMICOLON.slider.headerSchemeChanger(t, e)
			}
		},
		headerSchemeChanger: function (e, t) {
			if (0 < e.length) {
				var a = !1;
				if (e.hasClass("dark")) {
					if (oldHeaderClasses) var i = oldHeaderClasses.split(/ +/);
					else i = "";
					var o = i.length;
					if (0 < o) {
						var s = 0;
						for (s = 0; s < o; s++)
							if ("dark" == i[s] && 1 == t) {
								a = !0;
								break
							}
					}
					$("#header.transparent-header:not(.sticky-header,.semi-transparent,.floating-header)").addClass("dark"), a || $("#header.transparent-header.sticky-header,#header.transparent-header.semi-transparent.sticky-header,#header.transparent-header.floating-header.sticky-header").removeClass("dark"), $headerWrap.removeClass("not-dark")
				} else $body.hasClass("dark") ? (e.addClass("not-dark"), $("#header.transparent-header:not(.semi-transparent,.floating-header)").removeClass("dark"), $("#header.transparent-header:not(.sticky-header,.semi-transparent,.floating-header)").find("#header-wrap").addClass("not-dark")) : ($("#header.transparent-header:not(.semi-transparent,.floating-header)").removeClass("dark"), $headerWrap.removeClass("not-dark"));
				$header.hasClass("sticky-header") && SEMICOLON.header.stickyMenuClass(), SEMICOLON.header.logo()
			}
		},
		owlCaptionInit: function () {
			0 < $owlCarouselEl.length && $owlCarouselEl.each(function () {
				var e = $(this);
				0 < e.find(".owl-dot").length && e.addClass("with-carousel-dots")
			})
		}
	}, SEMICOLON.portfolio = {
		init: function () {
			SEMICOLON.portfolio.ajaxload()
		},
		gridInit: function (e) {
			return $().isotope ? e.length < 1 || (!!e.hasClass("customjs") || void e.each(function () {
				var e = $(this),
					t = e.attr("data-transition"),
					a = e.attr("data-layout"),
					i = e.attr("data-stagger"),
					o = !0;
				t || (t = "0.65s"), a || (a = "masonry"), i || (i = 0), $body.hasClass("rtl") && (o = !1), setTimeout(function () {
					e.hasClass("portfolio") ? e.isotope({
						layoutMode: a,
						isOriginLeft: o,
						transitionDuration: t,
						stagger: Number(i),
						masonry: {
							columnWidth: e.find(".portfolio-item:not(.wide)")[0]
						}
					}) : e.isotope({
						layoutMode: a,
						isOriginLeft: o,
						transitionDuration: t
					})
				}, 300)
			})) : (console.log("gridInit: Isotope not Defined."), !0)
		},
		filterInit: function () {
			return $().isotope ? $portfolioFilter.length < 1 || (!!$portfolioFilter.hasClass("customjs") || void $portfolioFilter.each(function () {
				var t = $(this),
					a = t.attr("data-container"),
					i = t.attr("data-active-class"),
					e = t.attr("data-default");
				i || (i = "activeFilter"), t.find("a").click(function () {
					t.find("li").removeClass(i), $(this).parent("li").addClass(i);
					var e = $(this).attr("data-filter");
					return $(a).isotope({
						filter: e
					}), !1
				}), e && (t.find("li").removeClass(i), t.find('[data-filter="' + e + '"]').parent("li").addClass(i), $(a).isotope({
					filter: e
				}))
			})) : (console.log("filterInit: Isotope not Defined."), !0)
		},
		shuffleInit: function () {
			return $().isotope ? $(".portfolio-shuffle").length < 1 || void $(".portfolio-shuffle").click(function () {
				var e = $(this).attr("data-container");
				$(e).isotope("shuffle")
			}) : (console.log("shuffleInit: Isotope not Defined."), !0)
		},
		portfolioDescMargin: function () {
			var e = $(".portfolio-overlay");
			0 < e.length && e.each(function () {
				var e = $(this);
				if (0 < e.find(".portfolio-desc").length) {
					var t = e.outerHeight(),
						a = e.find(".portfolio-desc").outerHeight();
					if (0 < e.find("a.left-icon").length || 0 < e.find("a.right-icon").length || 0 < e.find("a.center-icon").length) var i = 60;
					else i = 0;
					var o = (t - a - i) / 2;
					e.find(".portfolio-desc").css({
						"margin-top": o
					})
				}
			})
		},
		arrange: function () {
			0 < $portfolio.length && $portfolio.each(function () {
				var e = $(this);
				SEMICOLON.initialize.setFullColumnWidth(e)
			})
		},
		ajaxload: function () {
			$(".portfolio-ajax .portfolio-item a.center-icon").click(function (e) {
				var t = $(this).parents(".portfolio-item").attr("id");
				$(this).parents(".portfolio-item").hasClass("portfolio-active") || SEMICOLON.portfolio.loadItem(t, prevPostPortId), e.preventDefault()
			})
		},
		newNextPrev: function (e) {
			var t = SEMICOLON.portfolio.getNextItem(e),
				a = SEMICOLON.portfolio.getPrevItem(e);
			$("#next-portfolio").attr("data-id", t), $("#prev-portfolio").attr("data-id", a)
		},
		loadItem: function (e, t, a) {
			a || (a = !1);
			var i = SEMICOLON.portfolio.getNextItem(e),
				o = SEMICOLON.portfolio.getPrevItem(e);
			if (0 == a) {
				SEMICOLON.portfolio.closeItem(), $portfolioAjaxLoader.fadeIn();
				var s = $("#" + e).attr("data-loader");
				$portfolioDetailsContainer.load(s, {
					portid: e,
					portnext: i,
					portprev: o
				}, function () {
					SEMICOLON.portfolio.initializeAjax(e), SEMICOLON.portfolio.openItem(), $portfolioItems.removeClass("portfolio-active"), $("#" + e).addClass("portfolio-active")
				})
			}
		},
		closeItem: function () {
			$portfolioDetails && 32 < $portfolioDetails.height() && ($portfolioAjaxLoader.fadeIn(), $portfolioDetails.find("#portfolio-ajax-single").fadeOut("600", function () {
				$(this).remove()
			}), $portfolioDetails.removeClass("portfolio-ajax-opened"))
		},
		openItem: function () {
			var t = $portfolioDetails.find("img").length,
				a = 0;
			if (0 < t) $portfolioDetails.find("img").on("load", function () {
				a++;
				var e = SEMICOLON.initialize.topScrollOffset();
				if (t === a) {
					$portfolioDetailsContainer.css({
						display: "block"
					}), $portfolioDetails.addClass("portfolio-ajax-opened"), $portfolioAjaxLoader.fadeOut();
					setTimeout(function () {
						SEMICOLON.widget.loadFlexSlider(), SEMICOLON.initialize.lightbox(), SEMICOLON.initialize.resizeVideos(), SEMICOLON.widget.masonryThumbs(), $("html,body").stop(!0).animate({
							scrollTop: $portfolioDetails.offset().top - e
						}, 900, "easeOutQuad")
					}, 500)
				}
			});
			else {
				var e = SEMICOLON.initialize.topScrollOffset();
				$portfolioDetailsContainer.css({
					display: "block"
				}), $portfolioDetails.addClass("portfolio-ajax-opened"), $portfolioAjaxLoader.fadeOut();
				setTimeout(function () {
					SEMICOLON.widget.loadFlexSlider(), SEMICOLON.initialize.lightbox(), SEMICOLON.initialize.resizeVideos(), SEMICOLON.widget.masonryThumbs(), $("html,body").stop(!0).animate({
						scrollTop: $portfolioDetails.offset().top - e
					}, 900, "easeOutQuad")
				}, 500)
			}
		},
		getNextItem: function (e) {
			var t = "",
				a = $("#" + e).next();
			return 0 != a.length && (t = a.attr("id")), t
		},
		getPrevItem: function (e) {
			var t = "",
				a = $("#" + e).prev();
			return 0 != a.length && (t = a.attr("id")), t
		},
		initializeAjax: function (e) {
			prevPostPortId = $("#" + e), $("#next-portfolio, #prev-portfolio").click(function () {
				var e = $(this).attr("data-id");
				return $portfolioItems.removeClass("portfolio-active"), $("#" + e).addClass("portfolio-active"), SEMICOLON.portfolio.loadItem(e, prevPostPortId), !1
			}), $("#close-portfolio").click(function () {
				return $portfolioDetailsContainer.fadeOut("600", function () {
					$portfolioDetails.find("#portfolio-ajax-single").remove()
				}), $portfolioDetails.removeClass("portfolio-ajax-opened"), $portfolioItems.removeClass("portfolio-active"), !1
			})
		}
	}, SEMICOLON.widget = {
		init: function () {
			SEMICOLON.widget.animations(), SEMICOLON.widget.youtubeBgVideo(), SEMICOLON.widget.tabs(), SEMICOLON.widget.tabsJustify(), SEMICOLON.widget.tabsResponsive(), SEMICOLON.widget.tabsResponsiveResize(), SEMICOLON.widget.toggles(), SEMICOLON.widget.accordions(), SEMICOLON.widget.counter(), SEMICOLON.widget.roundedSkill(), SEMICOLON.widget.progress(), SEMICOLON.widget.twitterFeed(), SEMICOLON.widget.flickrFeed(), SEMICOLON.widget.instagramPhotos("5834720953.1677ed0.a0a26ba4c90845f9a844d64c316bf77a", "8e000fefe3024b2ead6a50ff005bf036"), SEMICOLON.widget.dribbbleShots("012d3d72d12f93e1d41a19195d7da2fc87e6b5afa48a184256e398eb793cfe56"), SEMICOLON.widget.navTree(), SEMICOLON.widget.textRotater(), SEMICOLON.widget.carousel(), SEMICOLON.widget.linkScroll(), SEMICOLON.widget.contactForm(), SEMICOLON.widget.subscription(), SEMICOLON.widget.quickContact(), SEMICOLON.widget.cookieNotify(), SEMICOLON.widget.cartQuantity(), SEMICOLON.widget.extras()
		},
		parallax: function () {
			if ("undefined" != typeof skrollr && $.isFunction(skrollr)) return console.log("parallax: skrollr not Defined."), !0;
			(0 < $parallaxEl.length || 0 < $parallaxPageTitleEl.length || 0 < $parallaxPortfolioEl.length) && (SEMICOLON.isMobile.any() ? ($parallaxEl.addClass("mobile-parallax"), $parallaxPageTitleEl.addClass("mobile-parallax"), $parallaxPortfolioEl.addClass("mobile-parallax")) : skrollr.init({
				forceHeight: !1
			}))
		},
		animations: function () {
			if (!$().appear) return console.log("animations: Appear not Defined."), !0;
			var e = $("[data-animate]");
			0 < e.length && ($body.hasClass("device-xl") || $body.hasClass("device-lg") || $body.hasClass("device-md")) && e.each(function () {
				var e = $(this),
					t = e.attr("data-animate-out"),
					a = e.attr("data-delay"),
					i = e.attr("data-delay-out"),
					o = 0,
					s = 3e3;
				if (0 < e.parents(".fslider.no-thumbs-animate").length) return !0;
				if (0 < e.parents(".swiper-slide").length) return !0;
				if (o = a ? Number(a) + 500 : 500, t && i && (s = Number(i) + o), !e.hasClass("animated")) {
					e.addClass("not-animated");
					var n = e.attr("data-animate");
					e.appear(function () {
						setTimeout(function () {
							e.removeClass("not-animated").addClass(n + " animated")
						}, o), t && setTimeout(function () {
							e.removeClass(n).addClass(t)
						}, s)
					}, {
							accX: 0,
							accY: -120
						}, "easeInCubic")
				}
			})
		},
		loadFlexSlider: function () {
			if (!$().flexslider) return !0;
			var e = $(".fslider:not(.customjs)").find(".flexslider");
			0 < e.length && e.each(function () {
				var e = $(this),
					t = e.parent(".fslider").attr("data-animation"),
					a = e.parent(".fslider").attr("data-easing"),
					i = e.parent(".fslider").attr("data-direction"),
					o = e.parent(".fslider").attr("data-reverse"),
					s = e.parent(".fslider").attr("data-slideshow"),
					n = e.parent(".fslider").attr("data-pause"),
					r = e.parent(".fslider").attr("data-speed"),
					l = e.parent(".fslider").attr("data-video"),
					d = e.parent(".fslider").attr("data-pagi"),
					c = e.parent(".fslider").attr("data-arrows"),
					u = e.parent(".fslider").attr("data-thumbs"),
					f = e.parent(".fslider").attr("data-hover"),
					h = e.parent(".fslider").attr("data-smooth-height"),
					m = e.parent(".fslider").attr("data-touch"),
					p = !1;
				t || (t = "slide"), a && "swing" != a || (a = "swing", p = !0), i || (i = "horizontal"), o = "true" == o, s = !s, n || (n = 5e3), r || (r = 600), l || (l = !1), h = "false" != h, "vertical" == i && (h = !1), d = "false" != d, d = "true" == u ? "thumbnails" : d, c = "false" != c, f = "false" != f, m = "false" != m, e.flexslider({
					selector: ".slider-wrap > .slide",
					animation: t,
					easing: a,
					direction: i,
					reverse: o,
					slideshow: s,
					slideshowSpeed: Number(n),
					animationSpeed: Number(r),
					pauseOnHover: f,
					video: l,
					controlNav: d,
					directionNav: c,
					smoothHeight: h,
					useCSS: p,
					touch: m,
					start: function (e) {
						SEMICOLON.widget.animations(), SEMICOLON.initialize.verticalMiddle(), e.parent().removeClass("preloader2");
						setTimeout(function () {
							$(".grid-container").isotope("layout")
						}, 1200);
						SEMICOLON.initialize.lightbox(), $(".flex-prev").html('<i class="icon-angle-left"></i>'), $(".flex-next").html('<i class="icon-angle-right"></i>'), SEMICOLON.portfolio.portfolioDescMargin()
					},
					after: function () {
						$(".grid-container").hasClass("portfolio-full") && ($(".grid-container.portfolio-full").isotope("layout"), SEMICOLON.portfolio.portfolioDescMargin()), $(".post-grid").hasClass("post-masonry-full") && $(".post-grid.post-masonry-full").isotope("layout")
					}
				})
			})
		},
		html5Video: function () {
			var e = $(".video-wrap:has(video)");
			0 < e.length && e.each(function () {
				var e = $(this),
					t = e.find("video"),
					a = e.outerWidth(),
					i = e.outerHeight(),
					o = 16 * i / 9,
					s = i;
				if (o < a && (s = 9 * (o = a) / 16), t.css({
					width: o + "px",
					height: s + "px"
				}), i < s && t.css({
					left: "",
					top: -(s - i) / 2 + "px"
				}), a < o && t.css({
					top: "",
					left: -(o - a) / 2 + "px"
				}), SEMICOLON.isMobile.any() && !e.hasClass("no-placeholder")) {
					var n = t.attr("poster");
					"" != n && e.append('<div class="video-placeholder" style="background-image: url(' + n + ');"></div>'), t.hide()
				}
			})
		},
		youtubeBgVideo: function () {
			if (!$().YTPlayer) return  !0;
			var e = $(".yt-bg-player");
			if (e.hasClass("customjs")) return !0;
			0 < e.length && e.each(function () {
				var e = $(this),
					t = e.attr("data-video"),
					a = e.attr("data-mute"),
					i = e.attr("data-ratio"),
					o = e.attr("data-quality"),
					s = e.attr("data-opacity"),
					n = e.attr("data-container"),
					r = e.attr("data-optimize"),
					l = e.attr("data-loop"),
					d = e.attr("data-volume"),
					c = e.attr("data-start"),
					u = e.attr("data-stop"),
					f = e.attr("data-autoplay"),
					h = e.attr("data-fullscreen");
				a = "false" != a, i || (i = "16/9"), o || (o = "hd720"), s || (s = 1), n || (n = "self"), r = "false" != r, l = "false" != l, d || (d = 1), c || (c = 0), u || (u = 0), f = "false" != f, h = "true" == h, e.YTPlayer({
					videoURL: t,
					mute: a,
					ratio: i,
					quality: o,
					opacity: Number(s),
					containment: n,
					optimizeDisplay: r,
					loop: l,
					vol: Number(d),
					startAt: Number(c),
					stopAt: Number(u),
					autoPlay: f,
					realfullscreen: h,
					showYTLogo: !1,
					showControls: !1
				})
			})
		},
		tabs: function () {
			if (!$().tabs) return console.log("tabs: Tabs not Defined."), !0;
			var e = $(".tabs:not(.customjs)");
			0 < e.length && e.each(function () {
				var e = $(this),
					t = e.attr("data-speed"),
					a = e.attr("data-active");
				t || (t = 400), a ? a -= 1 : a = 0;
				var i = window.location.hash;
				if (0 < jQuery(i).length) {
					var o = i.split("#"),
						s = document.getElementById(o[1]);
					a = jQuery(".tab-content").index(s)
				}
				e.tabs({
					active: Number(a),
					show: {
						effect: "fade",
						duration: Number(t)
					}
				})
			})
		},
		tabsJustify: function () {
			if ($("body").hasClass("device-xs") || $("body").hasClass("device-sm")) $(".tabs.tabs-justify").find(".tab-nav > li").css({
				width: ""
			});
			else {
				var e = $(".tabs.tabs-justify");
				0 < e.length && e.each(function () {
					var e, t = $(this),
						a = t.find(".tab-nav > li"),
						i = a.length,
						o = 0;
					o = t.hasClass("tabs-bordered") || t.hasClass("tabs-bb") ? t.find(".tab-nav").outerWidth() : t.find("tab-nav").hasClass("tab-nav2") ? t.find(".tab-nav").outerWidth() - 10 * i : t.find(".tab-nav").outerWidth() - 30, e = Math.floor(o / i), a.css({
						width: e + "px"
					})
				})
			}
		},
		tabsResponsive: function () {
			if (!$().tabs) return console.log("tabs: Tabs not Defined."), !0;
			var e = $(".tabs.tabs-responsive");
			if (e.length < 1) return !0;
			e.each(function () {
				var e = $(this),
					t = e.find(".tab-nav"),
					i = e.find(".tab-container");
				t.children("li").each(function () {
					var e = $(this).children("a"),
						t = e.attr("href"),
						a = e.html();
					i.find(t).before('<div class="acctitle d-none"><i class="acc-closed icon-ok-circle"></i><i class="acc-open icon-remove-circle"></i>' + a + "</div>")
				})
			})
		},
		tabsResponsiveResize: function () {
			if (!$().tabs) return console.log("tabs: Tabs not Defined."), !0;
			var e = $(".tabs.tabs-responsive");
			if (e.length < 1) return !0;
			e.each(function () {
				var e = $(this),
					t = e.tabs("option", "active") + 1,
					a = e.attr("data-accordion-style");
				$("body").hasClass("device-sm") || $("body").hasClass("device-xs") ? (e.find(".tab-nav").addClass("d-none"), e.find(".tab-container").addClass("accordion " + a + " clearfix").attr("data-active", t), e.find(".tab-content").addClass("acc_content"), e.find(".acctitle").removeClass("d-none"), SEMICOLON.widget.accordions()) : ($("body").hasClass("device-md") || $("body").hasClass("device-lg") || $("body").hasClass("device-xl")) && (e.find(".tab-nav").removeClass("d-none"), e.find(".tab-container").removeClass("accordion " + a + " clearfix").attr("data-active", ""), e.find(".tab-content").removeClass("acc_content"), e.find(".acctitle").addClass("d-none"), e.tabs("refresh"))
			})
		},
		toggles: function () {
			var e = $(".toggle");
			0 < e.length && e.each(function () {
				var e = $(this);
				"open" != e.attr("data-state") ? e.children(".togglec").hide() : e.children(".togglet").addClass("toggleta"), e.children(".togglet").click(function () {
					return $(this).toggleClass("toggleta").next(".togglec").slideToggle(300), !0
				})
			})
		},
		accordions: function () {
			var e = $(".accordion");
			0 < e.length && e.each(function () {
				var t = $(this),
					e = t.attr("data-state"),
					a = t.attr("data-active");
				a ? a -= 1 : a = 0, t.find(".acc_content").hide(), "closed" != e && t.find(".acctitle:eq(" + Number(a) + ")").addClass("acctitlec").next().show(), t.find(".acctitle").click(function () {
					if ($(this).next().is(":hidden")) {
						t.find(".acctitle").removeClass("acctitlec").next().slideUp("normal");
						var e = $(this);
						$(this).toggleClass("acctitlec").next().stop().slideDown("normal", function () {
							($body.hasClass("device-sm") || $body.hasClass("device-xs")) && t.hasClass("scroll-on-open") && $("html,body").stop(!0).animate({
								scrollTop: e.offset().top - (SEMICOLON.initialize.topScrollOffset() - 40)
							}, 800, "easeOutQuad")
						})
					}
					return !1
				})
			})
		},
		counter: function () {
			if (!$().appear) return console.log("counter: Appear not Defined."), !0;
			if (!$().countTo) return console.log("counter: countTo not Defined."), !0;
			var e = $(".counter:not(.counter-instant)");
			0 < e.length && e.each(function () {
				var e = $(this),
					t = $(this).find("span").attr("data-comma");
				t = !!t, $body.hasClass("device-xl") || $body.hasClass("device-lg") ? e.appear(function () {
					SEMICOLON.widget.runCounter(e, t), e.parents(".common-height") && SEMICOLON.initialize.maxHeight()
				}, {
						accX: 0,
						accY: -120
					}, "easeInCubic") : SEMICOLON.widget.runCounter(e, t)
			})
		},
		runCounter: function (e, t) {
			1 == t ? e.find("span").countTo({
				formatter: function (e, t) {
					return e = (e = e.toFixed(t.decimals)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
				}
			}) : e.find("span").countTo()
		},
		roundedSkill: function () {
			if (!$().appear) return console.log("roundedSkill: Appear not Defined."), !0;
			if (!$().easyPieChart) return !0;
			var e = $(".rounded-skill");
			0 < e.length && e.each(function () {
				var e = $(this),
					t = e.attr("data-size"),
					a = e.attr("data-speed"),
					i = e.attr("data-width"),
					o = e.attr("data-color"),
					s = e.attr("data-trackcolor");
				t || (t = 140), a || (a = 2e3), i || (i = 8), o || (o = "#0093BF"), s || (s = "rgba(0,0,0,0.04)");
				var n = {
					roundSkillSize: t,
					roundSkillSpeed: a,
					roundSkillWidth: i,
					roundSkillColor: o,
					roundSkillTrackColor: s
				};
				$body.hasClass("device-xl") || $body.hasClass("device-lg") ? (e.css({
					width: t + "px",
					height: t + "px",
					"line-height": t + "px"
				}).animate({
					opacity: 0
				}, 10), e.appear(function () {
					if (!e.hasClass("skills-animated")) {
						setTimeout(function () {
							e.css({
								opacity: 1
							})
						}, 100);
						SEMICOLON.widget.runRoundedSkills(e, n), e.addClass("skills-animated")
					}
				}, {
						accX: 0,
						accY: -120
					}, "easeInCubic")) : SEMICOLON.widget.runRoundedSkills(e, n)
			})
		},
		runRoundedSkills: function (e, t) {
			e.easyPieChart({
				size: Number(t.roundSkillSize),
				animate: Number(t.roundSkillSpeed),
				scaleColor: !1,
				trackColor: t.roundSkillTrackColor,
				lineWidth: Number(t.roundSkillWidth),
				lineCap: "square",
				barColor: t.roundSkillColor
			})
		},
		progress: function () {
			if (!$().appear) return console.log("progress: Appear not Defined."), !0;
			var e = $(".progress");
			0 < e.length && e.each(function () {
				var e = $(this),
					t = e.parent("li"),
					a = t.attr("data-percent");
				$body.hasClass("device-xl") || $body.hasClass("device-lg") ? e.appear(function () {
					t.hasClass("skills-animated") || (e.find(".counter-instant span").countTo(), t.find(".progress").css({
						width: a + "%"
					}).addClass("skills-animated"))
				}, {
						accX: 0,
						accY: -120
					}, "easeInCubic") : (e.find(".counter-instant span").countTo(), t.find(".progress").css({
						width: a + "%"
					}))
			})
		},
		twitterFeed: function () {
			if ("undefined" == typeof sm_format_twitter) return !0;
			if ("undefined" == typeof sm_format_twitter3) return console.log("twitterFeed: sm_format_twitter3() not Defined."), !0;
			var e = $(".twitter-feed");
			0 < e.length && e.each(function () {
				var t = $(this),
					e = t.attr("data-username"),
					a = t.attr("data-count"),
					i = t.attr("data-loader");
				e || (e = "twitter"), a || (a = 3), i || (i = "include/twitter/tweets.php"), $.getJSON(i + "?username=" + e + "&count=" + a, function (e) {
					t.hasClass("fslider") ? t.find(".slider-wrap").html(sm_format_twitter3(e)).promise().done(function () {
						var e = setInterval(function () {
							if (1 < t.find(".slide").length) {
								t.removeClass("customjs");
								setTimeout(function () {
									SEMICOLON.widget.loadFlexSlider()
								}, 500);
								clearInterval(e)
							}
						}, 500)
					}) : t.html(sm_format_twitter(e))
				})
			})
		},
		flickrFeed: function () {
			if (!$().jflickrfeed) return console.log("flickrFeed: jflickrfeed not Defined."), !0;
			var e = $(".flickr-feed");
			0 < e.length && e.each(function () {
				var e = $(this),
					t = e.attr("data-id"),
					a = e.attr("data-count"),
					i = "photos_public.gne";
				"group" == e.attr("data-type") && (i = "groups_pool.gne"), a || (a = 9), e.jflickrfeed({
					feedapi: i,
					limit: Number(a),
					qstrings: {
						id: t
					},
					itemTemplate: '<a href="{{image_b}}" title="{{title}}" data-lightbox="gallery-item"><img src="{{image_s}}" alt="{{title}}" /></a>'
				}, function (e) {
					SEMICOLON.initialize.lightbox()
				})
			})
		},
		instagramPhotos: function (d, c) {
			if ("undefined" == typeof Instafeed) return !0;
			var e = $(".instagram-photos");
			0 < e.length && e.each(function () {
				var e = $(this),
					t = e.attr("id"),
					a = e.attr("data-user"),
					i = e.attr("data-tag"),
					o = (e.attr("data-location"), e.attr("data-count")),
					s = e.attr("data-type"),
					n = e.attr("data-sortBy"),
					r = e.attr("data-resolution");
				if (o || (o = 9), n || (n = "none"), r || (r = "thumbnail"), "user" == s) var l = new Instafeed({
					target: t,
					get: s,
					userId: Number(a),
					limit: Number(o),
					sortBy: n,
					resolution: r,
					accessToken: d,
					clientId: c
				});
				else if ("tagged" == s) l = new Instafeed({
					target: t,
					get: s,
					tagName: i,
					limit: Number(o),
					sortBy: n,
					resolution: r,
					clientId: c
				});
				else if ("location" == s) l = new Instafeed({
					target: t,
					get: s,
					locationId: Number(a),
					limit: Number(o),
					sortBy: n,
					resolution: r,
					clientId: c
				});
				else l = new Instafeed({
					target: t,
					get: "popular",
					limit: Number(o),
					sortBy: n,
					resolution: r,
					clientId: c
				});
				l.run()
			})
		},
		dribbbleShots: function (e) {
			if (!$.jribbble) return console.log("dribbbleShots: Jribbble not Defined."), !0;
			if (!$().imagesLoaded) return console.log("dribbbleShots: imagesLoaded not Defined."), !0;
			var t = $(".dribbble-shots");
			0 < t.length && ($.jribbble.setToken(e), t.each(function () {
				var a = $(this),
					e = a.attr("data-user"),
					t = a.attr("data-count"),
					i = a.attr("data-list"),
					o = a.attr("data-type");
				a.addClass("customjs"), t || (t = 9), "user" == o ? $.jribbble.users(e).shots({
					sort: "recent",
					page: 1,
					per_page: Number(t)
				}).then(function (e) {
					var t = [];
					e.forEach(function (e) {
						t.push('<a href="' + e.html_url + '" target="_blank">'), t.push('<img src="' + e.images.teaser + '" '), t.push('alt="' + e.title + '"></a>')
					}), a.html(t.join("")), a.imagesLoaded().done(function () {
						a.removeClass("customjs"), SEMICOLON.widget.masonryThumbs()
					})
				}) : "list" == o && $.jribbble.shots(i, {
					sort: "recent",
					page: 1,
					per_page: Number(t)
				}).then(function (e) {
					var t = [];
					e.forEach(function (e) {
						t.push('<a href="' + e.html_url + '" target="_blank">'), t.push('<img src="' + e.images.teaser + '" '), t.push('alt="' + e.title + '"></a>')
					}), a.html(t.join("")), a.imagesLoaded().done(function () {
						a.removeClass("customjs"), SEMICOLON.widget.masonryThumbs()
					})
				})
			}))
		},
		navTree: function () {
			var e = $(".nav-tree");
			0 < e.length && e.each(function () {
				var a = $(this),
					i = a.attr("data-speed"),
					o = a.attr("data-easing");
				i || (i = 250), o || (o = "swing"), a.find("ul li:has(ul)").addClass("sub-menu"), a.find("ul li:has(ul) > a").append(' <i class="icon-angle-down"></i>'), a.hasClass("on-hover") ? a.find("ul li:has(ul):not(.active)").hover(function (e) {
					$(this).children("ul").stop(!0, !0).slideDown(Number(i), o)
				}, function () {
					$(this).children("ul").delay(250).slideUp(Number(i), o)
				}) : a.find("ul li:has(ul) > a").click(function (e) {
					var t = $(this);
					a.find("ul li").not(t.parents()).removeClass("active"), t.parent().children("ul").slideToggle(Number(i), o, function () {
						$(this).find("ul").hide(), $(this).find("li.active").removeClass("active")
					}), a.find("ul li > ul").not(t.parent().children("ul")).not(t.parents("ul")).slideUp(Number(i), o), t.parent("li:has(ul)").toggleClass("active"), e.preventDefault()
				})
			})
		},
		carousel: function () {
			if (!$().owlCarousel) return !0;
			var e = $(".carousel-widget:not(.customjs)");
			if (e.length < 1) return !0;
			e.each(function () {
				var e = $(this),
					t = e.attr("data-items"),
					a = e.attr("data-items-xl"),
					i = e.attr("data-items-lg"),
					o = e.attr("data-items-md"),
					s = e.attr("data-items-sm"),
					n = e.attr("data-items-xs"),
					r = e.attr("data-loop"),
					l = e.attr("data-autoplay"),
					d = e.attr("data-speed"),
					c = e.attr("data-animate-in"),
					u = e.attr("data-animate-out"),
					f = e.attr("data-nav"),
					h = e.attr("data-pagi"),
					m = e.attr("data-margin"),
					p = e.attr("data-stage-padding"),
					g = e.attr("data-merge"),
					v = e.attr("data-start"),
					C = e.attr("data-rewind"),
					b = e.attr("data-slideby"),
					y = e.attr("data-center"),
					O = e.attr("data-lazyload"),
					w = e.attr("data-video"),
					S = e.attr("data-rtl"),
					E = 5e3,
					x = !0;
				t || (t = 4), a || (a = Number(t)), i || (i = Number(a)), o || (o = Number(i)), s || (s = Number(o)), n || (n = Number(s)), d || (d = 250), m || (m = 20), p || (p = 0), v || (v = 0), b || (b = 1), b = "page" == b ? "page" : Number(b), r = "true" == r, l ? (E = Number(l), l = !0) : x = l = !1, c || (c = !1), u || (u = !1), f = "false" != f, h = "false" != h, C = "true" == C, g = "true" == g, y = "true" == y, O = "true" == O, w = "true" == w, S = !("true" != S && !$body.hasClass("rtl")), e.owlCarousel({
					margin: Number(m),
					loop: r,
					stagePadding: Number(p),
					merge: g,
					startPosition: Number(v),
					rewind: C,
					slideBy: b,
					center: y,
					lazyLoad: O,
					nav: f,
					navText: ['<i class="icon-angle-left"></i>', '<i class="icon-angle-right"></i>'],
					autoplay: l,
					autoplayTimeout: E,
					autoplayHoverPause: x,
					dots: h,
					smartSpeed: Number(d),
					fluidSpeed: Number(d),
					video: w,
					animateIn: c,
					animateOut: u,
					rtl: S,
					responsive: {
						0: {
							items: Number(n)
						},
						576: {
							items: Number(s)
						},
						768: {
							items: Number(o)
						},
						992: {
							items: Number(i)
						},
						1200: {
							items: Number(a)
						}
					},
					onInitialized: function () {
						SEMICOLON.slider.owlCaptionInit(), SEMICOLON.slider.sliderParallaxDimensions(), SEMICOLON.initialize.lightbox()
					}
				})
			})
		},
		masonryThumbs: function () {
			var e = $(".masonry-thumbs:not(.customjs)");
			0 < e.length && e.each(function () {
				var e = $(this);
				SEMICOLON.widget.masonryThumbsArrange(e)
			})
		},
		masonryThumbsArrange: function (e) {
			if (!$().isotope) return console.log("masonryThumbsArrange: Isotope not Defined."), !0;
			SEMICOLON.initialize.setFullColumnWidth(e), e.isotope("layout")
		},
		notifications: function (e) {
			if ("undefined" == typeof toastr) return console.log("notifications: Toastr not Defined."), !0;
			toastr.remove();
			var t = $(e),
				a = t.attr("data-notify-position"),
				i = t.attr("data-notify-type"),
				o = t.attr("data-notify-msg"),
				s = t.attr("data-notify-timeout"),
				n = t.attr("data-notify-close");
			return a = a ? "toast-" + t.attr("data-notify-position") : "toast-top-right", o || (o = "Please set a message!"), s || (s = 5e3), n = "true" == n, toastr.options.positionClass = a, toastr.options.timeOut = Number(s), toastr.options.closeButton = n, toastr.options.closeHtml = '<button><i class="icon-remove"></i></button>', "warning" == i ? toastr.warning(o) : "error" == i ? toastr.error(o) : "success" == i ? toastr.success(o) : toastr.info(o), !1
		},
		textRotater: function () {
			if (!$().Morphext) return console.log("textRotater: Morphext not Defined."), !0;
			0 < $textRotaterEl.length && $textRotaterEl.each(function () {
				$(this);
				var e = $(this).attr("data-rotate"),
					t = $(this).attr("data-speed"),
					a = $(this).attr("data-separator");
				e || (e = "fade"), t || (t = 1200), a || (a = ","), $(this).find(".t-rotate").Morphext({
					animation: e,
					separator: a,
					speed: Number(t)
				})
			})
		},
		linkScroll: function () {
			$("a[data-scrollto]").click(function () {
				var e = $(this),
					t = e.attr("data-scrollto"),
					a = e.attr("data-speed"),
					i = e.attr("data-offset"),
					o = e.attr("data-easing"),
					s = e.attr("data-highlight");
				return !!e.parents("#primary-menu").hasClass("on-click") || (a || (a = 750), i || (i = SEMICOLON.initialize.topScrollOffset()), o || (o = "easeOutQuad"), $("html,body").stop(!0).animate({
					scrollTop: $(t).offset().top - Number(i)
				}, Number(a), o, function () {
					if (s)
						if (0 < $(t).find(".highlight-me").length) {
							$(t).find(".highlight-me").animate({
								backgroundColor: s
							}, 300);
							setTimeout(function () {
								$(t).find(".highlight-me").animate({
									backgroundColor: "transparent"
								}, 300)
							}, 500)
						} else {
							$(t).animate({
								backgroundColor: s
							}, 300);
							setTimeout(function () {
								$(t).animate({
									backgroundColor: "transparent"
								}, 300)
							}, 500)
						}
				}), !1)
			})
		},
		contactForm: function () {
			if (!$().validate) return console.log("contactForm: Form Validate not Defined."), !0;
			if (!$().ajaxSubmit) return console.log("contactForm: jQuery Form not Defined."), !0;
			var e = $(".contact-widget:not(.customjs)");
			if (e.length < 1) return !0;
			e.each(function () {
				var e = $(this),
					s = e.attr("data-alert-type"),
					n = e.attr("data-loader"),
					r = e.find(".contact-form-result"),
					l = e.attr("data-redirect");
				e.find("form").validate({
					submitHandler: function (a) {
						if (r.hide(), "button" == n) {
							var i = $(a).find("button"),
								o = i.html();
							i.html('<i class="icon-line-loader icon-spin nomargin"></i>')
						} else $(a).find(".form-process").fadeIn();
						$(a).ajaxSubmit({
							target: r,
							dataType: "json",
							success: function (e) {
								if ("button" == n ? i.html(o) : $(a).find(".form-process").fadeOut(), "error" != e.alert && l) return window.location.replace(l), !0;
								if ("inline" == s) {
									if ("error" == e.alert) var t = "alert-danger";
									else t = "alert-success";
									r.removeClass("alert-danger alert-success").addClass("alert " + t).html(e.message).slideDown(400)
								} else r.attr("data-notify-type", e.alert).attr("data-notify-msg", e.message).html(""), SEMICOLON.widget.notifications(r);
								0 < $(a).find(".g-recaptcha").children("div").length && grecaptcha.reset(), "error" != e.alert && $(a).clearForm()
							}
						})
					}
				})
			})
		},
		subscription: function () {
			if (!$().validate) return console.log("subscription: Form Validate not Defined."), !0;
			if (!$().ajaxSubmit) return console.log("subscription: jQuery Form not Defined."), !0;
			var e = $(".subscribe-widget:not(.customjs)");
			if (e.length < 1) return !0;
			e.each(function () {
				var e = $(this),
					s = e.attr("data-alert-type"),
					n = e.attr("data-loader"),
					r = e.find(".widget-subscribe-form-result"),
					l = e.attr("data-redirect");
				e.find("form").validate({
					submitHandler: function (a) {
						if (r.hide(), "button" == n) {
							var i = $(a).find("button"),
								o = i.html();
							i.html('<i class="icon-line-loader icon-spin nomargin"></i>')
						} else $(a).find(".input-group-addon").find(".icon-email2").removeClass("icon-email2").addClass("icon-line-loader icon-spin");
						$(a).ajaxSubmit({
							target: r,
							dataType: "json",
							resetForm: !0,
							success: function (e) {
								if ("button" == n ? i.html(o) : $(a).find(".input-group-addon").find(".icon-line-loader").removeClass("icon-line-loader icon-spin").addClass("icon-email2"), "error" != e.alert && l) return window.location.replace(l), !0;
								if ("inline" == s) {
									if ("error" == e.alert) var t = "alert-danger";
									else t = "alert-success";
									r.addClass("alert " + t).html(e.message).slideDown(400)
								} else r.attr("data-notify-type", e.alert).attr("data-notify-msg", e.message).html(""), SEMICOLON.widget.notifications(r)
							}
						})
					}
				})
			})
		},
		quickContact: function () {
			if (!$().validate) return console.log("quickContact: Form Validate not Defined."), !0;
			if (!$().ajaxSubmit) return console.log("quickContact: jQuery Form not Defined."), !0;
			var e = $(".quick-contact-widget:not(.customjs)");
			if (e.length < 1) return !0;
			e.each(function () {
				var e = $(this),
					s = e.attr("data-alert-type"),
					n = e.attr("data-loader"),
					r = e.find(".quick-contact-form-result"),
					l = e.attr("data-redirect");
				e.find("form").validate({
					submitHandler: function (a) {
						if (r.hide(), $(a).animate({
							opacity: .4
						}), "button" == n) {
							var i = $(a).find("button"),
								o = i.html();
							i.html('<i class="icon-line-loader icon-spin nomargin"></i>')
						} else $(a).find(".form-process").fadeIn();
						$(a).ajaxSubmit({
							target: r,
							dataType: "json",
							resetForm: !0,
							success: function (e) {
								if ($(a).animate({
									opacity: 1
								}), "button" == n ? i.html(o) : $(a).find(".form-process").fadeOut(), "error" != e.alert && l) return window.location.replace(l), !0;
								if ("inline" == s) {
									if ("error" == e.alert) var t = "alert-danger";
									else t = "alert-success";
									r.addClass("alert " + t).html(e.message).slideDown(400)
								} else r.attr("data-notify-type", e.alert).attr("data-notify-msg", e.message).html(""), SEMICOLON.widget.notifications(r);
								0 < $(a).find(".g-recaptcha").children("div").length && grecaptcha.reset()
							}
						})
					}
				})
			})
		},
		ticker: function () {
			var e = jQuery(".scw-ticker");
			if (e.length < 1) return !0;
			e.each(function () {
				var e, t, a = $(this),
					i = a.find(".scw-ticker-item"),
					o = i.length,
					s = a.attr("data-speed"),
					n = a.attr("data-hover"),
					r = a.attr("data-items"),
					l = a.attr("data-items-xl"),
					d = a.attr("data-items-lg"),
					c = a.attr("data-items-md"),
					u = a.attr("data-items-sm"),
					f = a.attr("data-items-xs");
				r || (r = 5), l || (l = Number(r)), d || (d = Number(l)), c || (c = Number(d)), u || (u = Number(c)), f || (f = Number(u)), t = (e = windowWidth / r) * o, a.find(".scw-ticker-wrap").after('<div class="scw-ticker-wrap-clone"></div>');
				var h = a.find(".scw-ticker-wrap,.scw-ticker-wrap-clone");
				i.css({
					width: e
				}), setTimeout(function () {
					h.css({
						width: t
					}), a.css({
						width: 2 * t
					}), i.clone().appendTo(a.find(".scw-ticker-wrap-clone"))
				}, 300), s || (s = 3e4), n = "false" != n;
				var m = t / windowWidth;
				h.css({
					"animation-duration": Number(s) * m + "ms"
				}), 1 == n && (a.on("mouseover", function () {
					h.addClass("scw-ticker-paused")
				}), a.on("mouseout", function () {
					h.removeClass("scw-ticker-paused")
				}))
			})
		},
		stickySidebar: function () {
			if (!$().scwStickySidebar) return!0;
			var e = jQuery(".sticky-sidebar-wrap");
			if (e.length < 1) return !0;
			e.each(function () {
				var e = $(this),
					t = e.attr("data-offset-top"),
					a = e.attr("data-offset-bottom");
				t || (t = 110), a || (a = 50), e.scwStickySidebar({
					additionalMarginTop: Number(t),
					additionalMarginBottom: Number(a)
				})
			})
		},
		cookieNotify: function () {
			if (!Cookies) return console.log("cookieNotify: Cookie Function not defined."), !0;
			if (0 < $cookieNotification.length) {
				var e = $cookieNotification.outerHeight();
				$cookieNotification.css({
					bottom: -e
				}), "yesConfirmed" != Cookies.get("websiteUsesCookies") && $cookieNotification.css({
					bottom: 0,
					opacity: 1
				}), $(".cookie-accept").click(function () {
					return $cookieNotification.css({
						bottom: -e,
						opacity: 0
					}), Cookies.set("websiteUsesCookies", "yesConfirmed", {
						expires: 30
					}), !1
				})
			}
		},
		cartQuantity: function () {
			$(".plus").click(function () {
				var e = $(this).parents(".quantity").find(".qty").val();
				if (/^\d+$/.test(e)) {
					var t = Number(e) + 1;
					$(this).parents(".quantity").find(".qty").val(t)
				} else $(this).parents(".quantity").find(".qty").val(1);
				return !1
			}), $(".minus").click(function () {
				var e = $(this).parents(".quantity").find(".qty").val();
				if (/^\d+$/.test(e)) {
					if (1 < Number(e)) {
						var t = Number(e) - 1;
						$(this).parents(".quantity").find(".qty").val(t)
					}
				} else $(this).parents(".quantity").find(".qty").val(1);
				return !1
			})
		},
		extras: function () {
			$().tooltip ? $('[data-toggle="tooltip"]').tooltip({
				container: "body"
			}) : console.log("extras: Bootstrap Tooltip not defined."), $().popover ? $("[data-toggle=popover]").popover() : console.log("extras: Bootstrap Popover not defined."), $(".style-msg").on("click", ".close", function (e) {
				$(this).parents(".style-msg").slideUp(), e.preventDefault()
			}), $("#primary-menu-trigger,#overlay-menu-close").click(function () {
				return 0 < $("#primary-menu").find("ul.mobile-primary-menu").length ? $("#primary-menu > ul.mobile-primary-menu, #primary-menu > div > ul.mobile-primary-menu").toggleClass("d-block") : $("#primary-menu > ul, #primary-menu > div > ul").toggleClass("d-block"), $body.toggleClass("primary-menu-open"), !1
			}), $("#page-submenu-trigger").click(function () {
				return $body.toggleClass("top-search-open", !1), $pagemenu.toggleClass("pagemenu-active"), !1
			}), $pagemenu.find("nav").click(function (e) {
				$body.toggleClass("top-search-open", !1), $topCart.toggleClass("top-cart-open", !1)
			}), SEMICOLON.isMobile.any() && $body.addClass("device-touch")
		}
	}, SEMICOLON.isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i)
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i)
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i)
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i)
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i)
		},
		any: function () {
			return SEMICOLON.isMobile.Android() || SEMICOLON.isMobile.BlackBerry() || SEMICOLON.isMobile.iOS() || SEMICOLON.isMobile.Opera() || SEMICOLON.isMobile.Windows()
		}
	}, SEMICOLON.documentOnResize = {
		init: function () {
			setTimeout(function () {
				SEMICOLON.header.topsocial(), SEMICOLON.header.fullWidthMenu(), SEMICOLON.header.overlayMenu(), SEMICOLON.initialize.fullScreen(), SEMICOLON.initialize.dataResponsiveHeights(), SEMICOLON.initialize.maxHeight(), SEMICOLON.initialize.verticalMiddle(), SEMICOLON.initialize.testimonialsGrid(), SEMICOLON.initialize.stickFooterOnSmall(), SEMICOLON.initialize.stickyFooter(), SEMICOLON.slider.sliderParallaxDimensions(), SEMICOLON.slider.captionPosition(), SEMICOLON.portfolio.arrange(), SEMICOLON.portfolio.portfolioDescMargin(), SEMICOLON.widget.tabsResponsiveResize(), SEMICOLON.widget.tabsJustify(), SEMICOLON.widget.html5Video(), SEMICOLON.widget.masonryThumbs(), SEMICOLON.initialize.dataResponsiveClasses(), 0 < $gridContainer.length && ($gridContainer.hasClass(".customjs") || ($().isotope ? $gridContainer.isotope("layout") : console.log("documentOnResize > init: Isotope not defined."))), ($body.hasClass("device-xl") || $body.hasClass("device-lg")) && $("#primary-menu").find("ul.mobile-primary-menu").removeClass("d-block")
			}, 500);
			windowWidth = $window.width()
		}
	}, SEMICOLON.documentOnReady = {
		init: function () {
			SEMICOLON.initialize.init(), SEMICOLON.header.init(), (0 < $slider.length || 0 < $sliderElement.length) && SEMICOLON.slider.init(), 0 < $portfolio.length && SEMICOLON.portfolio.init(), SEMICOLON.widget.init(), SEMICOLON.documentOnReady.windowscroll()
		},
		windowscroll: function () {
			var e = 0,
				t = 0;
			0 < $header.length && $header.offset().top, 0 < $header.length && (e = $headerWrap.offset().top), 0 < $pagemenu.length && (t = 0 < $header.length && !$header.hasClass("no-sticky") ? $header.hasClass("sticky-style-2") || $header.hasClass("sticky-style-3") ? $pagemenu.offset().top - $headerWrap.outerHeight() : $pagemenu.offset().top - $header.outerHeight() : $pagemenu.offset().top);
			var a = $header.attr("data-sticky-offset");
			if (void 0 !== a)
				if ("full" == a) {
					e = $window.height();
					var i = $header.attr("data-sticky-offset-negative");
					void 0 !== i && (e = e - i - 1)
				} else e = Number(a);
			SEMICOLON.header.stickyMenu(e), SEMICOLON.header.stickyPageMenu(t), $window.on("scroll", function () {
				SEMICOLON.initialize.goToTopScroll(), $("body.open-header.close-header-on-scroll").removeClass("side-header-open"), SEMICOLON.header.stickyMenu(e), SEMICOLON.header.stickyPageMenu(t), SEMICOLON.header.logo()
			}), window.addEventListener("scroll", onScrollSliderParallax, !1), 0 < $onePageMenuEl.length && ($().scrolled ? $window.scrolled(function () {
				SEMICOLON.header.onepageScroller()
			}) : console.log("windowscroll: Scrolled Function not defined."))
		}
	}, SEMICOLON.documentOnLoad = {
		init: function () {
			SEMICOLON.slider.captionPosition(), SEMICOLON.slider.swiperSliderMenu(!0), SEMICOLON.slider.revolutionSliderMenu(!0), SEMICOLON.initialize.maxHeight(), SEMICOLON.initialize.testimonialsGrid(), SEMICOLON.initialize.verticalMiddle(), SEMICOLON.initialize.stickFooterOnSmall(), SEMICOLON.initialize.stickyFooter(), SEMICOLON.portfolio.gridInit($gridContainer), SEMICOLON.portfolio.filterInit(), SEMICOLON.portfolio.shuffleInit(), SEMICOLON.portfolio.arrange(), SEMICOLON.portfolio.portfolioDescMargin(), SEMICOLON.widget.parallax(), SEMICOLON.widget.loadFlexSlider(), SEMICOLON.widget.html5Video(), SEMICOLON.widget.masonryThumbs(), SEMICOLON.widget.ticker(), SEMICOLON.header.topsocial(), SEMICOLON.header.responsiveMenuClass(), SEMICOLON.initialize.modal()
		}
	};
	var $window = $(window),
		$body = $("body"),
		$wrapper = $("#wrapper"),
		$header = $("#header"),
		$headerWrap = $("#header-wrap"),
		$content = $("#content"),
		$footer = $("#footer"),
		windowWidth = $window.width(),
		oldHeaderClasses = $header.attr("class"),
		oldHeaderWrapClasses = $headerWrap.attr("class"),
		stickyMenuClasses = $header.attr("data-sticky-class"),
		responsiveMenuClasses = $header.attr("data-responsive-class"),
		defaultLogo = $("#logo").find(".standard-logo"),
		defaultLogoWidth = defaultLogo.find("img").outerWidth(),
		retinaLogo = $("#logo").find(".retina-logo"),
		defaultLogoImg = defaultLogo.find("img").attr("src"),
		retinaLogoImg = retinaLogo.find("img").attr("src"),
		defaultDarkLogo = defaultLogo.attr("data-dark-logo"),
		retinaDarkLogo = retinaLogo.attr("data-dark-logo"),
		defaultStickyLogo = defaultLogo.attr("data-sticky-logo"),
		retinaStickyLogo = retinaLogo.attr("data-sticky-logo"),
		defaultMobileLogo = defaultLogo.attr("data-mobile-logo"),
		retinaMobileLogo = retinaLogo.attr("data-mobile-logo"),
		$pagemenu = $("#page-menu"),
		$onePageMenuEl = $(".one-page-menu"),
		onePageGlobalOffset = 0,
		$portfolio = $(".portfolio"),
		$shop = $(".shop"),
		$gridContainer = $(".grid-container"),
		$slider = $("#slider"),
		$sliderParallaxEl = $(".slider-parallax"),
		$sliderElement = $(".slider-element"),
		swiperSlider = "",
		$pageTitle = $("#page-title"),
		$portfolioItems = $(".portfolio-ajax").find(".portfolio-item"),
		$portfolioDetails = $("#portfolio-ajax-wrap"),
		$portfolioDetailsContainer = $("#portfolio-ajax-container"),
		$portfolioAjaxLoader = $("#portfolio-ajax-loader"),
		$portfolioFilter = $(".portfolio-filter,.custom-filter"),
		prevPostPortId = "",
		$topSearch = $("#top-search"),
		$topCart = $("#top-cart"),
		$verticalMiddleEl = $(".vertical-middle"),
		$topSocialEl = $("#top-social").find("li"),
		$siStickyEl = $(".si-sticky"),
		$dotsMenuEl = $(".dots-menu"),
		$goToTopEl = $("#gotoTop"),
		$fullScreenEl = $(".full-screen"),
		$commonHeightEl = $(".common-height"),
		$testimonialsGridEl = $(".testimonials-grid"),
		$pageSectionEl = $(".page-section"),
		$owlCarouselEl = $(".owl-carousel"),
		$parallaxEl = $(".parallax"),
		$parallaxPageTitleEl = $(".page-title-parallax"),
		$parallaxPortfolioEl = $(".portfolio-parallax").find(".portfolio-image"),
		$textRotaterEl = $(".text-rotater"),
		$cookieNotification = $("#cookie-notification");
	$(document).ready(SEMICOLON.documentOnReady.init), $window.on("load", SEMICOLON.documentOnLoad.init), $window.on("resize", SEMICOLON.documentOnResize.init)
}(jQuery);