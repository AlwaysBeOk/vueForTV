import $ from 'jquery'
export class CommentService {
  /**
   *ImgTextService 评论的接口服务,查看例子<a href='../es6/service/imgtext/eg/index.html'> ImgTextService的使用</a>
   * @requires jquery
   * @param zid {String} zid 评论的ID
   * @param ps {int} ps 评论每页条数
   */
  constructor(zid, ps) {
    this.zid = zid;
    this.ps = 20;
    this.pn = 1;
    this.repn = 1;
    this.actionUrl = "http://newcomment.cntv.cn/comment/upload";
    if (ps) {
      this.ps = ps;
    }
    this.url = `http://common.newcomment.cntv.cn/comment/list?app=cctvnews&itemid=${zid}&prepage=${this.ps}`;
  };

  /**
   * 根据页码获取评论数据
   * @param callback {Function} 回调函数
   * @param pn {int} 页码 不传值是1
   */
  get(callback, pn) {
    this.pn = pn || 1;
    $.ajax({
      dataType: 'jsonp',
      jsonp: 'jsonp_callback',
      url: this.url,
      data: {'page': pn},
      success: function (data) {
        callback(data);
      }
    });
  };

  /**
   * 获取第一页数据
   * @param callback {Function} 回调函数
   */
  init(callback) {
    this.pn = 1;
    get(callback, 1);
  };

  /**
   * 获取下一页数据
   * @param callback {Function} 回调函数
   */
  next(callback) {
    this.pn = this.pn + 1;
    this.get(callback, this.pn++)
  };

  /**
   * 循环获取首页数据
   * @param callback {Function} 回调函数
   * @param _interTime {int} 间隔时间(毫秒数)默认是10秒
   */
  interval(callback, _interTime) {
    _interTime = _interTime || 10000;
    var that = this;
    setInterval(function () {
      $.ajax({
        dataType: 'jsonp',
        jsonp: 'jsonp_callback',
        url: that.url,
        data: {'page': 1},
        success: function (data) {
          callback(data);
        }
      });
    }, _interTime)
  };

  submitComment(_content, _mark, head, _pic) {
    var data = encodeURIComponent($.base64.encode('uid=12211121&time=' + new Date().getTime() / 1000));
    var zid = this.zid;
    if (_content || _pic) {
      if (!_mark) {
        _mark = "央视"
      }
      $.post('http://newcomment.cntv.cn/comment/post', {
        app: "cctvnews",
        itemid: zid,
        message: _content,
        mark: head,
        pic: _pic,
        authorid: '122111',
        author: _mark,
        data: data
      });
    }
  };

  replyComment(_replyId, _content) {
    var data = encodeURIComponent($.base64.encode('uid=12211121&time=' + new Date().getTime() / 1000));
    var zid = this.zid;
    if (_content) {
      $.post('http://newcomment.cntv.cn/comment/post', {
        app: "cctvnews",
        itemid: zid,
        message: _content,
        replyid: _replyId,
        tid: _replyId,
        authorid: '122111',
        author: '',
        data: data
      });
    }
  };

  agree(_replyId) {
    var data = encodeURIComponent($.base64.encode('uid=12211121&time=' + new Date().getTime() / 1000));
    var zid = this.zid;
    if (_replyId) {
      $.ajax({
        dataType: 'jsonp',
        jsonp: 'jsonp_callback',
        url: 'http://newcomment.cntv.cn/comment/agree',
        data: {
          app: "cctvnews",
          itemid: zid,
          tid: _replyId,
          pid: _replyId,
          data: data
        },
        success: function (data) {
          console.info(data);
        }
      });

    }

  };

  pageReply(_replyId, _callback) {
    var _itemId = this.zid;
    if (_replyId) {
      $.ajax({
        dataType: 'jsonp',
        jsonp: 'jsonp_callback',
        url: 'http://common.newcomment.cntv.cn/comment/list',
        data: {
          app: "cctvnews",
          itemid: _itemId,
          replyid: _replyId,
          prepage: 100
        },
        success: function (data) {
          _callback(data);
        }
      });

    }

  };

  uploadImg(formId, _callback) {
    $(formId).ajaxSubmit({

      type: "POST",//提交类型
      dataType: "json",//返回结果格式
      url: this.actionUrl,//请求地址
      data: {"action": this.actionUrl, 'app': 'cctvnews', 'itemid': 'attachments'},//请求数据
      success: function (data) {//请求成功后的函数
        console.log(data);
        _callback(data);
      },
      error: function (data) {
        console.log(data);
      },//请求失败的函数
      async: true

    });
  };

  initReplyComment(_callback) {
    var commentApp = 'cctvnews',				//应用
      commentItemid = this.zid,		//文章id
      commentItemtype = 0,				//图文
      commentPage = 1,					//页码
      commentPrepage = 20;				//默认条数
    var crul = 'http://common.newcomment.cntv.cn/reply/special?app=cctvnews&itemid=' + commentItemid + '&itemtype=0&prepage=' + commentPrepage + '&page=' + commentPage;
    $.ajax({
      dataType: 'jsonp',
      jsonp: 'jsonp_callback',
      url: crul,
      success: function (data) {
        _callback(data);
      }
    });
  };

  getReplyComment(_pn, _callback) {
    this.repn = _pn;
    var commentApp = 'news',				//应用
      commentItemid = this.zid,		//文章id
      commentItemtype = 0,				//图文
      commentPage = _pn,					//页码
      commentPrepage = 20;				//默认条数
    var crul = 'http://common.newcomment.cntv.cn/reply/special?app=cctvnews&itemid=' + commentItemid + '&itemtype=0&prepage=' + commentPrepage + '&page=' + commentPage;
    $.ajax({
      dataType: 'jsonp',
      jsonp: 'jsonp_callback',
      url: crul,
      success: function (data) {
        _callback(data);
      }
    });
  };

  nextReply(callback) {
    this.repn = this.repn + 1;
    this.getReplyComment(this.repn++, callback);
  };


  intervalReplyComment(_interTime, _callback) {
    var commentApp = 'cctvnews',				//应用
      commentItemid = this.zid,		//文章id
      commentItemtype = 0,				//图文
      commentPage = 1,					//页码
      commentPrepage = 20;				//默认条数
    var crul = 'http://common.newcomment.cntv.cn/reply/special?app=cctvnews&itemid=' + commentItemid + '&itemtype=0&jsonp_callback=JSON_CALLBACK&prepage=' + commentPrepage + '&page=' + commentPage;

    $interval(function () {
      $.ajax({
        dataType: 'jsonp',
        jsonp: 'jsonp_callback',
        url: crul,
        success: function (data) {
          _callback(data);
        }
      });
    }, _interTime)
  };
}
