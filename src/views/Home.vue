<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HomeComponent msg="Welcome to Tesing Workshop of Vue.js App"/>
  </div>
</template>

<script>
import HomeComponent from '@/components/Home.vue'

export default {
  name: 'Home',
  components: {
    HomeComponent
  }
}
</script>
