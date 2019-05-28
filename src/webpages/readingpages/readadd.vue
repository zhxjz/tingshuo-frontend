<template>
	<div class="container">
		<div v-if="!submitted">
			<el-steps :active="nowstep" align-center class="textcenter" >
		  <el-step title="步骤1：上传题目" description="######标记答案位置，可用快速标记生成标记并用预览检查。"></el-step>
		  <el-step title="步骤 2：上传答案" description="输入答案一行一个。"></el-step>
		</el-steps>
		<el-button style="margin-top: 12px;" class="textcenter"  type="primary" plain @click="laststep">上一步</el-button>
		<el-button style="margin-top: 12px;" class="textcenter"  @click="nextstep">下一步</el-button>
		

		<!-- 文本处理 -->
			<el-row :gutter="40"  v-show="nowstep == 0" class="deltext" >
			<div class="subtitle">
				<strong>步骤1：上传题目</strong><br>
				<div class="smaller">
					1).输入原文(第一次必须输入原文)<br>
					2).点击快速标记<br>
					3).检查######是否标记在空格位置<br>
					4).点击预览查看形成的文本框。<br>
				</div>
				<el-divider></el-divider>
			</div>

			  <el-col :span="12">
			  	<el-input
				  type="textarea"
				  :autosize="{ minRows: 5}"
				  placeholder="请输入题目文本"
				  v-model="textarea">
				</el-input>
				<el-button type="primary" v-on:click="quicktag">快速标记</el-button>
				 <el-button v-on:click="getread">点击预览</el-button>
			  </el-col>
			  <el-col :span="12">
			  <el-card class="box-card">
			  	<div v-html="reading.article" class="textleft"></div>
			  </el-card>
			  </el-col>
			</el-row>

		<!-- 答案处理 -->
			<el-row :gutter="40"  v-show="nowstep == 1" class="deltext" >
			<div class="subtitle">
				<strong>步骤 2：上传答案</strong><br>
				<div class="smaller">
					输入答案一行一个。
				</div>
				<el-divider></el-divider>
			</div>

			  <el-col :span="12">
			  	<el-input
				  type="textarea"
				  :autosize="{ minRows: 5}"
				  placeholder="请输入答案文本"
				  v-model="textarea2">
				</el-input>
				<el-button type="primary" v-on:click="findans">点击预览</el-button>
			  </el-col>
			  <el-col :span="12">
			  <el-card class="box-card">
			  	<div v-for="(aa,index) in reading.ans" class="textleft">
			  	{{index+1}}.{{aa}}<br/>
			  	</div>
			  </el-card>
			  </el-col>
			</el-row>

	<!-- 上传数据确认 -->
	<el-row :gutter="40"  v-show="nowstep == 2" class="deltext" >
	<el-col :span="12">
		<el-card class="box-card">
	  		<div v-html="reading.article" class="textleft"></div>
	 	 </el-card>
	 	 <div class="textleft">
	 	  <h4>ans:</h4>
	 	 <span v-for="(aa,index) in reading.ans" class="textleft">
	 	 	{{index+1}}.{{aa}}
	 	 </span>	
	 	 </div>
	 	
	</el-col>
	<el-col :span="12">
	<div class="subtitle" style="font-size:16px;font-weight:300">
		<el-row :gutter="20">
			<el-col :span="8">
			试卷标题：</el-col>
			<el-col :span="12">
			<el-input v-model="reading.title"/>
		</el-col>
		</el-row>
		<el-row :gutter="20" class="deltext">
			<el-col :span="8">
			作者：</el-col>
			<el-col :span="12">
			<el-input v-model="reading.author" />
			</el-col>
		</el-row>
		<div  class="deltext">
		确认上传请点击下一步。</div>
	</div></el-col>
	</el-row>

	</div>

		<div v-if="submitted" class="successtip">
		<h2>您的数据已上传 successful!</h2>
		      <img src="../../assets/success.jpg" class="roundimg">
		      <div style="padding: 14px;">
		        <div class="bottom clearfix">
		          <time class="time">{{ nowDate }}</time>
		        </div>
		      </div>
	</div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				reading:{
					article:'',
					ans:[],
					title:'',
					author:''
				},
				raw:'',
				currentDate: new Date(),
				textarea:'',
				textarea2:'',
				nowstep:0,
				submitted:false
			}
		},
		methods:{
			quicktag:function(){
				var reg=/_+[0-9]*_+/g;
				var cnt=1;
				// alert('here')
				this.raw=this.textarea.replace(reg,"");
				this.textarea=this.textarea.replace(reg,"######");
			},
			getread:function(){
				var tmp = this.textarea;
				var input = `
					<input type="text" style="width:80px;border-bottem:1px solid #dbdbdb;border-top:0px;border-left:0px;border-right:0px;outline:none;"></input>
					`;
				var pos = tmp.indexOf("######");
				var id = 1;
				while(pos!=-1){
					tmp = tmp.replace("######","("+id+")."+input);
					var pos = tmp.indexOf("######");
					id++;
				}
				this.reading.article = tmp.replace("\n","<br>");
			},
			findans:function(){
				this.reading.ans=[];
				var tmp = this.textarea2;
				var pos = tmp.indexOf("\n");
				while(pos!=-1){
					var ad = tmp.slice(0,pos);
					tmp = tmp.slice(pos+1);
					pos = tmp.indexOf("\n");
					if(ad!="")this.reading.ans.push(ad);
				}
				if(tmp!="")this.reading.ans.push(tmp);
				// var s1 = this.textarea2.replace(/\s*/g,"");
				// var s2 = this.raw.replace(/\s*/g,"");
				// console.log(s1);
				// console.log(s2);
				// var i=0,j=0;
				// for(; i< s1.length && j<s2.length ;i++,j++){
				// 	var str='';
				// 	while(s1.charAt(i)!=s2.charAt(j)&&i<s1.length){
				// 		str+=s1.charAt(i);
				// 		i++;
				// 	}
				// 	if(str.length!=0){
				// 		this.reading.ans.push(str);
				// 	}
				// }
			},
			makeans:function(){
				var tmp = this.reading.article;
				var pos = tmp.indexOf(").");
				var newstr='';
				var id=0;
				while(pos!=-1){
					newstr+=tmp.slice(0,pos)+")."+this.reading.ans[id].charAt(0);
					tmp = tmp.slice(pos+2);
					pos = tmp.indexOf(").");
					id++;
				}
				if(tmp!="")newstr+=tmp;
				this.reading.article=newstr;
			},
			post:function(){
				axios.post("https://listest-da6c5.firebaseio.com/reading.json",this.reading)
				.then((data)=>{
					this.submitted=true;
				});
			},
			// 下一步
			nextstep(){
				if(this.nowstep==0)
					this.nowstep+=1;
				else if(this.nowstep==1){
					this.nowstep+=1;
				//	this.makeans();
				}
				else
					this.post();
			},
			//上一步
			laststep(){
				if(this.nowstep>0)
				this.nowstep-=1;
			}
			
		},
		computed:{
			nowDate(){
				this.currentDate=new Date();
				return this.currentDate;
			}
		}
	}
</script>
<style scoped>
	.container{
		margin-top: 90px;
		padding: 1em 6em 4em 6em;
	}
	.textcenter{
		text-align: center;
	}
	.box-card .qq{
		text-align: left;
		max-width: 100%
	}
	.ok{
		width: 100%;
		margin: 1rem;
	}
	.deltext{
		padding-top: 2em
	}
	.el-button{
		margin-top: 1em;
	}
	.subtitle{
		text-align: center;
		font-size: 20px;
	}
	.smaller{
		margin-top: 0.5em;
		font-size: 16px;
	}
	.roundimg{
		border-radius: 50%;
		max-width: 200px;
		border: 10px solid #FFCC99;
	}
	.textleft{
		text-align: left;
	}
</style>