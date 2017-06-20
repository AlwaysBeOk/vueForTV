'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ListPageService = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var ListPageService = exports.ListPageService = function () {
    /**
     *ListPageService  列表页接口
     * @requires jquery
     * @param zid {String} zid 底层页的ID
     */
    function ListPageService(zid) {
        (0, _classCallCheck3.default)(this, ListPageService);

        this.zid = zid;
    }

    (0, _createClass3.default)(ListPageService, [{
        key: 'send',

        /**
         * 发送数据并获取返回值
         * @param callback {Function} 回调函数
         */
        value: function send(callback) {
            _jquery2.default.ajax({
                dataType: 'jsonp',
                jsonp: 'cb',
                url: 'http://st.app.cntvwb.cn/stat/updatec',
                data: { 'itype': 'news', 'iid': this.zid },
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
                jsonp: 'cb',
                url: 'http://hot.news.cntv.cn/index.php',
                data: { 'controller': 'list', 'action': 'getHandDataInfoNew', 'handdata_id': this.zid, 'n1': '1', 'n2': '6', 'toutuNum': '1' },
                success: function success(data) {
                    callback(data);
                }
            });
        }
    }]);
    return ListPageService;
}(); /**
      * Created by mxl on 2016/12/18.
      */

//# sourceMappingURL=ListPageService-compiled.js.map

//# sourceMappingURL=ListPageService-compiled-compiled.js.map

//# sourceMappingURL=ListPageService-compiled-compiled-compiled.js.map