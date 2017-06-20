/*
 *
 * 页面内容接口方法
 *
 */
var _vtype = GetQueryString('vtype');
var _itemid = GetQueryString('itemid');
//var _itemid = 'INTE1477394685373652';
//var _vtype = 17;
var arr = [];
var Arr = [];
var setContent = function(){
	this.indexVideoDiv = 'index_video_box';//大视频播放的div id
	//this.interactiveLive('http://115.182.34.94/api/list/liveMessageList');//互动直播
	this.getTotalPeople();//总人数
	this.liveList(1);//实况直播
	this.setliveChat();//边看边聊
}

setContent.prototype = {
	commonCall: function(){
		this.shipei();
		this.interactiveLive('http://115.182.34.94/api/list/liveMessageList');//互动直播
		this.liveList(1);//实况直播
		this.setliveChat();//边看边聊
	},

	setNonHeight: function(rem){//15.25 - full, 15.25-5.3
		//set height of non
		var height = $('.page-sy').height() - rem * parseFloat($('html').css('fontSize'));
		$('#interact').css('height', Math.floor(height) +'px' ); 
	},

	shipei: function(){
		var self = this;
		//this.setNonHeight(15.25);
		//横屏竖屏切换
//		$(window).on('orientationchange', function(event){
//		    if( window.orientation == 180 || window.orientation == 0 ) {
//		        setIntervar(self.resize(),1);
//		    }
//		    if( window.orientation == 90 || window.orientation == -90 ) {
//		        setIntervar(self.resize(),1);
//		    }
//		});
	},

	/* 实况直播 */
	liveList: function(curPage){
		var app = 'cbox',//应用
			url = 'http://common.newcomment.cntv.cn/data/special?app='+app+'&itemid='+_itemid+'&reply=0&top=1&jsonp_callback=setcontent.liveListSuccess&prepage=50&page='+curPage;
			console.log(url);
		this.getJsonp(url);
	},

		liveListSuccess: function(data){
		var html = '';
		(function(self){
			if(data.code == 0){ //连接成功
				//获取置顶数据	
				if( data.data.top && data.data.top.length > 0){ 
					$.each(data.data.top, function(index,item){
						html += self.setOneItem(item, 1); 
					});
				}

				//获取内容
				if( data.data.content && data.data.content.length > 0){
					$.each(data.data.content, function(index, item){
						html += self.setOneItem(item);
					});
				}

				$('#liveList').html(html);
				loopBindingApp();
			}else{
				console.log("连接失败");
				if(data.code == 20001){
					console.log("参数不全");
				}
			}
		})(this);
	},

	setOneItem: function(item, ifTop){
		var self = this;
		var li_html = 	'<li class="clearfix" data-id="'+item.pid+'">\
							<div class="n-leftPart">\
								<img src="img/touxiang.png" alt="" />\
							</div>\
							<div class="n-rightPart">\
								<div class="n-title clearfix">\
									<div class="n-name">'+ item.author +'</div>';
									if(ifTop == 1){
			li_html +=					'<div class="t-zhiding">置顶</div>';
									}
			li_html +=				'<div class="n-time">'+ self.getDateDiff(parseInt(item.dateline)*1000) +'</div>';
			li_html +=			'</div>\
								<div class="n-conW">'+ item.message;
			li_html +=				self.getImages(item);
			li_html +=			'</div>\
								<div class="n-zan clearfix">\
									<a href="javascript:;" class="hasApp"><div class="n-message"></div></a>';
			li_html +=				self.setZan(item);
			li_html +=			'</div>\
							</div>\
						</li>'; 
		return li_html;
	},
	getImages: function(item){
		var _html = '';
		if(item.piccount == 1){
			_html += 	'<img src="'+ item.pics[0].url +'" alt="">';
		}else if(item.piccount > 1){
			_html += 	'<div class="three_img">';
							for(var i=0; i<item.piccount; i++){
			_html +=		'<img src="'+ item.pics[i].url +'" alt="images">';
							}
			_html +=	'</div>';
		}
		return _html;
	},

	setZan: function(item){
		var _html = '';
		if(item.agree > 0){
			_html = '<a href="javascript:;" class="hasApp"><div class="n-clickZan">'+ item.agree +'</div></a>';
		}else{
			_html = '<a href="javascript:;" class="hasApp"><div class="n-clickZan zero">&nbsp;</div></a>';
		}

		return _html;
	},

	setZan2: function(item){
		var _html = '';	
		if(item.agree > 0){
			_html = '<a href="javascript:;" class="hasApp"><span class="zan click"><i></i><span>'+ item.agree +'</span></span></a>';
		}else{
			_html = '<a href="javascript:;" class="hasApp"><span class="zan"><i></i></span></a>';
		}
		return _html;
	},

	getDateDiff:function(dateTimeStamp){
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;

		var now = new Date().getTime();
		var diffValue = now - dateTimeStamp;

		var weekC = diffValue/(7*day);

		var newTime = new Date(dateTimeStamp);
		var nianyueri = this.gshtime(newTime);
		//console.log(nianyueri);
		var dayC =diffValue/day;
		var hourC =diffValue/hour;
		var minC =diffValue/minute;

		if(weekC>=1){
			result= nianyueri ;
		}
		else if(dayC>=1 && dayC<7){
			result= parseInt(dayC) +"天前";
		}
		else if(hourC>=1 && hourC <24){
			result= parseInt(hourC) +"个小时前";
		}
		else if(minC>=20 && minC <60){
			result= parseInt(minC) +"分钟前";
		}else
			result="刚刚";
			return result;
	},

	//时间转换
	gshtime:function(time){
		var year_ = time.getFullYear();       //年</span>
		var month_ = time.getMonth() + 1;  //月  
		var day_ = time.getDate();         //日  
		var str="";
			
		str+=year_ +'-';
		if(month_ < 10)
			str+= "0";
			str+= month_ +'-';
		if(day_ < 10)
			str+= "0";
			str+= day_;
		return(str);
	},

	//互动直播
	interactiveLive: function(url){
		var _this = this;
		var _url = url+'?id='+ _itemid + '&t=jsonp&cb=setcontent.interactiveLiveSuccess&serviceId=cbox';
		this.getJsonp(_url);
	},

	interactiveLiveSuccess: function(data){
		var self = this;
		var data = data.data;
		//直播标题
		if(data){
			$('title').text(data.covertitle);
			$('#liveTitle').text(data.liveTitle);

			//大视频播放
			if($('#'+self.indexVideoDiv).length > 0){ 
				var height = self.getVideoHeight($(window).width(), data.liveRate);
				this.h5player(data.liveType, data.liveUrl, self.indexVideoDiv, $(window).width(), height, data.liveImage);
			}
			
			//视频列表载入
			self.loadVideoList(data);

			//在线人数
			if(data.countFlag == 1){//打开
				$('.n-dataOnline').show();
			}else{
				$('.n-dataOnline').hide();
			}
			
			var liveId = data.liveUrl;

			self.setTab(data);//选项卡调整
		}
	},

	getVideoHeight: function(width, ratio){
		//计算视频高度
		var height;
		if(ratio == 0){//4:3
			height = width / (4/3)
		}else{//16:9
			height = width / (16/9)
		}
		return height;
	},
	// 边看边聊
	setliveChat: function(){
		var app = 'cbox',//应用
			reply = 5,
			url = 'http://common.newcomment.cntv.cn/data/list?app='+app+'&itemid='+_itemid+'&jsonp_callback=setcontent.setliveChatSuccess&itemtype=0&prepage=50&reply='+ reply;
		this.getJsonp(url);
	}, 

	setliveChatSuccess: function(data){
		var html = '';
		var self = this;
		if(data.code == 0){
			if(data.data.total > 0){
				$.each(data.data.content, function(index, item){
					var li_html = '';
					var _class = '';
					if(index % 2 == 0){
						_class = 'left';
					}else{
						_class = 'right';
					}

					li_html += '<li class="'+ _class +'" data-nub="'+index+'">\
									<span class="user_img">\
										<img src="img/touxiang.png" alt="头像">\
									</span>\
									<span class="chat_item">\
										<span class="triangle-'+ _class +'"></span>\
										<div class="clearfix">\
											<h5 class="host">'+ item.author +'</h5>\
											<span class="time">'+ setcontent.getDateDiff(parseInt(item.dateline)*1000) +'</span>\
										</div>\
										<p class="content">'+ item.message +'</p>';
										var reply = self.getReplyContent(item.pid, data);
										if(reply != 0){
					li_html +=				reply;							
										}
					li_html +=			'<div class="fright">\
											<a href="#">';
					li_html +=					self.setZan2(item);			
					li_html +=					'<a href="javascript:;" class="hasApp"><span class="chat_icon"></span></a>\
											</a>\
										</div>\
									</span>\
									<span class="clear_both"></span>\
								</li>';
					html += li_html;
				});
				$('.live_chat ul').html(html); 
				loopBindingApp();
				
			}
			

		}else{
			console.log('获取边看边聊失败');
		}
	},
	
	getReplyContent: function(pid, data){
		var _html = '';
		var replyContent = data.data.reply[pid]; 
		if(replyContent && replyContent.length > 0){
			$.each(replyContent, function(index, item){
				if(index == 0){
					_html += 	'<div class="refer">\
									<h5 class="host">'+ item.author +'</h5>\
									<p>'+ item.message +'</p>\
								</div>';
				}
			});
			return _html;
		}else{
			return 0;
		}
	},

	setTab: function(data){
		//选项卡状态
		////实况直播状态
		if(data.msgFlag == 0){//关闭
			$('.live').addClass('hidden');
			$('.live').remove();
			$('.n-nav ul li').eq(0).trigger("click");
		}else{
			$('.live').removeClass('hidden');
			//设置标签标题
			$('.n-nav li.live').text(data.msgTag);
		}

		////边看边聊状态
		if(data.topicFlag > 0){//开启
			$('.live_chat').removeClass('hidden');
			$('.n-nav li.live_chat').text(data.topicTag);
		}else{
			$('.live_chat').addClass('hidden');
		}

		////互动状态 
		if(data.interactFlag > 0){//开启
			$('.interact').removeClass('hidden');
			$('.n-nav li.interact').text(data.interactTag);
			//设置互动
			$('iframe#interact').attr('src', data.interactUrl);
		}else{
			$('.interact').addClass('hidden');
		}

		////多视角
		if(data.whichFlag > 0){//开启
			if (data.remark >= 2 ){
				$('.multiple').removeClass('hidden');
				//$('.n-nav li.multiple').text(data.whichTag);
			}else{
				$('.multiple').addClass('hidden'); 
			};			
			//多视角图
			if( _vtype == 17 ){
				this.setMultipleList(data);
			}
		}else{
			$('.multiple').addClass('hidden'); 
		}

		////调整选项卡宽度
		
		adjustNavWidth();
		refreshTab();//刷新tab第一个显示的tab
		if(data.msgFlag == 0 && data.topicFlag == 0 && data.interactFlag == 0 && data.whichFlag == 0){
			$('.n-nav').addClass('hidden');
			$('.n-con').addClass('hidden');
		}
		
	},

	// 多视角
	setMultipleList: function(data){
		var html = '';
		var live = ' live';
		var self = this;
		if(data.remark == 0){//关闭样式
			$('.n-nav .multiple').addClass('hidden');
			$('.duoshijiao').html('');
			/*$('.n-clock.multiple').html('<div class="duoshijiao"></div>');
			if($('.duoshijiao') && $('.duoshijiao').length > 0){

				$.each(data.liveList, function(index, item){ 
					var li_html = '';
					var info = ' data-type='+item.liveType+' data-url='+item.liveUrl + ' data-image='+item.liveImage;
					//if(item.liveType == 2){//直播中
					if(index == 0){
						li_html = '<div class="item live"'+info+'>';
					//}else if(item.liveType == 3){//点播
					}else{
						li_html = '<div class="item"'+ info +'>';
					}

					li_html+=		'<p>'+ item.liveTitle +'</p>\
								</div>';
					html += li_html;
				});
				
			}*/
		}else if(data.remark == 1){//图文
			$('.n-nav li.multiple').text(data.whichTag);
			$('.multiple').removeClass('hidden');
			$('.n-clock.multiple').html('<div class="duoshijiao-pic"></div>');
			//多视角-图
			$.each(data.liveList, function(index, item){
				var li_html = '';
				var info = ' data-type='+item.liveType+' data-url='+item.liveUrl + ' data-image='+item.liveImage + ' data-ratio='+ item.liveRate;

				//if(item.liveType == 2){
				if(index ==0){//直播中，默认第一个为直播中
					li_html += '<div class="item live"'+info+'>';
					li_html +=		'<span class="tag">播放</span>';
				//}else if(item.liveType == 3){//点播
				}else{
					li_html += '<div class="item"'+info+'>';
				}

				li_html+=		'<img src="'+ item.liveImage +'" alt="'+ item.liveTitle +'" />\
								<p>'+ item.liveTitle +'</p></div>';
				html += li_html;
			});
			$('.duoshijiao-pic').html(html);
			
		}else if(data.remark == 2){//标题
			$('.n-nav li.multiple').text(data.whichTag);
			$('.multiple').removeClass('hidden');
			$('.n-clock.multiple').html('<div class="duoshijiao-text"></div>');
			//多视角-文
			if($('.duoshijiao-text').length > 0){
				$.each(data.liveList, function(index, item){ 
					var li_html = '';
					var info = ' data-type='+item.liveType+' data-url='+item.liveUrl + ' data-image='+item.liveImage + ' data-ratio='+ item.liveRate;
					//if(item.liveType == 2){//直播中
					if(index == 0){
						li_html = '<div class="item live"'+info+'>';
					//}else if(item.liveType == 3){//点播
					}else{
						li_html = '<div class="item"'+ info +'>';
					}

					li_html+=		'<p>'+ item.liveTitle +'</p>\
								</div>';
					html += li_html;
				});
				$('.duoshijiao-text').html(html);
			}  
		}
		
			//$(".n-nav ul li").not(".hidden").addClass("on").siblings().removeClass("on");
		
			
			
		//多视角点击事件
		$('.duoshijiao-pic>div, .duoshijiao-text>div').on('click', function(){ 
			//折叠状态改变
			if($('.n-upDown').hasClass('on')){
				$('.n-upDown').trigger('click');
			}  

			//self.changeIndexVideo($(this).attr('data-type'), $(this).attr('data-url'));
			$('.duoshijiao-pic>div, .duoshijiao-text>div').removeClass('live').find('.tag').remove();
			if($(this).parents('.duoshijiao-pic').length > 0){
				$(this).prepend('<span class="tag">播放中</span>');
			}
			$(this).addClass('live');
			if($('#'+self.indexVideoDiv).length > 0){ 
				var height = self.getVideoHeight($(window).width(), $(this).attr('data-ratio'));
				self.h5player($(this).attr('data-type'), $(this).attr('data-url'), self.indexVideoDiv, $(window).width(),  height);
			}

		});
	},

	loadVideoList: function(data){
		var html = ''; 
		var self = this;
		$('#videoList').html('');
		$.each(data.liveList, function(index,item){
			var li_html = '',
				live_html = '';
			//直播中 
			//if(item.liveType == 2){//直播中
			if (data.remark == 0) {
				$(".n-navImg").hide();
			}else{
				if(index ==0){
					live_html = '<div class="n-onLive">\
									<p>播放中</p>\
								</div>';
				}

				li_html = 	'<div class="swiper-slide" data-type='+ item.liveType +' data-url='+ item.liveUrl +'>'+
								live_html +
								'<div class="n-navWord">'+ item.liveTitle +'</div>'+
								'<img src="'+ item.liveImage +'" alt="" />' +
							'</div>';

				html += li_html;
			};
		});

		$('#videoList').html(html);
		
		//点击切换视频
		$('#videoList>div').on('click', function(){
			$("#index_video_box").css("display","block");
			$("#maskbox").css("display","none");
			$('.n-boxPause').trigger('click');
			$('.n-boxPause').css('opacity', '0');
			if($('.n-upDown').hasClass('on')){
				//arrow
				$('.n-upDown').css("transform","rotate(360deg)")
				//$('.n-upDown').removeClass('on');
				//player
				//$('#html5Player').get(0).play();
				//set non height
				//setcontent.setNonHeight(15.25);
			}
			$('#videoList').find('.n-onLive').remove();
			$(this).prepend('<div class="n-onLive"><p>播放</p></div>');
			if($('#'+self.indexVideoDiv).length > 0){
				var height = parseInt($('html').css('fontSize')) * 9;
				self.h5player($(this).attr('data-type'), $(this).attr('data-url'), self.indexVideoDiv, $(window).width(),  height);
			}
			$("#maskbox").css("display","none");
		});
		startWiper();
	},
	//创建script
	getJsonp: function(url){
		var head = document.getElementsByTagName('head')[0];
	    var script = document.createElement('script');

	    script.onload = function() {
	        head.removeChild(script);
	    }
	    script.src = url;
	    head.appendChild(script);
	},
    
	h5playerZhibo: function(channel_name, video_id, width, height){
		/*直播播放器*/
		var attributes = {
			video_width: width,	/* Flash播放器宽度 */
			video_height: height,	/* Flash播放器高度 */
			video_channel_name: channel_name	/* Flash播放器及ipad 使用的直播流名称 */
		};
		createHtml5LivePlayer(video_id, attributes["video_width"], attributes["video_height"], attributes["video_channel_name"]);
	},

	h5playerDianbo: function(div_id,pid,width,height,posterImg){ 
		/*点播播放器*/
	    function creatMultiPlayerTest(divid,pid,width,height,posterImg){
	        var fo = createHtml5VodPlayer(divid,width,height,pid);
	    }
	    creatMultiPlayerTest(div_id, pid, width, height, posterImg);
    	//creatMultiPlayerTest(div_id, "96ad1e76f1094d11a0afb3961dfe3107", false, "http://i1.sinaimg.cn/cj/2015/0819/U12164P31DT20150819164023.jpg");

	},

	h5player: function(type, url, divid, width, height, posterImg){
		console.log('liveType ', type)
		$('#'+divid).html('');//清空视频
		if(type == 1){//图片
			console.log('类型是图片')
		}else if(type == 2){//直播 
			$(divid).css("display","block");
			this.h5playerZhibo(url.slice(16), divid, width, height);
		}else if(type == 3){//点播
			$(divid).css("display","block");
			this.h5playerDianbo(divid,url,width,height, posterImg);
		}
	},

	changeIndexVideo: function(type, url){ 
		if($('#'+self.indexVideoDiv).length > 0){ 
			var height = parseInt($('html').css('fontSize')) * 9;
			this.h5player(type, url, self.indexVideoDiv, $(window).width(), height);
		}
	},

	getTotalPeople: function(){
		var url = 'http://pvst.app.cntvwb.cn/stat/getac?iid='+_itemid+'&itype=mlive&cb=setcontent.getTotalPeopleSuccess';
		this.getJsonp(url);
	},

	getTotalPeopleSuccess: function(data){ 
		if(data.code == 0){
			$('.n-dataOnline p').text(data.data.vc + '人参与');
		}else{
			//console.log('连接人数失败')
		}
		
	},

	resize: function(){
		//video
		
		//tab-nav
		adjustNavWidth();
	}
}

//秀场直播页面的js
var LiveFunction = function(){
	setcontent.getTotalPeople();
	this.xiuChang();
}

LiveFunction.prototype = {
	xiuChang: function(){
		var url = 'http://115.182.34.94/api/list/liveMessageList?id='+ _itemid + '&t=jsonp&cb=liveFunction.xiuChangSuccess&serviceId=cbox';
		setcontent.getJsonp(url);

//		var self = this;
//		 $.ajax({
//		 	type: 'GET',
//		 	url: 'js/zhibo.json',
//		 	success: function(data){
//		 		self.xiuChangSuccess(data);
//		 	},
//		 	error: function(){
//		 		console.log('error'); 
//		 	}
//		 });
	},

	xiuChangSuccess: function(data){
		//title
		
//		$("title").text(data.data.covertitle);

		//video
		var height = $('body').height() - $('.bottom-bar').height() - $('.top-menu').height();
		setcontent.h5player(data.data.liveType, data.data.liveUrl, 'video_box', $('body').width(), height, data.data.liveImage);		
		
		//author
		if(data.data.msgCount > 0 || data.msgList.length > 0 || data.data.countFlag == 0){//20161215
			$('.live-status').show();
			$('.live-status .content #author').text(data.msgList[0].rwName);
			$('.live-status .user-img img').attr('src',data.msgList[0].rwImg);
		}else{
			$('.live-status').hide();
		}
		loopBindingApp();
		//this.removeControl();
	},
	removeControl: function(){
		if($('#html5Player')){
			$("#html5Player").removeAttr("controls");
		}
	}
}

//设置主页面数据的js
var setcontent = new setContent();

/*
 *
 * 寻找页面的所有的hasApp，绑定打开客户端
 *
 */
function loopBindingApp() {
	$('#hasApp, .hasApp').on('click', function(){
		event.preventDefault();
		event.stopPropagation();
		new bindApp(); 
	});
	
	$("#maskbox a").on('click',function(){
	    event.preventDefault();
		event.stopPropagation();
		new bindApp();
	});
};

var bindApp = function(){
	this.clickClient();
}
bindApp.prototype = {
	clickClient:function(){
		var para = 'vtype='+ _vtype +'&itemid='+ _itemid; 
		var download_link = 'http://download.cntv.cn/app/cbox/index.html';
		//var download_link = 'http://202.108.16.139/cbox/index.html';
		this.hasApp("cntvCBox://app.cntv.cn/?"+para, download_link + "?"+ para);
	},
	hasApp:function(url,fail){  
		window.location.href=url;
		setTimeout(function(){
    			window.location.href=fail;
    		}, 1000); 
	}
}



//打开客户端
//new loopBindingApp('hasApp');

/*
 * 通用方法
 *
*/
//关闭底端下载浮层
function closeW(){
	$('.n-appDownLoad').hide(); 
	$('ul.chat').css("padding-bottom","4rem !important");
}
//n-con折叠收起
function packUp(v){
	var _this=v;
	//$('.n-con').slideToggle();

	//set non height
	//setcontent.setNonHeight(9.95);

	if($(_this).hasClass('on')){
		$(".n-boxPause").css({"display":"block","zIndex":"0"});
		$("#html5Player").attr("class","play_down");
		packUpOn(_this);
	}
	else{
		$(_this).css("transform","rotate(180deg)")
		$(_this).addClass('on');
		$("#html5Player").attr("class","play_on");
		$(".n-boxPause").css("display","block");
		$(".n-boxPause").css({"display":"block","zIndex":"9999"});
		//player
		$('video').get(0).pause();
		$('video, .n-videoaBox, #index_video_box,.n-boxPause,.n-play').animate({'height': '3.7rem'}, 50, function(){
			$('.n-boxPause').animate({'opacity': 1}, 50);
		});
		$('#interact').css('height', "18rem" ); 
	}
}

//播放器跳转客户端



function packUpOn(_this){
	//arrow
	$(_this).css("transform","rotate(360deg)")
	$(_this).removeClass('on');

	//player
	//$('#html5Player').get(0).play();
	$('.n-boxPause').stop().animate({'opacity': 0}, 300, function(){
		$('video, .n-videoaBox, #index_video_box').stop().animate({'height': '9rem'}, 300);
		//set non height
		//setcontent.setNonHeight(15.25);
	});
}

$('.n-play').on('click', function(){
	packUpOn($('.n-upDown'));
	$("#html5Player").attr("class","play_down");
});

//导航条切换
$(function(){
	$('.n-nav ul li').click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		$('.n-clock').eq($(this).index()).addClass('on').siblings().removeClass('on');
		
	});
});

//显示第一个没被隐藏的tab
function refreshTab(){ 
	$('.n-nav ul li').each(function(index, item){
		if($(this).hasClass('on') ){ 
			$('.n-con').children().eq($(this).index()).addClass('on').siblings().removeClass('on');
			return false;
		}
	});
}

//调整导航宽度
function adjustNavWidth(){
	// <!-- 选项卡宽度 -->
	$('.n-nav ul').each(function(){ 
		var window_width = window.innerWidth;
		var objects = $(this).children().not('.hidden');
		var length = objects.length
		objects.css('width', parseInt( window_width * 0.92 / length) + 'px');
//		objects.first().addClass("on").siblings().removeClass("on")
	});
}

//获取地址栏参数
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

/*判断终端类型*/
var browser ={
	versions:function(){
		var ua = navigator.userAgent;
		return {
			iphone: ua.indexOf('iPhone') > -1,
			android: ua.indexOf('Android') > -1,
			mobile:/AppleWebKit.*Mobile/i.test(ua) ||/Android/i.test(ua)|| (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(ua)),
			isIE7:/MSIE 7.0|MSIE 8.0|MSIE/i.test(ua),
			WinPhone:/Windows Phone/i.test(ua)
		}
	}()
}

function startWiper(){
	var swiper = new Swiper('.swiper-container', {
	    pagination: '.swiper-pagination',
	    slidesPerView: 3,
	    paginationClickable: true,
	    spaceBetween: 15
	});
}
/*var setLi = setInterval(function(){
	var _len = $('.live_chat ul').find("li").length;
	var aLi = $('.live_chat ul').find("li");
	if (_len != 0) {
		for(var i = 0; i < _len;i++){
			arr.push(aLi[i]);
		};
		$('.live_chat ul').html("");
		if (arr.length != 0 ){
			for(var a = arr.length;a > -1;a--){
				$('.live_chat ul').append(arr[a]);
			};
			clearInterval(setLi);
		};
	};
},1);*/
var setId = setInterval(function(){
	var dataTop = $("#liveList").find("li").eq(0).attr("data-id");
	var li_len = $("#liveList").find("li").length;
	var li_cnt = $("#liveList").find("li");
	for(var n = 1;n <= li_len; n++){
		var dataid = $("#liveList").find("li").eq(n).attr("data-id");
		if (dataTop == dataid){
			$("#liveList").find("li").eq(n).remove();
			clearInterval(setId);
		};
	};
	/*var li_len = $("#liveList").find("li").length;
	for(var s = 1; s <= li_len ; s++){
		Arr.push(li_cnt[s]);
		li_cnt.eq(s).remove();
	};
	clearInterval(setId);
	if (Arr.length != 0 ){
		for(var d = arr.length;d> 0;d--){
			$('#liveList').append(Arr[d]);
		};
		
	};*/
},1);
$.ajax({
    dataType:'jsonp',
    jsonp:'cb',
    url: 'http://pvst.app.cntvwb.cn/stat/updatec',
    data:{'itype':'mlive','iid':_itemid},
    success:function(data){

    }
});