import $ from 'jquery'
export class UserService{
    /**
     *ImgTextService 评论的接口服务,查看例子<a href='../es6/service/imgtext/eg/index.html'> ImgTextService的使用</a>
     * @requires jquery
     * @param zid {String} zid 评论的ID
     * @param ps {int} ps 评论每页条数
     */
    constructor () {
        this.usrurl="http://115.182.9.124/index.php?action=userinfo-creat";
    };
    /**
     * 根据页码获取评论数据
     * @param callback {Function} 回调函数
     * @param pn {int} 页码 不传值是1
     */
    send(phone,_callback){
        $.ajax({
            data:{
                username:phone,
                telephone:phone,
                activityid:20170126
            },
            url:this.usrurl,
            dataType: 'jsonp',
            success:function(data){
                _callback();
                console.log(data);
            }

        });
    };

}
