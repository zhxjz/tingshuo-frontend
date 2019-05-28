<template>

    <!-- <div class="container"> -->
            <!-- <div class="footer l-box is-center">
        View the source of this layout to learn more. Made with love by the YUI Team.
        </div> -->
  <div class="pcontent-wrapper">
    <div class="pcontent">
         <div class="pfooter">
    <p>&copy;{{copyright}}</p>    
  </div>
</div>
</div>
    <!-- </div> -->
    
</template>


<script>
export default {
  name: 'app-footer',
  props:{
    title:{
      type:String
    }
  },
  data () {
    return {
      copyright:"copyright by 东华大学外语学院-公共英语听说课程 2019"
    }
  }
}
</script>

<style scoped>
    /*@import "../css/marketing.css";*/
    .pcontent-wrapper {
    /* These styles are required for the "scroll-over" effect */
    position: absolute;
    top: 87%;
    width: 100%;
    /*min-height: 12%;*/
    z-index: 2;
    background: white;

}
 .pfooter{
    /*background: #111;*/
    background-color: #666666;
    opacity: 0.8;
    position: fixed;
    bottom: 0;
    width: 100%;
 }
.pfooter p{
  /* color: lightgreen; */
  color:#CCCCCC;
  text-align: center;
}
</style>
