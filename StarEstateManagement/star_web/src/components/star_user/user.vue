<template>
  <div id="box">
    <video autoplay loop muted>
      <source src="../../../static/images/login_bg.mp4"/>
    </video>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "user"
    }
</script>

<style>
  @import "../../../static/css/user.css";
</style>
