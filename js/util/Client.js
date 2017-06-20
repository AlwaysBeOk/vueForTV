export class Client{
    /**
     *ImgTextService 评论的接口服务,查看例子<a href='../es6/service/imgtext/eg/index.html'> ImgTextService的使用</a>
     * @requires jquery
     * @param zid {String} zid 评论的ID
     * @param ps {int} ps 评论每页条数
     */
  constructor (){
    this.ua = window.navigator.userAgent.toLowerCase();
  };
  isWeiXin (){
    if (this.ua.match(/MicroMessenger/i)){
      return true;
    } else {
      return false;
    }
  }
}
