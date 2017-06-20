// 手机不同分辨率适配
	adjust();
	$(window).resize(adjust);
	function adjust(){
    		var devicewidth=parseInt($("html").css("width"));
			if(devicewidth<=750){
    		var devicefontsize=(devicewidth/320)*20;//计算当前设备自适应字体大小
    		$("html").css("font-size",devicefontsize+"px");}
			else{
				$("html").css("font-size","46.875px");
				}
    	}
//统计代码


