
<template>
  <div id="{{vsid}}" guid="{{vguid}}" postimg="{{vpostimg}}">
  </div>
</template>
<script>
  import   {createVideo}  from '../service/media'
  export default {
    props:['vsid','vguid','vpostimg'],
    ready () {
      let _w=document.getElementById(this.vsid).offsetWidth;
      let _h=_w*0.75;

      createVideo(this.vsid,this.vguid,_w,_h,this.vpostimg);
    }
  }
</script>
