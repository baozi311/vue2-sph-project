import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from "@/views/Trade"
import Pay from "@/views/Pay"
import PaySuccess from "@/views/PaySuccess"
import Center from "@/views/Center"
import MyOrder from "@/views/Center/MyOrder"
import GroupOrder from "@/views/Center/GroupOrder"

export default [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/login',
        component: Login,
        meta: {
            isHidden: true
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            isHidden: true
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search
    },
    {
        name: 'detail',
        path: '/detail/:goodsId',
        component: Detail
    },
    {
        path: "/addcartsuccess",
        component: AddCartSuccess,
    },
    {
        path: "/shopcart",
        component: ShopCart,
    },
    {
        path: "/trade",
        component: Trade,
        beforeEnter: (to, from, next) => {
            if (from.path === "/shopcart") {
                next();
            } else {
                next(false);
            }
        },
    },
    {
        path: "/pay",
        component: Pay,
        beforeEnter: (to, from, next) => {
            if (from.path === "/trade") {
                next();
            } else {
                next(false);
            }
        },
    },
    {
        path: "/paysuccess", 
        component: PaySuccess,
        beforeEnter: (to, from, next) => {
            if (from.path === "/pay") {
                next();
            } else {
                next(false);
            }
        },
    },
    {
        path: "/center",
        component: Center,
        children: [
            {
                path: "myorder",
                component: MyOrder,
            },
            {
                path: "grouporder",
                component: GroupOrder,
            },
            {
                path: "",
                redirect: "myorder",
            },
        ],
    },
    {
        path: '/',
        redirect: "/home"
    },
]