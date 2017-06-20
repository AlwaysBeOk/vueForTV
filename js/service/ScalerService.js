import $ from 'jquery'
export class ScalerService {
  /**
   *DetailService 底层页的接口服务
   * @requires jquery
   * @param zid {String} zid 底层页的ID
   */
  constructor (zid) {
    this.zid = zid;
  };

  /**
   * 发送数据并获取返回值
   * @param callback {Function} 回调函数
   */
  send (callback) {
    $.ajax({
      dataType: 'jsonp',
      jsonp: 'cb',
      url: 'http://st.app.cntvwb.cn/stat/updatec',
      data: {'itype': 'news', 'iid': this.zid},
      success: function (data) {
        callback(data);
      }
    });
  }

  /**
   * 获取数据iiD
   * @param callback {Function} 回调函数
   */
  get (callback) {
    $.ajax({
      dataType: 'jsonp',
      jsonp: 'cb',
      url: 'http://st.app.cntvwb.cn/stat/getac',
      data: {'itype': 'news', 'iid': this.zid},
      success: function (data) {
        callback(data);
      }
    });
  }
}
