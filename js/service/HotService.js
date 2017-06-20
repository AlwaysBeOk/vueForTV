import $ from 'jquery'
export class HotService{
    /**
     * HotService用于获取热点列表
     * @requires jquery
     * @param zid {String} zid 热点的ID
     * @param ps {int} ps 热点的每页条数
     */
    constructor (sid) {
        this.sid=sid;
        this.num=1;
    };
    /**
     * 添加热点
     * @param callback {Function} 回调函数
     *
     */
    add(id,type,callback){
        var url ='http://api.itv.cntv.cn/rank/add';
        type=type.replace('lianghui','');
        $.ajax({
            dataType:'jsonp',
            jsonp:'jsonpcallback',
            url: url,
            data:{'sid':this.sid,'type':type,'num':this.num,'id':id},
            success:function(data){
                console.log(data);
                callback(data);
            }
        });
    };


}
