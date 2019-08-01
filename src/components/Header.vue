<template>
<div class="header">
  <router-link :to="{ name: 'home'}">
    <img src="./../assets/logo.png" alt="логотип">
  </router-link>
</div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
  .header {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
