<template>
<footer class="footer">
  <div class="footer_info">
    <div>
      <p>Данный сайт каталог создан в целях ознакомления с моими работами.</p>
      <p>На данном сайте размещены основные мои работы, некоторые положительные отзывы клиентов, отрицательных пока не было. Таблица с информацией о каждой игрушке, для облегчения сделать заказ. Краткая об авторе.</p>
    </div>
  </div>
  <div class="footer_inner">
    <p class="footer_text"><span>Игрушки плюша / </span> © Copyright by <a href="http://gkhabada.h1n.ru" target="_blank">gkhabada</a> {{new Date().getFullYear()}}г.</p>
    <div class="footer_links">
      <router-link :to="{ name: 'home'}">Главная</router-link>
      <router-link :to="{ name: 'portfolio'}">Портфолио</router-link>
      <router-link :to="{ name: 'reviews'}">Отзывы</router-link>
      <router-link :to="{ name: 'table'}">Таблица с игрушками</router-link>
      <router-link :to="{ name: 'about'}">Обо мне</router-link>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

.footer_info {
  min-height: 200px;
  background-color: rgb(248, 247, 245);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;

  p {
    max-width: 650px;
    text-align: center;
    line-height: 1.4;
    color: rgb(132, 129, 128);
  }
}

.footer {
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

a.router-link-exact-active {
  opacity: 1;
  transition: 0.3s;
}

@media (max-width: 1000px) {

  .footer .footer_inner .footer_links {
    display: none;
  }

  .footer_text {
    text-align: center;
    margin-left:  auto;
    margin-right: auto;
    line-height: 1.3;
  }

}

@media (max-width: 460px) {
  .footer_text span {
    display: block;
  }
}

</style>
