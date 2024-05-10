

// 对应的就是home的小store
import { reqGetBannerList, reqGetCategoryList,reqGetFloorList } from "@/api";

const actions = {
  // 发请求逻辑
  async getCategoryList({ commit }) {
    try {
      const result = await reqGetCategoryList();
      if (result.code === 200) {
        commit("SET_CATEGORYLIST", result.data);
      } else {
        alert("获取三级分类列表失败");
      }
    } catch (error) {
      alert("三级分类列表请求失败");
    }
  },
  async getBannerList({commit}){
    try {
      const result = await reqGetBannerList();
      if(result.code === 200){
        commit("SET_BANNERLIST",result.data)
      }else{
        console.log('获取bannerList失败');
      }
    } catch (error) {
      console.log("bannerList请求失败");
    }
  },
  async getFloorList({commit}){
    try {
      const result = await reqGetFloorList();
      if(result.code === 200){
        commit("SET_FLOORLIST",result.data)
      }else{
        console.log('获取FloorList失败');
      }
    } catch (error) {
      console.log("FloorList请求失败");
    }
  }
};

const mutations = {
  SET_CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  SET_BANNERLIST(state,bannerList){
    state.bannerList = bannerList
  },
  SET_FLOORLIST(state,floorList){
    state.floorList=floorList
  }
};

const state = {
  categoryList: [],
  bannerList:[],
  floorList:[]
};

const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
