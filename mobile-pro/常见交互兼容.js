// <!--针对微信input失去焦点页面不回弹-->
 var u = navigator.userAgent;
 var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //这个判断 是不是ios手机
 var flag;
 var myFunction;
 var wx= (function(){
   return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
 });
 if( wx && isiOS){ //既是微信浏览器 又是ios============（因为查到只有在微信环境下，ios手机上才会出现input失去焦点的时候页面被顶起）
   document.body.addEventListener('focusin', () => {  //软键盘弹起事件
     flag=true;
     clearTimeout(myFunction);
   });
   document.body.addEventListener('focusout', () => { //软键盘关闭事件
     flag=false;
     if(!flag){
       myFunction = setTimeout(function(){
         window.scrollTo({top:0,left:0,behavior:"smooth"})//重点  =======当键盘收起的时候让页面回到原始位置
       },200);
     }else{

     }
   })
 }