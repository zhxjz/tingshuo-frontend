<template>
<div class="container">
		<div class="dati">
			<h2 class="textcenter">--WELCOME TO A READING TEST--</h2>
			<div v-show="loading">
			<el-button icon="el-icon-loading" 
		            	circle></el-button>
			<h4>loading...waiting...</h4>
			</div>
			<div class="test" v-show="!loading">
				<div class="intest">
				<div v-html="tes.article">
				</div>

			<el-row :gutter="20">
				<span  v-if="submitted" class="testres">
					恭喜你，共有{{tot}}道题，你答对了{{rcnt}}道题<br>
					你的得分：{{rcnt/tot*100}} <br>
					正确率{{rcnt/tot}} <br>
					<!-- 超过了{{}}%的人 -->
				</span>
			 <el-col :offset="12">
			 	<el-button v-if="!submitted" type="primary" @click="getmark" round>提交</el-button>
			 	<el-button v-else type="danger" @click="seeans=true" round>查看答案</el-button>
			 </el-col>
			</el-row>

				</div><div class="test"  v-if="seeans" style="margin:2em;border-color:#F08080;background-color:#FFF5EE">
				<div class="intest inans">
				<h4 style="color:#FF4040">--THE ANSWERS--</h4>
		<span v-for="(aa,index) in tes.ans" class="textleft">
	 	 	<strong>({{index+1}}).</strong>
	 	 	{{aa}} - {{userans[index]}}
	 	 	<span v-if="res[index]">
				<i class="el-icon-check"style="color:green;font-size:20px;font-weight:900"></i>
			</span>
			<span v-else>
				<i class="el-icon-close" style="color:red;font-size:20px;font-weight:900"></i>
			</span>
	 	 </span>
			</div>
			</div>
			
		</div>
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
			}
		},
		
		created(){
			axios.get("https://listest-da6c5.firebaseio.com/reading/"+this.id+".json")
			.then(function(data){
				return data.data;
			})
			.then((data)=>{
				this.tes=data;
				this.loading=false;
			})
		},
		methods:{
			getmark:function(){
				//
				var uans = document.getElementsByTagName('input');
				 this.tot=uans.length;
				// console.log(uans);
				for(var i=0;i<uans.length;i++){
					this.userans[i]=uans[i].value;
					if(this.tes.ans[i]==uans[i].value)
						{
							this.res[i]=true;
							this.rcnt++;
						}
					else
						this.res[i]=false;
				}
				this.submitted=true;
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
		top:15px;
   		 /*text-align: left;*/
   		 border-radius: 20px;
    		 box-shadow: 2px 2px 2px rgba(0,0,0, 0.6);
    		 background-color: #CCCCFF;
	}
</style>