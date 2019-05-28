<template>
	<div class="container">
		<div class="container">
			<el-form ref="studentLogin" :model="form" label-width="80px">
	  		<el-form-item label="学号">
	  		<el-col :span=8>
	   		<el-input v-model="studentLogin.username"></el-input>
	   	</el-col>
	 		</el-form-item>
	 		<el-form-item label="密码">
	 		<el-col :span=8>
	   		<el-input v-model="studentLogin.password"></el-input>
	   		</el-col>
	 		</el-form-item>
	 		<el-form-item>
	  		<el-button type="primary" @click="onSubmit">立即登录</el-button>
	  		</el-form-item>
		</el-form>
		</div>
		
	</div>

</template>

<script>
  export default {
    data() {
      return {
        studentLogin: {
          	username: '',
        	password:'',
        	resource:''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style scoped>
	.container{
		padding: 100px;
	}
</style>