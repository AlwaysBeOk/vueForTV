import $ from 'jquery'
export class WeChatService {

  /**
   * HotService用于获取热点列表
   * @requires jquery
   * @param zid {String} zid 热点的ID
   * @param ps {int} ps 热点的每页条数
   */
  constructor (userId) {
    this.userId = userId;
  };
  /**
   * 添加热点
   * @param callback {Function} 回调函数
   *
   */
  getInfo (callback) {
    var url = 'http://wx.cntv.cn/projects/api/user/user-info.html';
    $.ajax({
      dataType: 'jsonp',
      jsonp: 'callback',
      url: url,
      data: {'uid': this.userId},
      success: function (data) {
        console.log(data);
        callback(data);
      }
    });
  };
}
