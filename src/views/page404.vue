<template lang="html">
  <div class="notfound">
    <div @mousemove="mouseMove($event)">
      <div class="page404">
        <div class="page404_info">
          <h1>ПЕЙДЖ НОТ ФАУНД</h1>
          <p>Ошибка 404.</p>
          <p>Такая страница не существует либо она была удалена.</p>
          <router-link class="button" :to="{ name: 'home'}">На главную</router-link>
        </div>
        <div class="jellyfish">
          <img src="./../assets/404.png" ref="jellyfish" alt="медуза">
        </div>
      </div>
    </div>
    <Instagram></Instagram>
  </div>
</template>

<script>
import Instagram from './../components/Instagram'

export default {
  name: 'page404',
  data () {
    return {}
  },
  components: {
    Instagram
  },
  methods: {
    mouseMove (e) {
      this.$refs.jellyfish.style.left = (e.clientX / 7) + 'px'
      this.$refs.jellyfish.style.top = (e.clientY / 12) + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>

  .page404 {
    position: relative;
    min-height: 500px;
    max-width: 1140px;
    margin: 0 auto 50px;

    &_info {
      position: relative;
      z-index: 2;
      padding-top: 50px;

      h1 {
        font-family: 'Prata', serif;
        font-size: 70px;
        width: 350px;
        line-height: 1;
        color: #3a2015;
      }

      p {
        font-size: 20px;
        margin: 0;
      }

      .button {
        margin-top: 40px;
      }
    }

    .jellyfish {
      position: absolute;
      right: 200px;
      height: 500px;
      top: 0;
    }

    img {
      transition: 0.2s;
      position: relative;
      height: 100%;
    }
  }
</style>
