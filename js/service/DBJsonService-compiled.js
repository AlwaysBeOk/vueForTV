"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBJsonService = undefined;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DBJsonService = exports.DBJsonService = function () {
  /**
   *  DBService 本地缓存服务<a href='../es6/service/imgtext/eg/index.html'> DBService的使用</a>
   * @requires jquery
   * @param zid {String} zid 评论的ID
   * @param ps {int} ps 评论每页条数
   */
  function DBJsonService(key, obj) {
    (0, _classCallCheck3.default)(this, DBJsonService);

    this.key = key;
    if (obj) {
      var str = (0, _stringify2.default)(obj);
      localStorage.setItem(key, str);
    }
  }

  (0, _createClass3.default)(DBJsonService, [{
    key: "getJson",

    /**
     * 根据页码获取评论数据
     * @param callback {Function} 回调函数
     * @param pn {int} 页码 不传值是1
     */
    value: function getJson() {
      var data = JSON.parse(localStorage.getItem(this.key));
      if (data) {
        return data;
      } else {
        return {};
      }
    }
  }, {
    key: "getAttr",

    /**
     * 获取第一页数据
     * @param callback {Function} 回调函数
     */
    value: function getAttr(attr) {
      var data = this.getJson();
      return data[attr];
    }
  }, {
    key: "modify",

    /**
     * 获取下一页数据
     * @param callback {Function} 回调函数
     */
    value: function modify(json) {
      var str = (0, _stringify2.default)(json);
      localStorage.setItem(this.key, str);
    }
  }, {
    key: "modifyAttr",

    /**
     * 循环获取首页数据
     * @param callback {Function} 回调函数
     * @param _interTime {int} 间隔时间(毫秒数)默认是10秒
     */
    value: function modifyAttr(name, value) {
      var data = this.getJson();
      data[name] = value;
      console.log(data);
      var str = (0, _stringify2.default)(data);
      localStorage.setItem(this.key, str);
    }
  }]);
  return DBJsonService;
}();

//# sourceMappingURL=DBJsonService-compiled.js.map