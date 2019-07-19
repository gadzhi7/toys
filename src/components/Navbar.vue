<template>
<nav class="navbar">
  <div class="nav_soc">
    <a href="">i</a>
    <a href="">w</a>
    <a href="">f</a>
    <a href="">n</a>
    <a href=""></a>
  </div>
  <div class="nav_links">
    <a href="">Home</a>
    <a href="">HOME SHOP</a>
    <a href="">PAGES</a>
    <a href="">SHORTCODES</a>
    <a href="">POST TYPES</a>
  </div>
  <div class="nav_basket">
    <a href="">basket <span>0</span></a>
    <a href=""></a>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 59px;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
  }

  .nav_soc a {
    color: #cec2bf;
    font-size: 18px;
  }

  .nav_links a {
    color: #272220;
    margin-left: 20px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
  }

  a {
    transition: 0.3s;
    text-decoration: none;

    &:hover {
      color: #d68662;
      transition: 0.3s;
    }
  }

</style>
