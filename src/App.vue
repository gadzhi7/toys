<template>
<div id="app">
  <!-- <Header></Header> -->
  <!-- <Navbar></Navbar> -->
  <router-view />
  <Footer></Footer>
</div>
</template>

<script>
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Navbar,
    Footer
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap&subset=cyrillic');
  body {
    font-family: 'Roboto', sans-serif;
    color: #272220;
    background-color: rgba(255, 245, 234, 0.2);
  }
</style>
