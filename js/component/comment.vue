<template>
    <div class="new-comment">
        <div class="title title-2">最新评论</div>
        <div class="new-main">
            <div style=" background: url('img/line.png') repeat; height:1px;"></div>
            <div id="data_comment">
                <div class="list"><img class="pic" src="img/header.png" alt="头像">
                    <div class="main" id="comment-25710087"><p class="name">天津网友7grl</p><span
                            style="font-size:30px;line-height:16px;"> · </span>
                        <p class="time">2016-08-31</p>
                        <p class="wz">先富帮后富让全世界都富</p>
                        <div class="zhankai" style="display: none;">展开<b></b></div>
                        <div class="shouqi" style="display:none;">收起<b></b></div>
                        <div class="reply_container"></div>
                    </div>
                </div>
                <div class="list"><img class="pic" src="img/header.png" alt="头像">
                    <div class="main" id="comment-25710082"><p class="name">河北网友3cw7</p><span
                            style="font-size:30px;line-height:16px;"> · </span>
                        <p class="time">2016-08-31</p>
                        <p class="wz">看看是不是真的可以了</p>
                        <div class="zhankai" style="display: none;">展开<b></b></div>
                        <div class="shouqi" style="display:none;">收起<b></b></div>
                        <div class="reply_container"></div>
                    </div>
                </div>
                <div class="list"><img class="pic" src="img/header.png" alt="头像">
                    <div class="main" id="comment-25710004"><p class="name">河北网友ek4n</p><span
                            style="font-size:30px;line-height:16px;"> · </span>
                        <p class="time">2016-08-31</p>
                        <p class="wz">人民的主席，人民爱！人民的主席爱人民！</p>
                        <div class="zhankai" style="display: none;">展开<b></b></div>
                        <div class="shouqi" style="display:none;">收起<b></b></div>
                        <div class="reply_container"></div>
                    </div>
                </div>
                <div class="list"><img class="pic" src="img/header.png" alt="头像">
                    <div class="main" id="comment-25709926"><p class="name">天津网友6png</p><span
                            style="font-size:30px;line-height:16px;"> · </span>
                        <p class="time">2016-08-31</p>
                        <p class="wz">先富帮后富让全世界都富</p>
                        <div class="zhankai" style="display: none;">展开<b></b></div>
                        <div class="shouqi" style="display:none;">收起<b></b></div>
                        <div class="reply_container"></div>
                    </div>
                </div>
                <div class="list"><img class="pic" src="img/header.png" alt="头像">
                    <div class="main" id="comment-25709377"><p class="name">河北网友jsw0</p><span
                            style="font-size:30px;line-height:16px;"> · </span>
                        <p class="time">2016-08-31</p>
                        <p class="wz">！2谢谢国家！谢谢人民！谢谢！谢谢你们！！谢谢国家！谢谢人民！谢谢！谢谢你们！</p>
                        <div class="zhankai" style="display: none;">展开<b></b></div>
                        <div class="shouqi" style="display:none;">收起<b></b></div>
                        <div class="reply_container"></div>
                    </div>
                </div>
            </div>
            <div class="lone">
                <!-- // <div class="lone-left-1"></div> -->
                <img class="lone-left" src="img/morenull-left.png" alt="">
                <div class="lone-mid-1"></div>
                <div class="lone-mid-1 lone-mid-2"></div>
                <img class="lone-right" src="img/morenull-right.png" alt="">
                <p class="lone-wz">查看更多评论</p>

            </div>
            <div style=" background: url('img/line.png') repeat; height:1px;"></div>
        </div>
    </div>
</template>
<script>
    import   {CommetService}  from '../service/media'
    export default {
        props:['sid','guid','postimg'],
        ready () {
            var cs=new CommetService(zid,ps);
            cs.get(function(data){
                this.data =data;
            },1);
            let _w=document.getElementById(this.sid).offsetWidth;
            let _h=_w*0.75;
            createVideo(this.sid,this.guid,_w,_h,this.postimg);
        }
    }
</script>
