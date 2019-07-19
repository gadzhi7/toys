<template>
<div class="">
  Admin
  <router-link :to="{ name: 'Home'}">Главная</router-link>
  <router-link :to="{ name: 'AdminGoods'}">Список</router-link>
</div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
</style>
