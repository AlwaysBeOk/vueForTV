import $ from 'jquery'
export class ConfigService{
    /**
     *ConfigService 评论的接口服务,查看例子<a href='../es6/service/imgtext/eg/index.html'> ConfigService</a>
     * @requires jquery
     * @param zid {String} zid 评论的ID
     * @param ps {int} ps 评论每页条数
     */
    constructor () {

        this.url="config.json";
    };
    /**
     * 获取第一页数据
     * @param callback {Function} 回调函数
     */
    init(callback){
        $.ajax({
            dataType:'json',
            url: this.url,
            success:function(data){
                callback(data);
            }
        });
    };

}
