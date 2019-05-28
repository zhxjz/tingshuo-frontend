<template>
  <div id="app">
    <div class="container">
      <app-header></app-header>
    </div>
    <div class="container">
    	<router-view></router-view>
    </div>
    <div class="container">
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  components:{
    "app-header":Header,
    "app-footer":Footer
  }
}
</script>

<style>

</style>


<!--  <template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script> -->