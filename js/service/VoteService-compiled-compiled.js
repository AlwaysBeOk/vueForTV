'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VoteService = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var VoteService = exports.VoteService = function () {

  /**
   * VoteService用于获取热点列表
   * @requires jquery
   * @param zid {String} zid 热点的ID
   * @param ps {int} ps 热点的每页条数
   */
  function VoteService(voteid) {
    (0, _classCallCheck3.default)(this, VoteService);

    this.postVoteId = function (qid, oid) {
      _jquery2.default.ajax({
        url: "http://common.qr.cntv.cn/v2/news/newsVote/post",
        data: { 'voteid': this.voteid, questionid: qid, 'optioned[]': oid },
        type: "POST",
        crossDomain: "true",
        success: function success(data) {},
        error: function error() {}
      });
    };

    this.voteid = voteid;
  }

  (0, _createClass3.default)(VoteService, [{
    key: 'getInfo',

    /**
     * 添加热点
     * @param callback {Function} 回调函数
     *
     */
    value: function getInfo(callback) {
      var url = 'http://common.qr.cntv.cn/v2/news/newsVote/votedetail';
      _jquery2.default.ajax({
        dataType: 'jsonp',
        jsonp: 'callback',
        url: url,
        data: { 'voteid': this.voteid },
        success: function success(data) {
          callback(data);
        }
      });
    }
  }]);
  return VoteService;
}();

//# sourceMappingURL=VoteService-compiled.js.map

//# sourceMappingURL=VoteService-compiled-compiled.js.map