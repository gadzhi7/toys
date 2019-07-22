<template>
<footer class="footer">
  <div class="footer_inner">
    <p class="footer_text">Игрушки плюша / © Copyright by <a href="http://gkhabada.h1n.ru" target="_blank">gkhabada</a> {{new Date().getFullYear()}}г.</p>
    <div class="footer_links">
      <a href="">ABOUT</a>
      <a href="">PORTFOLIO</a>
      <a href="">BLOG</a>
      <a href="">SHOP</a>
      <a href="">CONTACTS</a>
    </div>
  </div>
</footer>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Footer',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.footer {
  margin-top: 500px;

  min-height: 50px;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  background-color: #fff;
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
