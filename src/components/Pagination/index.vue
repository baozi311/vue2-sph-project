<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="$emit('changePageNo', currentPage - 1)">上一页</button>
    <button v-if="startEnd.start > 1" @click="$emit('changePageNo', 1)">1</button>
    <button v-if="startEnd.start > 2">···</button>

    <!-- <button
      v-for="page in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
    >
      {{ page }}
    </button> -->
    <button
      v-for="page in pageArr"
      :key="page"
      @click="$emit('changePageNo', page)"
      :class="{ active: page === currentPage }"
    >
      {{ page }}
    </button>
    <button v-if="startEnd.end < totalPage - 1">···</button>
    <button 
    v-if="startEnd.end < totalPage"
    @click="$emit('changePageNo', totalPage)">{{ totalPage }}</button>
    <button :disabled="currentPage === totalPage" @click="$emit('changePageNo', currentPage + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 5,
    },
    total: {
      type: Number,
      default: 0,
    },
    continueNum: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    // 属于组件自己的动态数据
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    startEnd() {
      let { currentPage, continueNum, totalPage } = this;
      // 初始化数据
      let start = 0; // 起始页
      let end = 0; // 总页数
      // 连续页数比总页数大
      if (continueNum > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 全部按照公式照常计算，靠两边计算有问题的结果，再去if修正
        start = currentPage - Math.floor(continueNum / 2);
        end = currentPage + Math.floor(continueNum / 2);
        // 如果当前页在左侧
        if (start < 1) {
          start = 1;
          end = continueNum;
        }
        // 如果当前页在右侧
        if (end > totalPage) {
          start = totalPage - continueNum + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
    pageArr() {
      let arr = [];
      let {startEnd} =this;
      for (let i = startEnd.start; i <= startEnd.end; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
