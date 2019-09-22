<template>
<div id="app" ref="app">
  <Header></Header>
  <Navbar></Navbar>
  <section>
    <transition
      name="slide-left"
      mode="out-in"
    >
      <!-- <keep-alive> -->
        <router-view />
      <!-- </keep-alive> -->
    </transition>
  </section>
  <Footer v-if="!admin"></Footer>
  <AdminFooter v-else></AdminFooter>
  <Loader v-show="$store.state.loading"/>
</div>
</template>

<script>
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminFooter from './admin/AdminFooter'
import Loader from './components/Loader'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: 'AIzaSyAjUTnfPQ9vvVGhIyKNXePXkx3uNqdK3GY',
  authDomain: 'toys-plusha.firebaseapp.com',
  databaseURL: 'https://toys-plusha.firebaseio.com',
  projectId: 'toys-plusha',
  storageBucket: 'toys-plusha.appspot.com',
  messagingSenderId: '69113303958',
  appId: '1:69113303958:web:4a87eb183e37622f'
})
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
    AdminFooter,
    Loader
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

  $grey: #d68662;
  $dark_text: #272220;
  $loght_text: #7b726f;

  html, body {
    min-height: 100vh;
    // height: 100%;
  }

  #app {
    font-family: 'Roboto', sans-serif;
    min-height: 100vh;
    // height: 100%;
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

  .button {
    background-color: #d68662;
    color: #fff;
    text-decoration: none;
    font-size: 13px;
    line-height: 43px;
    font-weight: bold;
    padding: 0 42px;
    display: block;
    width: fit-content;
    cursor: pointer;
    text-transform: uppercase;
    border: 1px solid #d68662;
    transition: 0.3s;

    &:hover {
      transition: 0.3s;
      color: #272220;
      background-color: transparent;
      border-color: #c4c4c4;
    }
  }

  .title {
    font-family: 'Prata', serif;
    font-size: 30px;
    font-weight: 100;
    text-align: center;
    width: fit-content;
    padding: 0 80px;
    margin: 30px auto;
    position: relative;

    &:after, &:before {
      content: '';
      width: 50px;
      height: 1px;
      background-color: #dbdbdb;
      position: absolute;
      top: 15px;
    }

    &:after {
      right: 0;
    }

    &:before {
      left: 0;
    }
  }

    @media (max-width: 992px) {
      section {
        padding: 0 15px;
      }
    }

    @media (max-width: 650px) {
      section {
        padding: 0 10px;
      }
    }

    @media (max-width: 480px) {
      section {
        padding: 0 5px;
      }
    }

</style>
