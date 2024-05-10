import request from "@/utils/request";
import mockRequest from '@/utils/mockRequest'
// 请求获取三级分类列表数据
export const reqGetCategoryList = () => {
  return request({
    url: "/product/getBaseCategoryList",
    method: "get",
  });
};

// mock虚假请求
export const reqGetBannerList = () => {
  return mockRequest({
    url: '/banner',
    method: 'get'
  })
}

export const reqGetFloorList = () => {
  return mockRequest({
    url: '/floor',
    method: 'get'
  })
}

// 请求回去search商品列表数据
// 需要带请求体参数
export const reqGetGoodsListData = (searchParams) => {
  return request({
    url: "/list",
    method: 'post',
    data: searchParams
  })
}

// 详情页
export const reqGetGoodsDetailInfo = (skuId) => {
  return request.get(`/item/${skuId}`)
}

// 成功添加购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return request.post(`/cart/addToCart/${skuId}/${skuNum}`)
}

export const reqGetShopCartList = () => {
  return request.get('/cart/cartList')
}

// 请求修改购物车单个的状态
// /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateOneIscheck = (skuId, isChecked) => {
  return request.get(`/cart/checkCart/${skuId}/${isChecked}`);
};

// 请求修改全选和全不选
// post  /api/cart/batchCheckCart/{isChecked}

export const reqUpdateAllIsCheck = (isChecked, skuIdList) => {
  return request.post(`/cart/batchCheckCart/${isChecked}`, skuIdList);
};

// /api/cart/deleteCart/{skuId}
export const reqDeleteOneCart = (skuId) => {
  return request.delete(`/cart/deleteCart/${skuId}`);
};

// o/api/cart/batchDeleteCart
export const reqDeleteMoreCart = (skuIdList) => {
  return request.delete("/cart/batchDeleteCart", {
    data: skuIdList,
  });
};

// 请求获取验证码
// /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => {
  return request.get(`/user/passport/sendCode/${phone}`)
}

// 注册用户
// /api/user/passport/register
export const reqUserRegister = (userInfo) => {
  return request.post('/user/passport/register', userInfo)
}

// 登录
// /api/user/passport/login
export const reqUserLogin = (userInfo) => {
  return request.post('/user/passport/login', userInfo)
}

// 获取用户信息 
// /user/passport/auth/getUserInfo
export const reqGetUserInfo = () => {
  return request.get('/user/passport/auth/getUserInfo');
}


// 退出登录
// /api/user/passport/logout
export const reqUserLogout = () => {
  return request.get('/user/passport/logout');
}

//  获取用户收货地址
// /api/user/userAddress/auth/findUserAddressList
export const reqGetAddressList = () => {
  return request.get('/user/userAddress/auth/findUserAddressList')
}

// 获取用户订单交易信息
// /api/order/auth/trade
export const reqGetTradeInfo = () => {
  return request.get("/order/auth/trade");
};

// 提交订单
// /order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, tradeInfo) => {
  return request.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, tradeInfo)
}

// 订单提交成功页面数据
// /api/payment/weixin/createNative/{orderId}
export const reqGetPayInfo = (orderId) => {
  return request.get(`/payment/weixin/createNative/${orderId}`)
}

// 获取支付状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqGetPayStatus = (orderId) => {
  return request.get(`/payment/weixin/queryPayStatus/${orderId}`)
}

// 获取我的订单列表
// /order/auth/{page}/{limit}
export const reqGetMyOrderList = (page,limit) =>{
  return request.get(`/order/auth/${page}/${limit}`)
}