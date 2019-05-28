<template>
    <div class="container">
<home-header></home-header>
    <div class="l-content">
    <div class="pricing-tables pure-g">
        <div class="pure-u-1 pure-u-md-1-3"></div>
         <div class="pure-u-1 pure-u-md-1-3"><h3>课程建设</h3></div>
          <div class="pure-u-1 pure-u-md-1-3"></div>
        <div class="pure-u-1 pure-u-md-1-3">
            <div class="pricing-table pricing-table-free bgtm">
                <div class="pricing-table-header">
                    <h2>teacher infomation </h2>
                    <img class="image" src="../../assets/teainfo.png"></img>
                </div>

                <ul class="pricing-table-list">
                    <li>教师信息</li>
                </ul>

                <button class="button-choose pure-button" @click="goToTeacherInfo">Choose</button>
            </div>
        </div>

        <div class="pure-u-1 pure-u-md-1-3">
            <div class="pricing-table pricing-table-biz pricing-table-selected bgtm">
                <div class="pricing-table-header">
                    <h2>Course Construction</h2>
                    <img class="image" src="../../assets/kcjs.png"></img>
                </div>

                <ul class="pricing-table-list">
                    <li>课程建设</li>
                </ul>

                <button class="button-choose pure-button" @click="goToCourseCons">Choose</button>
            </div>
        </div>

        <div class="pure-u-1 pure-u-md-1-3">
            <div class="pricing-table pricing-table-enterprise bgtm">
                <div class="pricing-table-header">
                    <h2>Course outline</h2>
                     <img class="image" src="../../assets/kcdg.png"></img>
                </div>

                <ul class="pricing-table-list">
                    <li>课程总纲 </li>
                </ul>

                <button class="button-choose pure-button" @click="goToCourseOutl">Choose</button>
            </div>
        </div>
    </div>
        <div class="pure-u-1 pure-u-md-1-3"></div>
          <div class="pure-u-1 pure-u-md-1-3"></div>
</div> <!-- end pricing-tables -->
<home-footer></home-footer>
    </div>
</template>

<script scoped>
    import Header from '../../components/Header'
    import Footer from '../../components/Footer'
    export default {
    components:{
            "home-header":Header,
            "home-footer":Footer
        },
    methods:{
        goToTeacherInfo(){
            this.$router.push({name:'teainfoLink'});
            },
        goToCourseCons(){
            this.$router.push({name:'kcjsLink'});
        },
        goToCourseOutl(){
            this.$router.push({name:'kczgLink'});
        }
        }
    }
</script>
<style scoped>
     @import "../../css/pricing.css";
    .list-group-item{
        background-color:#FFE4C4;
    }
    .container{
        /* background-color:#FFF5EE; */
        /*background-image: url('../../assets/kcjsbg.jpg');*/
        background-image: url('../../assets/kcjsbg.jpg');
        background-size: cover;
        background-color:   #F0FFF0;
        padding-top:110px;
    }
    .bgtm{
        background-color: rgba(255,255,255,0.3);
    }
    img{
        width: 100px;
        height: 100px;
    }
</style>