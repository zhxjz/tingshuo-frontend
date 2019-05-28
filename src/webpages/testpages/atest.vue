<template>
	<div class="container">
		<div class="dati">
		<h2 class="textcenter">--WELCOME TO A TEST--</h2>
		<div v-show="loading">
			<el-button icon="el-icon-loading" 
		            	circle></el-button>
			<h4>loading...waiting...</h4>
		</div>
		<div class="test" v-show="!loading">
			<div class="intest">
			<div v-for="(qq,ind) in tes.ques" v-bind:key="ind">
				<div v-html="qq.des"></div>
				<span class="tihao">

					<br>
					(&nbsp;&nbsp;)&nbsp;&nbsp;{{ind+1}}.
					<br><br>
					<span v-if="submitted">
						答案：{{tes.ans[ind]}}
						<span v-if="res[ind]">
							<i class="el-icon-check" style="color:green;font-size:20px;font-weight:900"></i>
						</span>
						<span v-else>
							<i class="el-icon-close" style="color:red;font-size:20px;font-weight:900"></i>
						</span>
					</span>
				</span>

				<el-radio-group v-model="userans[ind]" class="cho">
				    <el-radio label="A">
					{{qq.cho[0]}}
				</el-radio><br>
				    <el-radio label="B">
				    	{{qq.cho[1]}}
				    </el-radio><br><br>
				    <el-radio label="C">
				    	{{qq.cho[2]}}
				    </el-radio><br><br>
				    <el-radio label="D">
				    	{{qq.cho[3]}}
				    </el-radio><br>
				</el-radio-group>
				<el-divider></el-divider>
			</div>
			<el-row :gutter="20">
				<span  v-if="submitted" class="testres">
					恭喜你，共有{{tot}}道题，你答对了{{rcnt}}道题<br>
					你的得分：{{rcnt/tot*100}} <br>
					正确率{{rcnt/tot}} <br>
					超过了{{}}%的人
				</span>
			 <el-col :offset="12">
			 	<el-button v-if="!submitted" type="primary" @click="getmark" round>提交</el-button>
			 	<el-button v-else type="danger" @click="seeans=true" round>查看详细答案</el-button>
			 </el-col>
			</el-row>
		</div>
		</div>
		</div>

		<div class="daan" v-if="seeans">
			<h2 style="color:#FF4040">--Let's see HOW TO GET THE ANSWERS--</h2>
			<div class="test" style="border-color:#F08080;background-color:#FFF5EE">
				<div class="intest inans">
				<div v-html="tes.org"></div>
			</div>
			</div>
		</div>

<!-- 播放器 -->
 <div class="player">
    <el-row>
    <!-- 音量控制 -->
      <el-col :span="4">
        <!-- 弹窗 -->
        <el-popover placement="top-start" title="音量控制" trigger="hover">
	          <div style="text-align: center">
	          		<!-- 音量进度条 -->
		            <el-progress type="circle" 
			 	:percentage="music.volume"></el-progress>
		            <br>
		            <!-- 音量增加减少按钮 -->
		            <el-button icon="el-icon-remove-outline" 
		           	 @click="changeVolume(-10)"
		            	circle></el-button>
		            <el-button icon="el-icon-circle-plus-outline"
		            	@click="changeVolume(10)"
		           	 circle></el-button>
	          </div>
	          <!-- 触发音量按钮 -->
	          <el-button  id="play" slot="reference"
	          :icon="music.isPlay?'el-icon-close':'el-icon-caret-right'" 
	          @click="play"
	          circle></el-button>
        </el-popover>
      </el-col>
      <!-- 播放滑块 -->
      <el-col :span="14"  style="padding-left: 0px">
        <el-slider
        	@change="changeTime"
        	:format-tooltip="formatTime"
        	:max="music.maxTime"
        	v-model="music.currentTime" 
        style="width: 100%;"></el-slider>
      </el-col>
      <el-col :span="3" style="padding: 9px 0px 0px 10px;color:#909399;font-size: 13px">
        {{formatTime(music.currentTime)}}/{{formatTime(music.maxTime)}}
      </el-col>
    </el-row>
    <audio ref="music" name="musiclabel" id="musicid" @canplay="getDuration" > 
      <source v-bind:src="musicroute" type="audio/mpeg">
    </audio>


  </div>
	</div>
</template>

<script>
import axios from 'axios'
	export default{

		name:"atest",
		data(){
			return{
				id:this.$route.params.id,
				tes:{},
				userans:[],
				loading:true,
				res:[],
				submitted:false,
				seeans:false,
				rcnt:0,
				tot:0,

				//播放器
				changetag:false,
				 musicroute:'',
				        music:{
				          isPlay:false,
				          currentTime:0,
				          maxTime:0,
				          volume:100
				        }
			}
		},
		
		created(){
		//	axios.get("https://listest-da6c5.firebaseio.com/wow/"+this.id+".json")
	//	axios.get("http://localhost:8080/dhu/paper_gtinfo?tes.paper_id="+this.id)
	// this.musicroute="../../assets/gngw.mp3";
	// this.$refs.music.load();

	axios.get("http://47.96.87.249:8080/dhuf/paper_gtinfo?tes.paper_id="+this.id)
			.then(function(data){
				return data.data;
			})
			.then((data)=>{
				var msg=data;
				console.log(JSON.parse(msg[0]).mydata)
			/*for(var x in msg){
					var obj=JSON.parse(data[x]);
					console.log("hahaha:"+obj.mydata);
					var objj=JSON.parse(obj.mydata);
					console.log("hihihi:"+objj.ques[0].ans);
				}
				var obj=JSON.parse(data[1]);
				console.log(obj);
				this.tes=obj;
				console.log("obj.title="+obj.title);
				console.log("this.tes.title="+this.tes.title);
				console.log("this is my response data:"+this.tes);*/
				var status=JSON.parse(msg[0]).status;
				if(status=="NotExist"){
					this.$message({
						message:"试卷不存在",
						type:"warning"
					})
				}else if(status=="Error"){
					this.$message({
						message:"后台错误",
						type:"error"
					})
				}else if(status=="Success"){
					this.$message({
						message:"加载成功",
						type:"success"
					});
					var mydata=JSON.parse(msg[0]).mydata;
					var obj=JSON.parse(mydata);
					this.tes=obj;
					//console.log("hahahahhahhahahaha:"+this.tes.title);
				}else{
					this.$message({
						messasge:"其他错误",
						type:"error"
					})
				}
				
				this.loading=false;
				// alert(this.tes.lis)
				if(this.tes.lis!=""&&this.tes.lis!=null){
					// alert('here');
					this.musicroute="http://47.96.87.249:8080/dhuf/docu_download?docu_name="+this.tes.lis;
					 // this.musicroute="http://localhost:8080/dhu/docu_download?docu_name="+this.tes.lis;
				//	 this.musicroute="http://localhost:8080/dhu/docu_download?docu_name=gbqq.mp3";
					// this.musicroute="http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3";
				}this.$refs.music.load();
				// alert( this.$refs.music.duration);
				// alert(this.musicroute);
			})
		},
		mounted(){
		      this.$nextTick(()=>{
		      	this.changetag = !this.changetag
		        setInterval(this.listenMusic,1000)
		      })
		},
		watch:{
			changetag(){
				this.musiclabel.load()
				//alert(this.$refs.music.duration)
			}
		},
		methods:{
			getmark:function(){
				this.tot=this.tes.ans.length;
				for(var i=0,len=this.tes.ans.length;i<len;i++){
					if( this.tes.ans[i]==this.userans[i] ){
						this.res[i]=true;
						this.rcnt++;
					}
					else
						this.res[i]=false;
				}
				//alert(this.$refs.music.duration);
				// console.log(this.res);
				this.submitted=true;
			},
getDuration(){
	//alert('her ')
	//alert(this.$refs.music.duration)
},
// 播放器part
listenMusic(){
        if(!this.$refs.music){
          return
        }
        if(this.$refs.music.readyState){
          this.music.maxTime = this.$refs.music.duration
        }
        this.music.isPlay=!this.$refs.music.paused
        this.music.currentTime = this.$refs.music.currentTime
      },
      play(){
        if(this.$refs.music.paused){
          this.$refs.music.play()
        }else{
          this.$refs.music.pause()
        }
        this.music.isPlay=!this.$refs.music.paused
        this.$nextTick(()=>{
          document.getElementById('play').blur()
        })
      },
      changeTime(time){
        this.$refs.music.currentTime = time
      },
      // 音量改变
      changeVolume(v){
        this.music.volume += v 
        if(this.music.volume>100){
          this.music.volume = 100
        }
        if(this.music.volume<0){
          this.music.volume = 0
        }
        this.$refs.music.volume = this.music.volume/100
      },
      formatTime(time){
        let it = parseInt(time)
        let m = parseInt(it/60)
        let s = parseInt(it%60)
        return (m<10?"0":"")+parseInt(it/60)+":"+(s<10?"0":"")+parseInt(it%60)
      }
    }  
}
</script>

<style scoped>
	.container{
		margin-top: 100px;
	}
	.textcenter{
		text-align: center;
	}
	.test{
		margin-top: 3em;
		margin-bottom: 10em;
		margin-right: 10em;
		margin-left: 10em;
		text-align: left;
		border-radius: 10px;
		border-width: 3px;
		border-style: solid;
		border-color: #CCCCFF;
		/*background-color:#F0F8FF;*/

	}
	.testres{
		font-size: 16px;
		font-weight: 900;
		color: #F56C6C;
	}
	.cho{
		margin-top: 2em;
	}
	.tihao{
		font-size: 15px;
		margin-bottom: 1em;

	}
	.intest{
		margin: 3em;
	}
	.player{
		width: 500px;
		position: fixed;
		top:80px;
   		 /*text-align: left;*/
   		 border-radius: 20px;
    		 box-shadow: 2px 2px 2px rgba(0,0,0, 0.6);
    		 background-color: #CCCCFF;
	}
</style>