import $ from 'jquery'
export class GridsumService {
    /**
     *DetailService 底层页的接口服务
     * @requires jquery
     * @param zid {String} zid 底层页的ID
     */
    constructor (zid) {
        this.zid=zid;
    };
    /**
     * 发送数据并获取返回值
     * @param callback {Function} 回调函数
     */
    send(callback){
        $.ajax({
            dataType:'jsonp',
            url: 'http://115.182.217.48/api/v3/profiles/5027/realtimes/newyears/pageviews/totalcount',
            success:function(data){
                callback(data);
            }
        });
    }
    /**
     * 获取数据iiD
     * @param callback {Function} 回调函数
     */
    get(callback){
        $.ajax({
            dataType:'jsonp',
            url: 'http://115.182.217.48/api/v3/profiles/5027/realtimes/newyears/pageviews/totalcount',
            success:function(data){
                callback(data);
            }
        });

    }
}
