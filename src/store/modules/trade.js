import { reqGetTradeInfo } from "@/api";

const state = {
  tradeInfo: {},
};
const mutations = {
  SET_TRADEINFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo
  }
};
const actions = {
  async getTradeInfo({ commit }) {
    try {
      const result = await reqGetTradeInfo();
      if (result.code === 200) {
        commit("SET_TRADEINFO", result.data);
      } else {
        alert("获取交易信息失败")
      }
    } catch (error) {
      alert("获取交易信息请求失败")
    }
  }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};