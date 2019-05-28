<template>
	<div class="container">
		<h1 class="textcenter">ALL READING TESTS</h1>
		<div v-show="loading" class="textcenter">
			<el-button icon="el-icon-loading" 
		            	circle></el-button>
			<h4 class="textcenter">loading...waiting...</h4>
		</div>
		<div class="list">
			<el-input v-model="search" placeholder="输入材料标题快速查询"></el-input>
			<div v-for="read in filteredreadings">
			<el-card class="box-card" shadow="hover">
			    <div class="textleft testtitle">
			    	<router-link v-bind:to="'/read/oneread/'+read.id">
			    		{{read.title}}
			   	 </router-link>
			    </div><br/>
			    <div class="textright subtitle">--created by{{read.author}}</div>
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
			readings:[],
			search:"",
			loading:true
		}
	},
	created(){
		axios.get("https://listest-da6c5.firebaseio.com/reading.json")
		.then(function(data){
			return data.data;
		})
		.then((data)=>{
			var testArray=[];
			for(let key in data){
				data[key].id = key;
				testArray.push(data[key]);
			}
			this.readings=testArray;
			this.loading=false;
		})
	},
	computed:{
		filteredreadings:function(){
			return this.readings.filter((tes)=>{
				return tes.title.match(this.search);
			})
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

