'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HotService = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HotService = exports.HotService = function () {
    /**
     * HotService用于获取热点列表
     * @requires jquery
     * @param zid {String} zid 热点的ID
     * @param ps {int} ps 热点的每页条数
     */
    function HotService(sid) {
        (0, _classCallCheck3.default)(this, HotService);

        this.sid = sid;
        this.num = 1;
    }

    (0, _createClass3.default)(HotService, [{
        key: 'add',

        /**
         * 添加热点
         * @param callback {Function} 回调函数
         *
         */
        value: function add(id, type, callback) {
            var url = 'http://api.itv.cntv.cn/rank/add';
            type = type.replace('lianghui', '');
            _jquery2.default.ajax({
                dataType: 'jsonp',
                jsonp: 'jsonpcallback',
                url: url,
                data: { 'sid': this.sid, 'type': type, 'num': this.num, 'id': id },
                success: function success(data) {
                    console.log(data);
                    callback(data);
                }
            });
        }
    }]);
    return HotService;
}();

//# sourceMappingURL=HotService-compiled.js.map