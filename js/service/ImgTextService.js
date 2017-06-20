import $ from 'jquery'
export class ImgTextService{
    /**
     *ImgTextService 评论的接口服务,查看例子<a href='../es6/service/imgtext/eg/index.html'> ImgTextService的使用</a>
     * @requires jquery
     * @param zid {String} zid 评论的ID
     * @param ps {int} ps 评论每页条数
     */
    constructor (zid,ps) {
        this.zid=zid;
        this.url=`http://hot.news.cntv.cn/api/list/liveMessageList?id=${zid}&isfromapp=1&s=1&sn=3&isfromapp=1`;
    };
    /**
     * 根据页码获取评论数据
     * @param callback {Function} 回调函数
     * @param pn {int} 页码 不传值是1
     */
    get(callback,pn){
        this.pn = pn || 1;
        $.ajax({
            dataType:'jsonp',
            jsonp:'cb',
            url: this.url,
            data:{'page':pn},
            success:function(data){
                callback(data);
            }
        });
    };
    /**
     * 获取第一页数据
     * @param callback {Function} 回调函数
     */
    init(callback){
        this.pn=1;
        get(callback,1);
    };
    /**
     * 获取下一页数据
     * @param callback {Function} 回调函数
     */
    next(callback){
        get(callback,this.pn++)
    };
    /**
     * 循环获取首页数据
     * @param callback {Function} 回调函数
     * @param _interTime {int} 间隔时间(毫秒数)默认是10秒
     */
    interval(callback,_interTime){
        _interTime=_interTime || 100000;
        let that=this;
        setInterval(function(){
            that.get(callback)
        }, _interTime)
    };

}
