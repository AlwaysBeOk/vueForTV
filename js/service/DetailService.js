import $ from 'jquery'
export class DetailService{
    /**
     *DetailService 底层页的接口服务
     * @requires jquery
     * @param zid {String} zid 底层页的ID
     */
    constructor (zid) {
        this.zid=zid;
        this.url=`http://hot.news.cntv.cn/api/Content/contentinfo?id=${zid}`;
    };
    /**
     * 获取底层页数据
     * @param callback {Function} 回调函数
     */
    get(callback){
        $.ajax({
            dataType:'jsonp',
            jsonp:'cb',
            url: this.url,
            success:function(data){
                callback(data);
            }
        });
    };
}
