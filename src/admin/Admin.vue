<template>
<div class="admin">
  <!-- <router-link :to="{ name: 'home'}">Главная</router-link> -->
  <router-link :to="{ name: 'addtoys'}">Портфолио</router-link>
  <router-link :to="{ name: 'adminreviews'}">Отзывы</router-link>
  <router-link :to="{ name: 'admintable'}">Таблица с игрушками</router-link>
</div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">

  .admin {
    max-width: 1140px;
    margin: 50px auto;
    display: flex;
    justify-content: center;

    a {
      color: #272220;
      margin-left: 20px;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 14px;
      text-decoration: none;
      padding: 15px 25px;
      background-color: pink;
      transition: 0.3s;

      &:hover {
        transition: 0.3s;
        opacity: 0.7;
      }
    }
  }

</style>
