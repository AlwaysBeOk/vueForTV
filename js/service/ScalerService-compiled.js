'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScalerService = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScalerService = exports.ScalerService = function () {
  /**
   *DetailService 底层页的接口服务
   * @requires jquery
   * @param zid {String} zid 底层页的ID
   */
  function ScalerService(zid) {
    (0, _classCallCheck3.default)(this, ScalerService);

    this.zid = zid;
  }

  (0, _createClass3.default)(ScalerService, [{
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
        url: 'http://st.app.cntvwb.cn/stat/getac',
        data: { 'itype': 'news', 'iid': this.zid },
        success: function success(data) {
          callback(data);
        }
      });
    }
  }]);
  return ScalerService;
}();

//# sourceMappingURL=ScalerService-compiled.js.map