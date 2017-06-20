/**
 * Created by mxl on 2016/12/18.
 */
import $ from 'jquery'
export class ListPageService{
    /**
     *ListPageService  列表页接口
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
            jsonp:'cb',
            url: 'http://st.app.cntvwb.cn/stat/updatec',
            data:{'itype':'news','iid':this.zid},
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
            jsonp:'cb',
            url: 'http://hot.news.cntv.cn/index.php',
            data:{'controller':'list','action':'getHandDataInfoNew','handdata_id':this.zid,'n1':'1','n2':'6','toutuNum':'1'},
            success:function(data){
                callback(data);
            }
        });

    } 
}
