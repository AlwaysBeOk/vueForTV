import $ from 'jquery'
export class VoteService {

  /**
   * VoteService用于获取热点列表
   * @requires jquery
   * @param zid {String} zid 热点的ID
   * @param ps {int} ps 热点的每页条数
   */
  constructor(voteid) {
    this.voteid = voteid;
  };

  /**
   * 添加热点
   * @param callback {Function} 回调函数
   *
   */
  getInfo(callback) {
    var url = 'http://common.qr.cntv.cn/v2/news/newsVote/votedetail';
    $.ajax({
      dataType: 'jsonp',
      jsonp: 'callback',
      url: url,
      data: {'voteid': this.voteid},
      success: function (data) {
        callback(data);
      }
    });
  };

  postVoteId(qid,oid) {
      $.ajax({
        url: "http://common.qr.cntv.cn/v2/news/newsVote/post",
        data: {'voteid': this.voteid,questionid:qid,'optioned[]':oid},
        type: "POST",
        crossDomain: "true",
        success: function (data) {
        },
        error: function () {
        }
      });
    }
}
