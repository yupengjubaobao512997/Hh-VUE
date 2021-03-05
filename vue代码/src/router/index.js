//创建一个路由对象，并导出
import Vue from "vue";
import VueRouter from "vue-router";

import views from "../views";

Vue.use(VueRouter);
var router = new VueRouter({
        routes: [
                { path: "/", redirect: "/home"},
                { path: "/home", component: views.Home },
                { path: "/category", component: views.Category },
                { path: "/profile", component: views.Profile },
                { path: "/list/:cid", component: views.List },
                { path: "/cart", component: views.Cart, meta: {needAuth: true}},
                { path: "/login", component: views.Login },
                { path: "/detail/:id", component: views.Detail },
                { path: "/address", component: views.Address, meta: {needAuth: true}},
                { path: "/editAddress/:id", component: views.EditAddress },
                { path: "/newAddress", component: views.NewAddress },
                { path: "/order", component: views.Orders , meta: {needAuth: true}},
                { path: "/pay", component: views.Pay },
                { path: "/register", component: views.Register },
                { path: "/settlement", component: views.Settlement },
                // { path: "/newAddress", component: views.NewAddress },

        ]
});

export  default  router;

router.beforeEach(function(to, form, next) {
        if(to.meta.needAuth && !sessionStorage.getItem("token")){
                next({path: "/login", query: {to}});
        }else
                next();
})
