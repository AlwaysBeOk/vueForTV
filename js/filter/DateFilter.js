import Vue from 'vue'
Vue.filter("detailDate", function (value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    return value.substr(5, 11);
});
Vue.filter("numberFormat", function (value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    return parseInt(value).toLocaleString();
});
Vue.filter("timeDate", function (input) {
        var result="";
        input = parseInt(input);
        var gshtime = function (time) {
            var year_ = time.getFullYear();       //年</span>
            var month_ = time.getMonth() + 1;  //月
            var day_ = time.getDate();         //日
            var str = "";
            str += year_ + '-';
            if (month_ < 10)
                str += "0";
            str += month_ + '-';
            if (day_ < 10)
                str += "0";
            str += day_;
            return (str);
        };
        if (input) {
            var minute = 1000 * 60;
            var hour = minute * 60;
            var day = hour * 24;

            var now = new Date().getTime();
            var diffValue = now - input;

            var weekC = diffValue / (7 * day);

            var newTime = new Date(input);
            var nianyueri = gshtime(newTime);
            //console.log(nianyueri);
            var dayC = diffValue / day;
            var hourC = diffValue / hour;
            var minC = diffValue / minute;
            if (dayC >= 1) {
                result = parseInt(dayC) + "天前";
            }
            else if (hourC >= 1 && hourC < 24) {
                result = parseInt(hourC) + "小时前";
            }
            else if (minC >= 1 && minC < 60) {
                result = parseInt(minC) + "分钟前";
            } else
                result = "刚刚";
            return result;
    }
});