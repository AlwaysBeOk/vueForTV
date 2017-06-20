'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GridsumService = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var GridsumService = exports.GridsumService = function () {
    /**
     *DetailService 底层页的接口服务
     * @requires jquery
     * @param zid {String} zid 底层页的ID
     */
    function GridsumService(zid) {
        (0, _classCallCheck3.default)(this, GridsumService);

        this.zid = zid;
    }

    (0, _createClass3.default)(GridsumService, [{
        key: 'send',

        /**
         * 发送数据并获取返回值
         * @param callback {Function} 回调函数
         */
        value: function send(callback) {
            _jquery2.default.ajax({
                dataType: 'jsonp',
                url: 'http://115.182.217.48/api/v3/profiles/702/realtimes/newyears/pageviews/totalcount',
                success: function success(data) {
                    callback(data);
                }
            });
        }
        /**
         * 获取数据iiD
         * @param callback {Function} 回调函数
         */

    }, {
        key: 'get',
        value: function get(callback) {
            _jquery2.default.ajax({
                dataType: 'jsonp',
                url: 'http://115.182.217.48/api/v3/profiles/702/realtimes/newyears/pageviews/totalcount',
                success: function success(data) {
                    callback(data);
                }
            });
        }
    }]);
    return GridsumService;
}();

//# sourceMappingURL=GridsumService-compiled.js.map

//# sourceMappingURL=GridsumService-compiled-compiled.js.map

//# sourceMappingURL=GridsumService-compiled-compiled-compiled.js.map

//# sourceMappingURL=GridsumService-compiled-compiled-compiled-compiled.js.map