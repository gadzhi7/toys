<template>
<div class="">
  <router-link :to="{ name: 'home'}">Главная</router-link>
  <router-link :to="{ name: 'addtoys'}">Портфолио</router-link>
  <router-link :to="{ name: 'adminreviews'}">отзывы</router-link>
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
