<template lang="html">
  <div class="">
    <BreadCrumbs #breadcrubs>Игрушки</BreadCrumbs>
    <div class="portfolio">
      <h1 class="title">Portfolio</h1>
      <ul class="portfolio_toys" v-if="toys.length">
        <li v-for="(toy, index) in toys"
          :key="index"
        >
          <img :src="toy.image" alt="name">
          <p class="portfolio_toys_name">{{toy.name}}</p>
          <p class="portfolio_toys_text">{{toy.text}}</p>
        </li>
      </ul>
      <div v-else>
        <p>Пока игрушек не добавлено</p>
      </div>
    </div>
  </div>
</template>

<!-- Добавить пагинацию и сколько товаров отображать -->
<script>
import firebase from 'firebase/app'
import BreadCrumbs from './../components/BreadCrumbs'

const toysRef = firebase.database().ref('toys')

export default {
  name: 'Portfolio',
  created () {
    toysRef.once('value', toys => {
      toys.forEach(toy => {
        this.toys.push({
          id: toy.ref.key,
          name: toy.child('name').val(),
          text: toy.child('text').val(),
          image: toy.child('image').val()
        })
      })

      this.toys = this.toys.reverse()
    })
  },
  data () {
    return {
      toys: []
    }
  },
  components: {
    BreadCrumbs
  }
}
</script>

<style lang="scss" scoped>
  .portfolio {
    max-width: 1200px;
    margin: 0 auto 50px;

    &_toys {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      list-style: none;

      li {
        width: 24%;
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

        .portfolio_toys_name {
          color: rgb(39, 34, 32);
          font-size: 14px;
          font-weight: 400;
        }

        .portfolio_toys_text {
          color: #7b726f;
          font-size: 12px;
          font-weight: 400;
          margin: 0;
        }

      }
    }
  }
</style>
