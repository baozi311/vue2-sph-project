import {reqGetGoodsDetailInfo} from "@/api"

const state = {
  goodsDetailInfo: {}
};
const mutations = {
  SET_GOODSDETAILINFO(state, goodsDetailInfo) {
    state.goodsDetailInfo = goodsDetailInfo;//将数据存入
  }
};
const actions = {
  async getGoodsDetailInfo({ commit }, skuId) {
    try {
      const result = await reqGetGoodsDetailInfo(skuId);
      if(result.code === 200){
        commit('SET_GOODSDETAILINFO', result.data);//将数据存入
      }else{
        console.log("没有获取到商品详情");
      }
    } catch (error) {
      console.log("商品详情 请求失败");
    }
  }
};
const getters = {
  categoryView(state){
    return state.goodsDetailInfo.categoryView || {};
  },
  skuInfo(state){
    return state.goodsDetailInfo.skuInfo || {};
  },
  spuSaleAttrList(state){
    return state.goodsDetailInfo.spuSaleAttrList || [];
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};