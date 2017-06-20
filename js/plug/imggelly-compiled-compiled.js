"use strict";

// JavaScript Document
//window.mySwipe 注意：为全局函数   

var GellyClass = function () {

	var ImageGelly = function ImageGelly(param) {
		this.init(param);
	};
	ImageGelly.hasboxbind = false; //用于标记是否已添加window.resize函数
	ImageGelly.scolltop = 0; //记录滚动条的高度
	ImageGelly.prototype = {
		init: function init(param) {
			this.parentstr = param.id;
			this.bottomele = param.bottomdiv;
			this.imgs = [];
			this.index = param.index || 0;
			this.createitemHtml(param.imgs);
			this.addslide(param.id);
			this.aglinimg();
			this.bindfuc();
		},
		addslide: function addslide(parentid) {
			var index = this.index;
			var height = $(window).height();
			var width = $(window).width();
			$(".swipe-wrap > div").height(height);
			var elem = document.getElementById(parentid);
			//console.log(elem);
			if (window.mySwipe) {
				window.mySwipe = null;
			}
			window.mySwipe = new Swipe(elem, {
				startSlide: index,
				// auto: 3000,
				continuous: false
			});
		},
		aglinimg: function aglinimg() {
			var imgarr = $("#" + this.parentstr + " img.fullscreen");
			var self = this;
			for (var i = 0, len = imgarr.length; i < len; i++) {
				var imgdom = imgarr.eq(i);
				(function (dom) {
					var img = new Image();
					img.onload = function () {
						//console.log(this.width);
						//此处可对图片进行调整
						dom.attr('maxwidth', this.width);
					};
					img.src = dom.attr("src");
					self.imgs.push(dom.attr("src"));
				})(imgdom);
			}
		},
		createitemHtml: function createitemHtml(arr) {
			var str = '<div class="swipe-wrap">';
			for (var i = 0, len = arr.length; i < len; i++) {
				str += '<div><img class="fullscreen" src="' + arr[i] + '"></div>';
			}
			str += '</div>';
			$("#" + this.parentstr).html(str);
		},
		bindfuc: function bindfuc() {
			var self = this;
			var parentdom = $("#" + this.parentstr);
			parentdom.unbind('click');
			parentdom.click(function () {
				$(this).hide();
				self.bottomele.css({ display: 'block' });
				$("body").scrollTop(ImageGelly.scolltop);
			});
			if (!ImageGelly.hasboxbind) {
				$(window).resize(function () {
					var height = $(window).height();
					var width = $(window).width();
					parentdom.css({ height: height, width: width });
					var imgs = parentdom.find("img.fullscreen");
					if (width > height) {
						imgs.css({ height: "80%", width: 'auto' });
					} else {
						imgs.css({ height: "auto", width: '100%' });
					}
				});
				ImageGelly.hasboxbind = true;
			}
		},
		inimgarr: function inimgarr(src) {
			var result = -1;
			var arrs = this.imgs;
			for (var i = 0, len = arrs.length; i < len; i++) {
				if (arrs[i] == src) {
					result = i;
					break;
				}
			}
			return result;
		}
	};

	var thegelly;
	var gc = function gc(className, swipeid, container) {
		this.swipeid = swipeid;
		this.className = className;
		this.botcontainer = $("#" + container);
		this.init();
	};
	gc.prototype = {
		init: function init() {
			this.addEvent();
		},
		addEvent: function addEvent() {
			var that = this;
			$('.' + this.className).click(function (e) {
				e.preventDefault();
				var cursrc = $(this).attr("src");
				var index = $(this).index();
				ImageGelly.scolltop = $("body").scrollTop();
				if (!that.thegelly) {
					that.creategelly(this, index, that.botcontainer);
				} else if (that.thegelly.inimgarr(cursrc) > -1) {
					$("#" + that.swipeid).css({ display: 'block' });
					that.creategelly(this, index, that.botcontainer);
				} else {
					$("#" + that.swipeid).css({ display: 'block' });
					that.creategelly(this, index, that.botcontainer);
				}
			});
		},
		creategelly: function creategelly(target, indexnum, bottomele) {
			var cursrc = $(target).attr("src");
			var imgs = [];
			var siblings = $(target).siblings();
			for (var i = 0, len = siblings.length; i < len; i++) {
				var src = siblings.eq(i).attr("src");
				imgs.push(src);
			}
			imgs.splice(indexnum, 0, cursrc);
			this.thegelly = new ImageGelly({ id: this.swipeid, imgs: imgs, index: indexnum, bottomdiv: bottomele });
		}

	};
	return gc;
}();

//# sourceMappingURL=imggelly-compiled.js.map

//# sourceMappingURL=imggelly-compiled-compiled.js.map