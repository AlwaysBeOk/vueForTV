'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConfigService = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfigService = exports.ConfigService = function () {
    /**
     *ConfigService 评论的接口服务,查看例子<a href='../es6/service/imgtext/eg/index.html'> ConfigService</a>
     * @requires jquery
     * @param zid {String} zid 评论的ID
     * @param ps {int} ps 评论每页条数
     */
    function ConfigService() {
        (0, _classCallCheck3.default)(this, ConfigService);


        this.url = "config.json";
    }

    (0, _createClass3.default)(ConfigService, [{
        key: 'init',

        /**
         * 获取第一页数据
         * @param callback {Function} 回调函数
         */
        value: function init(callback) {
            _jquery2.default.ajax({
                dataType: 'json',
                url: this.url,
                success: function success(data) {
                    callback(data);
                }
            });
        }
    }]);
    return ConfigService;
}();

//# sourceMappingURL=ConfigService-compiled.js.map