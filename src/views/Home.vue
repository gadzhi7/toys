<template>
<div class="home">
  <h1>Home</h1>
  <div class="banner">
    <img src="" alt="">
    <h5>Игрушки и другие товары ручной работы</h5>
    <h6>Оригинальные товары связанные с любовью</h6>
    <router-link class="button" :to="{ name: 'portfolio'}">Посмотреть</router-link>
  </div>
  <div class="popular">
    <h5>заказать товары ручной работы</h5>
    <h2>Популярные</h2>
    <div class="popular_items">
      <div class="popular_item" v-for="(toy, index) in toys.slice(0, 4)" :key="index">
        <img :src="toy.image" :alt="toy.name">
        <h3 class="popular_item_name">{{toy.name}}</h3>
        <p class="popular_item_price">{{toy.text.length > 40 ? toy.text.substring(0, 40) + '...' : toy.text }}</p>
      </div>
    </div>
    <router-link class="button" :to="{ name: 'portfolio'}">Показать все</router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      toys: [
        {
          name: 'тест',
          text: 'тестовое описание тестовое описание тестовое описание тестовое описание тестовое о описание тестовое описание тест описание тестовое описание тест описание тестовое описание тест описание тестовое описание тест описание тестовое описание тест описание тестовое описание тестписание тестовое описание',
          image: 'https://handmade-shop.cmsmasters.net/wp-content/uploads/2015/05/2-1-580x480.jpg'
        },
        {
          name: 'тест',
          text: 'тестовое описание тестовоописание',
          image: 'https://handmade-shop.cmsmasters.net/wp-content/uploads/2015/05/2-1-580x480.jpg'
        },
        {
          name: 'тест',
          text: 'тестовое писание тестовое описание',
          image: 'https://handmade-shop.cmsmasters.net/wp-content/uploads/2015/05/2-1-580x480.jpg'
        },
        {
          name: 'тест',
          text: 'тестовое описание теписание',
          image: 'https://handmade-shop.cmsmasters.net/wp-content/uploads/2015/05/2-1-580x480.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .home {
    color: #272220;
    position: relative;

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

      h2 {
        font-family: 'Prata', serif;
        font-size: 30px;
        font-weight: 100;
        text-align: center;
        width: fit-content;
        padding: 0 80px;
        margin: 0 auto 30px;
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

      &_items {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        list-style: none;
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
