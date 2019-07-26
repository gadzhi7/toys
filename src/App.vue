<template>
<div id="app" ref="app">
  <Header></Header>
  <Navbar></Navbar>
  <section>
    <transition
      name="slide-left"
      mode="out-in"
    >
      <router-view />
    </transition>
  </section>
  <Footer v-if="!admin"></Footer>
  <AdminFooter v-else></AdminFooter>
</div>
</template>

<script>
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminFooter from './admin/AdminFooter'
export default {
  name: 'App',
  data () {
    return {
      admin: false
    }
  },
  components: {
    Header,
    Navbar,
    Footer,
    AdminFooter
  },
  mounted () {
    window.location.pathname.indexOf('admin') !== -1 ? this.admin = true : this.admin = false
    this.changeBackground(this.$refs.app)
  },
  updated () {
    window.location.pathname.indexOf('admin') !== -1 ? this.admin = true : this.admin = false
    this.changeBackground(this.$refs.app)
  },
  methods: {
    changeBackground (elem) {
      if (this.admin) {
        elem.style.backgroundColor = 'rgb(252, 243, 255)'
      } else {
        elem.style.backgroundColor = 'rgba(255, 245, 234, 0.2)'
      }
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap&subset=cyrillic');
  @import url('https://fonts.googleapis.com/css?family=Prata&display=swap');

  html, body {
    min-height: 100vh;
    height: 100%;
  }

  #app {
    font-family: 'Roboto', sans-serif;
    min-height: 100vh;
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
