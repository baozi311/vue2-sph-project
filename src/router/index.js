import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";

Vue.use(VueRouter);

const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve === undefined && reject === undefined) {
    return originPush.call(this, location).catch(() => { }); //window
  } else {
    return originPush.call(this, location, resolve, reject);
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve === undefined && reject === undefined) {
    return originReplace.call(this, location).catch(() => { }); //window
  } else {
    return originReplace.call(this, location, resolve, reject);
  }
};

const router = new VueRouter({
  mode: "hash",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  let userInfo = store.state.user.userInfo;
  if (token) {
    if (to.path == '/login') {
      next('/')
    } else {
      if (userInfo.name) {
        next();
      } else {
        // 获取用户信息
        try {
          await store.dispatch('user/getUserInfo');
          next();
        } catch (error) {
          store.dispatch("user/reset");
          next("/login")
        }
      }
    }
  } else {
    // 没有token代表根本没登录过
    // 目前先全部无条件放行
    let target = to.path;
    if (
      target.startsWith("/trade") ||
      target.startsWith("/pay") ||
      target.startsWith("/center")
    ) {
      next("/login?redirect=" + target);
    } else {
      next();
    } 
  }
})

export default router;