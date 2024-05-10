<!-- 三级分类，动态渲染，跳转search页面，路径合并params，query参数 -->

<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveOutDiv" @mouseenter="isShow = true">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                @mouseenter="moveInItem(index)"
                :class="{ item_on: currenIndex === index }"
                :key="c1.categoryId"
              >
                <h3>
                  <a
                    href="javascript:;"
                    :data-category1Id="c1.categoryId"
                    :data-categoryName="c1.categoryName"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          href="javascript:;"
                          :data-category2Id="c2.categoryId"
                          :data-categoryName="c2.categoryName"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:;"
                            :data-category3Id="c3.categoryId"
                            :data-categoryName="c3.categoryName"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
  
<script>
// import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  // 1\工具里面查找组件
  // 2\全局注册组件
  components: {},

  data() {
    return {
      currenIndex: -1,
      isShow: true,
    };
  },

  computed: {
    // 之前拿数据state:{categoryList},就可以直接this.$store.state.categoryList去获取
    // 进而可以简化...mapState(["categoryList"])

    // categoryList() {
    //   console.log(this.$store.state.categoryList);
    //   return this.$store.state.categoryList;
    // },
    // ...mapState(["categoryList"]),

    // 现在不能上面一样的写法,因为现在state不是之前的结构了
    // ...mapState暂时没法用了,只能先写对象,后面我们开启命名空间mapState就可以使用了

    categoryList() {
      return this.$store.state.home.categoryList;
    },
  },

  // 真正的发请求
  methods: {
    moveInItem: throttle(
      function (index) {
        // console.log(index);
        this.currenIndex = index;
      },
      50,
      // 鼠标滑动很快，函数跟不上
      // 是否拖延
      { trailing: false }
    ),
    // 点击三级分类的a标签跳转到,事件委派的回调
    toSearch(event) {
      let target = event.target;
      // console.log(target);
      let { category1id, category2id, category3id, categoryname } =
        target.dataset;
      if (categoryname) {
        let location = {
          name: "search",
        };
        let query = {};
        if (category1id) {
          query = {
            category1Id: category1id,
            categoryName: categoryname,
          };
        } else if (category2id) {
          query = {
            category2Id: category2id,
            categoryname: categoryname,
          };
        } else {
          query = {
            category3Id: category3id,
            categoryname: categoryname,
          };
        }
        location.query = query;
        location.params = this.$route.params;
        this.$router.push(location);
      }
    },
    moveOutDiv() {
      this.currenIndex = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
  },
  beforeMount() {
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
};
</script>
  
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      &.sort-enter {
        height: 0;
      }
      &.sort-enter-to {
        height: 461px;
      }
      &.sort-enter-active {
        transition: height 0.5s;
        overflow: hidden;
      } 
      &.sort-leave {
        height: 461px;
      }
      &.sort-leave-to {
        height: 0;
      }
      &.sort-leave-active {
        transition: height 1s;
        overflow: hidden;

      }
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 655px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: hotpink;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
  