
export function createVideo(id,guid,_w,_h,postimg){
  var fo = createCommonPlayer(id,_w,_h,"news",true,postimg);
  fo.addVariable("id", "20091109129210");
  fo.addVariable("articleId","ARTI1449105837682739");
  fo.addVariable("videoCenterId",guid); //guid
  fo.addVariable("scheduleId", "C2253600000311");
  fo.addVariable("filePath", "/flvxml/2009/05/04/");
  fo.addVariable("sorts", ",,,,,");
  fo.addVariable("sysSource", "sports");
  fo.addVariable("autoRePlay", "false");//"true");
  fo.addVariable("userId", "001");
  fo.addVariable("hour24DataURL", "");
  fo.addVariable("isCycle", "false");
  fo.addVariable("wideMode", "normal");
  fo.addVariable("defaultRate", "low");
  fo.addVariable("isAutoPlay", "true");
  writePlayer(fo,id,"","");
}
