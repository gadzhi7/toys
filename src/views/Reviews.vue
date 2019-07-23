<template lang="html">
  <div class=".reviews_wrapper">
    <BreadCrumbs #breadcrubs>Отзывы</BreadCrumbs>
    <div class="review">
      <template v-for="(row, index) in groupedItems">
        <div class="review_row" :key="index">
          <div class="review_item" v-for="(item, i) in row" :key="i">
            <img class="review_img" :src="item.img" :alt="item.name">
            <div class="review_block">
              <div class="review_name">{{item.name}}</div>
              <div class="review_text">{{item.review}}</div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from '../components/BreadCrumbs'

export default {
  name: 'Reviews',
  data () {
    return {
      reviews: [
        {
          img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXQ0NCqqKi6ubnBwMCnpaXPz8+wrq64trbHxsatq6vMzMy1s7PLysqrqanEw8O/vb21desJAAACvUlEQVR4nO3a3ZKrIBBG0WgQFYy8/9tOIpqTiS1mNHWkrb2q5mZyw1f8tcDlAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsJUL5VxwRzfrazpvTDFnjO+Obtp3dEK6ySkidrdEwtsZRmopjdAnf3Tz9qtS+e6qoxu423Ul4fXoBu5WrySsj27gXm4lYGGao5u4RdX3067u1xIW/lkBNFrmpAtW3OFXe9NYHWVOY7fEG0NaBWM2VcF8Ivsqx9mdCW3uEdMVzAdM7lXOznwPR0dI67+QsD86RFL4QsJwdIikMt14W4cQ6pXFqDw6RFIqoX/u5y5Z6mhN6H/v5c1yRp0J2/lH0rU9U0Ir1ZtLxYHGhK1cUDu5FxUmbKdCzDXBWx+aKXAnRtSX0ExzsLfFo6YzhZ029atU4+lLaONPzv+LY/zYjdJU1JcwdtjbujKuPVKVpy6hH84mqvptQNr4b2Fb1JbQxDJz3lmxa/v5TFSXcBiO1XzCtUMndvoTtsP/3TxIjC6sNdoSxk/2ICSMw3d+YqwtYTzTlk6+l345T0K78Mt5Ep6rD4XybCzm9CeMa2kjJIyfxPPiW1tCE69b5rVL3A8r/fvhOBiXahph+GpLON3Uv9Wl09H2CerSoojzzbWvEc14PdEIDzX0JYxrzaV7XTXr8bNfOnHTl9BMX/RNMdycGnML422v8GWhMeE0Tu+6UNd1eN6fneWc5uUo6jc5oMqERSvdJy0E1JmwuM0j9qc6837sf2/3Fu/nNuoT3tnSVVV1uf+50iYeLOpN+DgK9r70Ph4MK0249k7vE3knbL6QMO9HQwvXSX+xcFGVjf3vafIepOLR79/Y7B8o7p2Jec/Cgdv1NjHv50KjKtjWbNHakP0QHbnuukWX+SoKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwP/0AAegXtE+/NFIAAAAASUVORK5CYII=',
          name: 'Name1',
          review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'
        },
        {
          img: 'https://www.freepngimg.com/thumb/happy_person/2-2-happy-person-free-download-png.png',
          name: 'Name2',
          review: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
          img: 'data:image/jpeg;base64,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',
          name: 'Name3',
          review: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvWblIRr5nzCC40vIBaFwp_8wqQv3cIPV6zXviJvVKWSWkiYxBDw',
          name: 'Name4',
          review: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'
        }
      ]
    }
  },
  computed: {
    groupedItems () {
      // eslint-disable-next-line
      let grouped = [], index = -1
      for (let i = 0; i < this.reviews.length; i++) {
        if (i % 2 === 0) {
          index++
          grouped[index] = []
        }
        grouped[index].push(this.reviews[i])
      }
      return grouped
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
    margin: 150px auto 0;

    &_row {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: flex-start;
      padding: 40px 0;

      &:last-child {
        border-bottom: 0;
      }
    }

    &_item {
      width: 50%;
      padding-right: 45px;
      display: flex;

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
</style>
