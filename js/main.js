import Vue from 'vue'
import {DateFilter} from './filter/DateFilter'
import {NumberFilter} from './filter/NumberFilter'
import {ScalerService} from './service/ScalerService'
import {CommentService} from './service/CommentService'
import {Geography} from './util/Geography'
import {VoteService} from './service/VoteService'
import {set} from './service/set'
import $ from 'jquery'

Array.prototype.random = function () {
  var index = Math.floor((Math.random() * this.length));
  return this[index];
};
var heads = [];
for (var i = 4; i < 8; i++) {
  heads.push('img/tou' + (i + 1) + '.png');
}
var t=false;
var abc=['A','B','C','D','E','F','G','H','I','J','K','l','M']
var sex={1:'男',2:'女'}
var sw = null;
var util = {
    //添加事件
    addHandler: function (element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
      } else {
        element["on" + type] = handler;
      }
    },
    replace: function (text, now) {
      var reg = /#[^#]*#/;
      if (reg.test(text)) {
        return text.replace(reg, now)
      } else {
        return text = now + text;
      }
    },
//移除元素
    removeElement: function (_element) {
      var _parentElement = _element.parentNode;
      if (_parentElement) {
        _parentElement.removeChild(_element);
      }
    }
    ,
    hidePhone: function (phone) {
      var mtel = phone.substr(0, 3) + 'XXXX' + phone.substr(7);
      return mtel;
    }
    ,
    getParam: function (_name) {
      var reg = new RegExp('(^|&)' + _name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return decodeURI(r[2]);
      }
      return null;
    }
    ,
    regPhone: /^([0-9]{11})?$/,
    /**
     * 去除前后空格
     * @param {String} value 传入的值
     *
     */
    trim: function (s) {
      return s.replace(/(^\s*)|(\s*$)/g, "");
    }
    ,
    /**
     * 验证值是否为空，为空返回true，否则返回false
     * @param {String} value 传入的值
     * @return {Boolean} 为空返回true，否则返回false
     */
    isBlank: function (value) {


      if (!value) {
        return true;
      }
      return false;
    }
    ,
    /**
     * 检查电话号码，格式正确返回true，格式错误返回false
     * @param {String} value 传入的值
     * @return {Boolean} 格式正确返回true，格式错误返回false
     */
    checkPhone: function (value) {
      var falg = value.search(this.regPhone);
      if (falg == -1) {
        return false;
      }
      return true;

    }
    ,
    limitLength: function (value, min, max) {
      if (!value) {
        return -1;
      }
      if (min < 0) {
        min = 0;
      }
      if (max < min) {
        max = min;
      }
      var len = value.length;
      if (len < min) {
        return -1;
      } else if (len > max) {
        return -2;
      }
      return 0;
    }

  }
  ;
var h = {
  init: function () {
    var me = this;
    document.getElementById('ffile').onchange = me.fileHandler;

    me.progress = document.getElementById('fprogress');
    me.image = document.getElementById('fimg');
    me.simg = document.createElement('img');
    me.max = 1024 * 1024 * 3;

  },
  fileHandler: function (e) {
    $(".loading").show();

    var me = h;
    var file = me.file = this.files[0];
    me.total = file.size;
    if (me.total > me.max) {
      activeData.picerro = true;
      return false;
    }
    var photoExt = this.value.substr(this.value.lastIndexOf(".")).toLowerCase();//获得文件后缀名
    if (photoExt != '.jpg' && photoExt != '.png') {
      activeData.picerro = true;
      return false;
    }
    activeData.picput = true;
    me.progress.style.width = "0%";
    me.loaded = 0;
    //每次读取1M
    me.step = 200 * 1024;
    me.times = 0;
    var reader = me.reader = new FileReader();
    //
    me.blob = null;
    reader.onloadstart = me.onLoadStart;
    //reader.onprogress = me.onProgress;
    reader.onabort = me.onAbort;
    reader.onerror = me.onerror;
    reader.onload = me.onLoad;
    reader.onloadend = me.onLoadEnd;
    //读取第一块
    me.readBlob(0);
  },
  onLoadStart: function () {
    var me = h;
  },
  onProgress: function (e) {

    var me = h;

    me.loaded += e.loaded;
    //更新进度条
    me.progress.value = (me.loaded / me.total) * 100;
  },
  onAbort: function () {
    var me = h;
  },
  onError: function () {
    var me = h;
  },
  onLoad: function () {
    var me = h;
    me.loaded = me.total;
    me.simg.src = me.reader.result;
    me.image.src = me.reader.result;
    me.simg.onload = function () {
      var iw = me.simg.width;
      var ih = me.simg.height;
      userpic = {
        url: me.reader.result,
        width: '6rem',
        height: '6rem',
        marginTop: '-3rem',
        marginLeft: '-3rem'
      };
      if (iw < ih) {
        me.image.style.width = '3rem';
        var hhh = 3 / iw * ih;
        me.image.style.height = hhh + 'rem';
        me.image.style.marginLeft = '-1.5rem';
        me.image.style.marginTop = '-' + hhh / 2 + 'rem';
        userpic.marginTop = '-' + hhh + 'rem';
        userpic.height = hhh * 2 + 'rem';
      } else {
        me.image.style.height = '3rem';
        var www = 3 / ih * iw;
        me.image.style.width = www + 'rem';
        me.image.style.marginTop = '-1.5rem';
        me.image.style.marginLeft = '-' + www / 2 + 'rem';
        userpic.marginLeft = '-' + www + 'rem';
        userpic.width = www * 2 + 'rem';
      }


    }
  },
  onLoadEnd: function () {
    var me = h;
  },
  readBlob: function (start) {
    var me = h;
    var blob,
      file = me.file;
    me.times += 1;
    var arr = [];
    var z = 0;
    while (me.loaded < me.total) {
      var blob1 = file.slice(me.loaded, me.loaded + me.step + 1);
      me.loaded = me.loaded + me.step + 1;
      arr.push(blob1);
      me.progress.style.width = (me.step * (z + 1) / me.total) * 100 + "%";
      z++;
    }
    me.blob = new Blob(arr);
    me.loaddd();

  },
  loaddd: function () {
    var me = h;
    me.reader.readAsDataURL(me.blob);
  },
  abortHandler: function () {
    var me = h;

    if (me.reader) {
      me.reader.abort();
    }
  }
};
var userpic = null;
var scalerService = new ScalerService('INTE1448518149989391');
var zanService = new ScalerService('INTE1415093029127760');
var commentService = null;
var voteService =new VoteService('50970');
var geography = new Geography();
var options = {
  useEasing: true,
  useGrouping: true,
  prefix: '',
  suffix: ''
};
var activeData = {
  user: {},
  scaler: 0,
  cs: [],
  state: '查看更多',
  swipe: false,
  other:'',
  info: {},
  votes: [],
  vote: {},
  zan:0,
  voted: false,
  isEnd: false,
  sindex: 0,
  over: false,
  message: '',
  picerro: false,
  texterro: false,
  voteerro: false,
  sendsuccess: false,
  tijiaosuccess: false,
  blankerro:false,
  picput: false,
  stat: 2,
  isphone: false,
  phoneerror: '',
  tagshow: false,
  iscomment:false
};
var geo = '';
h.init();

voteService.getInfo(function (data){
  activeData.votes = data.data.questions;
  activeData.vote = data.data.questions[0];
});

scalerService.send(function (data) {
  var demo1 = new CountUp('count', activeData.scaler, data.data.vc, 0, 2, options);
  demo1.start();
  activeData.scaler = data.data.vc;
  setInterval(function () {
    scalerService.get(function (data) {
      var demo1 = new CountUp('count', activeData.scaler, data.data.vc, 0, 2, options);
      demo1.start();
      activeData.scaler = data.data.vc;
    })
  }, 10000);
});
zanService.get(function(data){
  activeData.zan = data.data.vc;

  setInterval(function () {
    $('.zan_img').removeClass('tada');
    zanService.get(function (data) {
      activeData.zan = data.data.vc;
      $('.zan_img').addClass('tada');
    })
  }, 10000);
});
var commentSet = new set('pid', 'dateline');
geography.getGeoName(function (name) {
  if (name==null) {
    name = '央视';
  }
  geo = name;
});

var im = new Vue({
  el: '#imgText',
  data: activeData,
  methods: {
    login: function (sex) {
      var myuser = {};
      myuser.nickname = geo;
      if(sex==1){
        myuser.headimgurl = 'img/tou1.png';
      }else{
        myuser.headimgurl = 'img/tou2.png';
      }

      myuser.sex=sex;
      activeData.user = myuser;
      activeData.stat = 2;
      setTimeout(function () {
        im.changePage(3);
      }, 0)
    },
    changePage: function (pageNo) {
      if (pageNo == 1) {
        activeData.stat = 1;
      } else if (pageNo = 3) {
        setTimeout(function(){
          $('.zan_img').removeClass('tada');
        },1000)
        activeData.stat = 3;
        commentService = new CommentService('ydyleditor1751401');
        commentService.get(function (coms) {

          for (var item in  coms.data.content) {
            commentSet.put(coms.data.content[item]);
          }
          if ((!coms.data.content) || commentSet.size() < 20) {
            activeData.isEnd = true;
          }
          activeData.cs = commentSet.toArray();
          commentService.interval(function (datas) {
            for (var item in  datas.data.content) {
              commentSet.put(datas.data.content[item]);
            }
            activeData.cs = commentSet.toArray();
          }, 15000)
        });
      }
    },
    agree: function (pid) {
      $('#zan' + pid).addClass("active");
      ($('#zan' + pid + ' span').text(parseInt($('#zan' + pid + ' span').text()) + 1));
      commentService.agree(pid);
    },
    more: function () {
      activeData.state = '正在加载...';
      commentService.next(function (data) {
        var moreindex = 0;
        for (var item in  data.data.content) {
          commentSet.put(data.data.content[item]);
          moreindex++;
        }
        if (!(data.data.content) || moreindex < 20) {
          activeData.isEnd = true;
        }
        activeData.cs = commentSet.toArray();
        activeData.state = '查看更多';
      })
    },
    zanAction:function(){
      activeData.zan++;
      zanService.send(function(){});
      if(t){

      }else{
        $('.zan_img').addClass('tada');
        setTimeout(function(){
          $('.zan_img').removeClass('tada');
          t=false;
        },1000);
      }
      t=true;
    },
    tagChange: function (value, index) {
      $('.btn li').removeClass('active');
      $('.btn  li').eq(index).addClass('active');
      activeData.iscomment=value;
    },
    fullimg: function (event) {
      this.swipe = true;
      $("#mySwipe img").attr('src', event.target.src);
    },
    hideSwipe: function (event) {
      this.swipe = false;
      $("#mySwipe img").attr('src', "");
    },
    hidePicErro: function () {
      this.picput = false;
      this.picerro = false;
      this.texterro = false;
      this.voteerro = false;
      this.sendsuccess = false;
      this.tijiaosuccess = false;
      this.blankerro=false;
    },
    submit: function () {
      this.message = util.trim(this.message);
      if (!this.message) {
        this.blankerro=true;
        return;
      }
      var issuit = util.limitLength(this.message, 1, 150);
      if (issuit < 0) {
        this.texterro = true;
        return;
      }
      if (issuit == 0 || userpic) {
        var newComment = {};
        newComment.pics = [];
        newComment.author = activeData.user.nickname;
        newComment.dateline = new Date().getTime() / 1000;
        newComment.message = this.message;
        newComment.pid = new Date().getTime();
        newComment.self = "self";
        newComment.mark = activeData.user.headimgurl;
        if (userpic) {
          newComment.pics[0] = userpic.url;
          let message = this.message;
          commentService.uploadImg("#upimgForm", function (data) {
            commentService.submitComment(message, activeData.user.nickname, activeData.user.headimgurl, data.params);
          });
        } else {
          commentService.submitComment(this.message, activeData.user.nickname, activeData.user.headimgurl);
        }
        this.cs.unshift(newComment);
        document.getElementById("upimgForm").reset();
      }
      $('.s-tag li').removeClass('active');
      activeData.tagshow = false;
      this.message = "";
      userpic = null;
      this.picput = false;
      this.sendsuccess = true;
    },
    removePic: function () {
      this.picput = false;
      document.getElementById("fimg").src = '';
      $(".loading").hide();
      userpic = null;
    },
    optChange: function (index) {
      var li=$('.options  li').eq(index);
      var has=li.hasClass('active');
      if(has){
        li.removeClass('active');
        if((index+1) == activeData.vote.options.length){
          activeData.voted = false;
        }
      }else{
        if((index+1) == activeData.vote.options.length){
          activeData.voted = true;
        }
        li.addClass('active');
      }

    },
    nextVote:function(){

    },
    submitVote: function (voteid) {
      var items = $('.options  .active');
      console.log(items);
      var ids=[];
      for(var i=0;i< items.length;i++){
        var index=$('.options  li').index(items[i]);
        ids.push( activeData.vote.options[index].optionid);

        if((index+1) == activeData.vote.options.length&&activeData.other){
          var cs=new CommentService('ydyleditor1751401_'+activeData.vote.questionid);
          cs.submitComment(activeData.other);
        }
        _gsq.push(['T','GWD-002959','trackEvent',sex[activeData.user.sex],abc[index],'Q'+(this.sindex+1)]);
      }
      if(ids.length<1){

        activeData.voteerro=true;
        return ;
      }

      this.tijiaosucces = true;
      activeData.other='';
      activeData.voted = false;
      voteService.postVoteId(activeData.vote.questionid, ids);

      activeData.vote=activeData.votes[++this.sindex];
      if(this.sindex>2){

        activeData.over = true;
        return ;
      }
    }
  }
});
im.data;
