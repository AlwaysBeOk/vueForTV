"use strict";

var _vue = require("vue");

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.filter("detailDate", function (value) {
    //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    return value.substr(5, 11);
});
_vue2.default.filter("numberFormat", function (value) {
    //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    return parseInt(value).toLocaleString();
});
_vue2.default.filter("timeDate", function (input) {
    var result = "";
    input = parseInt(input);
    var gshtime = function gshtime(time) {
        var year_ = time.getFullYear(); //年</span>
        var month_ = time.getMonth() + 1; //月
        var day_ = time.getDate(); //日
        var str = "";
        str += year_ + '-';
        if (month_ < 10) str += "0";
        str += month_ + '-';
        if (day_ < 10) str += "0";
        str += day_;
        return str;
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
        } else if (hourC >= 1 && hourC < 24) {
            result = parseInt(hourC) + "小时前";
        } else if (minC >= 1 && minC < 60) {
            result = parseInt(minC) + "分钟前";
        } else result = "刚刚";
        return result;
    }
});

//# sourceMappingURL=DateFilter-compiled.js.map