<template>
  <div class="swiper-container" ref="imgSwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(image, index) in imageList"
        :key="image.id"
      >
        <img
          @click="changeActive(index)"
          :class="{ active: currentIndex === index }"
          :src="image.imgUrl"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Pubsub from "pubsub-js";
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: {
    imageList: Array, // 父组件传递的图片列表数据
  },
  data() {
    return {
      currentIndex: 0, // 当前选中的图片索引
    };
  },
  methods: {
    changeActive(index) {
      this.currentIndex = index;
      Pubsub.publish("changeIndex", index);
    },
  },
  watch: {
    imageList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.imgSwiper, {
            // loop: true, // 循环模式选项
            slidesPerView: 3, // 显示3个图片
            slidesPerGroup: 3, // 设置每次切换的个数

            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>