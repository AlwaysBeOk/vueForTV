"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.set = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var set = exports.set = function () {

    /**
     * 弹出框工具类,使用方法查看例子<a href='../set/eg/index.html'> set的使用</a>
     * @param {String} _sortAttr 排序字段
     * @param {String} _unAttr  唯一字段
     * @constructor
     * @alias module:cntv.set
     *
     */
    function set(_unAttr, _sortAttr) {
        (0, _classCallCheck3.default)(this, set);

        Array.prototype.insert = function (index, item) {
            this.splice(index, 0, item);
        };
        this.sortAttr = _sortAttr;
        this.unAttr = _unAttr;
        /**
         *存储唯一字段的数组
         */
        this.ids = [];
        /**
         * 存储对象数组
         */
        this.objs = [];
    }

    (0, _createClass3.default)(set, [{
        key: "put",


        /**
         * 将对象存入数组中
         * @param {Object} _obj  要存入的对象
         * @return true 插入成功   false插入失败
         */
        value: function put(_obj) {
            var newId = _obj[this.unAttr];
            if (!newId) {
                return;
            }
            var index = this.ids.indexOf(newId);
            if (index == -1) {

                this.ids.push(newId);
            } else {
                return false;
            }
            var le = this.objs.length;
            if (le == 0) {
                this.objs[0] = _obj;
                return true;
            }

            for (var i = le; i > 0; i--) {
                var index = i - 1;
                if (this.objs[index][this.sortAttr] - _obj[this.sortAttr] > 0) {
                    this.objs.insert(i, _obj);
                    return true;
                }
            }
            this.objs.insert(0, _obj);
            return true;
        }
        /**
         * 返回数组的长度
         * return {Number}
         */

    }, {
        key: "size",
        value: function size() {
            return this.objs.length;
        }
        /**
         * 返回数组
         * return {Array}
         */

    }, {
        key: "toArray",
        value: function toArray() {
            return this.objs;
        }
    }]);
    return set;
}();

;

//# sourceMappingURL=set-compiled.js.map