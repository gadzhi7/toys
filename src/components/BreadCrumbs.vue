<template lang="html">
  <div class="breadcrubs">
    <h2 class="breadcrubs_title"><slot name="breadcrubs"></slot></h2>
    <div class="breadcrubs_links">
      <router-link :to="{ name: 'home' }">Главная</router-link>
      <span><pre> / </pre><slot name="breadcrubs"></slot></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

  .breadcrubs {
    width: calc(100% + 40px);
    position: relative;
    left: -20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    min-height: 170px;
    background-color: rgb(248, 239, 234);
    padding: 0 -20px;
    overflow: hidden;
  }

  .breadcrubs_title {
    width: 100%;
    text-align: center;
    font-family: 'Prata', serif;
    font-size: 30px;
    line-height: 1.2;
    color: rgb(39, 34, 32);
    margin: 0;
    letter-spacing: 1px;
  }

  .breadcrubs_links {
    font-weight: 500;
    text-transform: uppercase;
    font-size: 12px;
    display: flex;
    margin-top: 13px;

    a {
      text-decoration: none;
      color: rgb(214, 134, 98);
    }

    span {
      color: rgb(123, 114, 111);

      pre {
        display: inline;
      }
    }
  }

  @media (max-width: 992px) {

    .breadcrubs {
      width: calc(100% + 30px);
      left: -15px;
    }

  }

  @media (max-width: 650px) {

    .breadcrubs {
      width: calc(100% + 20px);
      left: -10px;
    }

  }

  @media (max-width: 480px) {

    .breadcrubs {
      width: calc(100% + 10px);
      left: -5px;
    }

  }

</style>
