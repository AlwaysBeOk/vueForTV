
export class DBJsonService{
    /**
     *  DBService 本地缓存服务<a href='../es6/service/imgtext/eg/index.html'> DBService的使用</a>
     * @requires jquery
     * @param zid {String} zid 评论的ID
     * @param ps {int} ps 评论每页条数
     */
    constructor (key,obj) {
        this.key=key;
        if(obj){
            var str = JSON.stringify(obj);
            localStorage.setItem(key,str);
        }

    };
    /**
     * 根据页码获取评论数据
     * @param callback {Function} 回调函数
     * @param pn {int} 页码 不传值是1
     */
    getJson(){
        var data=JSON.parse(localStorage.getItem(this.key));
         if(data){
             return data;
         }else{
                 return {};
         }
    };
    /**
     * 获取第一页数据
     * @param callback {Function} 回调函数
     */
    getAttr(attr){
      var data= this.getJson();
        return data[attr];
    };
    /**
     * 获取下一页数据
     * @param callback {Function} 回调函数
     */
    modify(json){
        var str = JSON.stringify(json);
        localStorage.setItem(this.key,str);
    };
    /**
     * 循环获取首页数据
     * @param callback {Function} 回调函数
     * @param _interTime {int} 间隔时间(毫秒数)默认是10秒
     */
    modifyAttr(name,value){
       var data= this.getJson();
       data[name]=value;
        console.log(data);
        var str = JSON.stringify(data);
       localStorage.setItem(this.key,str);

    };

}
