<template>
	<div class="container">
	<div v-if="!submitted">
	<!-- 步骤条 -->
		<el-steps :active="nowstep" align-center>
		  <el-step title="步骤1：处理文档" description="###标记问题结束（应当在每道题D选项后），***标记问题描述结束（应当在每道题A选项前），可用快速标记生成标记并用预览检查。"></el-step>
		  <el-step title="步骤 2：上传答案" description="#标记在每个答案前，可用快速标记生成标记并用预览检查。"></el-step>
		  <el-step title="步骤 3：上传原文" description="点击预览查看原文排版"></el-step>
		  <el-step title="步骤 4：上传音频" description="###标记问题结束（应当在每道题D选项后），***标记问题描述结束（应当在每道题A选项前），可用快速标记生成标记并用预览检查。"></el-step>
		</el-steps>
		<el-button style="margin-top: 12px;"  type="primary" plain @click="laststep">上一步</el-button>
		<el-button style="margin-top: 12px;" @click="nextstep">下一步</el-button>

	<!-- 文本处理 -->
	<el-row :gutter="40"  v-show="nowstep == 0" class="deltext" >
	<div class="subtitle">
		<strong>步骤1：处理文档</strong><br>
		<div class="smaller">
			点击快速标记后只需检查###标记是否在上一道题的D选项后。
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
		 <el-button v-on:click="getques">点击预览</el-button>
	  </el-col>
	  <el-col :span="12">
	  <el-card class="box-card">
	  	<div class="qq" v-for="(qq,index) in tes.ques" v-bind:key="index">
	  		
	  		<div v-html="qq.des"></div>
	  		<strong>Q{{index+1}}</strong><br>
	  		&nbsp;&nbsp;{{qq.cho[0]}}<br>
	  		&nbsp;&nbsp;{{qq.cho[1]}}<br>
	  		&nbsp;&nbsp;{{qq.cho[2]}}<br>
	  		&nbsp;&nbsp;{{qq.cho[3]}}<br><br>
	  	</div>
	  </el-card>
	  </el-col>
	</el-row>

	<!-- 答案处理 -->
	<el-row :gutter="40"  v-show="nowstep == 1" class="deltext" >
	<div class="subtitle">
		<strong>步骤 2：上传答案</strong><br>
		<div class="smaller">
			点击快速标记后需检查#后是否跟有答案。（不可含有空格或其他字符）
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
		<el-button type="primary" v-on:click="quicktag2">快速标记</el-button>
		 <el-button v-on:click="getans">点击预览</el-button>
	  </el-col>
	  <el-col :span="12">
	  <el-card class="box-card">
	  	<div class="qq" v-for="(aa,index) in tes.ans" v-bind:key="index">
	  		<strong>Q{{index+1}}</strong>
	  		&nbsp;{{aa}}<br>
	  	</div>
	  </el-card>
	  </el-col>
	</el-row>

	<!-- 听力原文 -->
	<el-row :gutter="40"  v-show="nowstep == 2" class="deltext" >
	<div class="subtitle">
		<strong>步骤 3：上传原文</strong><br>
		<div class="smaller">
			可用html语法加强文本显示<br>
			空格使用&amp;nbsp;<br> 
			换行调整可以直接使用<br>
			例如: 使用strong标签加粗<br>&lt;strong&gt; title&lt;/strong&gt;=><strong>title</strong><br/>
		</div>
		<el-divider></el-divider>
	</div>
	  <el-col :span="12">
	  	<el-input
		  type="textarea"
		  :autosize="{ minRows: 5}"
		  placeholder="请输入听力原文"
		  v-model="textarea3">
		</el-input>
		 <el-button v-on:click="getorg">点击预览</el-button>
	  </el-col>
	  <el-col :span="12">
	  <el-card class="box-card">
	  <div class="qq">
	  	<div class="ok" v-html="tes.org"></div>
	  </div>
	
	  </el-card>
	  </el-col>
	</el-row>

	<!-- 上传mp3 -->
	<el-row :gutter="40"  v-show="nowstep == 3" class="deltext" >
	<div class="subtitle">
		<strong>步骤 4：上传mp3</strong><br>
		<div class="smaller">
		</div>
		<el-divider></el-divider>
		<!-- 上传part -->
		<el-upload
			  class="upload-file"
			  drag
			  action="http://47.96.87.249:8080/dhuf/docu_upload"
			  :on-success="uploadSuccess"
			 >
			  <i class="el-icon-upload"></i>
			  <div class="el-upload__text">
			  	将文件拖到此处，或<em>点击上传</em>
			  </div>
		</el-upload>
	</div>
	</el-row>

	<!-- 上传数据确认 -->
	<el-row :gutter="40"  v-show="nowstep == 4" class="deltext" >
	<div class="subtitle" style="font-size:16px;font-weight:300">
		<el-row :gutter="20">
			<el-col :span="8">
			试卷标题：</el-col>
			<el-col :span="12">
			<el-input v-model="tes.title"/>
		</el-col>
		</el-row>
		<el-row :gutter="20" class="deltext">
			<el-col :span="8">
			作者：</el-col>
			<el-col :span="12">
			<el-input v-model="tes.author" />
			</el-col>
		</el-row>
		<div  class="deltext">
		确认上传请点击下一步。</div>
	</div>
	</el-row>
	</div>

	<div v-if="submitted" class="successtip">
		<h2>您的数据已上传 successful!</h2>
		      <img src="../../assets/success.jpg" class="roundimg">
		      <div style="padding: 14px;">
		        <div class="bottom clearfix">
		          <time class="time">{{ currentDate }}</time>
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
				tes:{
					title:'',
					author:'',
					ques:[
						{
						des:'',
						cho:'',
						}
					],
					ques:[],
					ans:[],
					org:'',
					lis:''
				},
				currentDate: new Date(),
				textarea:'',
				textarea2:'',
				textarea3:'',
				nowstep:0,
				submitted:false
			}
		},
		methods:{
			quicktag:function(){
				// var str4='i have 98. you have 66';
				// var str3 = str4.replace(/[0-9]+\./g,"a");
				// console.log(str3);
				var reg=/[0-9]+\. /g;
				this.textarea=this.textarea.replace(/[0-9]+\. /,"***");
				this.textarea=this.textarea.replace(reg,"###***" );
				this.textarea=this.textarea+"###"
				//console.log(this.textarea);
			},
			getques:function(){
				this.tes.ques=[];
				var tmp=this.textarea;
				var qpos=tmp.indexOf("###");
				var nowq;
				while(qpos!=-1&&tmp!=''){
					if(qpos==-1) nowq=tmp;
					else nowq=tmp.slice(0,qpos);
					tmp=tmp.slice(qpos+3);
					qpos=tmp.indexOf("###");
					if(nowq=='')continue;
					//console.log(tmp);
					
					var despos=nowq.indexOf("***");
					var qdes=nowq.slice(0,despos);//题目描述
					qdes=qdes.replace(/\n/g,"<br>");
					//console.log(qdes);

					var leftcho=nowq.slice(despos+3);
					var choi= new Array();
					var cpos= leftcho.indexOf("\n");
					var j=0;
					while(cpos!=-1&&leftcho!=''){
						choi[j]=leftcho.slice(0,cpos);
						leftcho=leftcho.slice(cpos+1);
						cpos=leftcho.indexOf("\n");
						if(choi[j]=='')continue;
						j++;
					}
					if(leftcho.length>0){
						choi[j]=leftcho;
					}
					/*this.tes.ques.push({
						des:qdes,
						cho:choi
					})*/
				//	this.tes.ques.des.push(qdes);
				//	this.tes.ques.cho.push(choi);

					this.tes.ques.push({
						des:qdes,
						cho:choi,
					})
				}
				//console.log(this.tes);
			},
			quicktag2:function(){
				var reg=/[0-9]+\. /g;
				this.textarea2=this.textarea2.replace(reg,"#");
			},
			getans:function(){
				this.tes.ans=[];
				var tmp = this.textarea2;
				var pos=tmp.indexOf("#");
				while(pos!=-1){
					this.tes.ans.push(tmp.charAt(pos+1));
					tmp=tmp.slice(pos+1);
					pos=tmp.indexOf("#");
				}
			},
			getorg:function(){
				this.tes.org=this.textarea3.replace(/\n/g,"<br>");
				// this.tes.org=this.tes.org.replace(/\s/g,"&nbsp;");不能够换。
				console.log(this.tes.org);
			},
			//上传的钩子函数返回url
			uploadSuccess(response,file,fileList){
				alert("mp3 upload success")
				// console.log("filename:"+file.name)



var msg = response;
      var obj = JSON.parse(msg[0]);
      console.log(obj.status);
      if (obj.status == "success") {
        this.$message({
          message: "宁上传成功",
          type: "success"
        });
      } else if (obj.status == "exist") {
        this.$message({
          message: "已经有这个文件了",
          type: "warning"
        });
      } else if (obj.status == "nofile") {
        this.$message({
          message: "后台没有接收到宁的消息哦",
          type: "warning"
        });
      } else {
        this.$message.error("未知的错误，请通知我");
      }






				this.tes.lis=file.name;
				// console.log(this.tes);
			},
			post:function(){
				//axios.post("https://listest-da6c5.firebaseio.com/wow.json",this.tes)
				console.log(this.tes);
				var params=new URLSearchParams();
				//params.append("tes",this.tes);
				//params.append("test","ttt");
				params.append("tes.title",this.tes.title);
				params.append("tes.author",this.tes.author);
				params.append("tes.ques_str",JSON.stringify(this.tes.ques));
				params.append("tes.ans_str",JSON.stringify(this.tes.ans));
				params.append("tes.org",this.tes.org);
				params.append("tes.lis",this.tes.lis);
				axios.post("http://47.96.87.249:8080/dhuf/paper_upload",params)
				.then((data)=>{
					this.submitted=true;
					var msg=data.data;
					var status=JSON.parse(msg[0]).status;
					if(status=="Exist"){
						this.$message({
							message:"该试卷名已存在",
							type:"warning"
						})
					}else if(status=="Error"){
						this.$message({
							message:"后台错误",
							type:"error"
						})
					}else if(status=="Success"){
						this.$message({
							message:"上传成功",
							type:"success"
						})
					}else {
						this.$message({
							message:"其他错误",
							type:"error"
						})
					}
				});
			},
			// 下一步
			nextstep(){
				if(this.nowstep<4)
					this.nowstep+=1;
				else
					this.post();
			},
			//上一步
			laststep(){
				if(this.nowstep>0)
				this.nowstep-=1;
			}
		}
	}
</script>
<style scoped>
	.container{
		margin-top: 90px;
		padding: 1em 6em 4em 6em;
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
</style>