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
    return {}
  }
}
</script>

<style scoped lang="scss">
  .header {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 100%;
    }
  }
</style>
