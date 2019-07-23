<template>
<div class="">
  Admin
  <router-link :to="{ name: 'home'}">Главная</router-link>
  <router-link :to="{ name: 'adminGoods'}">Список</router-link>
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
