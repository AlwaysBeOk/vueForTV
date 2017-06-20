'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DetailService = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var DetailService = exports.DetailService = function () {
    /**
     *DetailService 底层页的接口服务
     * @requires jquery
     * @param zid {String} zid 底层页的ID
     */
    function DetailService(zid) {
        (0, _classCallCheck3.default)(this, DetailService);

        this.zid = zid;
        this.url = 'http://hot.news.cntv.cn/api/Content/contentinfo?id=' + zid;
    }

    (0, _createClass3.default)(DetailService, [{
        key: 'get',

        /**
         * 获取底层页数据
         * @param callback {Function} 回调函数
         */
        value: function get(callback) {
            _jquery2.default.ajax({
                dataType: 'jsonp',
                jsonp: 'cb',
                url: this.url,
                success: function success(data) {
                    callback(data);
                }
            });
        }
    }]);
    return DetailService;
}();

//# sourceMappingURL=DetailService-compiled.js.map

//# sourceMappingURL=DetailService-compiled-compiled.js.map

//# sourceMappingURL=DetailService-compiled-compiled-compiled.js.map

//# sourceMappingURL=DetailService-compiled-compiled-compiled-compiled.js.map