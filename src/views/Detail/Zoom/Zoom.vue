<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="defaultImg.imgUrl" ref="bigImgRef" />
    </div>
    <div class="mask" ref="maskRef"></div>
  </div>
</template>

<script>
import Pubsub from "pubsub-js";

export default {
  name: "Zoom",
  props: {
    imageList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0, // 当前选中的图片索引
    };
  },
  computed: {
    defaultImg() {
      return this.imageList[this.currentIndex] || {};
    },
  },
  methods: {
    move(event) {
      let mask = this.$refs.maskRef;
      let bigImg = this.$refs.bigImgRef;
      // 获取鼠标位置
      let mouseX = event.offsetX;
      let mouseY = event.offsetY;
      // 计算遮罩位置
      let maskX = mouseX - mask.offsetWidth / 2;
      let maskY = mouseY - mask.offsetHeight / 2;
      // 边界处理
      if (maskX <= 0) {
        maskX = 0;
      } else if (maskX >= mask.offsetWidth) {
        maskX = mask.offsetWidth;
      }

      if (maskY <= 0) {
        maskY = 0;
      } else if (maskY >= mask.offsetHeight) {
        maskY = mask.offsetHeight;
      }
      // 设置left和top
      mask.style.left = maskX + "px";
      mask.style.top = maskY + "px";

      // 计算大图位置
      bigImg.style.left = -2 * maskX + "px";
      bigImg.style.top = -2 * maskY + "px";
    },
  },
  mounted() {
    Pubsub.subscribe("changeIndex", (msg, data) => {
      this.currentIndex = data;
    });
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>