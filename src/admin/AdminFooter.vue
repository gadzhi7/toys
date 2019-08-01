<template>
<footer class="footer">
  <div class="footer_inner">
    <p class="footer_text">Игрушки плюша / © Copyright by <a href="http://gkhabada.h1n.ru" target="_blank">gkhabada</a> {{new Date().getFullYear()}}г.</p>
    <div class="footer_links">
      <router-link :to="{ name: 'home'}">Главная</router-link>
      <router-link :to="{ name: 'admin'}">Ссылки админки</router-link>
      <router-link :to="{ name: 'addtoys'}">Портфолио</router-link>
      <router-link :to="{ name: 'adminreviews'}">Отзывы</router-link>
      <router-link :to="{ name: 'admintable'}">Таблица с игрушками</router-link>
      <a href="">CONTACTS</a>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  name: 'AdminFooter',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.instagram_wrapper {
  flex: 0 0 auto;
  height: 300px;
  position: relative;
  overflow: hidden;
}

.footer {
  min-height: 50px;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
}

.footer_inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.footer_text {
  color: #272220;

  a {
    color: rgba(#d68662, 0.7);
    transition: 0.3s;

    &:hover {
      transition: 0.3s;
      color: rgba(#d68662, 1);
    }
  }
}

.footer_links a {
  text-decoration: none;
  color: #272220;
  opacity: 0.7;
  margin-left: 20px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    opacity: 1;
  }
}
</style>
