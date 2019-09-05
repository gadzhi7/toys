<template>
<div class="home">
  <h1>Игрушки ручной работы</h1>
  <!-- таблица,
  скиллс,
  адаптив,
  заполнить обо мне,
  текст в футере, -->
  <div class="banner">
    <img src="" alt="">
    <h5>Игрушки и другие товары ручной работы</h5>
    <h6>Оригинальные товары связанные с любовью</h6>
    <router-link class="button" :to="{ name: 'portfolio'}">Посмотреть</router-link>
  </div>
  <!-- <div class="skills">
    <h3>Скиллы <a href="https://handmade-shop.cmsmasters.net/counters-progress-bars/" target="_blank">ссылка</a></h3>
    <div class="skills_items">
      <div class="skills_item">
        <p class="skill_count">
          <span></span>
        </p>
        <p class="skill_text"></p>
      </div>
      <div class="skills_item">
        <p class="skill_count"><span></span></p>
        <p class="skill_text"></p>
      </div>
      <div class="skills_item">
        <p class="skill_count"><span></span></p>
        <p class="skill_text"></p>
      </div>
    </div>
  </div> -->
  <div class="popular">
    <h5>заказать товары ручной работы</h5>
    <h2 class="title">Последние работы</h2>
    <div class="popular_items">
      <!-- Исправить loop -->
      <div class="popular_item" v-for="(toy, index) in toys" :key="index">
        <img :src="toy.image" :alt="toy.name">
        <h3 class="popular_item_name">{{toy.name}}</h3>
        <p class="popular_item_price">{{toy.text.length > 40 ? toy.text.substring(0, 40) + '...' : toy.text }}</p>
      </div>
    </div>
    <router-link class="button" :to="{ name: 'portfolio'}">Показать все</router-link>
  </div>
  <Instagram></Instagram>
</div>
</template>

<script>
import Instagram from './../components/Instagram'
import firebase from 'firebase/app'

const toysRef = firebase.database().ref('toys')

export default {
  name: 'Home',
  data () {
    return {
      toys: []
    }
  },
  created () {
    this.$store.state.loading = true
    toysRef.once('value', toys => {
      toys.forEach(toy => {
        this.toys.push({
          id: toy.ref.key,
          name: toy.child('name').val(),
          text: toy.child('text').val(),
          image: toy.child('image').val()
        })
      })

      this.toys = this.toys.reverse().slice(0, 4)
      this.$store.state.loading = false
    })
  },
  components: {
    Instagram
  }
}
</script>

<style scoped lang="scss">
  .home {
    color: #272220;
    position: relative;

    h1 {
      font-family: 'Prata', serif;
      font-size: 50px;
      font-weight: 100;
      text-align: center;
      width: fit-content;
      padding: 0 110px;
      margin: 50px auto;
      position: relative;

      &:after, &:before {
        content: '';
        width: 80px;
        height: 1px;
        background-color: #dbdbdb;
        position: absolute;
        top: 25px;
      }

      &:after {
        right: 0;
      }

      &:before {
        left: 0;
      }
    }

    .banner {
      max-width: 1200px;
      height: 300px;
      margin: 0 auto 70px;
      background-image: url('https://handmade-shop.cmsmasters.net/wp-content/uploads/2016/12/3.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      padding: 2% 7% 3% 7%;

      h5 {
        font-size: 14px;
        line-height: 18px;
        font-weight: bold;
        color: #848180;
        text-transform: uppercase;
      }

      h6 {
        font-size: 30px;
      }

    }

    .popular {
      max-width: 1200px;
      margin: 0 auto 70px;

      h5 {
        text-align: center;
        font-size: 12px;
        color: #848180;
        text-transform: uppercase;
        font-weight: 600;
      }

      &_items {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        list-style: none;
      }

      .title {
        margin-top: 0;
      }

      &_item {
        width: 24%;
        margin: 0 0.5%;
        padding: 15px;
        box-sizing: border-box;
        border: 1px solid #f4f4f4;
        margin-bottom: 10px;

        img {
          height: 240px;
          width: 100%;
          object-fit: contain;
          background-color: #f4f4f4;
        }

        &_name {
          color: rgb(39, 34, 32);
          font-size: 14px;
          font-weight: 400;
        }

        &_price {
          color: #7b726f;
          font-size: 12px;
          font-weight: 400;
          margin: 0;
        }

      }

      .button {
        margin: 40px auto 0;
      }

    }
  }
</style>
