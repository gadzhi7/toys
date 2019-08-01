<template lang="html">
  <div>
    <form action="/" class="login" method="post" @submit.prevent="login">
      <p class="login_welcome" title="Неть">Привет, Хоточка!</p>
      <div>
        <label for="login_login" title="Обязательное поле">Логин: <span>*</span></label>
        <input type="email" id="login_login" v-model="email" required title="Ну тот логин, который я тебе говорил.">
      </div>
      <div>
        <label for="login_password" title="Обязательное поле">Пароль: <span>*</span></label>
        <input type="password" id="login_password" v-model="password" required title="Ну вспомни даа, пароль.">
      </div>
      <button type="submit" class="button">Войти</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import router from './../router'

export default {
  name: 'login',
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(function (data) {
          if (data.operationType === 'signIn') {
            localStorage.setItem('signIn', 'ILoveYou')
            router.push({ name: 'admin' })
          } else {
            alert('Неудалось войти.')
          }
        })
        .catch(function (error) {
          if (error.code === 'auth/wrong-password') {
            alert('Неверный пароль.')
          } else {
            alert(error.message)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @-webkit-keyframes rubberBand {
    from {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }

    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1);
    }

    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1);
    }

    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.15, 0.85, 1);
    }

    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1);
    }

    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }

    to {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
  @keyframes rubberBand {
    from {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }

    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1);
    }

    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1);
    }

    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.15, 0.85, 1);
    }

    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1);
    }

    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }

    to {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }

  .login {
    max-width: 1140px;
    margin: 80px auto;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    justify-content: space-around;

    & > div {
      width: 40%;

      label {
        width: 100%;
        line-height: 2;
        font-weight: 500;

        span {
          color: #d68662;
        }
      }

      input {
        width: 100%;
        box-sizing: border-box;
        height: 45px;
        text-indent: 15px;
      }

    }

    &_welcome {
      font-family: 'Prata', serif;
      font-size: 30px;
      margin: 10px auto 50px;
      position: relative;
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      transition: 0.5s;
      width: 100%;
      text-align: center;
    }

    &:hover .login_welcome {
      transition: 0.5s;
      color: #d68662;
      -webkit-animation-name: rubberBand;
      animation-name: rubberBand;
    }

  }
</style>
