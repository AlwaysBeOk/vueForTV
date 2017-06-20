'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserService = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserService = exports.UserService = function () {
    /**
     *ImgTextService 评论的接口服务,查看例子<a href='../es6/service/imgtext/eg/index.html'> ImgTextService的使用</a>
     * @requires jquery
     * @param zid {String} zid 评论的ID
     * @param ps {int} ps 评论每页条数
     */
    function UserService() {
        (0, _classCallCheck3.default)(this, UserService);

        this.usrurl = "http://115.182.9.124/index.php?action=userinfo-creat";
    }

    (0, _createClass3.default)(UserService, [{
        key: 'send',

        /**
         * 根据页码获取评论数据
         * @param callback {Function} 回调函数
         * @param pn {int} 页码 不传值是1
         */
        value: function send(phone, _callback) {
            _jquery2.default.ajax({
                data: {
                    username: phone,
                    telephone: phone,
                    activityid: 20170126
                },
                url: this.usrurl,
                dataType: 'jsonp',
                success: function success(data) {
                    _callback();
                    console.log(data);
                }

            });
        }
    }]);
    return UserService;
}();

//# sourceMappingURL=UserService-compiled.js.map