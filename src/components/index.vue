<template>
	<div id="index">
		<!-- <h1>home</h1> -->
		<home-header></home-header>
		<home-content></home-content>
		<home-footer></home-footer>
	</div>
</template>

<script>
	import Header from '../components/Header'
	import Footer from '../components/Footer'
	import Content from '../components/Home'
	export default{
		components:{
			"home-header":Header,
			"home-footer":Footer,
			"home-content":Content
		}
	}	
</script>

<style scoped>
	.wrapper{
		height: 100%;
		overflow: auto;
	}
</style>

