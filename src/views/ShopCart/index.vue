<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-for="(cart, index) in cartList" :key="index">
        <ul
          class="cart-list"
          v-for="cartInfo in cart.cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @click="changeOneIsCheck(cartInfo)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeCartNum(cartInfo, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="
                changeCartNum(cartInfo, $event.target.value - cartInfo.skuNum)
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeCartNum(cartInfo, 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteOne(cartInfo)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteMore">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择{{ checkedNum }}件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allMoney }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
          <!-- <a class="sum-btn" href="###" target="_blank"></a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ShopCart",
  methods: {
    getCartList() {
      this.$store.dispatch("cart/getCartList");
    },
    // 点击修改单个的选中状态
    async changeOneIsCheck(cartInfo) {
      // 发请求给后台 让后台把当前点击的这一项数据给修改完成
      // 后台会给我们反响应,我们就可以知道后台修改成功还是失败
      // 成功我们就重新获取购物车列表数据,前端页面自动数据就修改过来了
      // 失败就报错
      let skuId = cartInfo.skuId;
      let isChecked = cartInfo.isChecked ? 0 : 1;
      try {
        await this.$store.dispatch("cart/updateOneIscheck", {
          skuId,
          isChecked,
        });

        alert("修改单个状态成功");
        this.getCartList();
      } catch (error) {
        alert("修改单个状态失败" + error);
      }
    },

    // 点击修改购物车商品数量
    async changeCartNum(cartInfo, disNum) {
      if (cartInfo.skuNum + disNum < 1) {
        disNum = 1 - cartInfo.skuNum;
      }

      try {
        await this.$store.dispatch("cart/addOrUpdateShopCart", {
          skuId: cartInfo.skuId,
          skuNum: disNum,
        });
        alert("修改购物车数量成功");
        this.getCartList();
      } catch (error) {
        alert("修改购物车数量失败");
      }
    },

    // 点击删除单个购物车
    async deleteOne(cartInfo) {
      try {
        await this.$store.dispatch("cart/deleteOneCart", cartInfo.skuId);
        alert("删除单个购物车成功");
        this.getCartList();
      } catch (error) {
        alert("删除单个购物车失败");
      }
    },
    // 点击删除多个购物车
    async deleteMore() {
      let skuIdList = [];
      this.cartList.forEach((item) => {
        item.cartInfoList.forEach((item1) => {
          if (item1.isChecked) {
            skuIdList.push(item1.skuId);
          }
        });
      });
      try {
        await this.$store.dispatch("cart/deleteMoreCart", skuIdList);
        alert("删除多个购物车成功");
        this.getCartList();
      } catch (error) {
        alert("删除多个购物车失败");
      }
    },
  },
  computed: {
    ...mapState("cart", ["cartList"]),
    checkedNum() {
      return this.cartList.reduce((prev, item) => {
        prev += item.cartInfoList.reduce((prev1, item1) => {
          if (item1.isChecked) {
            prev1 += item1.skuNum;
          }
          return prev1;
        }, 0);
        return prev;
      }, 0);
    },
    allMoney() {
      return this.cartList.reduce((prev, item) => {
        prev += item.cartInfoList.reduce((prev1, item1) => {
          if (item1.isChecked) {
            prev1 += item1.skuNum * item1.skuPrice;
          }
          return prev1;
        }, 0);
        return prev;
      }, 0);
    },
    isCheckAll: {
      get() {
        return (
          this.cartList.every((item) => {
            return item.cartInfoList.every((item1) => {
              return item1.isChecked;
            });
          }) && this.cartList.length
        );
        // return this.cartList.every((item) =>
        //   item.cartInfoList.every((item1) => item1.isChecked)
        // );
      },
      async set(val) {
        let isChecked = val ? 1 : 0;
        let skuIdList = [];
        this.cartList.forEach((item) => {
          item.cartInfoList.forEach((item1) => {
            if (item1.isChecked !== isChecked) {
              skuIdList.push(item1.skuId);
            }
          });
        });

        // 发请求
        try {
          await this.$store.dispatch("cart/updateAllIsCheck", {
            isChecked,
            skuIdList,
          });
          alert("修改全选和全不选成功");
          this.getCartList();
        } catch (error) {
          alert("修改全选和全不选失败");
        }
      },
    },
  },
  mounted() {
    this.getCartList();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
