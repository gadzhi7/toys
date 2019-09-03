<template lang="html">
  <div class="instagram_wrapper" v-if="instagram_api.length">
    <div class="instagram">
      <a :href="photo.link" class="instagram_link" target="_blank" v-for="(photo, index) in instagram_api" :key="index">
        <img :src="photo.images.standard_resolution.url" alt="instagram">
      </a>
    </div>
    <a class="instagram_button" :href="`https://www.instagram.com/${instagram_api[0].user.username}`" target="_blank">
      <div class="instagram_button_inner">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m75 512h362c41.355469 0 75-33.644531 75-75v-362c0-41.355469-33.644531-75-75-75h-362c-41.355469 0-75 33.644531-75 75v362c0 41.355469 33.644531 75 75 75zm-45-437c0-24.8125 20.1875-45 45-45h362c24.8125 0 45 20.1875 45 45v362c0 24.8125-20.1875 45-45 45h-362c-24.8125 0-45-20.1875-45-45zm0 0"/><path d="m256 391c74.4375 0 135-60.5625 135-135s-60.5625-135-135-135-135 60.5625-135 135 60.5625 135 135 135zm0-240c57.898438 0 105 47.101562 105 105s-47.101562 105-105 105-105-47.101562-105-105 47.101562-105 105-105zm0 0"/><path d="m406 151c24.8125 0 45-20.1875 45-45s-20.1875-45-45-45-45 20.1875-45 45 20.1875 45 45 45zm0-60c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"/></svg>
        <span>Follow <strong>@{{instagram_api[0].user.username}}</strong></span>
      </div>
      <span class="bodymovin bodymovin--hidden"></span>
    </a>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import lottie from 'lottie-web'

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

      setTimeout(() => {

        const bodymovinDiv = document.querySelector('.bodymovin');
        const zone = document.querySelector('.instagram');

        let animationRunning = false;
        const animData = {
            container: bodymovinDiv,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/49240/stick-man.json'
        };

        const anim = lottie.loadAnimation(animData);
        anim.setSpeed(2.6);

        zone.addEventListener('mouseenter', mouseEnter);
        zone.addEventListener('mouseleave', mouseLeave);

        function mouseEnter() {
          if (!animationRunning) {
            animationRunning = true;
            bodymovinDiv.classList.remove('bodymovin--hidden');
            anim.loop = false;
            anim.setDirection(1);
            anim.playSegments([0, 8], true);
            anim.addEventListener('complete', startLoop);
          }
        }

        function mouseLeave() {
          // anim.stop();
          bodymovinDiv.classList.add('bodymovin--hidden');
          animationRunning = false;
          anim.removeEventListener('complete', startLoop); // If we leave before the loop starts we want to make sure to clear it
        }

        function startLoop() {
          anim.loop = true;
          anim.removeEventListener('complete', startLoop)
          anim.playSegments([9, 13], true);
        }

      }, 500)

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

      .instagram_button_inner {
        padding: 10px 25px;
        width: 100%;
        height: 100%;
        background-color: #fff;
        position: relative;
        z-index: 2;
      }
  }
}

.bodymovin {
  width: 62px; /* 310 */
  height: 34px; /* 170 */
  position: absolute;
  top: -29px;
  right: 4%;
  z-index: 0;
  pointer-events: none;
  transition: transform 0s;
  background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%);
  transition: 0.5s;
}

.bodymovin--hidden {
  transform: translateY(30px);
  transition: transform 0.55s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  background: none;
  transition: 0.5s;
}

</style>
