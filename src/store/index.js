import Vuex from "vuex";
import Vue from "vue";
import home from "./modules/home";
import search from "./modules/search";
import detail from "./modules/detail";
import cart from "./modules/cart";
import user from "./modules/user";
import trade from "./modules/trade";

Vue.use(Vuex);

const state = {};
const mutations = {};
const actions = {};
const getters = {};

const modules = {
  home,
  search,
  detail,
  cart,
  user,
  trade,

}; //后期来合并小store

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules,
});

export default store;