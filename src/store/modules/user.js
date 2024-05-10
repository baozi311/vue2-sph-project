// 将成功添加购物车页面带数据跳转到购物车页面

import getUserTempId from "@/utils/getUserTempId";
import {
  reqGetAddressList,
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqGetUserInfo,
  reqUserLogout
} from "@/api";
const state = {
  // getUserTempId()调用就可以拿到临时标识
  // 而且只要调用完,localStorage当中就存储了临时标识,后期要用直接从localStorage当中去获取
  // 但是localStorage当中拿数据,比vuex当中拿数据效率低
  // 所以我们一上来并没有在main当中去调用工具函数生成标识存储localStorage
  // 而是在vuex当中去调用,先存到localStorage,再存储在vuex当中
  // 后期我们在拿标识的时候就从vuex去拿,不去localStorage当中频繁获取
  userTempId: getUserTempId(),
  code: "",
  // token: "",
  token: localStorage.getItem("token_key") || "",
  userInfo: {},
  addressList: [],
};
const mutations = {
  SET_CODE(state, code) {
    state.code = code;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  RESET_USERINFO(state) {
    state.token = "";
    state.userInfo = {};
  },
  SET_ADDRESSLIST(state, addressList) {
    state.addressList = addressList
  }
};
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    try {
      const result = await reqGetCode(phone);
      if (result.code === 200) {
        commit("SET_CODE", result.data);
        return result.data;
      } else {
        return Promise.reject("获取验证码错误（user.js文件28）");
      }
    } catch (error) {
      return Promise.reject("获取验证码请求错误（user.js文件31）");
    }
  },
  // 注册
  async userRegister({ commit }, userInfo) {
    try {
      const result = await reqUserRegister(userInfo);
      if (result.code === 200) {
        return "ok";
      } else {
        return Promise.reject("注册失败");
      }
    } catch (error) {
      return Promise.reject("注册请求失败");
    }
  },
  // 登录
  async userLogin({ commit }, userInfo) {
    try {
      const result = await reqUserLogin(userInfo);
      if (result.code === 200) {
        commit("SET_TOKEN", result.data.token);
        localStorage.setItem("token_key", result.data.token);
        return "ok";
      } else {
        return Promise.reject("登录失败");
      }
    } catch (error) {
      return Promise.reject("登录请求失败");
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    try {
      const result = await reqGetUserInfo();
      if (result.code === 200) {
        commit("SET_USERINFO", result.data);
        return "ok"
      } else {
        return Promise.reject("获取用户信息失败");
      }
    } catch (error) {
      return Promise.reject("获取用户信息请求失败");
    }
  },
  // 重置用户信息
  reset({ commit }) {
    commit("RESET_USERINFO");
    localStorage.removeItem("token_key");
  },
  // 退出登录
  async userLogout({ dispatch }) {
    try {
      const result = await reqUserLogout();
      if (result.code === 200) {
        dispatch("reset")
        return "ok";
      } else {
        return Promise.reject("退出登录失败");
      }
    } catch (error) {
      return Promise.reject("退出登录请求失败", error);
    }
  },
  // 获取用户收货地址
  async getAddressList({ commit }) {
    try {
      const result = await reqGetAddressList();
      if (result.code === 200) {
        commit("SET_ADDRESSLIST", result.data)
      } else {
        console.log("获取用户收货地址失败");
      }
    } catch (error) {
      console.log("获取用户收货地址请求失败");
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