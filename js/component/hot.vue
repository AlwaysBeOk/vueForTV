
<template>
    <div id="{{sid}}" guid="{{guid}}" postimg="{{postimg}}">
    </div>
</template>
<script>
    import   {createVideo}  from '../service/media'
    export default {
        props:['sid','guid','postimg'],
        ready () {
            let _w=document.getElementById(this.sid).offsetWidth;
            let _h=_w*0.75;
            createVideo(this.sid,this.guid,_w,_h,this.postimg);
        }
    }
</script>
