<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      login_user_name:'sxj'
    }
  }
}
</script>
<style>
  @import "../static/css/app.css";
</style>
