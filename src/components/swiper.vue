<template>
  <swiper
    :modules="modules"
    :loop="true"
    :autoplay="{
      delay: 2000,
    }"
    :pagination="{ clickable: true }"
  >
    <swiper-slide class="swiper-slide">
      <img src="@/assets/images/banner1.svg" alt="VoT" />
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img src="@/assets/images/banner2.svg" class="img1" alt="VoT" />
    </swiper-slide>
  </swiper>
</template>
<script>
// import Swiper core and required modules
import { Pagination, A11y, Autoplay } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import Swiper styles
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Pagination, A11y, Autoplay],
    };
  },
};
</script>
<style scoped lang="scss">
.swiper-slide {
  width: 100%;
  padding-bottom: 3.25em;
  img {
    width: 100%;
  }
  .img1 {
    width: 88%;
  }
}
</style>
