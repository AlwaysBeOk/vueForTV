export class set{

/**
 * 弹出框工具类,使用方法查看例子<a href='../set/eg/index.html'> set的使用</a>
 * @param {String} _sortAttr 排序字段
 * @param {String} _unAttr  唯一字段
 * @constructor
 * @alias module:cntv.set
 *
 */
constructor (_unAttr,_sortAttr) {
    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };
    this.sortAttr=_sortAttr;
    this.unAttr=_unAttr;
    /**
     *存储唯一字段的数组
     */
    this.ids=[];
    /**
     * 存储对象数组
     */
    this.objs=[];
};

    /**
     * 将对象存入数组中
     * @param {Object} _obj  要存入的对象
     * @return true 插入成功   false插入失败
     */
    put(_obj){
        var newId=_obj[this.unAttr];
        if(!newId){
                return ;
        }
        var index=this.ids.indexOf(newId);
        if(index==-1){

            this.ids.push(newId);
        }else{
            return false;
        }
        var le=this.objs.length;
        if(le==0){
            this.objs[0]=_obj;
            return true;
        }

        for(var i=le;i>0;i--){
            var index=i-1;
            if((this.objs[index])[this.sortAttr]-_obj[this.sortAttr]>0){
                this.objs.insert(i,_obj);
                return true;
            }
        }
        this.objs.insert(0,_obj);
        return true;
    }
    /**
     * 返回数组的长度
     * return {Number}
     */
    size(){
        return this.objs.length;
    }
    /**
     * 返回数组
     * return {Array}
     */
    toArray(){
        return  this.objs;
    }

};