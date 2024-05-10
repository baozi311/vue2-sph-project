import {
  reqAddOrUpdateShopCart,
  reqDeleteMoreCart,
  reqDeleteOneCart,
  reqGetShopCartList,
  reqUpdateAllIsCheck,
  reqUpdateOneIscheck,
} from "@/api";

const state = {
  cartList: []
}
const mutations = {
  SET_CARTLIST(state, cartList){
    state.cartList = cartList
  }
}
const actions = {

  // async函数返回的一定是promise
  // async函数返回的promise成功和失败看return
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    try {
      const result = await reqAddOrUpdateShopCart(skuId, skuNum);
      if (result.code === 200) {
        return "ok"
      } else {
        return Promise.reject("添加或者修改购物车失败");
      }
    } catch (error) {
      return Promise.reject("添加或者修改购物车请求失败");
    }
  },
  async getCartList({ commit }) {
    try {
      const result = await reqGetShopCartList();
      if (result.code === 200) {
        commit("SET_CARTLIST", result.data);
      } else {
        return Promise.reject("获取购物车列表失败");
      }
    } catch (error) {
      return Promise.reject("获取购物车列表失败");                    
    }
  },
  // 修改单个状态
  async updateOneIscheck({ commit }, { skuId, isChecked }) {
    try {
      const result = await reqUpdateOneIscheck(skuId, isChecked);
      if (result.code === 200) {
        return "ok";
      } else {
        return Promise.reject("修改单个状态失败");
      }
    } catch (error) {
      return Promise.reject("修改单个状态请求失败");
    }
  },

  // 修改全选和全不选
  async updateAllIsCheck({ commit }, { isChecked, skuIdList }) {
    try {
      const result = await reqUpdateAllIsCheck(isChecked, skuIdList);
      if (result.code === 200) {
        return "ok";
      } else {
        return Promise.reject("修改多个状态失败");
      }
    } catch (error) {
      return Promise.reject("修改多个状态请求失败");
    }
  },

  // 删除单个购物车
  async deleteOneCart({ commit }, skuId) {
    try {
      const result = await reqDeleteOneCart(skuId);
      if (result.code === 200) {
        return "ok";
      } else {
        return Promise.reject("删除单个购物车失败");
      }
    } catch (error) {
      return Promise.reject("删除单个购物车请求失败");
    }
  },

  // 删除多个购物车
  async deleteMoreCart({ commit, dispatch }, skuIdList) {
    try {
      // const result = await reqDeleteMoreCart(skuIdList);
      const promises = [];
      skuIdList.forEach((skuId) => {
        const promise = dispatch("deleteOneCart", skuId);
        promises.push(promise);
      });
      // Promise.all()
      // 功能:  同时处理多个promise
      // 参数:  promise对象的数组    [promise,promise]
      // 返回值: 一个新的promise对象
      //  如果返回值promise成功代表数组当中所有的promise都成功,成功的结果
      //  数组当中所有的promise成功的结果组成的数组
      //  如果返回值promise失败,代表数组当中有一个失败,失败的原因就是数组当中失败的
      //  promise的原因
      await Promise.all(promises);
      return "ok";
    } catch (error) {
      return Promise.reject("删除多个购物车请求失败");
    }
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};