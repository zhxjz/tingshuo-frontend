<template>
	<div class="container">
		<h1 class="textcenter">ALL LISTENING TESTS</h1>
		<div v-show="loading" class="textcenter">
			<el-button icon="el-icon-loading" 
		            	circle></el-button>
			<h4>loading...waiting...</h4>
		</div>
		<div class="list">
			<el-input v-model="search" placeholder="输入材料标题快速查询"></el-input>
			<div v-for="tes in filteredtests" v-bind:key="tes.id">
			<el-card class="box-card" shadow="hover">
			    <div class="textleft testtitle">
			    	<router-link v-bind:to="'/tests/atest/'+tes.id">
			    		{{tes.title}}
			   	 </router-link>
			    </div><br/>
			    <div class="textright subtitle">--created by{{tes.author}}</div>
			</el-card>
			</div>
		</div>
		
	</div>
</template>

<script>
import axios from 'axios'
export default{
	name:'test-list',
	data(){
		return{
			tests:[],
			search:"",
			loading:true
		}
	},
	created(){
		//axios.get("https://listest-da6c5.firebaseio.com/wow.json")
	//	axios.get("http://localhost:8080/dhu/paper_gttesall")
	axios.get("http://47.96.87.249:8080/dhuf/paper_gttesall")
		.then(function(data){
			return data.data;
		})
		.then((data)=>{
			var msg=data;
			var obj=JSON.parse(msg[0]);
			if(obj.status=="Error"){
				this.$message({
					message:"后台错误",
					type:"error"
				})
			}else if(obj.status=="Success"){
				this.$message({
					message:"获取数据成功",
					type:"success"
				})
				var testArray=[];
				var mydata=obj.mydata;
				this.tests=JSON.parse(mydata);
				console.log(this.tests)
			//	console.log(this.tests[0].id+"!!!!"+this.tests[1].id)
			}else{
				this.$message({
					message:"其他错误",
					type:"error"
				})
			}
			this.loading=false;
			// console.log(this.loading);
		})
	},
	computed:{
		filteredtests:function(){
			return this.tests.filter((tes)=>{
				return tes.title.match(this.search);
			})
		}
	}
}
</script>

<style scoped>
	.container{
		margin-top:100px;
	}
	.list{
		margin-top: 3em;
		margin-bottom: 10em;
		margin-right: 10em;
		margin-left: 10em;
	}
	.textright{
		text-align: right;
	}
	.textleft{
		text-align: left;
	}
	.textcenter{
		text-align: center;
	}
	.testtitle{
		font-size: 16px;
		font-weight: bold;
	}
	.subtitle{
		color: #999999;
		font-size: 10px;
	}
	a{
		text-decoration: none;
		color: #666666;
	}
</style>

