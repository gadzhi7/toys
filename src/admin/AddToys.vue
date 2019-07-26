<template>
  <div class="add_toys">
      <h1>Список</h1>
      <div class="add_new">
        <form v-if="toys" @submit="saveToy()">
            <h3>Добавить</h3>
            <div class="add_new_form">
                <input class="add_new_name" min="3" max="30" type="text" v-model="toy.name" placeholder="Название " required />
                <textarea class="add_new_text" min="15" max="200" v-model="toy.text" placeholder="Описание " required></textarea>
                <label for="add_new_photo" class="add_new_photo" ref="photoLabel">Загрузите фото</label>
                <input id="add_new_photo" type="file" name="" ref="photoInput" @change="processFile ($event)" hidden>
            </div>
            <button class="add_new_save" type="submit">Сохранить</button>
            <!-- <button @click="addToy()" class="">+ Toy</button> -->
        </form>
        <div v-else>
            <h5>Please create new toy...</h5>
        </div>
      </div>
      <div>
          <ul class="list" v-if="toys.length">
              <li
                  v-for="(toy, index) in toys"
                  :key="index"
                  @dblclick="changeToy(toy.id)"
                  >
                  <img :src="toy.image" :alt="toy.name" v-if="toy.image">
                  <img src="https://sdelanounas.ru/i/d/2/1/f_d21waWNzLnBpY3MvZGktV1kzVS5qcGc_X19pZD0xMTA5MzE=.jpeg" :alt="toy.name" v-else>
                  <div>
                    <p class="list_name">{{ toy.name }}</p>
                    <p class="list_text">{{ toy.text }}</p>
                    <div class="list_delete-btn" title="удалить" @click="removeToy(toy.id)">
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

const toysRef = firebase.database().ref('toys')
const toysImageRef = firebase.storage().ref('toys')

export default {
  name: 'addtoys',
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
    })
    // value = snapshot.val() | id = snapshot.key
    toysRef.on('child_added', snapshot => {
      // console.log('note was added: ', { ...snapshot.val(), id: snapshot.key })
    })
    toysRef.on('child_removed', snapshot => {
      const deletedToy = this.toys.find(toy => toy.id === snapshot.key)
      // console.log('note was removed: ', deletedToy)

      const index = this.toys.indexOf(deletedToy)
      this.toys.splice(index, 1)
      this.index = this.index === 0 ? 0 : index - 1
    })
    toysRef.on('child_changed', snapshot => {
      const updatedToy = this.toys.find(toy => toy.id === snapshot.key)
      updatedToy.name = snapshot.val().name
      updatedToy.content = snapshot.val().content
      // console.log('note was updated: ', updatedToy)
    })
  },
  data: () => ({
    toys: [],
    toy: {
      id: null,
      name: null,
      text: null,
      image: null
    },
    index: 0,
    edit: false
  }),
  methods: {
    // addToy () {
    //   this.toys.push({
    //     name: '',
    //     text: ''
    //   })
    //   this.index = this.toys.length - 1
    // },
    changeToy (index) {
      // this.edit = true
      // this.index = index
      // console.log(index)
    },
    processFile (event) {
      this.toy.image = event.target.files[0]
      if (event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg') {
        if (this.toy.image.name.length > 15) {
          this.$refs.photoLabel.innerText = this.toy.image.name.substr(0, 15) + '...'
        } else {
          this.$refs.photoLabel.innerText = this.toy.image.name
        }

        var metadata = {
          contentType: 'image/jpeg'
        }
        var imagesRef = toysImageRef.child(this.toy.image.name).put(this.toy.image, metadata)

        imagesRef.on('state_changed', (e) => {
          let vueThis = this

          fetch(`https://firebasestorage.googleapis.com/v0/b/${e.ref.bucket}/o/toys%2F${e.ref.name}`)
            .then(function (response) {
              return response.json()
            })
            .then(function (data) {
              vueThis.toy.image = 'https://firebasestorage.googleapis.com/v0/b/' + e.ref.bucket + '/o/toys%2F' + e.ref.name + '?alt=media&token=' + data.downloadTokens
            })
        })
      } else {
        event.target.value = ''
        alert('Выберите файл (фото) с расширением jpg или png')
      }
    },
    saveToy () {
      // const toy = this.toy
      // if (toy.id) {
      //   this.updateToy(toy)
      // } else {
      //   this.createToy(toy)
      // }

      if (this.$refs.photoInput.files.length !== 0) {
        if (this.$refs.photoInput.files[0].type === 'image/png') {
          console.log('success')
        }

        const toy = Object.assign({}, this.toy)
        this.createToy(toy)
      } else {
        alert('Выберите фото')
      }
    },
    updateToy (toy) {
      toysRef.child(toy.id).update({
        name: toy.name,
        text: toy.text
      })
    },
    createToy (toy) {
      toy.id = toysRef.push(toy).key
      this.toys.push(toy)
      this.toy.name = this.toy.text = this.$refs.photoInput.value = ''
      this.$refs.photoLabel.innerText = 'Загрузите фото'
      // this.uploadTask()
    },
    removeToy (id) {
      var desertRef
      this.toys.forEach(function (item) {
        if (item.id === id && item.image !== null && item.image !== '') {
          console.log(item.image)
          let start = item.image.search(/toys%2F/i) + 7
          let end = item.image.search(/\?alt/i)
          desertRef = toysImageRef.child(item.image.substring(start, end))
          desertRef.delete().then(function () {
            console.log('File deleted successfully')
          }).catch(function (error) {
            console.error(error)
          })
        }
      })
      toysRef.child(id).remove()
    },
    uploadTask () {
      toysImageRef.put(this.toy.image)
    },
    uploadTick (snap) {
      console.log('update ticked', snap)
      this.setState({
        bytesTransferred: snap.bytesTransferred,
        totalBytes: snap.totalBytes
      })
    }
  }
}
</script>

<style lang="scss">
  .add_toys {
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

    li {
      display: flex;
      width: 49%;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      position: relative;
      cursor: pointer;
      transition: 0.3s;

      img {
        width: 200px;
        height: 115px;
        object-fit: cover;
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
