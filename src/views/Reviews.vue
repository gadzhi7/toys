<template lang="html">
  <div class=".reviews_wrapper">
    <BreadCrumbs #breadcrubs>Отзывы</BreadCrumbs>
    <h2 class="title">Отзывы</h2>
    <div class="review" v-if="reviews.length">
      <template v-for="(row, index) in groupedItems">
        <div class="review_row" :key="index">
          <div class="review_item" v-for="(item, i) in row" :key="i">
            <img class="review_img" :src="item.image" :alt="item.name">
            <div class="review_block">
              <div class="review_name">{{item.name}}</div>
              <div class="review_text" :title="item.text">{{item.text.length > 150 ? item.text.slice(0, 150) + '...' : item.text}}</div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div v-else>
      <p>Пока нет добавленных отзывов.</p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import BreadCrumbs from '../components/BreadCrumbs'

const reviewsRef = firebase.database().ref('reviews')

export default {
  name: 'Reviews',
  created () {
    this.$store.state.loading = true
    reviewsRef.once('value', reviews => {
      reviews.forEach(review => {
        this.reviews.push({
          id: review.ref.key,
          name: review.child('name').val(),
          text: review.child('text').val(),
          image: review.child('image').val()
        })
      })

      this.$store.state.loading = false
    })
  },
  data () {
    return {
      reviews: []
    }
  },
  computed: {
    groupedItems () {
      if (this.reviews.length > 0) {
        let grouped = []
        let index = -1
        for (let i = 0; i < this.reviews.length; i++) {
          if (i % 2 === 0) {
            index++
            grouped[index] = []
          }
          grouped[index].push(this.reviews[i])
        }
        return grouped
      }
    }
  },
  components: {
    BreadCrumbs
  }
}
</script>

<style lang="scss" scoped>
  .review {
    max-width: 1140px;
    margin: 100px auto 50px;

    &_row {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: flex-start;
      position: relative;

      &:after {
        content: url('./../assets/icons/quotes.svg');
        width: 20px;
        height: 20px;
        position: absolute;
        left: calc(50% - 28px);
        bottom: -26px;
        padding: 16px 16px 16px 18px;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background-color: #FFFDFC;
        z-index: 2;
      }

      &:first-child {
        .review_item {
          padding-top: 0;
        }
      }

      &:last-child {
        border-bottom: 0;
        &:after {
          content: none;
        }

        .review_item {
          padding-bottom: 0;
          flex: none;
          box-sizing: border-box;
        }
      }
    }

    &_item {
      width: 50%;
      padding: 40px 45px;
      display: flex;

      &:first-child {
        border-right: 1px solid rgba(0, 0, 0, 0.1);
      }

      .review_img {
        width: 60px;
        height: 60px;
        border: 1px solid #eee;
        object-fit: cover;
        object-position: center;
        border-radius: 50%;
      }

      .review_block {
        width: calc(100% - 80px);
        padding-left: 20px;

        .review_name {
          line-height: 60px;
          color: #d68662;
          font-size: 16px;
        }

        .review_text {
          font-family: 'Prata', serif;
          font-size: 18px;
          line-height: 1.8;
          font-style: italic;
        }
      }
    }
  }

  @media (max-width: 992px) {

    .review_row .review_item {
      flex-wrap: wrap;

      img {
        display: block;
      }

      .review_block {
        width: 100%;
        padding-left: 0;
      }
    }

  }

  @media (max-width: 676px) {

    .review {
      margin-top: 50px;
    }

    .review_row {
      flex-wrap: wrap;
      border-bottom: 0;

       .review_item {
        width: 100%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-right: 0;
        padding: 20px!important;

        img {
          display: block;
        }

        .review_block {
          width: calc(100% - 80px);
          padding-left: 15px;

          .review_name {
            line-height: 30px;
          }
        }
      }

      &:after {
        content: none;
      }

      &:last-child .review_item {
        border-bottom: 0;
      }

    }
  }

  @media (max-width: 480px) {

    .review_row {
      flex-wrap: wrap;
      border-bottom: 0;

       .review_item {
        width: 100%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-right: 0;
        padding: 20px!important;

        img {
          display: block;
          margin: 0 auto 15px;
        }

        .review_block {
          text-align: center;
          width: 100%;
          padding-left: 0;

          .review_name {
            line-height: 30px;
          }
        }
      }

    }

  }

</style>
