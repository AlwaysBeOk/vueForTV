'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeChatService = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WeChatService = exports.WeChatService = function () {

  /**
   * HotService用于获取热点列表
   * @requires jquery
   * @param zid {String} zid 热点的ID
   * @param ps {int} ps 热点的每页条数
   */
  function WeChatService(userId) {
    (0, _classCallCheck3.default)(this, WeChatService);

    this.userId = userId;
  }

  (0, _createClass3.default)(WeChatService, [{
    key: 'getInfo',

    /**
     * 添加热点
     * @param callback {Function} 回调函数
     *
     */
    value: function getInfo(callback) {
      var url = 'http://wx.cntv.cn/projects/api/user/user-info.html';
      _jquery2.default.ajax({
        dataType: 'jsonp',
        jsonp: 'callback',
        url: url,
        data: { 'uid': this.userId },
        success: function success(data) {
          console.log(data);
          callback(data);
        }
      });
    }
  }]);
  return WeChatService;
}();

//# sourceMappingURL=WeChatService-compiled.js.map