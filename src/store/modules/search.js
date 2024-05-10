// search 模块

import {reqGetGoodsListData} from '@/api'

// 对应的就是home的小store
const state = {
  goodsListData:{}
};
const mutations = {
  SET_GOODSLISTDATA(state,goodsListData){
    state.goodsListData = goodsListData
  }
};
const actions = {
  async getGoodsListData({commit},searchParams){
    try {
      const result = await reqGetGoodsListData(searchParams)
      if(result.code === 200){
        commit("SET_GOODSLISTDATA",result.data)
      }else{
        console.log("search模块联系mutations错误");
      }
    } catch (error) {
      alert("search模块请求失败");
    }    
  }
};
const getters = {
  trademarkList(state) {
    return state.goodsListData.trademarkList || [];
  },
  attrsList(state) {
    return state.goodsListData.attrsList || [];
  },
  goodsList(state) {
    return state.goodsListData.goodsList || [];
  },
  // 总条数
  total(state){
    return state.goodsListData.total || 0;
  }
};
export default {
  state,
  mutations,
  actions,
  getters,
  // 开启命名空间，可以避免mutations和actions重复
  namespaced:true
};
