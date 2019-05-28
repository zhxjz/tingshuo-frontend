<template>
<!--     <div class="container"> -->
        <div class="header">
        <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
            <a class="pure-menu-heading" href="/">
                 公共英语听说</a>

      
            <li class="pure-menu-item pure-menu-selected">
                <router-link :to="{name:'coursejsLink'}" class="pure-menu-link">课程建设 </router-link>
            </li>
            <li class="pure-menu-item pure-menu-selected">
                <router-link :to="{name:'courseszLink'}" class="pure-menu-link">课程设置 </router-link>
            </li>
            <li class="pure-menu-item pure-menu-selected">
                 <router-link :to="{name:'pptlist'}" class="pure-menu-link">课程教案 </router-link>
             </li>

               <li class="pure-menu-item pure-menu-selected pure-menu-has-children pure-menu-allow-hover">
                <a href="#" class="pure-menu-link">在线题库</a>
                <ul class="pure-menu-children">
                <li class="pure-menu-item"><a href="/tests/list" class="pure-menu-link" style="color:#6699CC">listening</a></li>
                <li class="pure-menu-item"><a href="/read/list" class="pure-menu-link" style="color:#6699CC">reading</a></li>
            </ul>
            </li>

            <li class="pure-menu-item pure-menu-selected"><a href="/video" class="pure-menu-link">教学录像</a></li>
            <li class="pure-menu-item pure-menu-selected"><a href="#" class="pure-menu-link">校内外评估</a></li>
            <li class="pure-menu-item pure-menu-selected"><a href="#" class="pure-menu-link">科研成果</a></li>
          
             <ul class="pure-menu-list text-right">
              <li class="pure-menu-item text-right"><a href="#" class="pure-menu-link">Sign Up</a></li>
            </ul>
    </div>
<!--     </div> -->
    </div>
    
</template>


<script scoped>
$webfont.load(".header", "8046d7d9695546e7a652959e05482a9b", "Tianshi-Yanti");
/*$webfont.load("#id1,.class1,h1", "8046d7d9695546e7a652959e05482a9b", "Tianshi-Yanti");*/
$webfont.draw();
export default {
    
}
</script>

<style scoped>
    @import "../css/marketing.css";
    img{
    width: 30px;
    height: 30px;
}
</style>
