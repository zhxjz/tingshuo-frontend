// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import axios from 'axios'

import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import Home from './components/Home';
import CourseJS from './components/CourseJS/CourseJS';
import CourseSZ from './components/CourseSZ/CourseSZ';
import Login from './components/Login';

//课程建设
import TeaInfo from './components/CourseJS/TeaInfoLink';
import KCJS from './components/CourseJS/KCJS';
import KCZG from './components/CourseJS/KCZG';
//课程设置
import zjkydg from './components/CourseSZ/zjkydg';
import kswd from './components/CourseSZ/kswd';
import tlbl from './components/CourseSZ/tlbl';
import qjst from './components/CourseSZ/qjst';
import ttss from './components/CourseSZ/ttss';
import jxfy from './components/CourseSZ/jxfy';
import yyst from './components/CourseSZ/yyst';
import ddss from './components/CourseSZ/ddss';
import zjkyjxrl from './components/CourseSZ/zjkyjxrl';
//课程教案
import pptlist from './webpages/pptpages/list';
//教学视频
import video from './webpages/video/video';

import Test from './components/Test';
import ll from './components/ll';

//教师菜单
import teaindex from './webpages/teaindex'
//试卷部分
import addtest from './webpages/testpages/addtest';
import atest from './webpages/testpages/atest';
import testlist from './webpages/testpages/testlist';
//阅读
import readlist from './webpages/readingpages/readlist';
import readadd from './webpages/readingpages/readadd';
import oneread from './webpages/readingpages/oneread';

Vue.use(VueRouter);
Vue.use(ElementUI);
const routes=[
 {path:'/',component:Home},
 {path:'/ll',component:ll},
 { path:'/login',component:Login},
  {path:'/test',component:Test},
  {path:'/coursejs',name:"coursejsLink",component:CourseJS},
    {path:'/teainfo',name:'teainfoLink',component:TeaInfo},
    {path:'/kcjsinfo',name:'kcjsLink',component:KCJS},
    {path:'/kczginfo',name:'kczgLink',component:KCZG},
  {path:'/coursesz',name:"courseszLink",component:CourseSZ},
      {path:'/zjkydg',name:"zjkydgLink",component:zjkydg},
      {path:'/kswd',component:kswd},
      {path:'/tlbl',component:tlbl},
      {path:'/qjst',component:qjst},
      {path:'/ttss',component:ttss},
      {path:'/jxfy',component:jxfy},
      {path:'/yyst',component:yyst},
      {path:'/ddss',component:ddss},
      {path:'/zjkyjxrl',component:zjkyjxrl},
      //课件
      {path:'/ppt/list',name:'pptlist',component:pptlist},
      //视频
      {path:'/video',name:'video',component:video},
      //听力
     {path:'/tests/list',name:'testlist',component:testlist},
     {path:'/tests/atest/:id',name:'atest',component:atest},
     {path:'/teaindex/add',name:'addtest',component:addtest},
     //阅读
     {path:'/read/list',name:'readlist',component:readlist},
     {path:'/read/oneread/:id',name:'oneread',component:oneread},
     {path:'/teaindex/readadd',name:'addread',component:readadd},


     {path:'/teaindex',name:'teaindex',component:teaindex},
     
   
   {path:'*',redirect:'/'}
]
const router = new VueRouter({
  routes,
  mode:'history'
})

Vue.prototype.$http = axios

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
