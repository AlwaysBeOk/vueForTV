'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImgTextService = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImgTextService = exports.ImgTextService = function () {
    /**
     *ImgTextService 评论的接口服务,查看例子<a href='../es6/service/imgtext/eg/index.html'> ImgTextService的使用</a>
     * @requires jquery
     * @param zid {String} zid 评论的ID
     * @param ps {int} ps 评论每页条数
     */
    function ImgTextService(zid, ps) {
        (0, _classCallCheck3.default)(this, ImgTextService);

        this.zid = zid;
        this.url = 'http://hot.news.cntv.cn/api/list/liveMessageList?id=' + zid + '&isfromapp=1&s=1&sn=3&isfromapp=1';
    }

    (0, _createClass3.default)(ImgTextService, [{
        key: 'get',

        /**
         * 根据页码获取评论数据
         * @param callback {Function} 回调函数
         * @param pn {int} 页码 不传值是1
         */
        value: function get(callback, pn) {
            this.pn = pn || 1;
            _jquery2.default.ajax({
                dataType: 'jsonp',
                jsonp: 'cb',
                url: this.url,
                data: { 'page': pn },
                success: function success(data) {
                    callback(data);
                }
            });
        }
    }, {
        key: 'init',

        /**
         * 获取第一页数据
         * @param callback {Function} 回调函数
         */
        value: function init(callback) {
            this.pn = 1;
            get(callback, 1);
        }
    }, {
        key: 'next',

        /**
         * 获取下一页数据
         * @param callback {Function} 回调函数
         */
        value: function next(callback) {
            get(callback, this.pn++);
        }
    }, {
        key: 'interval',

        /**
         * 循环获取首页数据
         * @param callback {Function} 回调函数
         * @param _interTime {int} 间隔时间(毫秒数)默认是10秒
         */
        value: function interval(callback, _interTime) {
            _interTime = _interTime || 100000;
            var that = this;
            setInterval(function () {
                that.get(callback);
            }, _interTime);
        }
    }]);
    return ImgTextService;
}();

//# sourceMappingURL=ImgTextService-compiled.js.map