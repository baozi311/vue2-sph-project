<template>
  <div class="swiper-container" :ref="sliderSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="slider in sliderList" :key="slider.id">
        <img :src="slider.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";
export default {
  name: "SliderLoop",
  components: {},
  props:{
    sliderList:{
      type:Array,
      default(){
        return [];
      },
      // 自定义校验规则
      validator(value){
        return value.length <= 5;
      }
    },
    sliderSwiper: String,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  // 监视 联合 next-Tick(nextTick是在最近的一次更新dom之后会立即调用传入nextTick的回调函数)
  watch:{
    sliderList:{
      // 立即监视
      immediate:true,
      handler(){
        this.$nextTick(()=>{
          new Swiper(this.$refs[this.sliderSwiper],{
            loop:true,
            autoplay: {
              delay: 3000, // 自动轮播的延时时间，单位是毫秒
              disableOnInteraction: false, // 用户操作后是否停止自动轮播，默认为 true
            },
            pagination:{
              el:".swiper-pagination"
            },
            navigation:{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }   
          })
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>