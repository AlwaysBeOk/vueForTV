'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Http = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Http = exports.Http = function () {
  /**
   *ImgTextService 评论的接口服务,查看例子<a href='../es6/service/imgtext/eg/index.html'> ImgTextService的使用</a>
   * @requires jquery
   * @param zid {String} zid 评论的ID
   * @param ps {int} ps 评论每页条数
   */
  function Http() {
    (0, _classCallCheck3.default)(this, Http);
  }

  (0, _createClass3.default)(Http, [{
    key: 'getParam',
    value: function getParam(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    }
  }]);
  return Http;
}();

//# sourceMappingURL=Http-compiled.js.map