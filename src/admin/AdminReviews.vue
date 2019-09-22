<template>
  <div class="add_reviews">
      <h1>Отзывы</h1>
      <div class="add_new">
        <form v-if="reviews" @submit="savereview()">
            <h3>Добавить отзыв</h3>
            <div class="add_new_form">
                <input class="add_new_name" min="3" max="30" type="text" v-model="review.name" placeholder="Имя" required />
                <textarea class="add_new_text" min="15" max="150" v-model="review.text" placeholder="Текст отзыва" required></textarea>
                <label for="add_new_photo" class="add_new_photo" ref="photoLabel">Загрузите фото</label>
                <input id="add_new_photo" type="file" name="" ref="photoInput" @change="processFile ($event)" hidden>
            </div>
            <button class="add_new_save" type="submit">Сохранить</button>
            <!-- <button @click="addreview()" class="">+ review</button> -->
        </form>
        <div v-else>
            <h5>Please create new review...</h5>
        </div>
      </div>
      <div>
          <ul class="list" v-if="reviews.length">
              <li
                  v-for="(review, index) in reviewsReverse"
                  :key="index"
                  @dblclick="changereview(review.id)"
                  >
                  <img :src="review.image" :alt="review.name" v-if="review.image">
                  <img src="https://sdelanounas.ru/i/d/2/1/f_d21waWNzLnBpY3MvZGktV1kzVS5qcGc_X19pZD0xMTA5MzE=.jpeg" :alt="review.name" v-else>
                  <div>
                    <p class="list_name">{{ review.name }}</p>
                    <p class="list_text">{{ review.text }}</p>
                    <div class="list_delete-btn" title="удалить" @click="removereview(review.id)">
                      <div></div>
                      Удалить
                    </div>
                  </div>
              </li>
          </ul>
          <p v-else>Список пуст</p>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'

const reviewsRef = firebase.database().ref('reviews')
const reviewsImageRef = firebase.storage().ref('reviews')

export default {
  name: 'addreviews',
  created () {
    reviewsRef.once('value', reviews => {
      reviews.forEach(review => {
        this.reviews.push({
          id: review.ref.key,
          name: review.child('name').val(),
          text: review.child('text').val(),
          image: review.child('image').val()
        })
      })
    })
    reviewsRef.on('child_removed', snapshot => {
      const deletedreview = this.reviews.find(review => review.id === snapshot.key)
      // console.log('note was removed: ', deletedreview)

      const index = this.reviews.indexOf(deletedreview)
      this.reviews.splice(index, 1)
      this.index = this.index === 0 ? 0 : index - 1
    })
  },
  data: () => ({
    reviews: [],
    review: {
      id: null,
      name: null,
      text: null,
      image: null
    },
    index: 0,
    edit: false
  }),
  methods: {
    // addreview () {
    //   this.reviews.push({
    //     name: '',
    //     text: ''
    //   })
    //   this.index = this.reviews.length - 1
    // },
    changereview (index) {
      // this.edit = true
      // this.index = index
      // console.log(index)
    },
    processFile (event) {
      this.review.image = event.target.files[0]
      if (event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg') {
        if (this.review.image.name.length > 15) {
          this.$refs.photoLabel.innerText = this.review.image.name.substr(0, 15) + '...'
        } else {
          this.$refs.photoLabel.innerText = this.review.image.name
        }

        var metadata = {
          contentType: 'image/jpeg'
        }
        var imagesRef = reviewsImageRef.child(this.review.image.name).put(this.review.image, metadata)

        imagesRef.on('state_changed', (e) => {
          let vueThis = this

          fetch(`https://firebasestorage.googleapis.com/v0/b/${e.ref.bucket}/o/reviews%2F${e.ref.name}`)
            .then(function (response) {
              return response.json()
            })
            .then(function (data) {
              vueThis.review.image = 'https://firebasestorage.googleapis.com/v0/b/' + e.ref.bucket + '/o/reviews%2F' + e.ref.name + '?alt=media&token=' + data.downloadTokens
            })
        })
      } else {
        event.target.value = ''
        alert('Выберите файл (фото) с расширением jpg или png')
      }
    },
    savereview () {
      // const review = this.review
      // if (review.id) {
      //   this.updatereview(review)
      // } else {
      //   this.createreview(review)
      // }

      if (this.$refs.photoInput.files.length !== 0) {
        if (this.$refs.photoInput.files[0].type === 'image/png') {
          console.log('success')
        }

        const review = Object.assign({}, this.review)
        this.createreview(review)
      } else {
        alert('Выберите фото')
      }
    },
    updatereview (review) {
      reviewsRef.child(review.id).update({
        name: review.name,
        text: review.text
      })
    },
    createreview (review) {
      review.id = reviewsRef.push(review).key
      this.reviews.push(review)
      this.review.name = this.review.text = this.$refs.photoInput.value = ''
      this.$refs.photoLabel.innerText = 'Загрузите фото'
      // this.uploadTask()
    },
    removereview (id) {
      var desertRef
      this.reviews.forEach(function (item) {
        if (item.id === id && item.image !== null && item.image !== '') {
          console.log(item.image)
          let start = item.image.search(/reviews%2F/i) + 7
          let end = item.image.search(/\?alt/i)
          desertRef = reviewsImageRef.child(item.image.substring(start, end))
          desertRef.delete().then(function () {
            console.log('File deleted successfully')
          }).catch(function (error) {
            console.error(error)
          })
        }
      })
      reviewsRef.child(id).remove()
    },
    uploadTask () {
      reviewsImageRef.put(this.review.image)
    },
    uploadTick (snap) {
      console.log('update ticked', snap)
      this.setState({
        bytesTransferred: snap.bytesTransferred,
        totalBytes: snap.totalBytes
      })
    }
  },
  computed: {
    /* eslint-disable */
    reviewsReverse () {
      return this.reviews.reverse()
    }
  }
}
</script>

<style lang="scss" scoped>
  .add_reviews {
      max-width: 1200px;
      margin: 0 auto;
  }

  .add_new {
    position: relative;
    min-height: 180px;
    padding: 5px 20px 10px;
    background-color: rgba(255, 255, 255,  0.6);

    &_form {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
    }

    &_name {
      border: 1px solid #b962d6;
      resize: vertical;
      min-height: 46px;
      width: 20%;
      text-indent: 10px;
    }

    &_text {
      border: 1px solid #b962d6;
      resize: vertical;
      min-height: 36px;
      width: 50%;
      text-indent: 10px;
      padding-top: 10px;
    }

    &_photo {
      padding: 10px 17px;
      line-height: 30px;
      border: none;
      background-color: #b962d6;
      font-weight: 500;
      color: #fff;
      right: 20px;
      min-width: 150px;
      text-align: center;
      transition: 0.3s;
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.2);
        transition: 0.3s;
      }
    }

    &_save {
      padding: 7px 14px;
      border: none;
      background-color: #b962d6;
      position: absolute;
      bottom: 15px;
      font-weight: 400;
      color: #fff;
      right: 20px;
      transition: 0.3s;
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.2);
        transition: 0.3s;
      }
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-around;
    list-style: none;
    padding: 0;
    margin-top: 50px;

    li {
      display: flex;
      width: 100%;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      position: relative;
      cursor: pointer;
      transition: 0.3s;

      img {
        width: 105px;
        height: 105px;
        object-fit: cover;
        margin-top: 5px;
        margin-left: 15px;
        border-radius: 50%;
      }

      .list_name {
        font-size: 20px;
        font-weight: 500;
        margin: 30px auto 10px;
        padding: 0 15px;
        color: #272220;
      }

      .list_text {
        padding: 0 15px 15px;
        font-size: 15px;
        color: #7b726f;
      }

      .list_delete-btn {
        position: absolute;
        color: #fff;
        font-size: 14px;
        line-height: 20px;
        font-weight: 300;
        top: 5px;
        right: 10px;
        width: fit-content;
        height: 20px;
        padding: 5px 40px 5px 10px;
        background-color: #272220;
        border-radius: 25px;
        transition: 0.3s;
        opacity: 0.5;

        div {
          transition: 0.3s;
          position: absolute;
          right: 5px;
          top: 2px;
          width: 30px;
          height: 30px;

          &:after,
          &:before {
            content: '';
            width: 23px;
            height: 2px;
            top: 45%;
            border-radius: 5px;
            background-color: #cbcbcb;
            position: absolute;
            transform: rotate(45deg);
          }
          &:before {
            transform: rotate(-45deg);
          }
        }

        &:hover {
          opacity: 1;
          box-shadow: 0px 0px 6px -1px red;
          transition: 0.3s;

          div {
            top: 4px;
            right: 8px;
            transition: 0.3s;
            transform: rotate(90deg);
          }
        }
      }

      &:hover {
        box-shadow: 0 0 10px 3px #f6d3ff;
        transition: 0.3s;
      }
    }
  }
</style>
