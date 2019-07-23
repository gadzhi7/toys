<template>
<div id="app">
  <!-- <Header></Header> -->
  <Navbar></Navbar>
  <section>
    <transition
      name="slide-left"
      mode="out-in"
    >
      <router-view />
    </transition>
  </section>
  <!-- <Footer></Footer> -->
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
  @import url('https://fonts.googleapis.com/css?family=Prata&display=swap');

  html, body {
    height: 100%;
  }

  #app {
    font-family: 'Roboto', sans-serif;
    height: 100%;
    color: #272220;
    background-color: rgba(255, 245, 234, 0.2);
    display: flex;
    flex-direction: column;
  }

  section {
    flex: 1;
    padding: 0 20px;
  }

  // router animation
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: height, opacity;
    transition-timing-function: ease;
    overflow: hidden;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition-duration: 0.5s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate(2em, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate(-2em, 0);
  }

</style>
