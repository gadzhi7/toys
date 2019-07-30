<template lang="html">
  <div class="instagram_wrapper" v-if="instagram_api.length">
    <div class="instagram">
      <a :href="photo.link" class="instagram_link" target="_blank" v-for="(photo, index) in instagram_api" :key="index">
        <img :src="photo.images.standard_resolution.url" alt="instagram">
      </a>
    </div>
    <a class="instagram_button" :href="`https://www.instagram.com/${instagram_api[0].user.username}`" target="_blank">
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m75 512h362c41.355469 0 75-33.644531 75-75v-362c0-41.355469-33.644531-75-75-75h-362c-41.355469 0-75 33.644531-75 75v362c0 41.355469 33.644531 75 75 75zm-45-437c0-24.8125 20.1875-45 45-45h362c24.8125 0 45 20.1875 45 45v362c0 24.8125-20.1875 45-45 45h-362c-24.8125 0-45-20.1875-45-45zm0 0"/><path d="m256 391c74.4375 0 135-60.5625 135-135s-60.5625-135-135-135-135 60.5625-135 135 60.5625 135 135 135zm0-240c57.898438 0 105 47.101562 105 105s-47.101562 105-105 105-105-47.101562-105-105 47.101562-105 105-105zm0 0"/><path d="m406 151c24.8125 0 45-20.1875 45-45s-20.1875-45-45-45-45 20.1875-45 45 20.1875 45 45 45zm0-60c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"/></svg>
      <span>Follow <strong>@{{instagram_api[0].user.username}}</strong></span>
    </a>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Instagram',
  data () {
    return {
      instagram_api: []
    }
  },
  async beforeCreate () {
    try {
      let response = await axios.get('https://api.instagram.com/v1/users/1653967178/media/recent', {
        params: {
          access_token: '1653967178.e7e7763.ac33dc43a76e4e93beb42da27112f0fc',
          count: 6
        }
      })
      this.instagram_api = response.data.data
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style lang="scss" scoped>

.instagram_wrapper {
  flex: 0 0 auto;
  height: 300px;
  position: relative;
  overflow: hidden;
  width: calc(100% + 40px);
  left: -20px;
}

.instagram {
  display: flex;
  height: 100%;

  &_link {
    width: 16.66%;
    height: 100%;
    overflow: hidden;

    img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
      transition: 0.7s;
    }

    &:hover img {
      transform: scale(1.1);
      transition: 0.7s;
    }
  }

  &_button {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: fit-content;
      top: calc(50% - 21px);
      left: calc(50% - 134px);
      border: 1px solid #ebebeb;
      background-color: #fff;
      padding: 10px 25px;
      width: fit-content;
      height: auto;
      color: #272220;
      fill: #272220;
      text-decoration: none;
      transition: 0.3s;

      &:hover {
        transition: 0.3s;
        color: rgba(#d68662, 1);
        fill: rgba(#d68662, 1);
        text-shadow: 3px 3px 5px rgba(#555, 0.27);
        svg {
          -webkit-filter: drop-shadow(3px 3px 5px rgba(#555, 0.27));
            filter: drop-shadow(3px 3px 5px rgba(#555, 0.27));
        }
      }

      svg {
        width: 20px;
        margin-right: 20px;
      }
  }
}

</style>
